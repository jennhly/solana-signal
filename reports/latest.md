# Solana Signal — Ecosystem Report

Generated: `2026-11-19T20:32:38.482369Z` · Health: **Healthy** · Schema: `1.0.0`

## Executive signal

- Throughput: **2,882.27 TPS**
- Average slot time: **0.21 seconds**
- Active / delinquent validators: **659 / 26**
- SOL price: **72.88 USD** (0.12 % over 24h)
- DeFi TVL: **4.76B USD** · DEX volume: **1.82B USD**

## Network

| Metric | Value | Provenance |
|---|---:|---|
| TPS | 2,882.27 TPS | live · Solana RPC · getRecentPerformanceSamples |
| Slot time | 0.21 seconds | live · Solana RPC · getRecentPerformanceSamples |
| Block height | 449.48M blocks | live · Solana RPC · getBlockHeight |
| Epoch | 1,091 | live · Solana RPC · getEpochInfo |
| Epoch progress | 36.74 % | live · Solana RPC · getEpochInfo |
| SOL supply | 637.86M SOL | live · Solana RPC · getSupply |

## Validator health

The stake concentration coefficient is **17**: the minimum ranked validator count controlling at least 33% of activated stake.

| Rank | Identity | Stake (SOL) | Share | Commission | Status |
|---:|---|---:|---:|---:|---|
| 1 | `HEL1USMZKAL2odpNBj2oCjffnFGaYwmbGmyewGv1e2TU` | 17,028,960 | 3.97% | 0% | Current |
| 2 | `Fd7btgySsrjuo25CJCj7oE7VPMyezDhnx7pZkj2v69Nk` | 16,375,745 | 3.82% | 7% | Current |
| 3 | `DRpbCBMxVnDK7maPM5tGv6MvB3v1sRMC86PZ8okm21hy` | 12,422,025 | 2.90% | 0% | Current |
| 4 | `E1r4Psq84tHfQ6aPTvvDka4U3u8zPVD7gEUrH25RdxHL` | 10,299,570 | 2.40% | 0% | Current |
| 5 | `7jtWrBuj9k2E5RnoHGWSBosBwqwjZMvEnhe9qGLJdhT4` | 9,815,431 | 2.29% | 10% | Current |
| 6 | `JUPiTERkf97eKN222JwY7bkpWuJnwqKtT44fsbJfhkr` | 9,573,248 | 2.23% | 5% | Current |
| 7 | `C8Bey3LKVJHVqN6xPTeW8WJfUgFQAeGNBpT4Rp99JP1k` | 9,225,578 | 2.15% | 7% | Current |
| 8 | `EvnRmnMrd69kFdbLMxWkTn1icZ7DCceRhvmb2SJXqDo4` | 7,980,784 | 1.86% | 7% | Current |
| 9 | `Awes4Tr6TX8JDzEhCZY2QVNimT6iD1zWHzf1vNyGvpLM` | 6,997,844 | 1.63% | 0% | Current |
| 10 | `9eGrDohdNTAo61DRHyfMuqKWXqYnA3i254Wiszxe8FoY` | 6,772,455 | 1.58% | 5% | Current |

## Economy

| Metric | Value | Provenance |
|---|---:|---|
| SOL price | 72.88 USD | live · CoinGecko |
| DeFi TVL | 4.76B USD | live · DefiLlama |
| Stablecoin supply | 12.87B USD | live · DefiLlama Stablecoins |
| DEX volume · 24h | 1.82B USD | live · DefiLlama DEX |
| Application fees · 24h | 10.95M USD | live · DefiLlama Fees |
| Median priority fee | 0.00 micro-lamports/CU | derived · Solana RPC · getRecentPrioritizationFees |
| Daily active addresses | 595,926 addresses | derived · Solana Data · Dune, Goldsky, Top Ledger |
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

## Partial-fetch log

- `solana_data: HTTP Error 429: Too Many Requests`

---
Values marked `live` were fetched during this run; `derived` values are computed from live inputs; `curated` values are dated primary-source observations. Missing values remain unavailable rather than estimated.
