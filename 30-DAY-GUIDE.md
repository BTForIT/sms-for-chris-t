# 30-Day Vibe Coding Guide with Claude Code

**Building an Aviation Safety Management System from Zero**

This guide takes you from never having coded to shipping a real web application in 30 days. You won't memorize syntax or study textbooks - you'll describe what you want in plain English and Claude Code will write it. Your job is to think clearly about *what* the app should do.

---

## Prerequisites (Day 0 - Setup)

Before Day 1, get these installed. Ask Ben for help if you get stuck.

### Install These
1. **Claude Code** - https://claude.ai/claude-code (get a Pro subscription - $20/mo)
   - Mac: `brew install claude-code` (install Homebrew first if needed: https://brew.sh)
   - Or download from https://claude.ai/claude-code
2. **Node.js** - https://nodejs.org (download the LTS version, click through installer)
3. **VS Code** - https://code.visualstudio.com (your code editor - has Claude Code extension too)
4. **Git** - Comes with Mac. Verify: open Terminal, type `git --version`
5. **GitHub account** - https://github.com (free)

### Verify Everything Works
Open your Terminal app and type:
```bash
node --version    # Should show v20 or v22
npm --version     # Should show 10+
git --version     # Should show 2.x
claude --version  # Should show Claude Code version
```

### Clone This Repo
```bash
cd ~/Desktop
git clone https://github.com/BTForIT/sms-for-christ.git
cd sms-for-christ
```

---

## Week 1: Foundation (Days 1-7)

**Goal:** Get a working Next.js app with pages you can click through.

### Day 1: Your First App
Open Terminal in the project folder and type:
```bash
claude
```
Then tell Claude:
> "Create a new Next.js 14 app in this directory with Tailwind CSS and TypeScript. Use the App Router. Make the home page show 'SMS for Christ - Safety Management System' with a clean, professional header."

**What you'll learn:** Claude creates an entire project structure. Look at the files it made - don't worry about understanding every line yet.

**Homework:** Run `npm run dev`, open http://localhost:3000 in your browser. You should see your app.

### Day 2: Navigation & Layout
Tell Claude:
> "Add a sidebar navigation with these links: Dashboard, Report Hazard, Occurrences, Risk Register, Investigations, Documents. Use a clean layout with a header that says the company name. Make the sidebar collapsible on mobile."

**What you'll learn:** Layout components, responsive design. Claude handles all the CSS.

### Day 3: The Dashboard Page
Tell Claude:
> "Build the Dashboard page. Show 4 stat cards at the top: Open Hazards (count), Open Investigations (count), Overdue Actions (count), and Safety Score (percentage). Below that, show a recent activity feed. Use placeholder/mock data for now - we'll connect real data later."

**What you'll learn:** Component composition, state management basics.

### Day 4: Hazard Report Form
Tell Claude:
> "Create a 'Report Hazard' page with a form. Fields: Title, Description (large text area), Date Observed, Location, Category (dropdown: Flight Ops, Ground Ops, Maintenance, ATC, Weather, Other), Severity (dropdown: Negligible, Minor, Major, Hazardous, Catastrophic), Likelihood (dropdown: Extremely Improbable, Improbable, Remote, Occasional, Frequent). Add a checkbox for 'Submit Anonymously'. Include a Submit button that shows a success message."

**What you'll learn:** Forms, dropdowns, form validation, user feedback.

### Day 5: Risk Assessment Matrix
Tell Claude:
> "Add a 5x5 Risk Assessment Matrix that automatically calculates when the user selects Severity and Likelihood on the hazard form. The matrix should follow ICAO standards: green (Acceptable), yellow (Tolerable with mitigation), orange (Undesirable - needs senior management review), red (Intolerable - immediate action required). Show the risk level visually on the form."

**What you'll learn:** Computed values, conditional rendering, color-coded UI.

### Day 6: Occurrence List Page
Tell Claude:
> "Create an Occurrences page that shows a table of all reported hazards/occurrences. Columns: Date, Title, Category, Risk Level (color-coded), Status (Open/Under Review/Closed), Assigned To. Add filters at the top for status, category, and date range. Use mock data - make 10 sample entries with realistic aviation safety scenarios."

**What you'll learn:** Tables, filtering, sorting, mock data patterns.

### Day 7: Review & Polish
Tell Claude:
> "Review all the pages we've built. Fix any visual inconsistencies. Make sure the color scheme is professional (dark blue/navy primary, with safety-standard colors for risk levels). Ensure all pages are mobile-responsive. Add loading states and empty states where appropriate."

**Commit your work:**
```bash
git add -A
git commit -m "Week 1: Foundation - layout, dashboard, hazard form, risk matrix, occurrences list"
git push
```

---

## Week 2: Database & Real Data (Days 8-14)

**Goal:** Replace mock data with a real database. Data persists between visits.

### Day 8: Add a Database
Tell Claude:
> "Set up a SQLite database using Prisma ORM. Create models for: Hazard (id, title, description, dateObserved, location, category, severity, likelihood, riskLevel, status, isAnonymous, reportedBy, createdAt, updatedAt), User (id, name, email, role), and Investigation (id, hazardId, findings, rootCause, correctiveActions, status, assignedTo, dueDate). Run the migration."

**What you'll learn:** Databases, schemas, migrations. Prisma makes it visual.

### Day 9: Save Hazard Reports
Tell Claude:
> "Connect the hazard report form to the database. When the user submits the form, save it to the SQLite database via a Next.js API route. Show a success toast notification. The risk level should be auto-calculated from severity x likelihood before saving."

**What you'll learn:** API routes, form submission, database writes.

### Day 10: Load Real Data
Tell Claude:
> "Update the Occurrences page to load data from the database instead of mock data. The filters should work as query parameters. Add pagination - 20 items per page. Add a click handler so clicking a row opens the detail page."

**What you'll learn:** Data fetching, pagination, dynamic routing.

### Day 11: Detail Page
Tell Claude:
> "Create a detail page for each hazard/occurrence at /occurrences/[id]. Show all the hazard info, the risk matrix visualization, and an investigation section below. The investigation section should show existing investigation notes and have a form to add new notes. Include a status change dropdown (Open, Under Investigation, Corrective Action, Closed)."

**What you'll learn:** Dynamic routes, related data, status workflows.

### Day 12: User & Auth (Simple)
Tell Claude:
> "Add simple authentication. Create a login page with email and password. Create a users table with seed data for: Safety Manager (admin), Accountable Executive (admin), and 3 regular staff users. Store the logged-in user in a cookie/session. Show the user's name in the header. Protect all pages except login behind authentication."

**What you'll learn:** Authentication basics, sessions, protected routes.

### Day 13: Role-Based Access
Tell Claude:
> "Add role-based permissions. Roles: admin (Safety Manager, Accountable Executive) and staff. Staff can report hazards and view occurrences. Admins can also assign investigations, change statuses, close occurrences, and see the admin dashboard. Hide UI elements the user doesn't have permission for."

**What you'll learn:** Authorization, role-based UI, middleware.

### Day 14: Dashboard with Real Data
Tell Claude:
> "Update the Dashboard to show real data from the database. The stat cards should show actual counts. Add a bar chart showing hazards by category (last 30 days) and a trend line showing reports over time (last 12 months). Use a charting library like recharts."

**Commit:**
```bash
git add -A
git commit -m "Week 2: Database, auth, real data, role-based access, charts"
git push
```

---

## Week 3: Core SMS Features (Days 15-21)

**Goal:** Build the features that make this a real Safety Management System.

### Day 15: Investigation Workflow
Tell Claude:
> "Build a full investigation workflow. When an admin assigns an investigation, it creates an Investigation record linked to the hazard. The investigation has stages: Initial Assessment, Root Cause Analysis, Corrective Actions, Verification, Closure. Each stage has a form. Root Cause should support the '5 Whys' technique - let the user chain up to 5 why questions. Track who completed each stage and when."

### Day 16: Corrective Actions
Tell Claude:
> "Add a Corrective Actions system. Each investigation can have multiple corrective actions. Fields: description, assigned to (dropdown of users), due date, priority (High/Medium/Low), status (Open/In Progress/Completed/Overdue). Actions that pass their due date should automatically show as Overdue. Show overdue actions prominently on the dashboard with a red badge."

### Day 17: Risk Register
Tell Claude:
> "Create a Risk Register page. This is a master list of all identified risks, their current risk level, mitigations in place, and residual risk after mitigation. Include filters and a visual heat map showing the distribution of risks on the 5x5 matrix. Clicking a cell in the matrix should filter the list to show only risks at that level."

### Day 18: Safety Reporting & Metrics
Tell Claude:
> "Build a Safety Metrics page. Show: reports per month trend, average time to close, reports by category pie chart, risk level distribution, top 5 recurring hazard types, corrective action completion rate. Add date range filters. Make it look like an executive dashboard - this is what the Accountable Executive reviews monthly."

### Day 19: Document Management
Tell Claude:
> "Add a Documents section. Users can upload safety-related documents (PDFs, Word docs). Categories: Safety Policy, SOPs, Safety Bulletins, Meeting Minutes, Audit Reports. Show upload date, version, uploaded by. Support viewing document details and downloading. Store files locally for now."

### Day 20: Email Notifications
Tell Claude:
> "Add email notifications using Resend (free tier). Send emails when: a new hazard is reported (to Safety Manager), an investigation is assigned (to assignee), a corrective action is due in 3 days (to assignee), a corrective action is overdue (to assignee + Safety Manager). Include a link to the relevant page in each email."

### Day 21: Review & Test
Tell Claude:
> "Review the entire application. Test every workflow end-to-end: report a hazard, see it in the list, assign an investigation, go through all investigation stages, create corrective actions, close the investigation. Fix any bugs. Make sure all pages handle edge cases (empty states, long text, invalid input)."

**Commit:**
```bash
git add -A
git commit -m "Week 3: Investigation workflow, corrective actions, risk register, metrics, docs, notifications"
git push
```

---

## Week 4: Polish & Ship (Days 22-30)

**Goal:** Make it production-ready and deploy it live.

### Day 22: Mobile Responsive
Tell Claude:
> "Go through every page and make sure it works perfectly on mobile (iPhone-sized screens). The sidebar should collapse to a hamburger menu. Tables should scroll horizontally or switch to card layout on small screens. Forms should be single-column on mobile."

### Day 23: Search
Tell Claude:
> "Add a global search bar in the header. Searching should find hazards, investigations, corrective actions, and documents by title, description, or ID. Show results grouped by type with quick links."

### Day 24: Audit Log
Tell Claude:
> "Add an audit log that tracks every important action: who reported what, who changed a status, who assigned an investigation, who completed a corrective action. Show this on an Audit Log page (admin only) and also on each hazard's detail page as a timeline."

### Day 25: Data Export
Tell Claude:
> "Add export functionality. Admins can export: all hazards to CSV, the risk register to CSV, safety metrics to PDF (a formatted report). Add export buttons on the relevant pages."

### Day 26: Settings & Configuration
Tell Claude:
> "Add a Settings page (admin only). Allow configuring: organization name and logo, hazard categories (add/edit/remove), risk matrix thresholds, notification preferences (which emails to send), user management (add/edit/deactivate users)."

### Day 27: Deploy to Vercel
Tell Claude:
> "Help me deploy this to Vercel. Walk me through the steps: connecting the GitHub repo, setting environment variables, and getting it live on a custom domain. Switch the database to Vercel Postgres or PlanetScale for production."

**This is when your app goes live on the internet.**

### Day 28: Testing with Real Users
Share the URL with a few people. Have them:
- Report a test hazard
- Navigate around
- Try it on their phone
- Tell you what's confusing or broken

Tell Claude about each piece of feedback and fix it.

### Day 29: Security Hardening
Tell Claude:
> "Review the app for security issues. Check for: SQL injection, XSS, CSRF, insecure direct object references, missing auth checks. Add rate limiting to the API routes. Make sure anonymous reports truly can't be traced back to the reporter. Add input validation on all forms."

### Day 30: Documentation & Handoff
Tell Claude:
> "Generate user documentation: a Getting Started guide for new users, an Admin Guide for safety managers, and a Developer Guide for future maintenance. Create these as pages in the app at /help."

**Final commit:**
```bash
git add -A
git commit -m "Week 4: Mobile, search, audit log, export, settings, deployment, security, docs"
git push
```

---

## Vibe Coding Tips

### How to Talk to Claude Code
- **Be specific about what you want.** "Add a form" is vague. "Add a hazard report form with title, description, severity dropdown, and a submit button" is clear.
- **Describe the outcome, not the implementation.** Say "when I click submit, save it to the database and show a success message" not "create a POST handler that..."
- **Iterate.** Your first version won't be perfect. Say "the form looks good but make the severity dropdown use colors" or "the table is too cramped on mobile, switch to cards."
- **Ask Claude to explain.** If you're curious, say "explain what this code does in simple terms." Understanding builds intuition.

### When Things Break
1. Copy the error message
2. Paste it to Claude and say "I'm getting this error"
3. Claude will fix it
4. If it's still broken, say "that didn't fix it, here's what I see now: [new error]"

### Git Basics (Your Safety Net)
```bash
git status              # See what changed
git add -A              # Stage all changes
git commit -m "message" # Save a checkpoint
git push                # Upload to GitHub
git log --oneline -5    # See recent checkpoints
```

If you break something badly:
```bash
git stash              # Temporarily undo your changes
# Check if the app works now
git stash pop          # Bring your changes back
```

### Useful Claude Code Commands
```
claude                 # Start Claude Code in current directory
/help                  # See all commands
/clear                 # Clear conversation (start fresh)
```

---

## Aviation SMS Reference

### ICAO Risk Matrix (5x5)

| | Negligible | Minor | Major | Hazardous | Catastrophic |
|---|---|---|---|---|---|
| **Frequent** | Medium | Serious | High | High | High |
| **Occasional** | Low | Medium | Serious | High | High |
| **Remote** | Low | Low | Medium | Serious | High |
| **Improbable** | Low | Low | Low | Medium | Serious |
| **Extremely Improbable** | Low | Low | Low | Low | Medium |

### Key SMS Terms
- **Hazard** - A condition or object with the potential to cause harm
- **Risk** - The assessed potential for adverse consequences from a hazard (probability x severity)
- **Occurrence** - An event associated with aircraft operations that affects or could affect safety
- **Corrective Action** - An action to eliminate the cause of a detected nonconformity
- **Accountable Executive** - The person with authority over finances and HR (usually CEO/President)
- **Safety Manager** - The person responsible for administering the SMS day-to-day

### Reporting Categories (Customize for Your Operation)
- Flight Operations (crew, dispatch, fuel)
- Ground Operations (ramp, de-icing, pushback)
- Maintenance (aircraft, facilities, tools)
- Air Traffic / NAV (communications, NOTAM, approaches)
- Weather (forecasting, de-icing decision-making)
- Security (access control, screening, threats)
- Human Factors (fatigue, training, CRM)
- Organizational (policies, procedures, resources)

---

## Need Help?

- **Claude Code docs:** https://docs.anthropic.com/en/docs/claude-code
- **Next.js docs:** https://nextjs.org/docs
- **Call Ben** - He set this up for you and can walk you through any of it
