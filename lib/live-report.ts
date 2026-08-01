import seedReport from "@/public/data/latest.json";
import type { Alert, EcosystemReport, Metric, ValidatorRow } from "@/lib/types";

const RPC_URL = "https://solana-rpc.publicnode.com";

async function jsonFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12_000);
  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
      cache: "no-store",
      headers: { "content-type": "application/json", ...(init?.headers || {}) },
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return (await response.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

async function rpcBatch(requests: Array<{ method: string; params?: unknown[] }>): Promise<Record<string, unknown>> {
  const body = JSON.stringify(requests.map(({ method, params = [] }) => ({ jsonrpc: "2.0", id: method, method, params })));
  const data = await jsonFetch<Array<{ id: string; result?: unknown; error?: { message: string } }>>(RPC_URL, {
    method: "POST",
    body,
  });
  if (!Array.isArray(data)) throw new Error("RPC provider returned a non-batch response");
  const output: Record<string, unknown> = {};
  for (const item of data) {
    if (item.error || item.result === undefined) throw new Error(item.error?.message || `${item.id} returned no result`);
    output[item.id] = item.result;
  }
  return output;
}

async function solPrice(): Promise<{ solana: { usd: number; usd_24h_change: number } }> {
  try {
    return await jsonFetch<{ solana: { usd: number; usd_24h_change: number } }>("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true");
  } catch {
    const now = Math.floor(Date.now() / 1_000);
    const prior = now - 86_400;
    const [current, historical] = await Promise.all([
      jsonFetch<{ coins: Record<string, { price: number }> }>("https://coins.llama.fi/prices/current/coingecko:solana"),
      jsonFetch<{ coins: Record<string, { price: number }> }>(`https://coins.llama.fi/prices/historical/${prior}/coingecko:solana`),
    ]);
    const latestPrice = current.coins["coingecko:solana"].price;
    const priorPrice = historical.coins["coingecko:solana"].price;
    return { solana: { usd: latestPrice, usd_24h_change: ((latestPrice - priorPrice) / priorPrice) * 100 } };
  }
}

const metric = (
  value: Metric["value"],
  source: string,
  unit = "",
  note?: string,
): Metric => ({ value, source, unit, status: "live", note });

const median = (values: number[]) => {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};

type SolanaDataResponse = { rows: Array<{ date: string; metricName: string; providerName: string; value: number }> };

function latestSolanaDataMetric(data: SolanaDataResponse, name: string): Metric | null {
  const matching = data.rows.filter((row) => row.metricName === name);
  if (!matching.length) return null;
  const latestDate = matching.reduce((latest, row) => row.date > latest ? row.date : latest, matching[0].date);
  const latestRows = matching.filter((row) => row.date === latestDate);
  const providers = [...new Set(latestRows.map((row) => row.providerName))].sort();
  return {
    value: median(latestRows.map((row) => row.value)),
    unit: "addresses",
    status: "derived",
    source: `Solana Data · ${providers.join(", ")}`,
    note: `Median of ${providers.length} provider observations for ${latestDate}; official endpoint refreshes twice daily with a one-day lag`,
  };
}

type VoteAccount = {
  votePubkey: string;
  nodePubkey: string;
  activatedStake: number;
  commission: number;
};

function validators(current: VoteAccount[], delinquent: VoteAccount[]) {
  const all = [...current, ...delinquent];
  const activeStake = current.reduce((sum, row) => sum + row.activatedStake, 0);
  const totalStake = all.reduce((sum, row) => sum + row.activatedStake, 0);
  const delinquentStake = delinquent.reduce((sum, row) => sum + row.activatedStake, 0);
  const ranked = [...all].sort((a, b) => b.activatedStake - a.activatedStake);
  let cumulative = 0;
  let nakamoto = 0;
  for (const row of ranked) {
    cumulative += row.activatedStake;
    nakamoto += 1;
    if (cumulative >= totalStake * 0.33) break;
  }
  const delinquentSet = new Set(delinquent.map((row) => row.votePubkey));
  const top: ValidatorRow[] = ranked.slice(0, 10).map((row) => ({
    identity: row.nodePubkey,
    voteAccount: row.votePubkey,
    activatedStake: row.activatedStake / 1e9,
    sharePct: totalStake ? (row.activatedStake / totalStake) * 100 : 0,
    commission: row.commission,
    delinquent: delinquentSet.has(row.votePubkey),
  }));
  return { activeStake, totalStake, delinquentStake, nakamoto, top };
}

function makeAlerts(report: EcosystemReport): Alert[] {
  const alerts: Alert[] = [];
  const tps = Number(report.network.tps.value || 0);
  const delinquent = Number(report.validators.delinquentStakePct.value || 0);
  const priceChange = Number(report.markets.solChange24h.value || 0);
  const slotTime = Number(report.network.slotTime.value || 0);
  if (tps && tps < 1_000) alerts.push({ id: "tps-low", severity: "watch", metric: "TPS", observed: `${Math.round(tps)} TPS`, rule: "TPS < 1,000", message: "Throughput is below the operating baseline." });
  if (slotTime > 0.65) alerts.push({ id: "slot-slow", severity: "watch", metric: "Slot time", observed: `${slotTime.toFixed(3)}s`, rule: "slot time > 650ms", message: "Recent slots are materially slower than target." });
  if (delinquent > 2) alerts.push({ id: "stake-delinquent", severity: delinquent > 5 ? "critical" : "watch", metric: "Delinquent stake", observed: `${delinquent.toFixed(2)}%`, rule: "delinquent stake > 2%", message: "A meaningful share of stake is attached to delinquent validators." });
  if (Math.abs(priceChange) > 10) alerts.push({ id: "price-move", severity: "watch", metric: "SOL price", observed: `${priceChange.toFixed(1)}% / 24h`, rule: "|24h change| > 10%", message: "SOL moved beyond the configured daily threshold." });
  if (!alerts.length) alerts.push({ id: "all-clear", severity: "info", metric: "System", observed: "Within thresholds", rule: "all rules evaluated", message: "No configured network or market anomaly is active." });
  return alerts;
}

export async function collectLiveReport(): Promise<EcosystemReport> {
  const seed = structuredClone(seedReport) as EcosystemReport;
  const errors: string[] = [];
  const safe = async <T>(name: string, task: Promise<T>): Promise<T | null> => {
    try { return await task; } catch (error) { errors.push(`${name}: ${error instanceof Error ? error.message : String(error)}`); return null; }
  };

  const [solanaCore, solanaValidators, solanaSupply, price, chains, stablecoins, dex, feeOverview, solanaData] = await Promise.all([
    safe("Solana RPC core", rpcBatch([
      { method: "getSlot" },
      { method: "getBlockHeight" },
      { method: "getEpochInfo" },
      { method: "getRecentPerformanceSamples", params: [8] },
      { method: "getRecentPrioritizationFees" },
    ])),
    safe("Solana RPC validators", rpcBatch([{ method: "getVoteAccounts" }])),
    safe("Solana RPC supply", rpcBatch([{ method: "getSupply" }])),
    safe("SOL price", solPrice()),
    safe("DefiLlama TVL", jsonFetch<Array<{ name: string; tvl: number }>>("https://api.llama.fi/v2/chains")),
    safe("DefiLlama stablecoins", jsonFetch<Array<{ name: string; totalCirculatingUSD: { peggedUSD?: number } }>>("https://stablecoins.llama.fi/stablecoinchains")),
    safe("DefiLlama DEX", jsonFetch<{ total24h?: number }>("https://api.llama.fi/overview/dexs/Solana?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true")),
    safe("DefiLlama fees", jsonFetch<{ total24h?: number }>("https://api.llama.fi/overview/fees/Solana?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true")),
    safe("Solana Data", jsonFetch<SolanaDataResponse>("https://solana.com/api/databricks/data?days=7")),
  ]);

  seed.generatedAt = new Date().toISOString();
  seed.freshnessSeconds = 0;
  seed.errors = errors;
  seed.health = !solanaCore || errors.length > 5 ? "degraded" : "healthy";

  const blockHeight = solanaCore?.getBlockHeight as number | undefined;
  const epoch = solanaCore?.getEpochInfo as { epoch: number; slotIndex: number; slotsInEpoch: number } | undefined;
  const performance = solanaCore?.getRecentPerformanceSamples as Array<{ numTransactions: number; numNonVoteTransactions?: number; samplePeriodSecs: number; numSlots: number }> | undefined;
  const votes = solanaValidators?.getVoteAccounts as { current: VoteAccount[]; delinquent: VoteAccount[] } | undefined;
  const supply = solanaSupply?.getSupply as { value: { total: number } } | undefined;
  const fees = solanaCore?.getRecentPrioritizationFees as Array<{ prioritizationFee: number }> | undefined;

  if (blockHeight !== undefined) seed.network.blockHeight = metric(blockHeight, "Solana RPC · getBlockHeight", "blocks");
  if (epoch) {
    seed.network.epoch = metric(epoch.epoch, "Solana RPC · getEpochInfo");
    seed.network.epochProgress = metric((epoch.slotIndex / epoch.slotsInEpoch) * 100, "Solana RPC · getEpochInfo", "%");
  }
  if (performance?.length) {
    const latest = performance[0];
    const txCount = latest.numNonVoteTransactions ?? latest.numTransactions;
    seed.network.tps = metric(txCount / latest.samplePeriodSecs, "Solana RPC · getRecentPerformanceSamples", "TPS", latest.numNonVoteTransactions === undefined ? "Includes vote transactions" : "Non-vote transactions");
    seed.network.slotTime = metric(latest.samplePeriodSecs / latest.numSlots, "Solana RPC · getRecentPerformanceSamples", "seconds");
    seed.history = performance.slice().reverse().map((sample, index) => ({
      label: `T-${performance.length - index - 1}`,
      tps: (sample.numNonVoteTransactions ?? sample.numTransactions) / sample.samplePeriodSecs,
      slotTime: sample.samplePeriodSecs / sample.numSlots,
    }));
  }
  if (supply) seed.network.supply = metric(supply.value.total / 1e9, "Solana RPC · getSupply", "SOL");
  if (votes) {
    const v = validators(votes.current, votes.delinquent);
    seed.validators.active = metric(votes.current.length, "Solana RPC · getVoteAccounts", "validators");
    seed.validators.delinquent = metric(votes.delinquent.length, "Solana RPC · getVoteAccounts", "validators");
    seed.validators.activeStake = metric(v.activeStake / 1e9, "Solana RPC · getVoteAccounts", "SOL");
    seed.validators.delinquentStakePct = { ...metric(v.totalStake ? (v.delinquentStake / v.totalStake) * 100 : 0, "Solana RPC · derived", "%"), status: "derived" };
    seed.validators.nakamotoCoefficient = { ...metric(v.nakamoto, "Solana RPC · derived", "validators"), status: "derived", note: "Minimum ranked validators controlling ≥33% of activated stake" };
    seed.validators.top = v.top;
  }
  if (fees?.length) seed.markets.medianPriorityFee = { ...metric(median(fees.map((row) => row.prioritizationFee)), "Solana RPC · getRecentPrioritizationFees", "micro-lamports/CU"), status: "derived" };
  if (price?.solana) {
    seed.markets.solPrice = metric(price.solana.usd, "CoinGecko", "USD");
    seed.markets.solChange24h = metric(price.solana.usd_24h_change, "CoinGecko", "%");
  }
  const solanaChain = chains?.find((row) => row.name.toLowerCase() === "solana");
  if (solanaChain) seed.markets.tvl = metric(solanaChain.tvl, "DefiLlama", "USD");
  const solanaStablecoins = stablecoins?.find((row) => row.name.toLowerCase() === "solana");
  if (solanaStablecoins) seed.markets.stablecoinSupply = metric(solanaStablecoins.totalCirculatingUSD.peggedUSD ?? 0, "DefiLlama Stablecoins", "USD");
  if (dex?.total24h) seed.markets.dexVolume24h = metric(dex.total24h, "DefiLlama DEX", "USD");
  if (feeOverview?.total24h) seed.markets.protocolRevenue24h = metric(feeOverview.total24h, "DefiLlama Fees", "USD", "Aggregate application fees; not validator revenue");
  if (solanaData) {
    const addresses = latestSolanaDataMetric(solanaData, "Active Addresses");
    if (addresses) seed.markets.dailyActiveAddresses = addresses;
  }

  seed.alerts = makeAlerts(seed);
  return seed;
}
