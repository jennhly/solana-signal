# Solana Signal — Ecosystem Report

Generated: `2026-08-24T18:58:06.029196Z` · Health: **Healthy** · Schema: `1.0.0`

## Executive signal

- Throughput: **2,581.77 TPS**
- Average slot time: **0.37 seconds**
- Active / delinquent validators: **685 / 10**
- SOL price: **95.94 USD** (0.80 % over 24h)
- DeFi TVL: **5.61B USD** · DEX volume: **2.94B USD**

## Network

| Metric | Value | Provenance |
|---|---:|---|
| TPS | 2,581.77 TPS | live · Solana RPC · getRecentPerformanceSamples |
| Slot time | 0.37 seconds | live · Solana RPC · getRecentPerformanceSamples |
| Block height | 419.51M blocks | live · Solana RPC · getBlockHeight |
| Epoch | 1,021 | live · Solana RPC · getEpochInfo |
| Epoch progress | 89.37 % | live · Solana RPC · getEpochInfo |
| SOL supply | 632.75M SOL | live · Solana RPC · getSupply |

## Validator health

The stake concentration coefficient is **18**: the minimum ranked validator count controlling at least 33% of activated stake.

| Rank | Identity | Stake (SOL) | Share | Commission | Status |
|---:|---|---:|---:|---:|---|
| 1 | `Fd7btgySsrjuo25CJCj7oE7VPMyezDhnx7pZkj2v69Nk` | 16,984,006 | 3.92% | 7% | Current |
| 2 | `HEL1USMZKAL2odpNBj2oCjffnFGaYwmbGmyewGv1e2TU` | 16,032,941 | 3.70% | 0% | Current |
| 3 | `DRpbCBMxVnDK7maPM5tGv6MvB3v1sRMC86PZ8okm21hy` | 12,211,671 | 2.82% | 0% | Current |
| 4 | `JUPiTERrZqgf1jUyR7dSkhMx4Kn2qJyekWsg3LT1h4b` | 11,728,738 | 2.71% | 5% | Current |
| 5 | `C8Bey3LKVJHVqN6xPTeW8WJfUgFQAeGNBpT4Rp99JP1k` | 9,165,202 | 2.11% | 7% | Current |
| 6 | `CAo1dCGYrB6NhHh5xb1cGjUiu86iyCfMTENxgHumSve4` | 8,876,408 | 2.05% | 10% | Current |
| 7 | `E1r4Psq84tHfQ6aPTvvDka4U3u8zPVD7gEUrH25RdxHL` | 8,480,578 | 1.96% | 0% | Current |
| 8 | `EvnRmnMrd69kFdbLMxWkTn1icZ7DCceRhvmb2SJXqDo4` | 7,930,731 | 1.83% | 7% | Current |
| 9 | `9eGrDohdNTAo61DRHyfMuqKWXqYnA3i254Wiszxe8FoY` | 7,359,446 | 1.70% | 5% | Current |
| 10 | `Awes4Tr6TX8JDzEhCZY2QVNimT6iD1zWHzf1vNyGvpLM` | 6,568,551 | 1.52% | 0% | Current |

## Economy

| Metric | Value | Provenance |
|---|---:|---|
| SOL price | 95.94 USD | live · CoinGecko |
| DeFi TVL | 5.61B USD | live · DefiLlama |
| Stablecoin supply | 15.72B USD | live · DefiLlama Stablecoins |
| DEX volume · 24h | 2.94B USD | live · DefiLlama DEX |
| Application fees · 24h | 12.65M USD | live · DefiLlama Fees |
| Median priority fee | 0.00 micro-lamports/CU | derived · Solana RPC · getRecentPrioritizationFees |
| Daily active addresses | 686,004.00 addresses | derived · Solana Data · Allium, Blockworks, Dune, RWA |
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
