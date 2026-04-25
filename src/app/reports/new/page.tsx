import { ReportForm } from "@/components/reports/ReportForm";

export default function NewReportPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">New Safety Report</h1>
        <p className="mt-1 text-slate-500">
          Describe the incident in plain English — the AI will extract and structure the details.
        </p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <ReportForm />
      </div>
    </div>
  );
}
