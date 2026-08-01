# Solana Signal — Ecosystem Report

Generated: `2026-08-01T13:53:27.311453Z` · Health: **Healthy** · Schema: `1.0.0`

## Executive signal

- Throughput: **1,405.13 TPS**
- Average slot time: **0.43 seconds**
- Active / delinquent validators: **693 / 11**
- SOL price: **72.87 USD** (-0.42 % over 24h)
- DeFi TVL: **4.73B USD** · DEX volume: **1.70B USD**

## Network

| Metric | Value | Provenance |
|---|---:|---|
| TPS | 1,405.13 TPS | live · Solana RPC · getRecentPerformanceSamples |
| Slot time | 0.43 seconds | live · Solana RPC · getRecentPerformanceSamples |
| Block height | 414.63M blocks | live · Solana RPC · getBlockHeight |
| Epoch | 1,010 | live · Solana RPC · getEpochInfo |
| Epoch progress | 58.65 % | live · Solana RPC · getEpochInfo |
| SOL supply | 631.38M SOL | live · Solana RPC · getSupply |

## Validator health

The stake concentration coefficient is **18**: the minimum ranked validator count controlling at least 33% of activated stake.

| Rank | Identity | Stake (SOL) | Share | Commission | Status |
|---:|---|---:|---:|---:|---|
| 1 | `Fd7btgySsrjuo25CJCj7oE7VPMyezDhnx7pZkj2v69Nk` | 16,880,678 | 3.90% | 7% | Current |
| 2 | `HEL1USMZKAL2odpNBj2oCjffnFGaYwmbGmyewGv1e2TU` | 15,969,287 | 3.69% | 0% | Current |
| 3 | `JUPiTERrZqgf1jUyR7dSkhMx4Kn2qJyekWsg3LT1h4b` | 12,528,599 | 2.90% | 5% | Current |
| 4 | `DRpbCBMxVnDK7maPM5tGv6MvB3v1sRMC86PZ8okm21hy` | 12,263,967 | 2.84% | 0% | Current |
| 5 | `q9XWcZ7T1wP4bW9SB4XgNNwjnFEJ982nE8aVbbNuwot` | 9,229,599 | 2.13% | 7% | Current |
| 6 | `CAo1dCGYrB6NhHh5xb1cGjUiu86iyCfMTENxgHumSve4` | 8,815,055 | 2.04% | 10% | Current |
| 7 | `E1r4Psq84tHfQ6aPTvvDka4U3u8zPVD7gEUrH25RdxHL` | 8,151,227 | 1.88% | 0% | Current |
| 8 | `EvnRmnMrd69kFdbLMxWkTn1icZ7DCceRhvmb2SJXqDo4` | 7,903,832 | 1.83% | 7% | Current |
| 9 | `9eGrDohdNTAo61DRHyfMuqKWXqYnA3i254Wiszxe8FoY` | 7,295,625 | 1.69% | 5% | Current |
| 10 | `Awes4Tr6TX8JDzEhCZY2QVNimT6iD1zWHzf1vNyGvpLM` | 6,638,435 | 1.53% | 0% | Current |

## Economy

| Metric | Value | Provenance |
|---|---:|---|
| SOL price | 72.87 USD | live · CoinGecko |
| DeFi TVL | 4.73B USD | live · DefiLlama |
| Stablecoin supply | 15.66B USD | live · DefiLlama Stablecoins |
| DEX volume · 24h | 1.70B USD | live · DefiLlama DEX |
| Application fees · 24h | 8.19M USD | live · DefiLlama Fees |
| Median priority fee | 0.00 micro-lamports/CU | derived · Solana RPC · getRecentPrioritizationFees |
| Daily active addresses | 544,061.50 addresses | derived · Solana Data · Allium, Dune |
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
