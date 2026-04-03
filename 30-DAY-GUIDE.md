# 30-Day Vibe Coding Guide with Claude Code

**Building an AI-Powered Aviation Safety Management System from Zero**

You've never coded. In 30 days, you'll ship a real web app that uses AI to ingest safety reports, diagnose root causes, and predict trends. You won't memorize syntax - you'll describe what you want and Claude Code writes it.

---

## Prerequisites (Day 0 - Setup)

Get these installed. Call Ben if stuck.

### Install These
1. **Claude Code** - `brew install claude-code` (install Homebrew first: https://brew.sh)
2. **Node.js** - https://nodejs.org (LTS version, click through installer)
3. **VS Code** - https://code.visualstudio.com (code editor with Claude Code extension)
4. **Git** - Comes with Mac. Verify: `git --version`
5. **GitHub account** - https://github.com (free)
6. **Anthropic API key** - https://console.anthropic.com (for the AI features - $5 credit free)

### Verify
```bash
node --version    # v20 or v22
npm --version     # 10+
git --version     # 2.x
claude --version  # Claude Code installed
```

### Clone This Repo
```bash
cd ~/Desktop
git clone https://github.com/BTForIT/sms-for-chris-t.git
cd sms-for-chris-t
```

---

## Week 1: The Shell (Days 1-7)

**Goal:** A working app with navigation, a dashboard, and a reporting form.

### Day 1: Create the App
```bash
claude
```
> "Create a Next.js 14 app with Tailwind CSS and TypeScript using the App Router. Professional aviation look - dark navy sidebar, clean white content area. Home page shows 'SMS for Chris T - Safety Management System' with the tagline 'AI-Powered Safety Intelligence'."

Run `npm run dev` and open http://localhost:3000.

### Day 2: Layout & Navigation
> "Add a sidebar with: Dashboard, Report Safety Issue, All Reports, Risk Matrix, AI Insights. Header shows organization name. Sidebar collapses on mobile to a hamburger menu. Active page highlighted in the sidebar."

### Day 3: Dashboard
> "Build the Dashboard. Top row: 4 stat cards - Open Reports, Pending Investigations, Overdue Actions, AI Safety Score. Below: a Recent Reports feed showing the last 10 entries with severity color dots. Below that: a Risk Distribution chart (bar chart of reports by risk level). Use mock data."

### Day 4: Report Safety Issue - The Freeform Input
This is the killer feature. Not a form with 20 fields - a single text box.

> "Create the Report Safety Issue page. The main element is a large text area with placeholder text: 'Describe what happened... (e.g., During pushback of flight 402, the tow bar disconnected from the nose gear. Aircraft rolled back 2 feet before chocks were applied. No damage, no injuries. Ramp was wet from rain.)' Below the text area, a Submit button. For now, clicking submit just shows a success toast. We'll add the AI processing next week."

### Day 5: The Traditional Form (Below the AI Input)
> "Below the freeform text area, add a collapsible section called 'Manual Entry (Optional)' that shows a traditional form: Date, Location, Aircraft (reg/type), Category dropdown (Flight Ops, Ground Ops, Maintenance, ATC, Weather, Human Factors, Organizational, Security, Other), Severity (Negligible/Minor/Major/Hazardous/Catastrophic), Likelihood (Extremely Improbable/Improbable/Remote/Occasional/Frequent). Anonymous checkbox. The idea is: AI fills this from the freeform text, but the user can override."

### Day 6: Risk Matrix Visualization
> "Create the Risk Matrix page. Show an interactive 5x5 grid - Severity on X axis, Likelihood on Y axis. Color-code cells: green (Acceptable), yellow (Tolerable), orange (Undesirable), red (Intolerable). Clicking a cell shows how many reports are at that risk level. Add the ICAO standard legend below."

### Day 7: All Reports Page & Polish
> "Create All Reports page - a filterable table of all reports. Columns: Date, Description (truncated), Category, Risk Level (colored badge), Status, Assigned To. Filters for status, category, risk level, date range. Then review all pages - fix visual inconsistencies, ensure mobile responsive."

**Commit:**
```bash
git add -A && git commit -m "Week 1: App shell, dashboard, freeform reporting, risk matrix" && git push
```

---

## Week 2: Database + AI Ingestion (Days 8-14)

**Goal:** Data persists. AI reads freeform text and structures it.

### Day 8: Database Setup
> "Set up SQLite with Prisma ORM. Models: Report (id, rawText, title, description, dateOccurred, location, aircraft, category, severity, likelihood, riskLevel, status, isAnonymous, reportedBy, aiAnalysis JSON field, createdAt, updatedAt), User (id, name, email, role), AiAnalysis (hazardType, contributingFactors, suggestedSeverity, suggestedLikelihood, similarReports, confidence). Run the migration and seed 10 realistic aviation safety reports."

### Day 9: Save Reports to Database
> "Connect the report form to the database. When submitted, save the freeform text and any manual fields to SQLite via an API route. Update the All Reports page to read from the database. Add pagination."

### Day 10: AI Ingestion - The Magic
This is the day the app gets its superpower.

> "Add AI ingestion using the Claude API (Anthropic SDK). When a report is submitted, send the freeform text to Claude with this system prompt: 'You are an aviation safety analyst. Extract structured data from this safety report. Return JSON with: title (short summary), description (cleaned up narrative), dateOccurred (if mentioned), location, aircraft (type and registration if mentioned), category (one of: Flight Ops, Ground Ops, Maintenance, ATC, Weather, Human Factors, Organizational, Security), severity (Negligible/Minor/Major/Hazardous/Catastrophic), likelihood (Extremely Improbable/Improbable/Remote/Occasional/Frequent), contributingFactors (array of strings), and confidence (0-1 how confident the AI is).' Show the AI's extraction to the user for review before saving. Pre-fill the manual form fields with the AI's suggestions."

### Day 11: AI Review & Confirm Flow
> "After AI ingestion, show a review screen: 'AI Analysis' card showing what the AI extracted, with each field editable. The risk matrix auto-highlights based on AI's severity/likelihood suggestion. Green checkmarks on fields the AI is confident about (>0.8), yellow question marks on uncertain ones. A 'Confirm & Submit' button saves the final version. A 'Reject AI Analysis' button lets the user fill it out manually."

### Day 12: Detail Page
> "Create a detail page at /reports/[id]. Show: the original freeform text in a quote block, the structured data below, the risk matrix visualization for this report, and an AI Analysis section showing the AI's reasoning. Add a status workflow: Open > Under Review > Investigation > Corrective Action > Closed."

### Day 13: Simple Auth
> "Add authentication with email/password. Seed users: Safety Manager (admin), Accountable Executive (admin), 3 staff. Session cookie. Show username in header. Protect all pages behind login."

### Day 14: Real Dashboard
> "Update Dashboard with real data from the database. Stat cards show actual counts. Add a bar chart of reports by category and a trend line of reports over time. The AI Safety Score should be calculated: start at 100, subtract points for open high-risk items, overdue actions, and trending-up hazard categories."

**Commit:**
```bash
git add -A && git commit -m "Week 2: Database, AI ingestion, review flow, auth, real dashboard" && git push
```

---

## Week 3: AI Diagnosis & Prognosis (Days 15-21)

**Goal:** AI doesn't just ingest - it diagnoses root causes and predicts trends.

### Day 15: AI Diagnosis - Root Cause Analysis
> "Add an AI Diagnosis feature. On each report's detail page, add a 'Request AI Diagnosis' button (admin only). When clicked, send the report data to Claude with this prompt: 'You are an aviation safety investigator. Analyze this safety report and provide: 1) Probable root cause categories (human factors, organizational, technical, environmental) with confidence levels, 2) Contributing factors using the Reason Model (active failures and latent conditions), 3) A '5 Whys' analysis starting from the immediate cause, 4) Recommended corrective actions ranked by effectiveness.' Display the AI's analysis in a structured, visual format below the report."

### Day 16: Similar Event Matching
> "When the AI diagnoses a report, also search the database for similar past reports. Send the current report + last 50 reports to Claude and ask: 'Which of these past reports are similar to the current one? Explain why. Are there patterns?' Show matched reports as clickable links with similarity scores and the AI's explanation of the pattern."

### Day 17: AI Prognosis - Trend Detection
> "Create the AI Insights page. Every time it loads, send the last 90 days of report data to Claude and ask: 'Analyze these safety reports for an aviation operator. Identify: 1) Trending hazard categories (increasing frequency), 2) Risk trajectory for each category, 3) Seasonal patterns, 4) Predictions for the next 30 days, 5) Recommended proactive actions. Format as an executive briefing.' Display the AI's analysis with charts where appropriate - trend lines for categories, predicted vs actual."

### Day 18: Safety Alerts
> "Add an AI-powered alert system. When a new report is submitted, check if the AI detects: 1) A pattern of similar reports (3+ in 30 days), 2) An escalating severity trend, 3) A report that matches a known accident precursor. If any trigger fires, show an alert banner on the dashboard and the report detail page. Color-code: yellow (pattern detected), orange (escalating), red (accident precursor match)."

### Day 19: Corrective Action Tracking
> "Add corrective actions. Each report can have multiple corrective actions. Fields: description, assigned to, due date, priority, status. AI suggests corrective actions during diagnosis - the admin can accept/modify/reject each suggestion. Track completion. Overdue actions show as red badges on dashboard."

### Day 20: Investigation Workflow
> "Build the investigation flow. Stages: Initial Assessment > Root Cause Analysis (5 Whys with AI assist) > Corrective Actions > Verification > Closure. Each stage has a form and tracks who completed it. The AI pre-fills each stage with suggestions based on the diagnosis."

### Day 21: End-to-End Test
> "Test the full workflow: type a freeform safety report, AI ingests it, review and confirm, request AI diagnosis, review root cause analysis, see similar events, accept AI-suggested corrective actions, walk through investigation stages, close the report. Fix every bug."

**Commit:**
```bash
git add -A && git commit -m "Week 3: AI diagnosis, similar events, prognosis, alerts, corrective actions" && git push
```

---

## Week 4: Ship It (Days 22-28) + Bonus (Days 29-30)

**Goal:** Deploy live. Make it real.

### Day 22: Mobile
> "Make every page work on iPhone screens. Sidebar becomes hamburger. Tables become cards. Forms go single-column."

### Day 23: Search & Export
> "Add global search (find reports by text, category, risk level). Add CSV export for all reports and corrective actions. Add a PDF executive summary export."

### Day 24: Settings
> "Admin settings page: organization name/logo, manage hazard categories, manage users, notification preferences."

### Day 25: Deploy to Vercel
> "Help me deploy to Vercel. Connect GitHub repo, set environment variables (Anthropic API key, database URL), get it live. Switch database to Vercel Postgres for production."

**Your app is live on the internet.**

### Day 26: User Testing
Share the URL. Have 3-5 people:
- Submit a freeform safety report
- See the AI extraction
- Look at the dashboard
- Try it on their phone

Feed every piece of feedback to Claude and fix it.

### Day 27: Security
> "Security review: input validation, SQL injection protection, XSS prevention, auth checks on all API routes, rate limiting, anonymous reports truly untraceable."

### Day 28: Docs
> "Create in-app help pages: Getting Started (for reporters), Admin Guide (for safety managers), and an About page explaining the AI features."

**Final commit:**
```bash
git add -A && git commit -m "Week 4: Mobile, search, export, deploy, security, docs" && git push
```

### Day 29-30: Bonus - Voice Input
> "Add a microphone button to the report form. When clicked, use the browser's Speech Recognition API to transcribe what the user says into the freeform text field. They can then click Submit and the AI processes it normally. This means a pilot can verbally describe a safety concern and the AI handles the rest."

---

## Vibe Coding Tips

### Talking to Claude Code
- **Be specific.** Not "add a form" but "add a text area where I describe a safety issue, and a Submit button that sends it to the AI for analysis."
- **Describe outcomes.** "When I paste this text, the AI should extract the aircraft type, location, and what happened" not "create a POST endpoint."
- **Iterate.** "That looks good but make the AI confidence scores visual - green/yellow/red dots."
- **Ask why.** "Explain what this API route does" builds your intuition.

### When It Breaks
1. Copy the error
2. Paste to Claude: "Getting this error"
3. Claude fixes it
4. Still broken? "That didn't work, now I see: [new error]"

### Git (Your Undo Button)
```bash
git status              # What changed?
git add -A              # Stage everything
git commit -m "message" # Save checkpoint
git push                # Upload to GitHub
git stash               # Temporarily undo (if you broke something)
git stash pop           # Bring changes back
```

### Claude Code Commands
```
claude                 # Start Claude Code
/help                  # All commands
/clear                 # Fresh start
```

---

## ICAO Risk Matrix (5x5)

| | Negligible | Minor | Major | Hazardous | Catastrophic |
|---|---|---|---|---|---|
| **Frequent** | 5-Medium | 10-Serious | 15-High | 20-High | 25-High |
| **Occasional** | 4-Low | 8-Medium | 12-Serious | 16-High | 20-High |
| **Remote** | 3-Low | 6-Low | 9-Medium | 12-Serious | 15-High |
| **Improbable** | 2-Low | 4-Low | 6-Low | 8-Medium | 10-Serious |
| **Ext. Improbable** | 1-Low | 2-Low | 3-Low | 4-Low | 5-Medium |

**Green** = Acceptable | **Yellow** = Tolerable w/ mitigation | **Orange** = Needs senior review | **Red** = Intolerable

---

## Key SMS Terms
- **Hazard** - Condition with potential to cause harm
- **Risk** - Probability x Severity of a hazard
- **Occurrence** - Event affecting or potentially affecting safety
- **Root Cause** - The underlying reason an event occurred
- **Corrective Action** - Action to eliminate the cause
- **Accountable Executive** - Person with authority over finances/HR (CEO)
- **Safety Manager** - Person administering the SMS daily
- **Reason Model** - Swiss cheese model of accident causation (active failures + latent conditions)

---

## Need Help?

- **Claude Code:** https://docs.anthropic.com/en/docs/claude-code
- **Claude API:** https://docs.anthropic.com/en/docs/intro-to-claude
- **Next.js:** https://nextjs.org/docs
- **Call Ben** - He built the repo and can walk you through anything
