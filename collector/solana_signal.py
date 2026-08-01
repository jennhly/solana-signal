#!/usr/bin/env python3
"""Keyless Solana ecosystem collector.

Collects public Solana RPC, CoinGecko and DefiLlama data, applies explicit anomaly
rules, and emits matching JSON and Markdown reports. Python 3.11+; no packages.
"""

from __future__ import annotations

import argparse
import copy
import json
import os
import statistics
import tempfile
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Callable

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_RPC = os.environ.get("SOLANA_RPC_URL", "https://api.mainnet-beta.solana.com")
USER_AGENT = "solana-signal/1.0 (+https://github.com/jennhly/solana-signal)"


def fetch_json(url: str, *, payload: dict[str, Any] | None = None, timeout: float = 12.0) -> Any:
    body = json.dumps(payload).encode() if payload else None
    request = urllib.request.Request(
        url,
        data=body,
        headers={"Content-Type": "application/json", "User-Agent": USER_AGENT},
        method="POST" if payload else "GET",
    )
    with urllib.request.urlopen(request, timeout=timeout) as response:
        return json.loads(response.read().decode())


def rpc(method: str, params: list[Any] | None = None, endpoint: str = DEFAULT_RPC) -> Any:
    response = fetch_json(endpoint, payload={"jsonrpc": "2.0", "id": method, "method": method, "params": params or []})
    if "error" in response:
        raise RuntimeError(response["error"].get("message", f"RPC error in {method}"))
    if "result" not in response:
        raise RuntimeError(f"RPC method {method} returned no result")
    return response["result"]


def metric(value: int | float | str | None, source: str, unit: str = "", *, status: str = "live", note: str | None = None) -> dict[str, Any]:
    result: dict[str, Any] = {"value": value, "unit": unit, "status": status, "source": source}
    if note:
        result["note"] = note
    return result


def validator_snapshot(current: list[dict[str, Any]], delinquent: list[dict[str, Any]]) -> dict[str, Any]:
    all_accounts = current + delinquent
    total_stake = sum(row["activatedStake"] for row in all_accounts)
    active_stake = sum(row["activatedStake"] for row in current)
    delinquent_stake = sum(row["activatedStake"] for row in delinquent)
    delinquent_ids = {row["votePubkey"] for row in delinquent}
    ranked = sorted(all_accounts, key=lambda row: row["activatedStake"], reverse=True)
    threshold, cumulative, coefficient = total_stake * 0.33, 0, 0
    for row in ranked:
        cumulative += row["activatedStake"]
        coefficient += 1
        if cumulative >= threshold:
            break
    top = [
        {
            "identity": row["nodePubkey"],
            "voteAccount": row["votePubkey"],
            "activatedStake": row["activatedStake"] / 1e9,
            "sharePct": (row["activatedStake"] / total_stake * 100) if total_stake else 0,
            "commission": row["commission"],
            "delinquent": row["votePubkey"] in delinquent_ids,
        }
        for row in ranked[:10]
    ]
    return {
        "active_count": len(current),
        "delinquent_count": len(delinquent),
        "active_stake_sol": active_stake / 1e9,
        "delinquent_stake_pct": (delinquent_stake / total_stake * 100) if total_stake else 0,
        "nakamoto_coefficient": coefficient,
        "top": top,
    }


def anomaly_alerts(report: dict[str, Any]) -> list[dict[str, str]]:
    alerts: list[dict[str, str]] = []
    tps = float(report["network"]["tps"]["value"] or 0)
    slot_time = float(report["network"]["slotTime"]["value"] or 0)
    delinquent = float(report["validators"]["delinquentStakePct"]["value"] or 0)
    price_change = float(report["markets"]["solChange24h"]["value"] or 0)

    if tps and tps < 1_000:
        alerts.append({"id": "tps-low", "severity": "watch", "metric": "TPS", "observed": f"{tps:.0f} TPS", "rule": "TPS < 1,000", "message": "Throughput is below the operating baseline."})
    if slot_time > 0.65:
        alerts.append({"id": "slot-slow", "severity": "watch", "metric": "Slot time", "observed": f"{slot_time:.3f}s", "rule": "slot time > 650ms", "message": "Recent slots are materially slower than target."})
    if delinquent > 2:
        alerts.append({"id": "stake-delinquent", "severity": "critical" if delinquent > 5 else "watch", "metric": "Delinquent stake", "observed": f"{delinquent:.2f}%", "rule": "delinquent stake > 2%", "message": "A meaningful share of stake is attached to delinquent validators."})
    if abs(price_change) > 10:
        alerts.append({"id": "price-move", "severity": "watch", "metric": "SOL price", "observed": f"{price_change:.1f}% / 24h", "rule": "|24h change| > 10%", "message": "SOL moved beyond the configured daily threshold."})
    if not alerts:
        alerts.append({"id": "all-clear", "severity": "info", "metric": "System", "observed": "Within thresholds", "rule": "all rules evaluated", "message": "No configured network or market anomaly is active."})
    return alerts


def collect(seed_path: Path = ROOT / "public/data/latest.json", endpoint: str = DEFAULT_RPC) -> dict[str, Any]:
    report = json.loads(seed_path.read_text())
    errors: list[str] = []
    tasks: dict[str, Callable[[], Any]] = {
        "slot": lambda: rpc("getSlot", endpoint=endpoint),
        "block_height": lambda: rpc("getBlockHeight", endpoint=endpoint),
        "epoch": lambda: rpc("getEpochInfo", endpoint=endpoint),
        "performance": lambda: rpc("getRecentPerformanceSamples", [8], endpoint),
        "votes": lambda: rpc("getVoteAccounts", endpoint=endpoint),
        "supply": lambda: rpc("getSupply", endpoint=endpoint),
        "fees": lambda: rpc("getRecentPrioritizationFees", endpoint=endpoint),
        "price": lambda: fetch_json("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true"),
        "chains": lambda: fetch_json("https://api.llama.fi/v2/chains"),
        "stablecoins": lambda: fetch_json("https://stablecoins.llama.fi/stablecoinchains"),
        "dex": lambda: fetch_json("https://api.llama.fi/overview/dexs/Solana?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true"),
        "fees_overview": lambda: fetch_json("https://api.llama.fi/overview/fees/Solana?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true"),
        "solana_data": lambda: fetch_json("https://solana.com/api/databricks/data?days=7"),
    }
    values: dict[str, Any] = {}
    with ThreadPoolExecutor(max_workers=8) as executor:
        futures = {executor.submit(task): name for name, task in tasks.items()}
        for future in as_completed(futures):
            name = futures[future]
            try:
                values[name] = future.result()
            except (OSError, RuntimeError, ValueError, urllib.error.URLError) as exc:
                errors.append(f"{name}: {exc}")

    report["generatedAt"] = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
    report["freshnessSeconds"] = 0
    report["health"] = "degraded" if len(errors) > 5 else "healthy"
    report["errors"] = errors

    if "block_height" in values:
        report["network"]["blockHeight"] = metric(values["block_height"], "Solana RPC · getBlockHeight", "blocks")
    if "epoch" in values:
        epoch = values["epoch"]
        report["network"]["epoch"] = metric(epoch["epoch"], "Solana RPC · getEpochInfo")
        report["network"]["epochProgress"] = metric(epoch["slotIndex"] / epoch["slotsInEpoch"] * 100, "Solana RPC · getEpochInfo", "%")
    if values.get("performance"):
        samples = values["performance"]
        latest = samples[0]
        tx_count = latest.get("numNonVoteTransactions", latest["numTransactions"])
        note = "Non-vote transactions" if "numNonVoteTransactions" in latest else "Includes vote transactions"
        report["network"]["tps"] = metric(tx_count / latest["samplePeriodSecs"], "Solana RPC · getRecentPerformanceSamples", "TPS", note=note)
        report["network"]["slotTime"] = metric(latest["samplePeriodSecs"] / latest["numSlots"], "Solana RPC · getRecentPerformanceSamples", "seconds")
        report["history"] = [
            {
                "label": f"T-{len(samples) - index - 1}",
                "tps": sample.get("numNonVoteTransactions", sample["numTransactions"]) / sample["samplePeriodSecs"],
                "slotTime": sample["samplePeriodSecs"] / sample["numSlots"],
            }
            for index, sample in enumerate(reversed(samples))
        ]
    if "supply" in values:
        report["network"]["supply"] = metric(values["supply"]["value"]["total"] / 1e9, "Solana RPC · getSupply", "SOL")
    if "votes" in values:
        snapshot = validator_snapshot(values["votes"]["current"], values["votes"]["delinquent"])
        report["validators"]["active"] = metric(snapshot["active_count"], "Solana RPC · getVoteAccounts", "validators")
        report["validators"]["delinquent"] = metric(snapshot["delinquent_count"], "Solana RPC · getVoteAccounts", "validators")
        report["validators"]["activeStake"] = metric(snapshot["active_stake_sol"], "Solana RPC · getVoteAccounts", "SOL")
        report["validators"]["delinquentStakePct"] = metric(snapshot["delinquent_stake_pct"], "Solana RPC · derived", "%", status="derived")
        report["validators"]["nakamotoCoefficient"] = metric(snapshot["nakamoto_coefficient"], "Solana RPC · derived", "validators", status="derived", note="Minimum ranked validators controlling ≥33% of activated stake")
        report["validators"]["top"] = snapshot["top"]
    if values.get("fees"):
        report["markets"]["medianPriorityFee"] = metric(statistics.median(row["prioritizationFee"] for row in values["fees"]), "Solana RPC · getRecentPrioritizationFees", "micro-lamports/CU", status="derived")
    if values.get("price", {}).get("solana"):
        report["markets"]["solPrice"] = metric(values["price"]["solana"]["usd"], "CoinGecko", "USD")
        report["markets"]["solChange24h"] = metric(values["price"]["solana"]["usd_24h_change"], "CoinGecko", "%")
    solana_chain = next((row for row in values.get("chains", []) if row["name"].lower() == "solana"), None)
    if solana_chain:
        report["markets"]["tvl"] = metric(solana_chain["tvl"], "DefiLlama", "USD")
    solana_stablecoins = next((row for row in values.get("stablecoins", []) if row["name"].lower() == "solana"), None)
    if solana_stablecoins:
        report["markets"]["stablecoinSupply"] = metric(solana_stablecoins["totalCirculatingUSD"].get("peggedUSD", 0), "DefiLlama Stablecoins", "USD")
    if values.get("dex", {}).get("total24h"):
        report["markets"]["dexVolume24h"] = metric(values["dex"]["total24h"], "DefiLlama DEX", "USD")
    if values.get("fees_overview", {}).get("total24h"):
        report["markets"]["protocolRevenue24h"] = metric(values["fees_overview"]["total24h"], "DefiLlama Fees", "USD", note="Aggregate application fees; not validator revenue")
    activity_rows = [row for row in values.get("solana_data", {}).get("rows", []) if row["metricName"] == "Active Addresses"]
    if activity_rows:
        latest_date = max(row["date"] for row in activity_rows)
        latest_rows = [row for row in activity_rows if row["date"] == latest_date]
        providers = sorted({row["providerName"] for row in latest_rows})
        report["markets"]["dailyActiveAddresses"] = metric(
            statistics.median(row["value"] for row in latest_rows),
            f"Solana Data · {', '.join(providers)}",
            "addresses",
            status="derived",
            note=f"Median of {len(providers)} provider observations for {latest_date}; official endpoint refreshes twice daily with a one-day lag",
        )

    report["alerts"] = anomaly_alerts(report)
    return report


def human(value: Any, unit: str = "") -> str:
    if value is None:
        return "Unavailable"
    if isinstance(value, (int, float)) and abs(value) >= 1_000_000_000:
        rendered = f"{value / 1_000_000_000:.2f}B"
    elif isinstance(value, (int, float)) and abs(value) >= 1_000_000:
        rendered = f"{value / 1_000_000:.2f}M"
    elif isinstance(value, float):
        rendered = f"{value:,.2f}"
    elif isinstance(value, int):
        rendered = f"{value:,}"
    else:
        rendered = str(value)
    return f"{rendered} {unit}".strip()


def render_markdown(report: dict[str, Any]) -> str:
    n, v, m = report["network"], report["validators"], report["markets"]
    lines = [
        "# Solana Signal — Ecosystem Report",
        "",
        f"Generated: `{report['generatedAt']}` · Health: **{report['health'].title()}** · Schema: `{report['schemaVersion']}`",
        "",
        "## Executive signal",
        "",
        f"- Throughput: **{human(n['tps']['value'], n['tps'].get('unit', ''))}**",
        f"- Average slot time: **{human(n['slotTime']['value'], n['slotTime'].get('unit', ''))}**",
        f"- Active / delinquent validators: **{human(v['active']['value'])} / {human(v['delinquent']['value'])}**",
        f"- SOL price: **{human(m['solPrice']['value'], 'USD')}** ({human(m['solChange24h']['value'], '%')} over 24h)",
        f"- DeFi TVL: **{human(m['tvl']['value'], 'USD')}** · DEX volume: **{human(m['dexVolume24h']['value'], 'USD')}**",
        "",
        "## Network",
        "",
        "| Metric | Value | Provenance |",
        "|---|---:|---|",
    ]
    for label, key in [("TPS", "tps"), ("Slot time", "slotTime"), ("Block height", "blockHeight"), ("Epoch", "epoch"), ("Epoch progress", "epochProgress"), ("SOL supply", "supply")]:
        item = n[key]
        lines.append(f"| {label} | {human(item['value'], item.get('unit', ''))} | {item['status']} · {item['source']} |")
    lines += ["", "## Validator health", "", f"The stake concentration coefficient is **{human(v['nakamotoCoefficient']['value'])}**: the minimum ranked validator count controlling at least 33% of activated stake.", "", "| Rank | Identity | Stake (SOL) | Share | Commission | Status |", "|---:|---|---:|---:|---:|---|"]
    for index, row in enumerate(v["top"], 1):
        lines.append(f"| {index} | `{row['identity']}` | {row['activatedStake']:,.0f} | {row['sharePct']:.2f}% | {row['commission']}% | {'Delinquent' if row['delinquent'] else 'Current'} |")
    lines += ["", "## Economy", "", "| Metric | Value | Provenance |", "|---|---:|---|"]
    for label, key in [("SOL price", "solPrice"), ("DeFi TVL", "tvl"), ("Stablecoin supply", "stablecoinSupply"), ("DEX volume · 24h", "dexVolume24h"), ("Application fees · 24h", "protocolRevenue24h"), ("Median priority fee", "medianPriorityFee"), ("Daily active addresses", "dailyActiveAddresses"), ("Tokenized assets", "tokenizedAssets")]:
        item = m[key]
        lines.append(f"| {label} | {human(item['value'], item.get('unit', ''))} | {item['status']} · {item['source']} |")
    lines += ["", "## Alerts", ""]
    for alert in report["alerts"]:
        lines.append(f"- **{alert['severity'].upper()} · {alert['metric']} — {alert['observed']}**: {alert['message']} Rule: `{alert['rule']}`")
    lines += ["", "## Upgrade radar", ""]
    for upgrade in report["upgrades"]:
        lines.append(f"- **[{upgrade['name']}]({upgrade['href']})** — {upgrade['timing']}; {upgrade['status']}. {upgrade['impact']}")
    lines += ["", "## Source map", ""]
    for source in report["sources"]:
        lines.append(f"- [{source['name']}]({source['href']}) — {source['status']}")
    if report["errors"]:
        lines += ["", "## Partial-fetch log", ""] + [f"- `{error}`" for error in report["errors"]]
    lines += ["", "---", "Values marked `live` were fetched during this run; `derived` values are computed from live inputs; `curated` values are dated primary-source observations. Missing values remain unavailable rather than estimated.", ""]
    return "\n".join(lines)


def atomic_write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile("w", encoding="utf-8", dir=path.parent, delete=False) as handle:
        handle.write(content)
        temporary = Path(handle.name)
    temporary.replace(path)


def write_report(report: dict[str, Any], output_dir: Path) -> tuple[Path, Path]:
    output_dir.mkdir(parents=True, exist_ok=True)
    json_path, markdown_path = output_dir / "latest.json", output_dir / "latest.md"
    atomic_write(json_path, json.dumps(report, indent=2) + "\n")
    atomic_write(markdown_path, render_markdown(report))
    return json_path, markdown_path


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate keyless Solana ecosystem JSON and Markdown reports")
    parser.add_argument("--output-dir", type=Path, default=ROOT / "reports")
    parser.add_argument("--rpc-url", default=DEFAULT_RPC)
    parser.add_argument("--publish-web-snapshot", action="store_true", help="Also replace public/data/latest.json")
    args = parser.parse_args()
    started = time.monotonic()
    report = collect(endpoint=args.rpc_url)
    json_path, markdown_path = write_report(report, args.output_dir)
    if args.publish_web_snapshot:
        atomic_write(ROOT / "public/data/latest.json", json.dumps(report, indent=2) + "\n")
    print(f"Generated {json_path} and {markdown_path} in {time.monotonic() - started:.1f}s ({report['health']}, {len(report['errors'])} partial errors)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
