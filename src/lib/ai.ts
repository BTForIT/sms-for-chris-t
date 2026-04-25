import Anthropic from "@anthropic-ai/sdk";
import type { Report } from "@/generated/prisma/client";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODEL = "claude-sonnet-4-6";

// Strip markdown code fences that Claude occasionally wraps around JSON output.
function parseJSON<T>(raw: string): T {
  const cleaned = raw.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  return JSON.parse(cleaned) as T;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ExtractionField<T> {
  value: T;
  confidence: number; // 0–1; values < 0.8 are flagged in the UI
}

export interface ReportExtraction {
  title: ExtractionField<string>;
  description: ExtractionField<string>;
  category: ExtractionField<string>;
  severity: ExtractionField<string>;
  likelihood: ExtractionField<string>;
  occurredAt: ExtractionField<string>; // ISO 8601 date string
  isAnonymous: ExtractionField<boolean>;
  contributingFactors: ExtractionField<string[]>;
}

export interface RootCause {
  category: string; // e.g. "Human Factors", "Organizational", "Technical", "Environmental"
  description: string;
}

export interface WhyStep {
  question: string;
  answer: string;
}

export interface SimilarEvent {
  description: string;
  similarity: string; // brief explanation of how it is similar
}

export interface DiagnosisResult {
  rootCauses: RootCause[];
  fiveWhys: WhyStep[];
  similarEvents: SimilarEvent[];
  correctiveActions: string[];
}

export interface InsightResult {
  trendingCategories: Array<{ category: string; change: string; direction: "up" | "down" | "stable" }>;
  riskTrajectory: string;
  seasonalPatterns: string[];
  overdueWarnings: string[];
  summary: string;
}

// ---------------------------------------------------------------------------
// 1. Extract structured data from freeform text
// ---------------------------------------------------------------------------

export async function extractReport(rawText: string): Promise<ReportExtraction> {
  const today = new Date().toISOString().split("T")[0];

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: [
      {
        type: "text",
        text: `You are an aviation safety analyst. Extract structured data from freeform safety incident reports.

Today's date is ${today}.

Return ONLY valid JSON matching this exact schema — no markdown, no explanation:
{
  "title": { "value": "string", "confidence": 0.0 },
  "description": { "value": "string", "confidence": 0.0 },
  "category": { "value": "FlightOps|Maintenance|GroundOps|Weather|HumanFactors|Other", "confidence": 0.0 },
  "severity": { "value": "Negligible|Minor|Major|Hazardous|Catastrophic", "confidence": 0.0 },
  "likelihood": { "value": "ExtremelyImprobable|Improbable|Remote|Probable|Frequent", "confidence": 0.0 },
  "occurredAt": { "value": "ISO 8601 date or best estimate", "confidence": 0.0 },
  "isAnonymous": { "value": true|false, "confidence": 0.0 },
  "contributingFactors": { "value": ["factor1", "factor2"], "confidence": 0.0 }
}

Confidence rules:
- 0.9–1.0: explicitly stated in the text
- 0.7–0.89: strongly implied
- 0.5–0.69: inferred with moderate uncertainty
- Below 0.5: best guess; flag for review

Severity (ICAO 5x5 matrix):
- Negligible: No injuries, minor equipment damage
- Minor: First aid injuries, minor system damage
- Major: Serious injuries, significant damage
- Hazardous: Fatal/serious injuries to a small number, major system failure
- Catastrophic: Multiple fatalities, aircraft destroyed

Likelihood (ICAO 5x5 matrix):
- ExtremelyImprobable: Almost inconceivable
- Improbable: Very unlikely but possible
- Remote: Unlikely but may occur occasionally
- Probable: Expected to occur sometimes
- Frequent: Likely to occur many times`,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [
      {
        role: "user",
        content: rawText,
      },
    ],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  return parseJSON<ReportExtraction>(text);
}

// ---------------------------------------------------------------------------
// 2. Diagnose a confirmed report
// ---------------------------------------------------------------------------

export async function diagnoseReport(report: Report): Promise<DiagnosisResult> {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 2048,
    system: [
      {
        type: "text",
        text: `You are an expert aviation safety investigator trained in ICAO SMS methodology, the Reason Model (Swiss cheese), and human factors analysis.

Return ONLY valid JSON with this exact schema — no markdown, no explanation:
{
  "rootCauses": [
    { "category": "Human Factors|Organizational|Technical|Environmental", "description": "string" }
  ],
  "fiveWhys": [
    { "question": "Why did X happen?", "answer": "string" }
  ],
  "similarEvents": [
    { "description": "string", "similarity": "string" }
  ],
  "correctiveActions": ["string", "string"]
}

Guidelines:
- rootCauses: 1–4 causes using ICAO/SHELL model categories
- fiveWhys: exactly 5 steps drilling to systemic root cause
- similarEvents: 2–3 plausible historic aviation incidents (real or illustrative) that share contributing factors — be explicit this is illustrative
- correctiveActions: 3–5 specific, actionable recommendations`,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [
      {
        role: "user",
        content: `Diagnose this safety report:

Title: ${report.title}
Category: ${report.category}
Severity: ${report.severity}
Likelihood: ${report.likelihood}
Description: ${report.description}
Raw report text: ${report.rawText}`,
      },
    ],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  return parseJSON<DiagnosisResult>(text);
}

// ---------------------------------------------------------------------------
// 3. Generate prognosis insights from a batch of reports
// ---------------------------------------------------------------------------

export interface ReportSummary {
  category: string;
  severity: string;
  likelihood: string;
  occurredAt: string;
  title: string;
}

export async function generateInsights(reports: ReportSummary[]): Promise<InsightResult> {
  if (reports.length === 0) {
    return {
      trendingCategories: [],
      riskTrajectory: "No data yet. Submit safety reports to see trend analysis.",
      seasonalPatterns: [],
      overdueWarnings: [],
      summary: "No reports have been submitted yet.",
    };
  }

  const reportList = reports
    .map((r) => `- [${r.occurredAt}] ${r.category} | ${r.severity}/${r.likelihood} | ${r.title}`)
    .join("\n");

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 1536,
    system: [
      {
        type: "text",
        text: `You are an aviation safety analyst specializing in trend analysis and predictive risk assessment.

Return ONLY valid JSON with this exact schema — no markdown, no explanation:
{
  "trendingCategories": [
    { "category": "string", "change": "string (e.g. +40% this quarter)", "direction": "up|down|stable" }
  ],
  "riskTrajectory": "string — 1–2 sentence overall risk trajectory assessment",
  "seasonalPatterns": ["string", "string"],
  "overdueWarnings": ["string"],
  "summary": "string — 2–3 sentence executive summary for the Accountable Executive"
}

Today's date: ${new Date().toISOString().split("T")[0]}`,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [
      {
        role: "user",
        content: `Analyse these ${reports.length} safety reports and provide prognosis:\n\n${reportList}`,
      },
    ],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  return parseJSON<InsightResult>(text);
}
