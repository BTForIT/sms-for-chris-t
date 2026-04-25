import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateInsights } from "@/lib/ai";

export const dynamic = "force-dynamic";

// GET /api/insights
export async function GET() {
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

  const insights = await generateInsights(summaries);
  return NextResponse.json({ insights });
}
