export type MetricStatus = "live" | "derived" | "curated" | "unavailable";

export interface Metric {
  value: number | string | null;
  unit?: string;
  change24h?: number | null;
  status: MetricStatus;
  source: string;
  note?: string;
}

export interface ValidatorRow {
  identity: string;
  voteAccount: string;
  activatedStake: number;
  sharePct: number;
  commission: number;
  delinquent: boolean;
  name?: string;
}

export interface Alert {
  id: string;
  severity: "info" | "watch" | "critical";
  metric: string;
  message: string;
  observed: string;
  rule: string;
}

export interface Upgrade {
  name: string;
  status: string;
  timing: string;
  impact: string;
  href: string;
}

export interface NewsItem {
  title: string;
  date: string;
  category: string;
  href: string;
}

export interface EcosystemReport {
  schemaVersion: string;
  generatedAt: string;
  freshnessSeconds: number;
  health: "healthy" | "degraded" | "unavailable";
  network: {
    tps: Metric;
    slotTime: Metric;
    blockHeight: Metric;
    epoch: Metric;
    epochProgress: Metric;
    supply: Metric;
  };
  validators: {
    active: Metric;
    delinquent: Metric;
    activeStake: Metric;
    delinquentStakePct: Metric;
    nakamotoCoefficient: Metric;
    top: ValidatorRow[];
  };
  markets: {
    solPrice: Metric;
    solChange24h: Metric;
    tvl: Metric;
    stablecoinSupply: Metric;
    dexVolume24h: Metric;
    protocolRevenue24h: Metric;
    medianPriorityFee: Metric;
    dailyActiveAddresses: Metric;
    tokenizedAssets: Metric;
  };
  history: Array<{ label: string; tps: number; slotTime: number }>;
  alerts: Alert[];
  upgrades: Upgrade[];
  news: NewsItem[];
  sources: Array<{ name: string; href: string; status: string }>;
  errors: string[];
}
