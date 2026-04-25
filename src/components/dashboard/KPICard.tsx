interface KPICardProps {
  label: string;
  value: string | number;
  sub?: string;
  colour?: "default" | "red" | "orange" | "green" | "blue";
}

const COLOURS = {
  default: "bg-white border-slate-200",
  red: "bg-red-50 border-red-200",
  orange: "bg-orange-50 border-orange-200",
  green: "bg-green-50 border-green-200",
  blue: "bg-blue-50 border-blue-200",
};

const VALUE_COLOURS = {
  default: "text-slate-900",
  red: "text-red-700",
  orange: "text-orange-700",
  green: "text-green-700",
  blue: "text-blue-700",
};

export function KPICard({ label, value, sub, colour = "default" }: KPICardProps) {
  return (
    <div className={`rounded-xl border p-5 shadow-sm ${COLOURS[colour]}`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`mt-2 text-3xl font-bold ${VALUE_COLOURS[colour]}`}>{value}</p>
      {sub && <p className="mt-1 text-sm text-slate-400">{sub}</p>}
    </div>
  );
}
