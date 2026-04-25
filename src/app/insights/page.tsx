import { db } from "@/lib/db";
import { generateInsights } from "@/lib/ai";
import { InsightsClient } from "./InsightsClient";

export const dynamic = "force-dynamic";

export default async function InsightsPage() {
  const reports = await db.report.findMany({
    select: { category: true, severity: true, likelihood: true, occurredAt: true, title: true },
    orderBy: { occurredAt: "desc" },
    take: 100,
  });

  const summaries = reports.map((r) => ({
    category: r.category,
    severity: r.severity,
    likelihood: r.likelihood,
    occurredAt: r.occurredAt.toISOString().split("T")[0],
    title: r.title,
  }));

  const insights = reports.length > 0 ? await generateInsights(summaries) : null;

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">AI Insights</h1>
        <p className="text-slate-500 mt-1">
          Trend analysis, risk trajectory, and seasonal predictions powered by Claude.
        </p>
      </div>
      <InsightsClient initialInsights={insights} reportCount={reports.length} />
    </div>
  );
}
