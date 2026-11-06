# Solana Signal — Ecosystem Report

Generated: `2026-11-06T06:38:56.053918Z` · Health: **Healthy** · Schema: `1.0.0`

## Executive signal

- Throughput: **1,452.93 TPS**
- Average slot time: **0.22 seconds**
- Active / delinquent validators: **663 / 31**
- SOL price: **89.78 USD** (-6.39 % over 24h)
- DeFi TVL: **5.29B USD** · DEX volume: **2.18B USD**

## Network

| Metric | Value | Provenance |
|---|---:|---|
| TPS | 1,452.93 TPS | live · Solana RPC · getRecentPerformanceSamples |
| Slot time | 0.22 seconds | live · Solana RPC · getRecentPerformanceSamples |
| Block height | 444.03M blocks | live · Solana RPC · getBlockHeight |
| Epoch | 1,078 | live · Solana RPC · getEpochInfo |
| Epoch progress | 73.01 % | live · Solana RPC · getEpochInfo |
| SOL supply | 637.07M SOL | live · Solana RPC · getSupply |

## Validator health

The stake concentration coefficient is **17**: the minimum ranked validator count controlling at least 33% of activated stake.

| Rank | Identity | Stake (SOL) | Share | Commission | Status |
|---:|---|---:|---:|---:|---|
| 1 | `Fd7btgySsrjuo25CJCj7oE7VPMyezDhnx7pZkj2v69Nk` | 17,063,613 | 3.96% | 7% | Current |
| 2 | `HEL1USMZKAL2odpNBj2oCjffnFGaYwmbGmyewGv1e2TU` | 16,736,546 | 3.88% | 0% | Current |
| 3 | `DRpbCBMxVnDK7maPM5tGv6MvB3v1sRMC86PZ8okm21hy` | 13,020,024 | 3.02% | 0% | Current |
| 4 | `E1r4Psq84tHfQ6aPTvvDka4U3u8zPVD7gEUrH25RdxHL` | 10,434,901 | 2.42% | 0% | Current |
| 5 | `JUPiTERkf97eKN222JwY7bkpWuJnwqKtT44fsbJfhkr` | 9,530,733 | 2.21% | 5% | Current |
| 6 | `7jtWrBuj9k2E5RnoHGWSBosBwqwjZMvEnhe9qGLJdhT4` | 9,459,109 | 2.20% | 10% | Current |
| 7 | `C8Bey3LKVJHVqN6xPTeW8WJfUgFQAeGNBpT4Rp99JP1k` | 9,222,692 | 2.14% | 7% | Current |
| 8 | `EvnRmnMrd69kFdbLMxWkTn1icZ7DCceRhvmb2SJXqDo4` | 7,860,096 | 1.82% | 7% | Current |
| 9 | `Awes4Tr6TX8JDzEhCZY2QVNimT6iD1zWHzf1vNyGvpLM` | 6,991,477 | 1.62% | 0% | Current |
| 10 | `JD549HsbJHeEKKUrKgg4Fj2iyv2RGjsV7NTZjZUrHybB` | 6,293,076 | 1.46% | 0% | Current |

## Economy

| Metric | Value | Provenance |
|---|---:|---|
| SOL price | 89.78 USD | live · CoinGecko |
| DeFi TVL | 5.29B USD | live · DefiLlama |
| Stablecoin supply | 14.51B USD | live · DefiLlama Stablecoins |
| DEX volume · 24h | 2.18B USD | live · DefiLlama DEX |
| Application fees · 24h | 9.79M USD | live · DefiLlama Fees |
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
