import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { RiskBadge, SeverityBadge, StatusBadge } from "@/components/reports/RiskBadge";
import { DiagnoseButton } from "./DiagnoseButton";
import type { RootCause, WhyStep, SimilarEvent } from "@/lib/ai";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ReportDetailPage({ params }: Props) {
  const { id } = await params;

  const report = await db.report.findUnique({
    where: { id },
    include: {
      diagnosis: { include: { correctiveActions: true } },
    },
  });

  if (!report) notFound();

  const rootCauses: RootCause[] = report.diagnosis
    ? JSON.parse(report.diagnosis.rootCauses)
    : [];
  const fiveWhys: WhyStep[] = report.diagnosis
    ? JSON.parse(report.diagnosis.fiveWhys)
    : [];
  const similarEvents: SimilarEvent[] = report.diagnosis
    ? JSON.parse(report.diagnosis.similarEvents)
    : [];

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div>
        <Link href="/reports" className="text-sm text-slate-500 hover:text-slate-700">
          ← All Reports
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">{report.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <StatusBadge status={report.status} />
          <SeverityBadge value={report.severity} />
          <RiskBadge severity={report.severity} likelihood={report.likelihood} />
          <span className="text-sm text-slate-500">
            {report.category.replace(/([A-Z])/g, " $1").trim()}
          </span>
          <span className="text-sm text-slate-400">·</span>
          <span className="text-sm text-slate-500">
            Occurred: {new Date(report.occurredAt).toLocaleDateString()}
          </span>
          {report.isAnonymous && (
            <span className="text-sm text-slate-400">(anonymous)</span>
          )}
        </div>
      </div>

      {/* Description */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-3">
          Description
        </h2>
        <p className="text-slate-800 leading-relaxed">{report.description}</p>

        <details className="mt-4">
          <summary className="text-xs text-slate-400 cursor-pointer hover:text-slate-600">
            View original report text
          </summary>
          <p className="mt-2 text-sm text-slate-600 bg-slate-50 rounded-lg p-3 whitespace-pre-wrap">
            {report.rawText}
          </p>
        </details>
      </section>

      {/* Diagnosis */}
      {report.diagnosis ? (
        <div className="space-y-6">
          {/* Root Causes */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-4">
              Root Cause Analysis
            </h2>
            <div className="space-y-3">
              {rootCauses.map((rc, i) => (
                <div key={i} className="rounded-lg bg-slate-50 border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 mb-1">
                    {rc.category}
                  </p>
                  <p className="text-sm text-slate-700">{rc.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 5 Whys */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-4">
              5 Whys Analysis
            </h2>
            <ol className="space-y-3">
              {fiveWhys.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{step.question}</p>
                    <p className="text-sm text-slate-600 mt-0.5">{step.answer}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Similar Events */}
          {similarEvents.length > 0 && (
            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-1">
                Similar Past Events
              </h2>
              <p className="text-xs text-slate-400 mb-4">Illustrative examples for context</p>
              <div className="space-y-3">
                {similarEvents.map((ev, i) => (
                  <div key={i} className="rounded-lg bg-amber-50 border border-amber-200 p-4">
                    <p className="text-sm text-slate-700">{ev.description}</p>
                    <p className="text-xs text-amber-700 mt-1 font-medium">
                      Similarity: {ev.similarity}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Corrective Actions */}
          {report.diagnosis.correctiveActions.length > 0 && (
            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-4">
                Recommended Corrective Actions
              </h2>
              <ul className="space-y-2">
                {report.diagnosis.correctiveActions.map((action) => (
                  <li key={action.id} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center">
                      ✓
                    </span>
                    <p className="text-sm text-slate-700">{action.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      ) : (
        <section className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
          <p className="text-slate-500 mb-4">
            No AI diagnosis yet. Run a diagnosis to get root cause analysis, 5 Whys, and corrective
            action recommendations.
          </p>
          <DiagnoseButton reportId={report.id} />
        </section>
      )}
    </div>
  );
}
