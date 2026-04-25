"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ReportExtraction } from "@/lib/ai";
import { RiskBadge, SeverityBadge } from "./RiskBadge";

const CATEGORIES = ["FlightOps", "Maintenance", "GroundOps", "Weather", "HumanFactors", "Other"];
const SEVERITIES = ["Negligible", "Minor", "Major", "Hazardous", "Catastrophic"];
const LIKELIHOODS = ["ExtremelyImprobable", "Improbable", "Remote", "Probable", "Frequent"];

function ConfidenceWarning({ confidence }: { confidence: number }) {
  if (confidence >= 0.8) return null;
  return (
    <span
      className="ml-1 inline-flex items-center rounded bg-yellow-100 px-1.5 py-0.5 text-xs text-yellow-700"
      title={`Low confidence (${Math.round(confidence * 100)}%) — please review`}
    >
      ⚠ {Math.round(confidence * 100)}%
    </span>
  );
}

interface EditableField {
  value: string;
  confidence: number;
}

interface FormState {
  title: EditableField;
  description: EditableField;
  category: EditableField;
  severity: EditableField;
  likelihood: EditableField;
  occurredAt: EditableField;
  isAnonymous: boolean;
}

export function ReportForm() {
  const router = useRouter();
  const [rawText, setRawText] = useState("");
  const [step, setStep] = useState<"input" | "preview" | "saving">("input");
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState | null>(null);

  async function handleExtract() {
    if (!rawText.trim()) return;
    setIsExtracting(true);
    setError(null);
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText, action: "extract" }),
      });
      if (!res.ok) throw new Error("Extraction failed");
      const data = (await res.json()) as { extraction: ReportExtraction };
      const e = data.extraction;
      setForm({
        title: { value: e.title.value, confidence: e.title.confidence },
        description: { value: e.description.value, confidence: e.description.confidence },
        category: { value: e.category.value, confidence: e.category.confidence },
        severity: { value: e.severity.value, confidence: e.severity.confidence },
        likelihood: { value: e.likelihood.value, confidence: e.likelihood.confidence },
        occurredAt: { value: e.occurredAt.value, confidence: e.occurredAt.confidence },
        isAnonymous: e.isAnonymous.value,
      });
      setStep("preview");
    } catch {
      setError("Could not analyse the report. Please try again.");
    } finally {
      setIsExtracting(false);
    }
  }

  async function handleConfirm() {
    if (!form) return;
    setStep("saving");
    setError(null);
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawText,
          action: "confirm",
          extraction: {
            title: form.title.value,
            description: form.description.value,
            category: form.category.value,
            severity: form.severity.value,
            likelihood: form.likelihood.value,
            occurredAt: form.occurredAt.value,
            isAnonymous: form.isAnonymous,
          },
        }),
      });
      if (!res.ok) throw new Error("Save failed");
      const data = await res.json();
      router.push(`/reports/${data.report.id}`);
    } catch {
      setError("Could not save the report. Please try again.");
      setStep("preview");
    }
  }

  function updateField(field: keyof Omit<FormState, "isAnonymous">, value: string) {
    setForm((prev) =>
      prev ? { ...prev, [field]: { ...prev[field], value } } : prev
    );
  }

  if (step === "input" || step === "saving") {
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Describe what happened
          </label>
          <textarea
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-48 resize-y text-sm leading-relaxed"
            placeholder="Write freely — e.g. 'During ground handling at YYZ on Tuesday, the tug operator clipped the left main gear door while pushback was being conducted in low visibility fog conditions. No injuries. The door has a 15cm dent...'"
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            disabled={step === "saving"}
          />
          <p className="mt-1 text-xs text-slate-500">
            Paste an email, voice memo transcript, or write freely. AI will extract the details.
          </p>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          onClick={handleExtract}
          disabled={!rawText.trim() || isExtracting || step === "saving"}
          className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isExtracting ? "Analysing with AI…" : "Analyse Report"}
        </button>
      </div>
    );
  }

  if (step === "preview" && form) {
    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <strong>AI extracted the following fields.</strong> Review and edit anything that looks
          wrong — fields with ⚠ have lower confidence.
        </div>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Title
              <ConfidenceWarning confidence={form.title.confidence} />
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              value={form.title.value}
              onChange={(e) => updateField("title", e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description
              <ConfidenceWarning confidence={form.description.confidence} />
            </label>
            <textarea
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-24 resize-y"
              value={form.description.value}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Category
                <ConfidenceWarning confidence={form.category.confidence} />
              </label>
              <select
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                value={form.category.value}
                onChange={(e) => updateField("category", e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Date of Occurrence
                <ConfidenceWarning confidence={form.occurredAt.confidence} />
              </label>
              <input
                type="date"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                value={form.occurredAt.value.split("T")[0]}
                onChange={(e) => updateField("occurredAt", e.target.value)}
              />
            </div>

            {/* Severity */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Severity
                <ConfidenceWarning confidence={form.severity.confidence} />
              </label>
              <select
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                value={form.severity.value}
                onChange={(e) => updateField("severity", e.target.value)}
              >
                {SEVERITIES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <div className="mt-1">
                <SeverityBadge value={form.severity.value} />
              </div>
            </div>

            {/* Likelihood */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Likelihood
                <ConfidenceWarning confidence={form.likelihood.confidence} />
              </label>
              <select
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                value={form.likelihood.value}
                onChange={(e) => updateField("likelihood", e.target.value)}
              >
                {LIKELIHOODS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Risk level preview */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-700">Computed Risk Level:</span>
            <RiskBadge severity={form.severity.value} likelihood={form.likelihood.value} />
          </div>

          {/* Anonymous */}
          <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              className="rounded border-slate-300"
              checked={form.isAnonymous}
              onChange={(e) =>
                setForm((prev) => prev ? { ...prev, isAnonymous: e.target.checked } : prev)
              }
            />
            Submit anonymously
          </label>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => setStep("input")}
            className="flex-1 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 transition-colors"
          >
            Confirm &amp; Save Report
          </button>
        </div>
      </div>
    );
  }

  return null;
}
