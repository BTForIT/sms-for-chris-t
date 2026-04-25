import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { diagnoseReport } from "@/lib/ai";

// POST /api/reports/[id]/diagnose
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const report = await db.report.findUnique({ where: { id } });
  if (!report) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  // If diagnosis already exists, return it
  const existing = await db.diagnosis.findUnique({ where: { reportId: id } });
  if (existing) {
    const withActions = await db.diagnosis.findUnique({
      where: { id: existing.id },
      include: { correctiveActions: true },
    });
    return NextResponse.json({ diagnosis: withActions });
  }

  const result = await diagnoseReport(report);

  const diagnosis = await db.diagnosis.create({
    data: {
      reportId: id,
      rootCauses: JSON.stringify(result.rootCauses),
      fiveWhys: JSON.stringify(result.fiveWhys),
      similarEvents: JSON.stringify(result.similarEvents),
      correctiveActions: {
        create: result.correctiveActions.map((desc) => ({ description: desc })),
      },
    },
    include: { correctiveActions: true },
  });

  return NextResponse.json({ diagnosis }, { status: 201 });
}
