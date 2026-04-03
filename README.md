# SMS for Christ - Safety Management System

An **AI-powered Safety Management System** for aviation operators. Built with vibe coding using [Claude Code](https://claude.ai/claude-code).

## The Problem

Aviation SMS tools today are glorified forms. People don't report because the forms are tedious. Safety managers spend hours manually categorizing reports. Nobody predicts what's coming next.

## The Solution: AI-First SMS

### 1. AI Ingestion - Just Tell It What Happened
Don't fill out 20 form fields. Just describe what happened in plain English, paste an email, or upload a voice memo transcript. The AI extracts everything:
- What happened, when, where
- Aircraft type, registration, flight number
- People involved
- Hazard category (Flight Ops, Maintenance, Ground Ops, Weather, Human Factors...)
- Suggested severity and likelihood
- Contributing factors

The human reviews and confirms. Reporting drops from 10 minutes to 30 seconds.

### 2. AI Diagnosis - What Caused This?
For each report, the AI:
- Suggests root cause categories (human factors, organizational, technical, environmental)
- Identifies contributing factors using the Reason Model (Swiss cheese)
- Runs the "5 Whys" analysis with AI-suggested follow-up questions
- Flags similar past occurrences ("This looks like the de-icing incident from Nov 2025")
- Recommends corrective actions based on what worked for similar issues

### 3. AI Prognosis - What's Coming Next?
Most SMS tools are backward-looking. This one predicts:
- Trending hazard categories (e.g. "Ground handling incidents up 40% this quarter")
- Risk trajectory ("This hazard type has escalated to incidents 3x in the past year")
- Seasonal patterns ("Ice-related reports spike in November - proactive briefing recommended")
- Overdue action warnings with impact assessment

## Features

### MVP (This is what we're building)
- **Freeform Safety Reporting** - Describe it naturally, AI structures it
- **AI-Powered Risk Assessment** - Auto-calculated 5x5 ICAO risk matrix
- **Smart Diagnosis** - AI root cause analysis with similar-event matching
- **Trend Detection** - AI prognosis dashboard with predictions
- **Safety Dashboard** - KPIs, trends, open items for the Accountable Executive

### Later
- Investigation workflow with corrective action tracking
- Document management (policies, SOPs, bulletins)
- Audit & compliance scheduling
- Email/SMS notifications
- Role-based access (Accountable Executive, Safety Manager, Department Heads, Staff)
- Transport Canada / ICAO compliance reporting

## Tech Stack

- **Frontend:** Next.js 14 + Tailwind CSS
- **Backend:** Next.js API Routes
- **AI:** Claude API (Anthropic) for ingestion, diagnosis, and prognosis
- **Database:** SQLite (dev) / PostgreSQL (prod)
- **Hosting:** Vercel (free tier to start)

## The 4 Pillars of SMS (ICAO Annex 19)

1. **Safety Policy & Objectives** - Management commitment and accountability
2. **Safety Risk Management** - Hazard identification, risk assessment & mitigation
3. **Safety Assurance** - Performance monitoring, continuous improvement
4. **Safety Promotion** - Training, education, safety communication

## Getting Started

```bash
npm install
npm run dev
```

## Learning Path

See [30-DAY-GUIDE.md](./30-DAY-GUIDE.md) for the complete 30-day vibe coding guide.

## License

MIT
