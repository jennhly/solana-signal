import { collectLiveReport } from "@/lib/live-report";

export const dynamic = "force-dynamic";

export async function GET() {
  const report = await collectLiveReport();
  return Response.json(report, {
    headers: {
      "cache-control": "public, max-age=30, s-maxage=120, stale-while-revalidate=300",
      "access-control-allow-origin": "*",
    },
  });
}
