# Solana Signal — Ecosystem Report

Generated: `2026-08-27T22:14:57.590694Z` · Health: **Healthy** · Schema: `1.0.0`

## Executive signal

- Throughput: **2,594.57 TPS**
- Average slot time: **0.36 seconds**
- Active / delinquent validators: **686 / 11**
- SOL price: **109.64 USD** (10.90 % over 24h)
- DeFi TVL: **5.96B USD** · DEX volume: **2.35B USD**

## Network

| Metric | Value | Provenance |
|---|---:|---|
| TPS | 2,594.57 TPS | live · Solana RPC · getRecentPerformanceSamples |
| Slot time | 0.36 seconds | live · Solana RPC · getRecentPerformanceSamples |
| Block height | 420.25M blocks | live · Solana RPC · getBlockHeight |
| Epoch | 1,023 | live · Solana RPC · getEpochInfo |
| Epoch progress | 60.89 % | live · Solana RPC · getEpochInfo |
| SOL supply | 632.97M SOL | live · Solana RPC · getSupply |

## Validator health

The stake concentration coefficient is **18**: the minimum ranked validator count controlling at least 33% of activated stake.

| Rank | Identity | Stake (SOL) | Share | Commission | Status |
|---:|---|---:|---:|---:|---|
| 1 | `Fd7btgySsrjuo25CJCj7oE7VPMyezDhnx7pZkj2v69Nk` | 17,062,869 | 3.91% | 7% | Current |
| 2 | `HEL1USMZKAL2odpNBj2oCjffnFGaYwmbGmyewGv1e2TU` | 16,029,433 | 3.67% | 0% | Current |
| 3 | `DRpbCBMxVnDK7maPM5tGv6MvB3v1sRMC86PZ8okm21hy` | 12,314,379 | 2.82% | 0% | Current |
| 4 | `JUPiTERrZqgf1jUyR7dSkhMx4Kn2qJyekWsg3LT1h4b` | 11,751,683 | 2.69% | 5% | Current |
| 5 | `C8Bey3LKVJHVqN6xPTeW8WJfUgFQAeGNBpT4Rp99JP1k` | 9,216,852 | 2.11% | 7% | Current |
| 6 | `E1r4Psq84tHfQ6aPTvvDka4U3u8zPVD7gEUrH25RdxHL` | 9,051,084 | 2.07% | 0% | Current |
| 7 | `CAo1dCGYrB6NhHh5xb1cGjUiu86iyCfMTENxgHumSve4` | 8,904,595 | 2.04% | 10% | Current |
| 8 | `EvnRmnMrd69kFdbLMxWkTn1icZ7DCceRhvmb2SJXqDo4` | 7,849,682 | 1.80% | 7% | Current |
| 9 | `9eGrDohdNTAo61DRHyfMuqKWXqYnA3i254Wiszxe8FoY` | 7,301,740 | 1.67% | 5% | Current |
| 10 | `Awes4Tr6TX8JDzEhCZY2QVNimT6iD1zWHzf1vNyGvpLM` | 6,578,261 | 1.51% | 0% | Current |

## Economy

| Metric | Value | Provenance |
|---|---:|---|
| SOL price | 109.64 USD | live · CoinGecko |
| DeFi TVL | 5.96B USD | live · DefiLlama |
| Stablecoin supply | 15.88B USD | live · DefiLlama Stablecoins |
| DEX volume · 24h | 2.35B USD | live · DefiLlama DEX |
| Application fees · 24h | 15.17M USD | live · DefiLlama Fees |
| Median priority fee | 0.00 micro-lamports/CU | derived · Solana RPC · getRecentPrioritizationFees |
| Daily active addresses | 743,452 addresses | derived · Solana Data · Allium, Dune, Goldsky |
| Tokenized assets | 2.80B USD | curated · Solana Ecosystem Roundup · May 2026 |

## Alerts

- **WATCH · SOL price — 10.9% / 24h**: SOL moved beyond the configured daily threshold. Rule: `|24h change| > 10%`

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
