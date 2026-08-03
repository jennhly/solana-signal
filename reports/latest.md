# Solana Signal — Ecosystem Report

Generated: `2026-08-03T19:56:32.902885Z` · Health: **Healthy** · Schema: `1.0.0`

## Executive signal

- Throughput: **2,469.58 TPS**
- Average slot time: **0.43 seconds**
- Active / delinquent validators: **689 / 14**
- SOL price: **74.01 USD** (0.47 % over 24h)
- DeFi TVL: **4.76B USD** · DEX volume: **1.34B USD**

## Network

| Metric | Value | Provenance |
|---|---:|---|
| TPS | 2,469.58 TPS | live · Solana RPC · getRecentPerformanceSamples |
| Slot time | 0.43 seconds | live · Solana RPC · getRecentPerformanceSamples |
| Block height | 415.09M blocks | live · Solana RPC · getBlockHeight |
| Epoch | 1,011 | live · Solana RPC · getEpochInfo |
| Epoch progress | 65.29 % | live · Solana RPC · getEpochInfo |
| SOL supply | 631.50M SOL | live · Solana RPC · getSupply |

## Validator health

The stake concentration coefficient is **18**: the minimum ranked validator count controlling at least 33% of activated stake.

| Rank | Identity | Stake (SOL) | Share | Commission | Status |
|---:|---|---:|---:|---:|---|
| 1 | `Fd7btgySsrjuo25CJCj7oE7VPMyezDhnx7pZkj2v69Nk` | 16,803,593 | 3.88% | 7% | Current |
| 2 | `HEL1USMZKAL2odpNBj2oCjffnFGaYwmbGmyewGv1e2TU` | 16,025,294 | 3.70% | 0% | Current |
| 3 | `JUPiTERrZqgf1jUyR7dSkhMx4Kn2qJyekWsg3LT1h4b` | 12,539,698 | 2.90% | 5% | Current |
| 4 | `DRpbCBMxVnDK7maPM5tGv6MvB3v1sRMC86PZ8okm21hy` | 12,256,190 | 2.83% | 0% | Current |
| 5 | `q9XWcZ7T1wP4bW9SB4XgNNwjnFEJ982nE8aVbbNuwot` | 9,151,490 | 2.12% | 7% | Current |
| 6 | `CAo1dCGYrB6NhHh5xb1cGjUiu86iyCfMTENxgHumSve4` | 8,820,734 | 2.04% | 10% | Current |
| 7 | `E1r4Psq84tHfQ6aPTvvDka4U3u8zPVD7gEUrH25RdxHL` | 8,152,808 | 1.88% | 0% | Current |
| 8 | `EvnRmnMrd69kFdbLMxWkTn1icZ7DCceRhvmb2SJXqDo4` | 7,919,104 | 1.83% | 7% | Current |
| 9 | `9eGrDohdNTAo61DRHyfMuqKWXqYnA3i254Wiszxe8FoY` | 7,297,201 | 1.69% | 5% | Current |
| 10 | `Awes4Tr6TX8JDzEhCZY2QVNimT6iD1zWHzf1vNyGvpLM` | 6,646,244 | 1.54% | 0% | Current |

## Economy

| Metric | Value | Provenance |
|---|---:|---|
| SOL price | 74.01 USD | live · CoinGecko |
| DeFi TVL | 4.76B USD | live · DefiLlama |
| Stablecoin supply | 15.72B USD | live · DefiLlama Stablecoins |
| DEX volume · 24h | 1.34B USD | live · DefiLlama DEX |
| Application fees · 24h | 7.51M USD | live · DefiLlama Fees |
| Median priority fee | 0.00 micro-lamports/CU | derived · Solana RPC · getRecentPrioritizationFees |
| Daily active addresses | 538,583.50 addresses | derived · Solana Data · Allium, Dune |
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
