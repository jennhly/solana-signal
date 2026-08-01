# Solana Signal

**A transparent, auto-updating Solana ecosystem report for humans and machines.**

[Live dashboard](https://solana-signal.jenniferjune24.chatgpt.site) · [Latest Markdown report](reports/latest.md) · [Latest JSON report](reports/latest.json)

Solana Signal turns fragmented network, validator, market, activity, real-world asset, news, and upgrade data into one audit-friendly surface. It ships as an interactive dark dashboard, a zero-dependency Python collector, a human-readable Markdown brief, and a versioned JSON artifact.

No wallet, API key, paid RPC, database, or Python package is required.

## What it covers

| Surface | Metrics and intelligence | Source |
|---|---|---|
| Network | non-vote TPS, average slot time, block height, epoch progress, SOL supply | Solana JSON-RPC |
| Validators | active and delinquent counts, activated stake, delinquent stake share, top-10 concentration, commission, 33% Nakamoto coefficient | `getVoteAccounts` |
| Markets | SOL price and 24h change, TVL, stablecoin supply, 24h DEX volume, application fees, priority fees | CoinGecko + DefiLlama + RPC |
| Activity | daily active addresses, aggregated across current providers | Solana Foundation Data Aggregator (Allium, Blockworks, Dune, RWA) |
| Tokenized assets | current official RWA snapshot, with emphasis on tokenized equities | Solana Foundation ecosystem report |
| Upgrades | Alpenglow / Votor, SIMD-0525 shorter slots, BLS pubkeys + Validator Admission Ticket | Solana Foundation + SIMD repository |
| Signal | explicit rules for low TPS, slow slots, delinquent stake, and large SOL moves | derived locally |

Every value carries a provenance status:

- `live`: fetched during the current run from a public endpoint.
- `derived`: computed deterministically from live inputs; the formula or aggregation is disclosed.
- `curated`: a dated primary-source observation without a stable keyless endpoint.
- `unavailable`: intentionally blank. Solana Signal does not invent or silently backfill data.

## Run it

### Generate the reports

Python 3.11+ is the only requirement.

```bash
python3 collector/solana_signal.py
```

This writes matching artifacts to:

- `reports/latest.json` — stable `1.0.0` machine-readable schema
- `reports/latest.md` — human-readable executive and technical brief

To update the web snapshot at the same time:

```bash
python3 collector/solana_signal.py --publish-web-snapshot
```

An alternate RPC can be supplied without editing code:

```bash
SOLANA_RPC_URL=https://your-rpc.example python3 collector/solana_signal.py
```

### Run the dashboard

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The dashboard starts from the last verified snapshot; **Refresh live** calls its server endpoint, which queries the feeds in parallel and retains verified values when an individual provider is unavailable.

## Automation

The included GitHub Action runs every six hours and on demand:

1. run the offline collector test suite;
2. fetch public data;
3. generate JSON and Markdown atomically;
4. update the bundled dashboard snapshot;
5. commit only when the report changed.

The browser refresh endpoint uses a two-minute CDN cache with stale-while-revalidate, 12-second source timeouts, a keyless PublicNode fallback for hosted RPC calls, and isolated provider errors. The CLI defaults to Solana's public mainnet endpoint and honors `SOLANA_RPC_URL`.

## Methodology

### Network performance

`getRecentPerformanceSamples(8)` provides consecutive 60-second windows. TPS is `numNonVoteTransactions / samplePeriodSecs` when that field is available; otherwise it is explicitly labeled as including votes. Slot time is `samplePeriodSecs / numSlots`. Block height and epoch progress come from `getBlockHeight` and `getEpochInfo`.

### Validator concentration

All current and delinquent vote accounts are ranked by activated stake. Delinquent stake share is delinquent activated stake divided by total activated stake. The displayed Nakamoto coefficient is the minimum number of ranked validators whose cumulative activated stake reaches 33%; it is a concentration indicator, not a claim about coordinated ownership.

### Economic activity

DefiLlama supplies chain TVL, circulating stablecoins, DEX volume, and application fees. “Application fees” is deliberately not labeled validator revenue. CoinGecko supplies SOL/USD and the 24-hour move. Median priority fee is computed from `getRecentPrioritizationFees` and excludes the base fee.

Daily active addresses use the latest common date exposed by Solana Foundation's public `/api/databricks/data` endpoint. The dashboard reports the median of available provider observations and names every provider; the endpoint refreshes twice daily with a one-day lag.

Tokenized asset value is a curated monthly observation because the official Solana Data Aggregator's RWA providers require keys. The current snapshot is from the May 2026 Solana Ecosystem Roundup, which reported more than $2.8B in Solana RWA value and 97% of tokenized equities activity.

### Anomaly rules

Rules are intentionally readable and deterministic:

| Rule | Severity |
|---|---|
| TPS below 1,000 | watch |
| average slot time above 650ms | watch |
| delinquent stake above 2% / 5% | watch / critical |
| absolute SOL 24-hour move above 10% | watch |

Thresholds are documented in [`config.example.json`](config.example.json). A production fork can wire that file into the collector or replace the static rules with its own policy.

## Architecture

```text
Solana RPC ─┐
CoinGecko ──┼──> keyless collector ──> normalized report ──┬──> JSON 1.0.0
DefiLlama ──┤          │                                  ├──> Markdown brief
Solana Data ┘          └──> anomaly rules                  └──> interactive dashboard

Primary-source news + upgrade records ─────────────────────────> curated context
```

The collector uses concurrent standard-library HTTP requests, per-request timeouts, atomic file replacement, and partial-failure logging. The web implementation uses Next-compatible React through vinext and a Cloudflare Worker route. There is no database and no privileged state.

## Verify

```bash
python3 -m unittest discover -s tests -p 'test_*.py' -v
npm run lint
npm test
```

The Python tests cover concentration math, delinquent stake, multi-rule anomalies, provenance rendering, and artifact generation. The Node test production-builds the dashboard and asserts that the key report surfaces are server-rendered.

## Data sources

- [Solana JSON-RPC documentation](https://solana.com/docs/rpc)
- [Solana Data dashboard](https://solana.com/data) and its [open-source aggregator](https://github.com/solana-foundation/solana-data-aggregator)
- [DefiLlama — Solana](https://defillama.com/chain/Solana)
- [CoinGecko — Solana](https://www.coingecko.com/en/coins/solana)
- [Solana network upgrades](https://solana.com/upgrades)
- [SIMD-0326 — Alpenglow](https://github.com/solana-foundation/solana-improvement-documents/blob/main/proposals/0326-alpenglow.md)
- [SIMD-0525 — shorter slots](https://github.com/solana-foundation/solana-improvement-documents/pull/525)
- [May 2026 Solana Ecosystem Roundup](https://solana.com/news/solana-ecosystem-roundup-may-2026)

## Design decisions and limits

- Public endpoints can rate-limit. The dashboard keeps its last verified snapshot and exposes partial-fetch errors instead of clearing values.
- RPC identity labels are not guessed. Vote account and validator identity keys remain raw unless a trusted registry is added.
- Market providers use different methodologies. Solana Signal names the source instead of pretending the values are interchangeable.
- The public mainnet RPC is rate-limited and should not be used for high-frequency production workloads.
- This is ecosystem monitoring, not investment advice.

## License

MIT — see [`LICENSE`](LICENSE).
