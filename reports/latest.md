# Solana Signal — Ecosystem Report

Generated: `2026-08-31T05:31:45.143569Z` · Health: **Healthy** · Schema: `1.0.0`

## Executive signal

- Throughput: **1,579.95 TPS**
- Average slot time: **0.32 seconds**
- Active / delinquent validators: **679 / 18**
- SOL price: **102.60 USD** (-2.31 % over 24h)
- DeFi TVL: **5.78B USD** · DEX volume: **1.87B USD**

## Network

| Metric | Value | Provenance |
|---|---:|---|
| TPS | 1,579.95 TPS | live · Solana RPC · getRecentPerformanceSamples |
| Slot time | 0.32 seconds | live · Solana RPC · getRecentPerformanceSamples |
| Block height | 421.12M blocks | live · Solana RPC · getBlockHeight |
| Epoch | 1,025 | live · Solana RPC · getEpochInfo |
| Epoch progress | 63.08 % | live · Solana RPC · getEpochInfo |
| SOL supply | 633.17M SOL | live · Solana RPC · getSupply |

## Validator health

The stake concentration coefficient is **18**: the minimum ranked validator count controlling at least 33% of activated stake.

| Rank | Identity | Stake (SOL) | Share | Commission | Status |
|---:|---|---:|---:|---:|---|
| 1 | `Fd7btgySsrjuo25CJCj7oE7VPMyezDhnx7pZkj2v69Nk` | 17,203,741 | 3.94% | 7% | Current |
| 2 | `HEL1USMZKAL2odpNBj2oCjffnFGaYwmbGmyewGv1e2TU` | 16,085,807 | 3.68% | 0% | Current |
| 3 | `DRpbCBMxVnDK7maPM5tGv6MvB3v1sRMC86PZ8okm21hy` | 12,389,824 | 2.83% | 0% | Current |
| 4 | `JUPiTERrZqgf1jUyR7dSkhMx4Kn2qJyekWsg3LT1h4b` | 11,479,512 | 2.63% | 5% | Current |
| 5 | `E1r4Psq84tHfQ6aPTvvDka4U3u8zPVD7gEUrH25RdxHL` | 9,452,658 | 2.16% | 0% | Current |
| 6 | `C8Bey3LKVJHVqN6xPTeW8WJfUgFQAeGNBpT4Rp99JP1k` | 9,293,056 | 2.13% | 7% | Current |
| 7 | `CAo1dCGYrB6NhHh5xb1cGjUiu86iyCfMTENxgHumSve4` | 9,023,631 | 2.06% | 10% | Current |
| 8 | `9eGrDohdNTAo61DRHyfMuqKWXqYnA3i254Wiszxe8FoY` | 7,295,972 | 1.67% | 5% | Current |
| 9 | `EvnRmnMrd69kFdbLMxWkTn1icZ7DCceRhvmb2SJXqDo4` | 7,201,762 | 1.65% | 7% | Current |
| 10 | `Awes4Tr6TX8JDzEhCZY2QVNimT6iD1zWHzf1vNyGvpLM` | 6,589,845 | 1.51% | 0% | Current |

## Economy

| Metric | Value | Provenance |
|---|---:|---|
| SOL price | 102.60 USD | live · CoinGecko |
| DeFi TVL | 5.78B USD | live · DefiLlama |
| Stablecoin supply | 15.83B USD | live · DefiLlama Stablecoins |
| DEX volume · 24h | 1.87B USD | live · DefiLlama DEX |
| Application fees · 24h | 12.01M USD | live · DefiLlama Fees |
| Median priority fee | 0.00 micro-lamports/CU | derived · Solana RPC · getRecentPrioritizationFees |
| Daily active addresses | 736,636.50 addresses | derived · Solana Data · Allium, Artemis, Blockworks, Dune, Goldsky, RWA |
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
