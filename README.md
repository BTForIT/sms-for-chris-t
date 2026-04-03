# SMS for Christ - Safety Management System

A modern, web-based **Safety Management System (SMS)** built with AI-assisted "vibe coding" using [Claude Code](https://claude.ai/claude-code).

## What is SMS?

A Safety Management System is required by ICAO (Annex 19) and Transport Canada (CAR 107) for aviation operators. It provides a structured approach to managing safety through:

### The 4 Pillars of SMS
1. **Safety Policy & Objectives** - Management commitment, safety accountabilities, appointment of key personnel
2. **Safety Risk Management** - Hazard identification, risk assessment & mitigation
3. **Safety Assurance** - Safety performance monitoring, management of change, continuous improvement
4. **Safety Promotion** - Training, education, and safety communication

## Features (Planned)

- **Hazard Reporting** - Submit safety hazards and concerns (confidential/anonymous option)
- **Occurrence Reporting** - Log safety occurrences, incidents, and accidents
- **Risk Assessment Matrix** - 5x5 probability x severity matrix per ICAO standards
- **Investigation Tracking** - Root cause analysis, corrective actions, follow-up
- **Safety Dashboard** - KPIs, trends, open items, overdue actions
- **Document Management** - Safety policies, procedures, bulletins
- **Audit & Compliance** - Internal audit scheduling and findings tracking
- **User Roles** - Accountable Executive, Safety Manager, Department Heads, All Staff

## Tech Stack

- **Frontend:** Next.js 14 + Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** SQLite (dev) / PostgreSQL or Azure SQL (prod)
- **Auth:** Simple email/password to start, Microsoft Entra ID later
- **Hosting:** Vercel (free tier to start)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Built With Vibe Coding

This project is being built as a learning exercise using **vibe coding** with Claude Code - describe what you want in plain English and the AI writes the code.

See [30-DAY-GUIDE.md](./30-DAY-GUIDE.md) for the complete learning path.

## License

MIT
