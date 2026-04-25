"use client";

import { useState } from "react";
import type { InsightResult } from "@/lib/ai";

const DIRECTION_ICON: Record<string, string> = {
  up: "↑",
  down: "↓",
  stable: "→",
};
const DIRECTION_COLOUR: Record<string, string> = {
  up: "text-red-600",
  down: "text-green-600",
  stable: "text-slate-500",
};

interface InsightsClientProps {
  initialInsights: InsightResult | null;
  reportCount: number;
}

export function InsightsClient({ initialInsights, reportCount }: InsightsClientProps) {
  const [insights, setInsights] = useState<InsightResult | null>(initialInsights);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/insights");
      if (!res.ok) throw new Error("Failed to load insights");
      const data = await res.json();
      setInsights(data.insights);
    } catch {
      setError("Could not load insights. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!insights || reportCount === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <p className="text-slate-500 text-lg">No data yet.</p>
        <p className="text-slate-400 text-sm mt-1">
          Submit safety reports to enable AI prognosis and trend analysis.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">Based on {reportCount} reports</p>
        <button
          onClick={refresh}
          disabled={loading}
          className="text-sm text-blue-600 hover:underline disabled:opacity-50"
        >
          {loading ? "Refreshing…" : "Refresh AI analysis"}
        </button>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {/* Executive Summary */}
      <section className="rounded-xl border border-blue-200 bg-blue-50 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-2">
          Executive Summary
        </h2>
        <p className="text-slate-800 leading-relaxed">{insights.summary}</p>
      </section>

      {/* Risk Trajectory */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-3">
          Risk Trajectory
        </h2>
        <p className="text-slate-800">{insights.riskTrajectory}</p>
      </section>

      {/* Trending Categories */}
      {insights.trendingCategories.length > 0 && (
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-4">
            Trending Hazard Categories
          </h2>
          <ul className="space-y-3">
            {insights.trendingCategories.map((tc, i) => (
              <li key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div>
                  <span className="text-sm font-medium text-slate-800">
                    {tc.category.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">{tc.change}</span>
                  <span className={`text-lg font-bold ${DIRECTION_COLOUR[tc.direction]}`}>
                    {DIRECTION_ICON[tc.direction]}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Seasonal Patterns */}
      {insights.seasonalPatterns.length > 0 && (
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-4">
            Seasonal Patterns
          </h2>
          <ul className="space-y-2">
            {insights.seasonalPatterns.map((pattern, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center">
                  !
                </span>
                <p className="text-sm text-slate-700">{pattern}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Overdue Warnings */}
      {insights.overdueWarnings.length > 0 && (
        <section className="rounded-xl border border-red-200 bg-red-50 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-red-700 mb-4">
            Overdue Warnings
          </h2>
          <ul className="space-y-2">
            {insights.overdueWarnings.map((warning, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-0.5 text-red-500 font-bold">⚠</span>
                <p className="text-sm text-red-800">{warning}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
