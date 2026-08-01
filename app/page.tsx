import type { Metadata } from "next";
import Dashboard from "@/components/Dashboard";
import seedReport from "@/public/data/latest.json";
import type { EcosystemReport } from "@/lib/types";

export const metadata: Metadata = {
  title: "Solana Signal — Ecosystem Intelligence",
  description:
    "A keyless, auto-updating view of Solana network health, validators, markets, activity, and protocol upgrades.",
};

export default function Home() {
  return <Dashboard seed={seedReport as EcosystemReport} />;
}
