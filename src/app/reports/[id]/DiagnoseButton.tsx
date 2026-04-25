"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DiagnoseButton({ reportId }: { reportId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDiagnose() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/reports/${reportId}/diagnose`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Diagnosis failed");
      router.refresh();
    } catch {
      setError("Diagnosis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleDiagnose}
        disabled={loading}
        className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Running AI Diagnosis…" : "Run AI Diagnosis"}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
