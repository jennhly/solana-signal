# Solana Signal — Ecosystem Report

Generated: `2026-10-14T11:48:50.296085Z` · Health: **Healthy** · Schema: `1.0.0`

## Executive signal

- Throughput: **1,294.05 TPS**
- Average slot time: **0.21 seconds**
- Active / delinquent validators: **673 / 5**
- SOL price: **107.08 USD** (0.40 % over 24h)
- DeFi TVL: **6.05B USD** · DEX volume: **2.50B USD**

## Network

| Metric | Value | Provenance |
|---|---:|---|
| TPS | 1,294.05 TPS | live · Solana RPC · getRecentPerformanceSamples |
| Slot time | 0.21 seconds | live · Solana RPC · getRecentPerformanceSamples |
| Block height | 434.86M blocks | live · Solana RPC · getBlockHeight |
| Epoch | 1,057 | live · Solana RPC · getEpochInfo |
| Epoch progress | 47.09 % | live · Solana RPC · getEpochInfo |
| SOL supply | 635.78M SOL | live · Solana RPC · getSupply |

## Validator health

The stake concentration coefficient is **18**: the minimum ranked validator count controlling at least 33% of activated stake.

| Rank | Identity | Stake (SOL) | Share | Commission | Status |
|---:|---|---:|---:|---:|---|
| 1 | `Fd7btgySsrjuo25CJCj7oE7VPMyezDhnx7pZkj2v69Nk` | 17,794,097 | 4.06% | 7% | Current |
| 2 | `HEL1USMZKAL2odpNBj2oCjffnFGaYwmbGmyewGv1e2TU` | 15,830,160 | 3.61% | 0% | Current |
| 3 | `DRpbCBMxVnDK7maPM5tGv6MvB3v1sRMC86PZ8okm21hy` | 12,313,027 | 2.81% | 0% | Current |
| 4 | `E1r4Psq84tHfQ6aPTvvDka4U3u8zPVD7gEUrH25RdxHL` | 11,142,984 | 2.54% | 0% | Current |
| 5 | `JUPiTERrZqgf1jUyR7dSkhMx4Kn2qJyekWsg3LT1h4b` | 10,763,192 | 2.46% | 5% | Current |
| 6 | `CAo1dCGYrB6NhHh5xb1cGjUiu86iyCfMTENxgHumSve4` | 9,407,225 | 2.15% | 10% | Current |
| 7 | `C8Bey3LKVJHVqN6xPTeW8WJfUgFQAeGNBpT4Rp99JP1k` | 9,240,434 | 2.11% | 7% | Current |
| 8 | `EvnRmnMrd69kFdbLMxWkTn1icZ7DCceRhvmb2SJXqDo4` | 7,700,931 | 1.76% | 7% | Current |
| 9 | `9eGrDohdNTAo61DRHyfMuqKWXqYnA3i254Wiszxe8FoY` | 6,906,931 | 1.58% | 5% | Current |
| 10 | `JD549HsbJHeEKKUrKgg4Fj2iyv2RGjsV7NTZjZUrHybB` | 6,638,868 | 1.52% | 0% | Current |

## Economy

| Metric | Value | Provenance |
|---|---:|---|
| SOL price | 107.08 USD | live · CoinGecko |
| DeFi TVL | 6.05B USD | live · DefiLlama |
| Stablecoin supply | 15.85B USD | live · DefiLlama Stablecoins |
| DEX volume · 24h | 2.50B USD | live · DefiLlama DEX |
| Application fees · 24h | 11.65M USD | live · DefiLlama Fees |
| Median priority fee | 0.00 micro-lamports/CU | derived · Solana RPC · getRecentPrioritizationFees |
| Daily active addresses | 760,007 addresses | derived · Solana Data · Allium, Artemis, Blockworks, Dune, Goldsky, RWA, Top Ledger |
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
