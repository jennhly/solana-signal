import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://solana-signal.jenniferjune24.chatgpt.site"),
  title: "Solana Signal — Ecosystem Intelligence",
  description:
    "A transparent, keyless Solana ecosystem monitor with live RPC metrics, validator intelligence, markets, alerts, and machine-readable reports.",
  openGraph: {
    title: "Solana Signal",
    description: "The Solana ecosystem, reduced to signal.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
