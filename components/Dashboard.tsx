"use client";

import { useMemo, useState } from "react";
import type { EcosystemReport, Metric } from "@/lib/types";

const short = (value: number, digits = 1) =>
  new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: digits }).format(value);

function display(metric: Metric, kind: "number" | "money" | "percent" | "duration" = "number") {
  if (metric.value === null || metric.value === "") return "Awaiting live pull";
  if (typeof metric.value === "string") return metric.value;
  if (kind === "money") return `$${short(metric.value, metric.value < 1_000 ? 2 : 1)}`;
  if (kind === "percent") return `${metric.value.toFixed(2)}%`;
  if (kind === "duration") return `${Math.round(metric.value * 1_000)} ms`;
  return short(metric.value, metric.value < 10_000 ? 2 : 1);
}

const truncate = (value: string) => `${value.slice(0, 5)}…${value.slice(-5)}`;
const age = (iso: string) => {
  const seconds = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3_600) return `${Math.round(seconds / 60)}m ago`;
  return `${Math.round(seconds / 3_600)}h ago`;
};

function Provenance({ metric }: { metric: Metric }) {
  return <span className={`source-tag ${metric.status}`} title={metric.note || metric.source}>{metric.status} · {metric.source}</span>;
}

function MetricCard({ label, metric, kind = "number", eyebrow }: { label: string; metric: Metric; kind?: "number" | "money" | "percent" | "duration"; eyebrow?: string }) {
  return (
    <article className="metric-card">
      <div className="metric-heading"><span>{label}</span><span className={`data-dot ${metric.status}`} /></div>
      <strong>{display(metric, kind)}</strong>
      <div className="metric-meta">{eyebrow || metric.unit || "Current reading"}</div>
      <Provenance metric={metric} />
    </article>
  );
}

function SparkBars({ report }: { report: EcosystemReport }) {
  const rows = report.history.length ? report.history : [
    { label: "—", tps: 0, slotTime: 0 }, { label: "—", tps: 0, slotTime: 0 }, { label: "—", tps: 0, slotTime: 0 },
    { label: "—", tps: 0, slotTime: 0 }, { label: "—", tps: 0, slotTime: 0 }, { label: "—", tps: 0, slotTime: 0 },
  ];
  const max = Math.max(...rows.map((row) => row.tps), 1);
  return (
    <div className="spark" aria-label="Recent transaction throughput samples">
      {rows.map((row, index) => <div key={`${row.label}-${index}`} className="spark-column"><i style={{ height: `${Math.max(5, (row.tps / max) * 100)}%` }} /><span>{row.label}</span></div>)}
    </div>
  );
}

export default function Dashboard({ seed }: { seed: EcosystemReport }) {
  const [report, setReport] = useState(seed);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [validatorQuery, setValidatorQuery] = useState("");
  const [mode, setMode] = useState<"brief" | "technical">("brief");

  const filteredValidators = useMemo(() => report.validators.top.filter((row) => {
    const query = validatorQuery.toLowerCase();
    return !query || row.identity.toLowerCase().includes(query) || row.voteAccount.toLowerCase().includes(query);
  }), [report.validators.top, validatorQuery]);

  async function refresh() {
    setRefreshing(true);
    setError("");
    try {
      const response = await fetch("/api/report", { cache: "no-store" });
      if (!response.ok) throw new Error(`Live endpoint returned ${response.status}`);
      setReport(await response.json() as EcosystemReport);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The live pull failed");
    } finally {
      setRefreshing(false);
    }
  }

  function download() {
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = `solana-signal-${report.generatedAt.slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(href);
  }

  const healthLabel = report.health === "healthy" ? "Network responding" : report.health === "degraded" ? "Partial data" : "Unavailable";

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top"><span className="brand-mark">S</span><span>Solana Signal</span></a>
        <nav aria-label="Dashboard sections"><a href="#network">Network</a><a href="#validators">Validators</a><a href="#economy">Economy</a><a href="#upgrades">Upgrades</a></nav>
        <button className="icon-button" onClick={download}>↓ JSON</button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="kicker"><span className={`pulse ${report.health}`} /> MAINNET · KEYLESS INTELLIGENCE</div>
          <h1>The Solana ecosystem,<br /><em>reduced to signal.</em></h1>
          <p>One auditable view across network health, validator concentration, markets, tokenized assets, and the upgrades shaping the next epoch.</p>
          <div className="hero-actions">
            <button className="primary" onClick={refresh} disabled={refreshing}>{refreshing ? "Pulling 12 feeds…" : "↻ Refresh live"}</button>
            <button className="secondary" onClick={() => setMode(mode === "brief" ? "technical" : "brief")}>{mode === "brief" ? "Show methodology" : "Show executive view"}</button>
          </div>
          {error && <p className="error">Live pull failed: {error}. The last verified snapshot remains visible.</p>}
        </div>
        <aside className="status-panel">
          <div className="status-top"><span>System status</span><b>{healthLabel}</b></div>
          <div className="status-orbit"><span>{report.network.tps.value === null ? "—" : short(Number(report.network.tps.value), 0)}</span><small>TPS</small></div>
          <div className="status-grid">
            <div><span>Slot target</span><b>{display(report.network.slotTime, "duration")}</b></div>
            <div><span>Data age</span><b suppressHydrationWarning>{age(report.generatedAt)}</b></div>
            <div><span>Feeds</span><b>{report.sources.length} mapped</b></div>
            <div><span>Errors</span><b>{report.errors.length}</b></div>
          </div>
        </aside>
      </section>

      {mode === "technical" && <section className="method-strip"><b>Methodology</b><span>RPC methods and public APIs run in parallel with 8-second timeouts. Failed feeds never overwrite the last verified value. Derived metrics disclose their formula; curated metrics disclose their observation date.</span><a href="#sources">Inspect sources →</a></section>}

      <section className="section" id="network">
        <div className="section-heading"><div><span className="index">01</span><h2>Network pulse</h2></div><p>Latest non-vote throughput and timing samples direct from mainnet RPC.</p></div>
        <div className="metric-grid network-grid">
          <MetricCard label="Transactions / sec" metric={report.network.tps} eyebrow="Recent non-vote sample" />
          <MetricCard label="Average slot time" metric={report.network.slotTime} kind="duration" />
          <MetricCard label="Block height" metric={report.network.blockHeight} />
          <MetricCard label="Epoch" metric={report.network.epoch} eyebrow={`${display(report.network.epochProgress, "percent")} complete`} />
        </div>
        <div className="chart-card">
          <div className="chart-head"><div><span>RECENT PERFORMANCE</span><h3>Throughput samples</h3></div><div className="legend"><i /> Transactions per second</div></div>
          <SparkBars report={report} />
          <p className="chart-note">Eight consecutive RPC performance windows. Values use non-vote transactions when the node exposes that field.</p>
        </div>
      </section>

      <section className="section" id="validators">
        <div className="section-heading"><div><span className="index">02</span><h2>Validator intelligence</h2></div><p>Participation, delinquency, concentration, and commission — calculated from every vote account.</p></div>
        <div className="validator-summary">
          <MetricCard label="Active validators" metric={report.validators.active} />
          <MetricCard label="Delinquent" metric={report.validators.delinquent} />
          <MetricCard label="Delinquent stake" metric={report.validators.delinquentStakePct} kind="percent" />
          <MetricCard label="Nakamoto coefficient" metric={report.validators.nakamotoCoefficient} />
        </div>
        <div className="table-card">
          <div className="table-tools"><div><span>TOP VALIDATORS</span><h3>Stake concentration</h3></div><input value={validatorQuery} onChange={(event) => setValidatorQuery(event.target.value)} placeholder="Filter identity or vote account" aria-label="Filter validators" /></div>
          <div className="table-scroll"><table><thead><tr><th>Rank</th><th>Identity</th><th>Activated stake</th><th>Share</th><th>Commission</th><th>Status</th></tr></thead><tbody>
            {filteredValidators.length ? filteredValidators.map((row, index) => <tr key={row.voteAccount}><td>{String(index + 1).padStart(2, "0")}</td><td><span className="validator-id">{row.name || truncate(row.identity)}</span><small>{truncate(row.voteAccount)}</small></td><td>{short(row.activatedStake)} SOL</td><td><div className="stake-cell"><span style={{ width: `${Math.min(100, row.sharePct * 14)}%` }} />{row.sharePct.toFixed(2)}%</div></td><td>{row.commission}%</td><td><span className={row.delinquent ? "status-bad" : "status-good"}>{row.delinquent ? "Delinquent" : "Current"}</span></td></tr>) : <tr><td colSpan={6} className="empty">Refresh live to rank mainnet vote accounts.</td></tr>}
          </tbody></table></div>
        </div>
      </section>

      <section className="section" id="economy">
        <div className="section-heading"><div><span className="index">03</span><h2>Economic surface</h2></div><p>Liquidity, trading, fees, assets and users. Every tile distinguishes live data from curated context.</p></div>
        <div className="economy-grid">
          <MetricCard label="SOL price" metric={report.markets.solPrice} kind="money" eyebrow={`${display(report.markets.solChange24h, "percent")} · 24 hours`} />
          <MetricCard label="DeFi TVL" metric={report.markets.tvl} kind="money" />
          <MetricCard label="Stablecoin supply" metric={report.markets.stablecoinSupply} kind="money" />
          <MetricCard label="DEX volume · 24h" metric={report.markets.dexVolume24h} kind="money" />
          <MetricCard label="Application fees · 24h" metric={report.markets.protocolRevenue24h} kind="money" />
          <MetricCard label="Median priority fee" metric={report.markets.medianPriorityFee} />
          <MetricCard label="Daily active addresses" metric={report.markets.dailyActiveAddresses} />
          <MetricCard label="Tokenized assets" metric={report.markets.tokenizedAssets} kind="money" eyebrow="RWA value · May 2026 snapshot" />
        </div>
        <div className="asset-callout"><span>REAL-WORLD ASSETS</span><h3>Solana held 97% of tokenized equities activity in the May ecosystem snapshot.</h3><p>The tracked surface includes xStocks, Ondo Global Markets, WisdomTree funds, tokenized treasuries and commodities. Monthly values remain explicitly curated until a stable, keyless canonical endpoint is available.</p><a href="https://solana.com/news/solana-ecosystem-roundup-may-2026" target="_blank" rel="noreferrer">Read the official ecosystem report ↗</a></div>
      </section>

      <section className="section split-section" id="upgrades">
        <div>
          <div className="section-heading compact"><div><span className="index">04</span><h2>Upgrade radar</h2></div></div>
          <div className="timeline">{report.upgrades.map((upgrade) => <a className="timeline-item" href={upgrade.href} target="_blank" rel="noreferrer" key={upgrade.name}><i /><div><span>{upgrade.timing} · {upgrade.status}</span><h3>{upgrade.name}</h3><p>{upgrade.impact}</p></div><b>↗</b></a>)}</div>
        </div>
        <div>
          <div className="section-heading compact"><div><span className="index">05</span><h2>Anomaly desk</h2></div></div>
          <div className="alert-stack">{report.alerts.map((alert) => <article className={`alert ${alert.severity}`} key={alert.id}><div><span>{alert.severity}</span><b>{alert.metric}</b></div><h3>{alert.observed}</h3><p>{alert.message}</p><small>Rule: {alert.rule}</small></article>)}</div>
        </div>
      </section>

      <section className="section news-section">
        <div className="section-heading"><div><span className="index">06</span><h2>Ecosystem brief</h2></div><p>High-signal updates from primary Solana sources.</p></div>
        <div className="news-grid">{report.news.map((item) => <a href={item.href} target="_blank" rel="noreferrer" className="news-card" key={item.title}><div><span>{item.category}</span><time>{item.date}</time></div><h3>{item.title}</h3><b>Read source ↗</b></a>)}</div>
      </section>

      <section className="sources-section" id="sources">
        <div><span className="index">07</span><h2>Built to be audited.</h2><p>No wallet. No API key. No hidden score. The browser dashboard, Python collector, Markdown report, and JSON artifact all disclose the same source map.</p></div>
        <div className="source-list">{report.sources.map((source, index) => <a href={source.href} target="_blank" rel="noreferrer" key={source.name}><span>{String(index + 1).padStart(2, "0")}</span><b>{source.name}</b><small>{source.status}</small><i>↗</i></a>)}</div>
      </section>

      <footer><div className="brand"><span className="brand-mark">S</span><span>Solana Signal</span></div><p>Open-source ecosystem intelligence · generated <span suppressHydrationWarning>{age(report.generatedAt)}</span></p><div><a href="/data/latest.json">JSON</a><a href="https://github.com/jennhly/solana-signal">GitHub</a></div></footer>
    </main>
  );
}
