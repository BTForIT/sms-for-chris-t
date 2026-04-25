// ICAO 5×5 risk matrix: severity (rows) × likelihood (cols)
// Returns a risk score 1–25 and a colour tier.

const SEVERITY_SCORE: Record<string, number> = {
  Negligible: 1,
  Minor: 2,
  Major: 3,
  Hazardous: 4,
  Catastrophic: 5,
};

const LIKELIHOOD_SCORE: Record<string, number> = {
  ExtremelyImprobable: 1,
  Improbable: 2,
  Remote: 3,
  Probable: 4,
  Frequent: 5,
};

export function riskScore(severity: string, likelihood: string): number {
  return (SEVERITY_SCORE[severity] ?? 1) * (LIKELIHOOD_SCORE[likelihood] ?? 1);
}

export function riskLevel(score: number): "low" | "medium" | "high" | "critical" {
  if (score <= 4) return "low";
  if (score <= 9) return "medium";
  if (score <= 16) return "high";
  return "critical";
}

const LEVEL_STYLES = {
  low: "bg-green-100 text-green-800 border border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border border-yellow-200",
  high: "bg-orange-100 text-orange-800 border border-orange-200",
  critical: "bg-red-100 text-red-800 border border-red-200",
};

const LEVEL_LABELS = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

interface RiskBadgeProps {
  severity: string;
  likelihood: string;
}

export function RiskBadge({ severity, likelihood }: RiskBadgeProps) {
  const score = riskScore(severity, likelihood);
  const level = riskLevel(score);
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${LEVEL_STYLES[level]}`}
    >
      {LEVEL_LABELS[level]}
      <span className="opacity-60">({score})</span>
    </span>
  );
}

interface SeverityBadgeProps {
  value: string;
}
export function SeverityBadge({ value }: SeverityBadgeProps) {
  const colours: Record<string, string> = {
    Negligible: "bg-slate-100 text-slate-700",
    Minor: "bg-blue-100 text-blue-700",
    Major: "bg-yellow-100 text-yellow-700",
    Hazardous: "bg-orange-100 text-orange-700",
    Catastrophic: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${colours[value] ?? "bg-slate-100 text-slate-700"}`}
    >
      {value}
    </span>
  );
}

interface StatusBadgeProps {
  status: string;
}
export function StatusBadge({ status }: StatusBadgeProps) {
  const colours: Record<string, string> = {
    Open: "bg-blue-100 text-blue-700",
    UnderReview: "bg-yellow-100 text-yellow-700",
    Closed: "bg-green-100 text-green-700",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${colours[status] ?? "bg-slate-100 text-slate-700"}`}
    >
      {status === "UnderReview" ? "Under Review" : status}
    </span>
  );
}
