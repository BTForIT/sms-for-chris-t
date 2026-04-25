import { db } from "@/lib/db";
import { Matrix } from "@/components/risk-matrix/Matrix";

export const dynamic = "force-dynamic";

export default async function RiskMatrixPage() {
  const reports = await db.report.findMany({
    select: { id: true, title: true, severity: true, likelihood: true, occurredAt: true },
    orderBy: { createdAt: "desc" },
  });

  const serialized = reports.map((r) => ({
    ...r,
    occurredAt: r.occurredAt.toISOString(),
  }));

  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Risk Matrix</h1>
        <p className="text-slate-500 mt-1">
          ICAO 5×5 risk matrix — click any cell to see reports at that risk level.
        </p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Severity →
          </span>
          <span className="text-xs text-slate-400">(rows) &nbsp;&nbsp; Likelihood → (columns)</span>
        </div>
        <Matrix reports={serialized} />
      </div>
    </div>
  );
}
