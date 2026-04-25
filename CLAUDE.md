# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

AI-powered Safety Management System (SMS) for aviation operators. Users describe safety incidents in plain English; Claude extracts structured data, performs root cause analysis, and predicts future hazards. Replaces tedious 20-field forms with a 30-second freeform report.

## Commands

```bash
npm run dev             # Dev server → http://localhost:3000
npm run build           # Production build
npm run lint            # Lint check
npx prisma migrate dev  # Run DB migrations
npx prisma studio       # Visual DB browser
```

**Environment:** Copy `.env.local` and set `ANTHROPIC_API_KEY` and `DATABASE_URL` before first run.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Prisma ORM · Claude API (`@anthropic-ai/sdk`) · SQLite (dev) / PostgreSQL (prod) · Vercel

## Architecture

```
/src/app/           Pages and layouts (App Router)
/src/components/    UI components
/src/lib/ai.ts      ALL Claude API calls — centralised here
/src/lib/db.ts      Prisma client singleton
/prisma/            schema.prisma + migrations
```

**Key routes:**
- `/ ` — Dashboard (KPIs, recent reports, trends)
- `/reports/new` — Freeform report entry + AI extraction preview
- `/reports` — All reports, filterable table
- `/reports/[id]` — Detail: AI diagnosis, 5 Whys, similar events, corrective actions
- `/risk-matrix` — Interactive 5×5 ICAO risk matrix
- `/insights` — AI prognosis: trend analysis, seasonal patterns, predictions

**API routes:**
- `POST /api/reports` — Create report
- `POST /api/reports/[id]/diagnose` — Trigger AI diagnosis
- `GET  /api/insights` — Prognosis data

## Core Rules

- **TypeScript strict** — no `any`
- **Server components by default** — `'use client'` only when required (event handlers, hooks)
- **All AI calls through `/src/lib/ai.ts`** — never call `anthropic` directly in components or route handlers
- **Human review required** — AI suggestions are never auto-submitted; users always confirm before saving
- **ICAO risk level** = computed from `severity × likelihood`; never stored directly, always derived

## AI Integration Pattern

1. User submits freeform text
2. `/src/lib/ai.ts` sends to Claude: extract `{ title, description, category, severity, likelihood, contributingFactors, confidence }`
3. Extraction shown to user — fields with `confidence < 0.8` flagged with a warning indicator
4. User confirms or edits → saved to DB
5. Separate diagnosis call: root causes, 5 Whys, similar event matches, corrective action recommendations

## Database Models (Prisma)

Key fields on `Report`: `rawText`, `category` (enum), `severity` (Negligible→Catastrophic), `likelihood` (ExtremellyImprobable→Frequent), `status`, `aiAnalysis` (JSON), `isAnonymous`.

## ForIT Integration (Week 4)

When integrating shared packages: `@forit/auth` (SSO), `@forit/ui`, `@forit/tailwind-config`. These are deferred until the app is functional end-to-end.
