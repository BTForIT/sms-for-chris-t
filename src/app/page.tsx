import Link from "next/link";
import { db } from "@/lib/db";
import { KPICard } from "@/components/dashboard/KPICard";
import { RiskBadge, StatusBadge } from "@/components/reports/RiskBadge";
import { riskScore, riskLevel } from "@/components/reports/RiskBadge";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [reports, diagnoses, actions] = await Promise.all([
    db.report.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    db.diagnosis.count(),
    db.correctiveAction.count({ where: { status: "Open" } }),
  ]);

  const openReports = reports.filter((r) => r.status === "Open").length;
  const highRiskReports = reports.filter((r) => {
    const score = riskScore(r.severity, r.likelihood);
    const level = riskLevel(score);
    return level === "high" || level === "critical";
  }).length;

  const recentReports = reports.slice(0, 8);

  // Category breakdown
  const categoryCounts: Record<string, number> = {};
  for (const r of reports) {
    categoryCounts[r.category] = (categoryCounts[r.category] ?? 0) + 1;
  }
  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return (
    <div className="px-6 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Safety Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview for the Accountable Executive</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPICard
          label="Open Reports"
          value={openReports}
          sub={`${reports.length} total`}
          colour={openReports > 0 ? "orange" : "green"}
        />
        <KPICard
          label="High / Critical Risk"
          value={highRiskReports}
          sub="requires attention"
          colour={highRiskReports > 0 ? "red" : "green"}
        />
        <KPICard
          label="Open Corrective Actions"
          value={actions}
          sub="across all reports"
          colour={actions > 0 ? "orange" : "green"}
        />
        <KPICard
          label="Diagnoses Complete"
          value={diagnoses}
          sub={`of ${reports.length} reports`}
          colour="blue"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent reports */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Recent Reports</h2>
            <Link href="/reports" className="text-sm text-blue-600 hover:underline">
              View all
            </Link>
          </div>
          {recentReports.length === 0 ? (
            <div className="px-5 py-10 text-center text-slate-400">
              No reports yet.{" "}
              <Link href="/reports/new" className="text-blue-600 hover:underline">
                Submit the first one.
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {recentReports.map((report) => (
                <li key={report.id} className="flex items-center gap-4 px-5 py-3">
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/reports/${report.id}`}
                      className="text-sm font-medium text-slate-800 hover:text-blue-600 truncate block"
                    >
                      {report.title}
                    </Link>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {report.category.replace(/([A-Z])/g, " $1").trim()} ·{" "}
                      {new Date(report.occurredAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <RiskBadge severity={report.severity} likelihood={report.likelihood} />
                    <StatusBadge status={report.status} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Category breakdown */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">By Category</h2>
          </div>
          {topCategories.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-slate-400">No data</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {topCategories.map(([cat, count]) => (
                <li key={cat} className="flex items-center justify-between px-5 py-3">
                  <span className="text-sm text-slate-700">
                    {cat.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">{count}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="px-5 py-4 border-t border-slate-100">
            <Link
              href="/insights"
              className="text-sm text-blue-600 hover:underline"
            >
              View AI Insights →
            </Link>
          </div>
        </div>
      </div>

      {/* Quick action */}
      {reports.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="text-lg font-semibold text-slate-700">Welcome to Aviation Safety Inspector</p>
          <p className="mt-2 text-slate-500">
            Submit your first safety report to get started. The AI will extract and structure the
            details in seconds.
          </p>
          <Link
            href="/reports/new"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Submit First Report
          </Link>
        </div>
      )}
    </div>
  );
}
