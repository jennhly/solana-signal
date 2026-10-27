# Solana Signal — Ecosystem Report

Generated: `2026-10-27T17:59:05.425442Z` · Health: **Healthy** · Schema: `1.0.0`

## Executive signal

- Throughput: **2,202.05 TPS**
- Average slot time: **0.21 seconds**
- Active / delinquent validators: **665 / 20**
- SOL price: **100.73 USD** (-0.57 % over 24h)
- DeFi TVL: **5.71B USD** · DEX volume: **2.07B USD**

## Network

| Metric | Value | Provenance |
|---|---:|---|
| TPS | 2,202.05 TPS | live · Solana RPC · getRecentPerformanceSamples |
| Slot time | 0.21 seconds | live · Solana RPC · getRecentPerformanceSamples |
| Block height | 440.19M blocks | live · Solana RPC · getBlockHeight |
| Epoch | 1,069 | live · Solana RPC · getEpochInfo |
| Epoch progress | 82.36 % | live · Solana RPC · getEpochInfo |
| SOL supply | 636.52M SOL | live · Solana RPC · getSupply |

## Validator health

The stake concentration coefficient is **18**: the minimum ranked validator count controlling at least 33% of activated stake.

| Rank | Identity | Stake (SOL) | Share | Commission | Status |
|---:|---|---:|---:|---:|---|
| 1 | `Fd7btgySsrjuo25CJCj7oE7VPMyezDhnx7pZkj2v69Nk` | 17,059,304 | 3.90% | 7% | Current |
| 2 | `HEL1USMZKAL2odpNBj2oCjffnFGaYwmbGmyewGv1e2TU` | 16,636,453 | 3.81% | 0% | Current |
| 3 | `DRpbCBMxVnDK7maPM5tGv6MvB3v1sRMC86PZ8okm21hy` | 12,660,117 | 2.90% | 0% | Current |
| 4 | `E1r4Psq84tHfQ6aPTvvDka4U3u8zPVD7gEUrH25RdxHL` | 10,812,577 | 2.47% | 0% | Current |
| 5 | `JUPiTERrZqgf1jUyR7dSkhMx4Kn2qJyekWsg3LT1h4b` | 9,716,980 | 2.22% | 5% | Current |
| 6 | `CAo1dCGYrB6NhHh5xb1cGjUiu86iyCfMTENxgHumSve4` | 9,494,053 | 2.17% | 10% | Current |
| 7 | `C8Bey3LKVJHVqN6xPTeW8WJfUgFQAeGNBpT4Rp99JP1k` | 9,206,552 | 2.11% | 7% | Current |
| 8 | `EvnRmnMrd69kFdbLMxWkTn1icZ7DCceRhvmb2SJXqDo4` | 7,754,189 | 1.77% | 7% | Current |
| 9 | `9eGrDohdNTAo61DRHyfMuqKWXqYnA3i254Wiszxe8FoY` | 7,040,177 | 1.61% | 5% | Current |
| 10 | `Awes4Tr6TX8JDzEhCZY2QVNimT6iD1zWHzf1vNyGvpLM` | 6,996,375 | 1.60% | 0% | Current |

## Economy

| Metric | Value | Provenance |
|---|---:|---|
| SOL price | 100.73 USD | live · CoinGecko |
| DeFi TVL | 5.71B USD | live · DefiLlama |
| Stablecoin supply | 15.23B USD | live · DefiLlama Stablecoins |
| DEX volume · 24h | 2.07B USD | live · DefiLlama DEX |
| Application fees · 24h | 11.67M USD | live · DefiLlama Fees |
| Median priority fee | 0.00 micro-lamports/CU | derived · Solana RPC · getRecentPrioritizationFees |
| Daily active addresses | 788,203.00 addresses | derived · Solana Data · Artemis, Blockworks, Dune, Goldsky, RWA, Top Ledger |
| Tokenized assets | 2.80B USD | curated · Solana Ecosystem Roundup · May 2026 |

## Alerts

- **INFO · System — Within thresholds**: No configured network or market anomaly is active. Rule: `all rules evaluated`

## Upgrade radar

- **[Alpenglow · Votor](https://solana.com/upgrades/alpenglow)** — Target: Q3 2026; Under development. Consensus redesign targeting roughly 150ms finality with a 20+20 resilience model.
- **[SIMD-0525 · Shorter slots](https://github.com/solana-foundation/solana-improvement-documents/pull/525)** — Target: Q3 2026; Proposal merged. Cuts target slot duration from 400ms to 200ms for faster confirmation and greater capacity.
- **[BLS pubkeys + VAT](https://solana.com/upgrades)** — July 2026; Live / action required. Prepares validators for Alpenglow admission and aggregate signatures; introduces a 2,000 validator cap.

## Source map

- [Solana mainnet RPC](https://solana.com/docs/rpc) — live · keyless
- [PublicNode RPC fallback](https://publicnode.com/) — live · keyless
- [DefiLlama](https://defillama.com/chain/Solana) — live · keyless
- [CoinGecko](https://www.coingecko.com/en/coins/solana) — live · keyless
- [Solana Data](https://solana.com/data) — linked · canonical
- [Solana News](https://solana.com/news) — curated · official
- [Solana Improvement Documents](https://github.com/solana-foundation/solana-improvement-documents) — curated · primary

---
Values marked `live` were fetched during this run; `derived` values are computed from live inputs; `curated` values are dated primary-source observations. Missing values remain unavailable rather than estimated.
