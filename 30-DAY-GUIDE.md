# 30-Day Vibe Coding Itinerary

**Building an AI-Powered Aviation Safety Management System**
**For Chris Thomas — Self-Guided with Claude Code**

You've never coded. In 30 days you'll ship a real web app that uses AI to ingest safety reports, diagnose root causes, and predict trends. You won't learn syntax — you'll describe what you want and the AI writes it.

This itinerary is designed so you can follow it completely on your own.

---

## Part 0: Setup (Do This First)

### Install Everything

Open Terminal (Cmd+Space, type "Terminal") and run each line:

```bash
# 1. Install Homebrew (Mac package manager)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Install Node.js (JavaScript runtime)
brew install node

# 3. Install Claude Code (your AI coding partner — this IS your IDE)
brew install claude-code

# 4. Verify
node --version     # v20+
npm --version      # 10+
git --version      # 2.x
claude --version   # Claude Code installed
```

### Sign Into Claude Code

Claude Code is your entire development environment. No VS Code, no other editor needed.

Sign in using your ForIT Microsoft account:
```bash
claude
```
When prompted, choose **"Sign in with SSO"** and use your **C.Thomas@forit.io** Microsoft account. ForIT has a team subscription — you don't need to pay for anything separately.

### Anthropic API Key (for AI features in the app)
The app itself calls the Claude API to analyze safety reports. You'll need an API key:
1. Go to https://console.anthropic.com
2. Sign up (free $5 credit)
3. Create an API key — you'll add it to the app in Week 2

### GitHub Account
Sign up at https://github.com (free) — this is where your code lives.

### Clone This Project
```bash
cd ~/Desktop
git clone https://github.com/BTForIT/sms-for-chris-t.git
cd sms-for-chris-t
```

### Your First Claude Code Session
```bash
claude
```
That's it. You're talking to an AI coding agent. Try:
```
> What files are in this directory?
> Explain what a Next.js app is in one paragraph
```
Press **Ctrl+C** to exit.

---

## Part 1: Claude Code Crash Course

**Read this entire section before starting Day 1.** This is the difference between struggling and flying.

### What is Vibe Coding?

Vibe coding means you describe what you want in plain English and AI writes the code. You are the **architect** — you decide what gets built. Claude is the **builder** — it writes every line.

The community consensus (from thousands of developers on Reddit, Hacker News, and the Claude community):
- **It works incredibly well** for people who think clearly about *what* they want
- **It fails** when people are vague, don't verify, or let AI go unchecked
- **The #1 reason vibe-coded projects fail:** people don't give the AI a way to verify its own work

### The 5 Golden Rules

**1. Be specific about outcomes**
```
Bad:  "add a form"
Good: "add a hazard report form with a large text area for freeform description,
       a severity dropdown (Negligible/Minor/Major/Hazardous/Catastrophic),
       and a blue Submit button that shows a green success toast"
```

**2. Always give Claude a way to check itself**
```
Bad:  "implement email validation"
Good: "implement email validation. Test cases: user@test.com = valid,
       'invalid' = invalid, user@.com = invalid. Run the tests after."
```

**3. Explore → Plan → Build (for anything non-trivial)**
1. "Read the files in /src and explain how the app is structured"
2. "I want to add X. What files need to change? Make a plan."
3. "Implement the plan. Verify each step works."

**4. Course-correct immediately**
- Press **Esc** to stop Claude mid-action
- "Stop — that's not what I meant. I want X instead."
- **Esc+Esc** or `/rewind` to undo everything back to a checkpoint

**5. Clear context between tasks**
Type `/clear` between unrelated tasks. Claude gets confused when old conversation piles up.

### Essential Commands

| Command | What it does |
|---------|-------------|
| `claude` | Start Claude Code in current directory |
| **Esc** | Stop Claude mid-action (context preserved) |
| **Esc+Esc** | Open rewind menu — go back to any checkpoint |
| `/clear` | Wipe conversation — fresh start |
| `/compact` | Compress conversation to free space |
| `/init` | Generate a starter CLAUDE.md for your project |
| **Shift+Tab** | Toggle Plan Mode (explore without changing files) |
| `/help` | Show all commands |
| **Ctrl+C** | Exit Claude Code |

### CLAUDE.md — Your Project's Brain

Every project has a `CLAUDE.md` file at the root. Claude reads it at the start of every session. It contains:
- How to build and run the project
- Code style rules
- Architecture decisions
- Things Claude should always do or never do

**Keep it short.** If it's too long, Claude ignores half of it. Only include things Claude can't figure out by reading the code.

We'll create ours on Day 1.

### Git — Your Undo Button

Git saves snapshots of your code. If you break something, go back.

```bash
git status              # What changed?
git add -A              # Stage all changes
git commit -m "message" # Save snapshot
git push                # Upload to GitHub (backup)
git log --oneline -5    # See last 5 snapshots
```

**Broke something?**
```bash
git stash               # Temporarily undo all changes
# Check if it works now
git stash pop           # Bring changes back
```

Claude Code also has checkpoints (Esc+Esc to rewind). Use both.

### When Things Break (Your Playbook)

This happens to everyone. Here's what works:

1. **Copy the error message** (red text in terminal)
2. **Paste to Claude:** "I'm getting this error: [paste]"
3. Claude fixes it
4. Still broken? "That didn't fix it. Now I see: [new error]"
5. Stuck after 2 tries? `/clear` and rephrase: "I'm trying to do X. The error is Y. What's wrong?"

**The #1 beginner mistake:** silently accepting code that doesn't work. If the app shows an error, shows a blank page, or doesn't do what you expected — tell Claude immediately. Don't move on.

### Subagents — Claude's Research Team

When you say "use a subagent to investigate X", Claude spawns a mini-Claude that explores files and reports back a summary — without cluttering your main conversation. Use this for:
- "Use a subagent to investigate how the database is set up"
- "Use a subagent to review this code for security issues"
- "Use a subagent to find all the places we handle errors"

### Community Wisdom (r/ClaudeAI, r/vibecoding)

Hard-won lessons from thousands of developers:

**"Write specs, not code."** The clearer your description of WHAT you want, the better Claude builds it. Spend 5 minutes writing a clear prompt instead of 30 minutes correcting a vague one.

**"Commit constantly."** After every feature that works, `git commit`. You're creating save points. When something breaks (and it will), you can always go back.

**"Small bites, not big bites."** Don't ask Claude to build 5 features at once. Build one feature, verify it works, commit, then the next one. This is the single biggest predictor of success.

**"Start every session by reading the code."** After a break, don't just start prompting. Tell Claude: "Read the main files and summarize where we left off." This catches you both up.

**"Use Plan Mode before big changes."** Toggle with Shift+Tab. Claude reads and thinks without changing files. Once you agree on the plan, switch to Normal Mode.

**"Don't fight the AI."** If Claude insists on an approach, it might know something you don't. Ask "why did you do it this way?" before overriding.

**"The 2-correction rule."** If you've corrected Claude twice and it's still wrong, don't keep going. `/clear` and rewrite your prompt from scratch. The context is poisoned with failed attempts.

---

## Part 2: ForIT Common (Shared Building Blocks)

ForIT maintains shared packages at https://github.com/ForITLLC/forit-Common:

| Package | What it does |
|---------|-------------|
| `@forit/auth` | Microsoft login (OAuth2 + session cookies) |
| `@forit/db` | Database connection helpers |
| `@forit/ui` | Shared components (buttons, cards, badges) |
| `@forit/tailwind-config` | ForIT brand colors and design system |
| `@forit/logging` | Centralized health monitoring |
| `@forit/email` | Email sending via Microsoft Graph |

We'll integrate these in Week 4. For now, build standalone to keep things simple.

To use them later, add to your `package.json`:
```json
{
  "dependencies": {
    "@forit/auth": "file:../../forit-Common/packages/auth",
    "@forit/tailwind-config": "file:../../forit-Common/packages/tailwind-config"
  }
}
```

---

## Week 1: The App Shell (Days 1-7)

### Day 1: Create the App + CLAUDE.md

```bash
cd ~/Desktop/sms-for-chris-t
claude
```

> "Create a Next.js 14 app in this directory with Tailwind CSS and TypeScript using the App Router. Professional aviation look — dark navy sidebar, white content area. Home page: 'Safety Management System' with tagline 'AI-Powered Safety Intelligence'. Then create a CLAUDE.md with build commands, tech stack, and architecture notes."

Run it: `npm run dev` → open http://localhost:3000

Save:
```bash
git add -A && git commit -m "Day 1: Next.js app + CLAUDE.md" && git push
```

### Day 2: Sidebar Navigation
> "Add a sidebar with pages: Dashboard, Report Safety Issue, All Reports, Risk Matrix, AI Insights. Header shows 'Safety Management System'. Sidebar collapses to hamburger on mobile. Active page highlighted."

### Day 3: Dashboard (Mock Data)
> "Build Dashboard. 4 stat cards: Open Reports (12), Pending Reviews (5), Overdue Actions (3), Safety Score (82%). Recent reports feed with 10 mock entries. Bar chart of reports by category. Use realistic aviation scenarios — ramp incidents, bird strikes, fuel discrepancies, fatigue reports, runway incursions."

### Day 4: Freeform Report Input (The Killer Feature)
> "Create Report Safety Issue page. Main element: large text area with placeholder 'Describe what happened... (e.g., During pushback of flight 402, the tow bar disconnected from the nose gear. Aircraft rolled back 2 feet before chocks were applied. No damage, no injuries. Ramp was wet from rain.)' Big blue Submit button. This is the core UX — one box, natural language. No 20-field form."

### Day 5: Manual Override Form
> "Below the text area, add collapsible 'Details (Optional)' section: Date, Location, Aircraft, Category dropdown (Flight Ops/Ground Ops/Maintenance/Weather/Human Factors/Organizational/Security/Other), Severity (Negligible→Catastrophic), Likelihood (Extremely Improbable→Frequent), Anonymous checkbox. The AI will auto-fill these; user can override."

### Day 6: Risk Matrix Page
> "Interactive 5x5 grid — Severity (X) vs Likelihood (Y). Colors: green=Acceptable, yellow=Tolerable, orange=Undesirable, red=Intolerable. Clicking a cell shows reports at that level. ICAO legend below."

### Day 7: All Reports + Polish
> "Filterable table: Date, Description, Category, Risk Level (badge), Status. Filters for status/category/risk/date. Then review all pages for consistency and mobile responsiveness."

```bash
git add -A && git commit -m "Week 1: Shell, dashboard, reporting, risk matrix" && git push
```

---

## Week 2: Database + AI Ingestion (Days 8-14)

### Day 8: Database
> "Set up SQLite with Prisma. Models: Report (id, rawText, title, description, dateOccurred, location, aircraft, category, severity, likelihood, riskLevel, status, isAnonymous, reportedBy, aiAnalysis JSON, createdAt, updatedAt), User (id, name, email, role). Migrate and seed 10 realistic reports."

### Day 9: Connect to Database
> "Wire the form to SQLite via API routes. Update All Reports to read from DB. Add pagination."

### Day 10: AI Ingestion (Magic Day)
> "Install @anthropic-ai/sdk. Create .env.local with ANTHROPIC_API_KEY. On report submit, send freeform text to Claude API: 'You are an aviation safety analyst. Extract structured JSON: title, description, dateOccurred, location, aircraft, category, severity, likelihood, contributingFactors, confidence.' Show AI extraction for review before saving. Pre-fill the manual form fields."

Put your API key in `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### Day 11: AI Review & Confirm
> "After AI processing, show review screen: AI Analysis card with editable fields. Risk matrix auto-highlights. Green checkmarks (confidence > 0.8), yellow question marks (uncertain). 'Confirm & Submit' saves. 'Reject AI' → manual entry."

### Day 12: Report Detail Page
> "Detail page at /reports/[id]: original text in quote block, structured data, risk matrix, AI confidence. Status: Open → Under Review → Investigation → Corrective Action → Closed."

### Day 13: Authentication
> "Email/password auth. Seed: Safety Manager (admin), Accountable Executive (admin), 3 staff. Session cookies. Protected routes."

### Day 14: Live Dashboard
> "Wire dashboard to DB. Real counts, real charts. Safety Score = 100 minus penalties for open high-risk items."

```bash
git add -A && git commit -m "Week 2: DB, AI ingestion, auth, live dashboard" && git push
```

---

## Week 3: AI Diagnosis & Prognosis (Days 15-21)

### Day 15: AI Root Cause Analysis
> "Admin 'Request AI Diagnosis' button sends report to Claude: 'Aviation safety investigator. Provide: root cause categories with confidence, contributing factors (Reason Model), 5 Whys analysis, recommended corrective actions.' Display visually."

### Day 16: Similar Event Matching
> "Search DB for similar past reports. Send current + last 50 to Claude: 'Which are similar? What's the pattern?' Show as clickable links with similarity scores."

### Day 17: AI Prognosis
> "AI Insights page. Send 90 days of data to Claude: 'Trending categories, risk trajectory, seasonal patterns, 30-day predictions, proactive recommendations. Executive briefing format.' Show with trend charts."

### Day 18: Smart Alerts
> "On new report: check for 3+ similar in 30 days (pattern), escalating severity (trend), accident precursor match. Alert banners: yellow/orange/red."

### Day 19: Corrective Actions
> "Reports get corrective actions: description, assigned to, due date, priority, status. AI suggests during diagnosis. Overdue = red dashboard badges."

### Day 20: Investigation Workflow
> "Stages: Assessment → Root Cause (5 Whys + AI) → Corrective Actions → Verification → Closure. Track who/when. AI pre-fills."

### Day 21: End-to-End Test
> "Test full flow: freeform → AI ingest → review → diagnose → similar events → corrective actions → investigate → close. Fix every bug."

```bash
git add -A && git commit -m "Week 3: AI diagnosis, prognosis, alerts, investigations" && git push
```

---

## Week 4: Ship It (Days 22-28)

### Day 22: Mobile
> "iPhone-ready. Sidebar → hamburger. Tables → cards. Forms → single column."

### Day 23: Search + Export
> "Global search. CSV export. PDF executive summary."

### Day 24: Deploy
> "Deploy to Vercel. Connect GitHub, set ANTHROPIC_API_KEY, switch to Vercel Postgres."

**Your app is live on the internet.**

### Day 25-26: Real User Testing
Share the URL. Have people report safety issues. Feed complaints to Claude.

### Day 27: ForIT Integration
> "Clone forit-Common next to this project. Install @forit/tailwind-config for brand colors and @forit/ui for shared components."

### Day 28: Security + Docs
> "Security review. In-app help pages."

```bash
git add -A && git commit -m "Week 4: Deploy, mobile, security, docs" && git push
```

### Days 29-30: Voice Input (Bonus)
> "Microphone button. Browser Speech Recognition API transcribes voice → text field → AI processes. A pilot reports a hazard in 15 seconds by talking."

---

## Quick Reference

### CLAUDE.md Template (Create Day 1)
```markdown
# SMS for Chris T — Safety Management System

## Commands
- `npm run dev` — dev server (http://localhost:3000)
- `npm run build` — production build
- `npx prisma studio` — visual DB browser
- `npx prisma migrate dev` — run migrations

## Stack
Next.js 14 (App Router) + TypeScript + Tailwind + Prisma (SQLite) + Claude API

## Architecture
- /src/app — pages and layouts
- /src/components — UI components
- /src/lib — utilities, DB client, AI service
- /prisma — schema and migrations

## Rules
- TypeScript strict — no `any`
- Server components by default, 'use client' only when needed
- All AI calls through /src/lib/ai.ts
- Never auto-submit AI suggestions — human reviews first
- Commit after every working feature
```

### ICAO Risk Matrix

| | Negligible | Minor | Major | Hazardous | Catastrophic |
|---|---|---|---|---|---|
| **Frequent** | Medium | Serious | High | High | High |
| **Occasional** | Low | Medium | Serious | High | High |
| **Remote** | Low | Low | Medium | Serious | High |
| **Improbable** | Low | Low | Low | Medium | Serious |
| **Ext. Improbable** | Low | Low | Low | Low | Medium |

### Key Terms
- **Hazard** — Condition with potential to cause harm
- **Risk** — Probability x Severity
- **5 Whys** — Keep asking "why?" to find root cause
- **Reason Model** — Swiss cheese (active failures + latent conditions)
- **Accountable Executive** — CEO/President
- **Safety Manager** — Day-to-day SMS administrator

### Links
- Claude Code: https://docs.anthropic.com/en/docs/claude-code
- Best Practices: https://code.claude.com/docs/en/best-practices
- Claude API: https://docs.anthropic.com/en/docs/intro-to-claude
- Next.js: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs
- **Call Ben** for anything
