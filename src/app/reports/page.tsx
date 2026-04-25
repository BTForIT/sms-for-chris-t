import Link from "next/link";
import { db } from "@/lib/db";
import { RiskBadge, StatusBadge, SeverityBadge } from "@/components/reports/RiskBadge";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const reports = await db.report.findMany({
    orderBy: { createdAt: "desc" },
    include: { diagnosis: { select: { id: true } } },
  });

  return (
    <div className="px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Safety Reports</h1>
          <p className="text-slate-500 mt-1">{reports.length} total reports</p>
        </div>
        <Link
          href="/reports/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          + New Report
        </Link>
      </div>

      {reports.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-500 text-lg">No reports yet.</p>
          <Link
            href="/reports/new"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Submit the first report
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Report</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Category</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Severity</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Risk</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Diagnosis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <Link
                      href={`/reports/${report.id}`}
                      className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {report.title}
                    </Link>
                    {report.isAnonymous && (
                      <span className="ml-2 text-xs text-slate-400">anon</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {report.category.replace(/([A-Z])/g, " $1").trim()}
                  </td>
                  <td className="px-4 py-3">
                    <SeverityBadge value={report.severity} />
                  </td>
                  <td className="px-4 py-3">
                    <RiskBadge severity={report.severity} likelihood={report.likelihood} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={report.status} />
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(report.occurredAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    {report.diagnosis ? (
                      <span className="text-green-600 text-xs font-medium">Done</span>
                    ) : (
                      <span className="text-slate-400 text-xs">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
