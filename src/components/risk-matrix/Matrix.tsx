"use client";

import { useState } from "react";
import Link from "next/link";
import { riskScore, riskLevel } from "@/components/reports/RiskBadge";

const SEVERITIES = ["Catastrophic", "Hazardous", "Major", "Minor", "Negligible"] as const;
const LIKELIHOODS = [
  "ExtremelyImprobable",
  "Improbable",
  "Remote",
  "Probable",
  "Frequent",
] as const;

const LIKELIHOOD_LABELS: Record<string, string> = {
  ExtremelyImprobable: "Extremely\nImprobable",
  Improbable: "Improbable",
  Remote: "Remote",
  Probable: "Probable",
  Frequent: "Frequent",
};

type Report = {
  id: string;
  title: string;
  severity: string;
  likelihood: string;
  occurredAt: string;
};

const CELL_COLOURS = {
  low: "bg-green-100 hover:bg-green-200 border-green-200",
  medium: "bg-yellow-100 hover:bg-yellow-200 border-yellow-200",
  high: "bg-orange-100 hover:bg-orange-200 border-orange-200",
  critical: "bg-red-100 hover:bg-red-200 border-red-200",
};

interface MatrixProps {
  reports: Report[];
}

export function Matrix({ reports }: MatrixProps) {
  const [selected, setSelected] = useState<{ severity: string; likelihood: string } | null>(null);

  const reportsInCell = selected
    ? reports.filter(
        (r) => r.severity === selected.severity && r.likelihood === selected.likelihood
      )
    : [];

  return (
    <div className="space-y-6">
      {/* Matrix grid */}
      <div className="overflow-x-auto">
        <table className="border-collapse">
          <thead>
            <tr>
              <th className="w-28" />
              {LIKELIHOODS.map((l) => (
                <th
                  key={l}
                  className="w-28 px-2 py-2 text-center text-xs font-semibold text-slate-600 whitespace-pre-line"
                >
                  {LIKELIHOOD_LABELS[l]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SEVERITIES.map((sev) => (
              <tr key={sev}>
                <td className="pr-3 py-1 text-right text-xs font-semibold text-slate-600 w-28">
                  {sev}
                </td>
                {LIKELIHOODS.map((lik) => {
                  const score = riskScore(sev, lik);
                  const level = riskLevel(score);
                  const cellReports = reports.filter(
                    (r) => r.severity === sev && r.likelihood === lik
                  );
                  const isSelected =
                    selected?.severity === sev && selected?.likelihood === lik;

                  return (
                    <td key={lik} className="p-1">
                      <button
                        onClick={() =>
                          setSelected(isSelected ? null : { severity: sev, likelihood: lik })
                        }
                        className={`w-24 h-16 rounded-lg border text-center flex flex-col items-center justify-center transition-colors ${
                          CELL_COLOURS[level]
                        } ${isSelected ? "ring-2 ring-offset-1 ring-slate-600" : ""}`}
                      >
                        <span className="text-xs font-bold text-slate-600">{score}</span>
                        {cellReports.length > 0 && (
                          <span className="mt-1 rounded-full bg-slate-700 text-white text-xs px-2 py-0.5 font-semibold">
                            {cellReports.length}
                          </span>
                        )}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-xs">
        {(["low", "medium", "high", "critical"] as const).map((l) => (
          <div key={l} className="flex items-center gap-1.5">
            <div
              className={`w-4 h-4 rounded border ${CELL_COLOURS[l].split(" ")[0]} ${CELL_COLOURS[l].split(" ")[2]}`}
            />
            <span className="capitalize text-slate-600">{l}</span>
          </div>
        ))}
        <span className="text-slate-400 ml-2">Number = ICAO risk score (severity × likelihood)</span>
      </div>

      {/* Drill-down panel */}
      {selected && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-3">
            {selected.severity} × {selected.likelihood.replace(/([A-Z])/g, " $1").trim()}
          </h3>
          {reportsInCell.length === 0 ? (
            <p className="text-sm text-slate-400">No reports at this risk level.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {reportsInCell.map((r) => (
                <li key={r.id} className="py-2.5 flex items-center justify-between">
                  <Link
                    href={`/reports/${r.id}`}
                    className="text-sm text-blue-600 hover:underline font-medium"
                  >
                    {r.title}
                  </Link>
                  <span className="text-xs text-slate-400">
                    {new Date(r.occurredAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
