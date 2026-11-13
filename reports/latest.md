# Solana Signal — Ecosystem Report

Generated: `2026-11-13T19:39:08.233152Z` · Health: **Healthy** · Schema: `1.0.0`

## Executive signal

- Throughput: **2,404.20 TPS**
- Average slot time: **0.22 seconds**
- Active / delinquent validators: **661 / 38**
- SOL price: **80.05 USD** (-1.66 % over 24h)
- DeFi TVL: **4.96B USD** · DEX volume: **1.50B USD**

## Network

| Metric | Value | Provenance |
|---|---:|---|
| TPS | 2,404.20 TPS | live · Solana RPC · getRecentPerformanceSamples |
| Slot time | 0.22 seconds | live · Solana RPC · getRecentPerformanceSamples |
| Block height | 447.06M blocks | live · Solana RPC · getBlockHeight |
| Epoch | 1,085 | live · Solana RPC · getEpochInfo |
| Epoch progress | 75.54 % | live · Solana RPC · getEpochInfo |
| SOL supply | 637.49M SOL | live · Solana RPC · getSupply |

## Validator health

The stake concentration coefficient is **17**: the minimum ranked validator count controlling at least 33% of activated stake.

| Rank | Identity | Stake (SOL) | Share | Commission | Status |
|---:|---|---:|---:|---:|---|
| 1 | `HEL1USMZKAL2odpNBj2oCjffnFGaYwmbGmyewGv1e2TU` | 16,815,755 | 3.89% | 0% | Current |
| 2 | `Fd7btgySsrjuo25CJCj7oE7VPMyezDhnx7pZkj2v69Nk` | 16,140,175 | 3.73% | 7% | Current |
| 3 | `DRpbCBMxVnDK7maPM5tGv6MvB3v1sRMC86PZ8okm21hy` | 12,976,229 | 3.00% | 0% | Current |
| 4 | `E1r4Psq84tHfQ6aPTvvDka4U3u8zPVD7gEUrH25RdxHL` | 10,117,722 | 2.34% | 0% | Current |
| 5 | `7jtWrBuj9k2E5RnoHGWSBosBwqwjZMvEnhe9qGLJdhT4` | 9,699,456 | 2.24% | 10% | Current |
| 6 | `JUPiTERkf97eKN222JwY7bkpWuJnwqKtT44fsbJfhkr` | 9,578,398 | 2.22% | 5% | Current |
| 7 | `C8Bey3LKVJHVqN6xPTeW8WJfUgFQAeGNBpT4Rp99JP1k` | 9,240,076 | 2.14% | 7% | Current |
| 8 | `EvnRmnMrd69kFdbLMxWkTn1icZ7DCceRhvmb2SJXqDo4` | 7,863,387 | 1.82% | 7% | Current |
| 9 | `Awes4Tr6TX8JDzEhCZY2QVNimT6iD1zWHzf1vNyGvpLM` | 6,989,060 | 1.62% | 0% | Current |
| 10 | `9eGrDohdNTAo61DRHyfMuqKWXqYnA3i254Wiszxe8FoY` | 6,712,617 | 1.55% | 5% | Current |

## Economy

| Metric | Value | Provenance |
|---|---:|---|
| SOL price | 80.05 USD | live · CoinGecko |
| DeFi TVL | 4.96B USD | live · DefiLlama |
| Stablecoin supply | 13.89B USD | live · DefiLlama Stablecoins |
| DEX volume · 24h | 1.50B USD | live · DefiLlama DEX |
| Application fees · 24h | 8.07M USD | live · DefiLlama Fees |
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
