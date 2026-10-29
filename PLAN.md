# Custom CRM: build plan (Sales v1)

> **Status:** draft for team review, written 29/10/2026 from the meetings on 21/10, 25/10 and 29/10.  
> **First step for everyone:** read the [⚠️ Assumptions to confirm](#assumptions-to-confirm) and comment on issue [#1](https://github.com/Hardeep-vt/custom-crm/issues/1).

## Why we're building this

To get a hands-on feel for what a CRM really is ("a fancy database with a UI"), how much effort a working one takes, and to make an informed **build-vs-buy** case, using **HubSpot as the benchmark**. We start with the **Sales team only** and go deep before going wide.

## What v1 delivers

A web app where **sales reps** manage their companies, contacts, deals and tasks, log every interaction, and get automatic reminders; and where the **sales lead** sees everything, reassigns work and comments on deals.

## Tech stack

| Layer | Choice |
|---|---|
| Backend | Python 3.12, **FastAPI**, SQLAlchemy 2.0, Alembic (migrations), Pydantic, pytest, ruff |
| Database | **PostgreSQL 16** (Docker locally, Neon in the cloud) |
| Frontend | **React + Vite + TypeScript**, React Router, TanStack Query, Tailwind CSS |
| Auth | Email and password, with JWT tokens. Accounts are created by the sales lead. |
| Hosting | Render (API), Neon (DB), Vercel (web). Every merge to `main` auto-deploys. |
| CI / jobs | GitHub Actions: tests on every PR, plus an hourly cron for reminders |

```
custom-crm/
├── backend/        FastAPI app (app/, alembic/, tests/)
├── frontend/       React app (src/)
├── docs/           meeting notes, design notes, HubSpot comparison
├── docker-compose.yml
└── PLAN.md         this file
```

## Environments

_Filled in by T06._

| | URL | Account owner |
|---|---|---|
| Web | TBD | TBD |
| API | TBD | TBD |
| DB | (Neon) | TBD |

## How we work (5 people, one repo)

1. **Pick a task.** Open the [project board](https://github.com/users/Hardeep-vt/projects/1) or the [issue list](https://github.com/Hardeep-vt/custom-crm/issues). Take the lowest-numbered issue in **To do** whose *Depends on* issues are all closed.
2. **Claim it.** Assign yourself and move it to **In progress**. Comment on the issue if you'll be slow. **One task per person at a time.**
3. **Branch** from the latest `main`: `git checkout main && git pull && git checkout -b t12-company-list`.
4. **Build it small.** Do only what the issue says. If you find more work, open a new issue rather than growing the PR.
5. **Open a PR** with `Closes #N` in it, fill in the template, and add screenshots for UI changes.
6. **Review.** Every PR needs **1 approval from a teammate** and **green CI**. Reviewers should respond within 24 hours.
7. **Merge** with *Squash and merge*. That auto-closes the issue and auto-deploys. Then pull `main` before your next task.
8. **Using an LLM** is encouraged: give it this file, the issue, and `docs/meetings/`. But you must be able to **explain every line** in your PR (Hardeep, 25/10).

**Migrations rule:** only one open PR at a time should add an Alembic migration, or rebase onto `main` before merging, to avoid two migration heads.

## Order of work and what can run in parallel

Phase 0 is mostly **one-after-another**. After that, the work splits into lanes that can run **at the same time**:

```
Phase 0  T01 → T02 → T03 → T07 → T08 ─┐      (T04 frontend can run alongside T02/T03)
                       T04 ──→ T05 → T06 │
                                  T09 ◄─┘
Phase 1  T10 → T11 → T12 → T13 → T14
Phase 2+3        T11 → T15 ─┬→ T16 → T17, T18         (contacts lane)
                            └→ T19 → T20 → T21 → T22 → T23, T24   (deals lane)
Phase 4–7  activity (T25–T29) │ tasks (T30–T31) │ notifications (T32–T36) │ lead view (T37–T39)
Phase 8  T40 demo data → T41 HubSpot comparison
```

With 5 people, a good rhythm is: **1–2 people on Phase 0**, while the others finish the HubSpot role-play and review this plan. From Phase 2 on, up to **3–4 lanes** can be busy at once.

## Assumptions to confirm

⚠️ **These were not decided in the meetings. I filled the gaps so the plan could be written. Each is tagged (A1…) and referenced in the issues it affects. Comment on issue [#1](https://github.com/Hardeep-vt/custom-crm/issues/1) to confirm or change them before the affected task starts.**

| # | Topic | Assumption |
|---|---|---|
| **A1** | Roles | v1 has only two roles: **Sales rep** and **Sales lead**. The lead is also the admin who creates user accounts. The "presentation team" is a team tag on a user, not a separate role. |
| **A2** | Pipelines | v1 has **one pipeline (Sales)**. The database allows more pipelines later, but the UI doesn't offer creating them. |
| **A3** | Email & calls | ✅ Confirmed: emails, calls and meetings are **logged by hand** in v1. Gmail/Outlook sync is Phase 9. |
| **A4** | Visibility | Reps can **view** all companies, contacts and deals, but **edit only the ones they own**. The notes only said "can't edit". If reps should not even *see* other reps' accounts, T11/T15/T20 change. |
| **A5** | 10-day follow-up rule | "Applies to both replied and non-replied threads" is read as: if the **latest logged email with a contact is more than 10 days old, whoever sent it**, remind the owner, unless the contact's deals are closed or the rep snoozed it. There are no email "threads" in v1 (manual logging), so the rule works **per contact**. |
| **A6** | Deal stages | The 5 agreed stages, plus **Closed won** and **Closed lost**. Otherwise there is no way to end a deal that dies at stage 2. |
| **A7** | Notification channel | Notifications are **in-app only** in v1 (a bell icon). No email, Slack or phone push. |
| **A8** | Real-time | The bell **refreshes every 60 seconds** rather than updating instantly (no websockets). Per Hardeep's 25/10 point, real-time is a business decision, and a minute is fine for reminders. |
| **A9** | Industry field | A dropdown of common industries that **also accepts a custom value**. This fixes the HubSpot gap Siddhant found ("time machine" didn't fit). |
| **A10** | Contact fields | **Position** = job title (e.g. "VP Sales"). **Role** = buying role (Decision maker, Influencer, User, Other), because only the decision maker moves into the deals pipeline (21/10). |
| **A11** | Contact switches company | Past emails and calls **stay with the old company**, because that's where the conversation happened. New activity goes to the new company. The contact keeps an employment history. |
| **A12** | Currency | Deal amounts are stored with a currency, **default INR**, and there is no currency conversion. |
| **A13** | Customer data | "How long they've used the product" and "feedback" are **entered by hand** in v1 (no product or Customer Success system exists yet). **Marketing form interactions** for new customers are **deferred** to the Marketing phase, because there are no forms to pull from yet. |
| **A14** | Scheduled jobs | Reminders run **hourly via a GitHub Actions cron** that calls the app, because free hosting sleeps and can't run a background scheduler reliably. Reminders may therefore arrive up to about an hour late. |
| **A15** | Deadline reminder | A task reminder fires **24 hours before** the due time, plus one notice when it becomes overdue. |
| **A16** | Reassigning | Reassigning a **company** can optionally move its **open deals, contacts and open tasks** to the new rep as well (a checkbox). Closed deals keep their original owner, for credit and stats. |
| **A17** | Hosting accounts | Free tiers of **Render** (backend), **Neon** (Postgres) and **Vercel** (frontend), created under **Hardeep's** account. Free Render sleeps after 15 minutes idle, so the first load takes about 30 seconds. That's fine for a prototype. |
| **A18** | Database design | **One Postgres database** with sales tables for now. The master + per-department database design from 25/10 is deferred until Marketing, Finance or CS are added. The table names are chosen so that later split stays possible. |
| **A19** | Products / SKUs | **Not in v1.** A deal has a single amount. Products, SKUs and line items come later. |
| **A20** | Team | The 5 people are Hardeep, Siddhant, Arjun, Apurva and Om. **Apurva's and Om's GitHub handles are still needed** to invite them. |
| **A21** | Who does Phase 0 | Phase 0 is mostly sequential. **One or two people** should own it, so the rest aren't blocked waiting. Suggested: whoever is most comfortable with setup work. |
| **A22** | Meeting notes | The three meeting summaries are saved in `docs/meetings/`, so anyone can give them to an LLM as context (Hardeep's 25/10 workflow). They're in this private repo. |

## Data model (v1)

```
User ─owns─▶ Company ◀──works at── Contact ──▶ ContactCompanyHistory
                │                     │  └──▶ ContactNote
                ├──▶ Deal ──▶ PipelineStage (Pipeline)
                │     ├──▶ DealStageHistory
                │     └──▶ DealComment
                ├──▶ Activity   (email/call/meeting/note; links company, contact, deal)
                ├──▶ Task       (assignee, created_by; links contact/company/deal)
                └──▶ CustomerFeedback
User ──▶ Notification
```

## Task list

42 tasks. Each is a GitHub Issue with its full spec (goal, what to build, done-when checklist).

### Phase 0 - Foundation

Repo, app skeletons, database, CI, deployment, login. Mostly sequential: do these one after another.

| Issue | Task | Area | Depends on |
|---|---|---|---|
| [#1](https://github.com/Hardeep-vt/custom-crm/issues/1) **T00** | Team: review and confirm the assumptions in PLAN.md | docs | — |
| [#2](https://github.com/Hardeep-vt/custom-crm/issues/2) **T01** | Repo conventions: folder layout, CONTRIBUTING, PR and issue templates | docs, infra | — |
| [#3](https://github.com/Hardeep-vt/custom-crm/issues/3) **T02** | Backend skeleton: FastAPI app with health check and tests | backend | [#2](https://github.com/Hardeep-vt/custom-crm/issues/2) |
| [#4](https://github.com/Hardeep-vt/custom-crm/issues/4) **T03** | Database setup: local Postgres, SQLAlchemy and Alembic migrations | backend, infra | [#3](https://github.com/Hardeep-vt/custom-crm/issues/3) |
| [#5](https://github.com/Hardeep-vt/custom-crm/issues/5) **T04** | Frontend skeleton: React + Vite + TypeScript app shell | frontend | [#2](https://github.com/Hardeep-vt/custom-crm/issues/2) |
| [#6](https://github.com/Hardeep-vt/custom-crm/issues/6) **T05** | CI: GitHub Actions for backend tests and frontend build on every PR | infra | [#3](https://github.com/Hardeep-vt/custom-crm/issues/3), [#5](https://github.com/Hardeep-vt/custom-crm/issues/5) |
| [#7](https://github.com/Hardeep-vt/custom-crm/issues/7) **T06** | Deploy early: backend on Render, database on Neon, frontend on Vercel | infra | [#4](https://github.com/Hardeep-vt/custom-crm/issues/4), [#5](https://github.com/Hardeep-vt/custom-crm/issues/5), [#6](https://github.com/Hardeep-vt/custom-crm/issues/6) |
| [#8](https://github.com/Hardeep-vt/custom-crm/issues/8) **T07** | Users and roles: user table and seed script | backend | [#4](https://github.com/Hardeep-vt/custom-crm/issues/4) |
| [#9](https://github.com/Hardeep-vt/custom-crm/issues/9) **T08** | Auth API: login, current user, role checks | backend | [#8](https://github.com/Hardeep-vt/custom-crm/issues/8) |
| [#10](https://github.com/Hardeep-vt/custom-crm/issues/10) **T09** | Login UI: login page, protected routes, logout | frontend | [#5](https://github.com/Hardeep-vt/custom-crm/issues/5), [#9](https://github.com/Hardeep-vt/custom-crm/issues/9) |

### Phase 1 - Companies

Create, list, edit and view companies, with owner-only editing.

| Issue | Task | Area | Depends on |
|---|---|---|---|
| [#11](https://github.com/Hardeep-vt/custom-crm/issues/11) **T10** | Company model and migration | backend | [#9](https://github.com/Hardeep-vt/custom-crm/issues/9) |
| [#12](https://github.com/Hardeep-vt/custom-crm/issues/12) **T11** | Company API with ownership permissions | backend | [#11](https://github.com/Hardeep-vt/custom-crm/issues/11) |
| [#13](https://github.com/Hardeep-vt/custom-crm/issues/13) **T12** | Company list page | frontend | [#10](https://github.com/Hardeep-vt/custom-crm/issues/10), [#12](https://github.com/Hardeep-vt/custom-crm/issues/12) |
| [#14](https://github.com/Hardeep-vt/custom-crm/issues/14) **T13** | Company create and edit form | frontend | [#13](https://github.com/Hardeep-vt/custom-crm/issues/13) |
| [#15](https://github.com/Hardeep-vt/custom-crm/issues/15) **T14** | Company detail page with tab layout | frontend | [#14](https://github.com/Hardeep-vt/custom-crm/issues/14) |

### Phase 2 - Contacts

Contacts linked to companies, including a contact switching companies.

| Issue | Task | Area | Depends on |
|---|---|---|---|
| [#16](https://github.com/Hardeep-vt/custom-crm/issues/16) **T15** | Contact model and API | backend | [#12](https://github.com/Hardeep-vt/custom-crm/issues/12) |
| [#17](https://github.com/Hardeep-vt/custom-crm/issues/17) **T16** | Contact list, form and detail page | frontend | [#15](https://github.com/Hardeep-vt/custom-crm/issues/15), [#16](https://github.com/Hardeep-vt/custom-crm/issues/16) |
| [#18](https://github.com/Hardeep-vt/custom-crm/issues/18) **T17** | Contact switches company: keep the affiliation history | backend, frontend | [#16](https://github.com/Hardeep-vt/custom-crm/issues/16), [#17](https://github.com/Hardeep-vt/custom-crm/issues/17) |
| [#19](https://github.com/Hardeep-vt/custom-crm/issues/19) **T18** | Contact notes section | backend, frontend | [#16](https://github.com/Hardeep-vt/custom-crm/issues/16), [#17](https://github.com/Hardeep-vt/custom-crm/issues/17) |

### Phase 3 - Deals & pipeline

Deals, the 5-stage pipeline, stage history and a pipeline board.

| Issue | Task | Area | Depends on |
|---|---|---|---|
| [#20](https://github.com/Hardeep-vt/custom-crm/issues/20) **T19** | Pipeline, stages and deal model | backend | [#12](https://github.com/Hardeep-vt/custom-crm/issues/12), [#16](https://github.com/Hardeep-vt/custom-crm/issues/16) |
| [#21](https://github.com/Hardeep-vt/custom-crm/issues/21) **T20** | Deal API with permissions | backend | [#20](https://github.com/Hardeep-vt/custom-crm/issues/20) |
| [#22](https://github.com/Hardeep-vt/custom-crm/issues/22) **T21** | Move deal across stages, with stage history | backend | [#21](https://github.com/Hardeep-vt/custom-crm/issues/21) |
| [#23](https://github.com/Hardeep-vt/custom-crm/issues/23) **T22** | Deal list and create/edit form | frontend | [#15](https://github.com/Hardeep-vt/custom-crm/issues/15), [#21](https://github.com/Hardeep-vt/custom-crm/issues/21) |
| [#24](https://github.com/Hardeep-vt/custom-crm/issues/24) **T23** | Pipeline board (kanban) view | frontend | [#22](https://github.com/Hardeep-vt/custom-crm/issues/22), [#23](https://github.com/Hardeep-vt/custom-crm/issues/23) |
| [#25](https://github.com/Hardeep-vt/custom-crm/issues/25) **T24** | Deal detail page with stage history | frontend | [#22](https://github.com/Hardeep-vt/custom-crm/issues/22), [#23](https://github.com/Hardeep-vt/custom-crm/issues/23) |

### Phase 4 - Activity & timeline

Logging emails/calls/meetings and the per-company history timeline.

| Issue | Task | Area | Depends on |
|---|---|---|---|
| [#26](https://github.com/Hardeep-vt/custom-crm/issues/26) **T25** | Activity model and API (manual logging of emails, calls, meetings) | backend | [#16](https://github.com/Hardeep-vt/custom-crm/issues/16), [#21](https://github.com/Hardeep-vt/custom-crm/issues/21) |
| [#27](https://github.com/Hardeep-vt/custom-crm/issues/27) **T26** | Log activity UI | frontend | [#26](https://github.com/Hardeep-vt/custom-crm/issues/26), [#15](https://github.com/Hardeep-vt/custom-crm/issues/15) |
| [#28](https://github.com/Hardeep-vt/custom-crm/issues/28) **T27** | Company timeline and "last interaction" | backend, frontend | [#18](https://github.com/Hardeep-vt/custom-crm/issues/18), [#22](https://github.com/Hardeep-vt/custom-crm/issues/22), [#27](https://github.com/Hardeep-vt/custom-crm/issues/27) |
| [#29](https://github.com/Hardeep-vt/custom-crm/issues/29) **T28** | Customer info: customer since and feedback | backend, frontend | [#15](https://github.com/Hardeep-vt/custom-crm/issues/15) |
| [#30](https://github.com/Hardeep-vt/custom-crm/issues/30) **T29** | Response patterns per contact | backend, frontend | [#26](https://github.com/Hardeep-vt/custom-crm/issues/26) |

### Phase 5 - Tasks

Tasks per contact: self-added by reps or assigned by the sales lead.

| Issue | Task | Area | Depends on |
|---|---|---|---|
| [#31](https://github.com/Hardeep-vt/custom-crm/issues/31) **T30** | Task model and API (self-added and lead-assigned) | backend | [#16](https://github.com/Hardeep-vt/custom-crm/issues/16), [#21](https://github.com/Hardeep-vt/custom-crm/issues/21) |
| [#32](https://github.com/Hardeep-vt/custom-crm/issues/32) **T31** | Tasks UI: My Tasks page and task sections | frontend | [#31](https://github.com/Hardeep-vt/custom-crm/issues/31), [#17](https://github.com/Hardeep-vt/custom-crm/issues/17) |

### Phase 6 - Notifications & automation

In-app notifications, deadline reminders, 10-day follow-ups, presentation-team alerts.

| Issue | Task | Area | Depends on |
|---|---|---|---|
| [#33](https://github.com/Hardeep-vt/custom-crm/issues/33) **T32** | In-app notifications: model, API and bell UI | backend, frontend | [#9](https://github.com/Hardeep-vt/custom-crm/issues/9), [#10](https://github.com/Hardeep-vt/custom-crm/issues/10) |
| [#34](https://github.com/Hardeep-vt/custom-crm/issues/34) **T33** | Scheduled jobs runner | backend, infra | [#33](https://github.com/Hardeep-vt/custom-crm/issues/33), [#7](https://github.com/Hardeep-vt/custom-crm/issues/7) |
| [#35](https://github.com/Hardeep-vt/custom-crm/issues/35) **T34** | Job: task deadline reminders | backend | [#31](https://github.com/Hardeep-vt/custom-crm/issues/31), [#34](https://github.com/Hardeep-vt/custom-crm/issues/34) |
| [#36](https://github.com/Hardeep-vt/custom-crm/issues/36) **T35** | Job: 10-day email follow-up reminder | backend, frontend | [#26](https://github.com/Hardeep-vt/custom-crm/issues/26), [#34](https://github.com/Hardeep-vt/custom-crm/issues/34) |
| [#37](https://github.com/Hardeep-vt/custom-crm/issues/37) **T36** | Presentation stage alerts the presentation team | backend | [#22](https://github.com/Hardeep-vt/custom-crm/issues/22), [#33](https://github.com/Hardeep-vt/custom-crm/issues/33) |

### Phase 7 - Sales lead view

Full overview, reassigning reps, and comments on deals.

| Issue | Task | Area | Depends on |
|---|---|---|---|
| [#38](https://github.com/Hardeep-vt/custom-crm/issues/38) **T37** | Sales lead overview dashboard | backend, frontend | [#23](https://github.com/Hardeep-vt/custom-crm/issues/23), [#15](https://github.com/Hardeep-vt/custom-crm/issues/15) |
| [#39](https://github.com/Hardeep-vt/custom-crm/issues/39) **T38** | Reassign reps across deals and companies | backend, frontend | [#12](https://github.com/Hardeep-vt/custom-crm/issues/12), [#21](https://github.com/Hardeep-vt/custom-crm/issues/21), [#33](https://github.com/Hardeep-vt/custom-crm/issues/33) |
| [#40](https://github.com/Hardeep-vt/custom-crm/issues/40) **T39** | Comments on deals (lead to rep) | backend, frontend | [#25](https://github.com/Hardeep-vt/custom-crm/issues/25), [#33](https://github.com/Hardeep-vt/custom-crm/issues/33) |

### Phase 8 - Wrap-up v1

Demo data and the HubSpot comparison.

| Issue | Task | Area | Depends on |
|---|---|---|---|
| [#41](https://github.com/Hardeep-vt/custom-crm/issues/41) **T40** | Demo data: a role-play company selling a Zoom-like product | backend | [#26](https://github.com/Hardeep-vt/custom-crm/issues/26), [#31](https://github.com/Hardeep-vt/custom-crm/issues/31) |
| [#42](https://github.com/Hardeep-vt/custom-crm/issues/42) **T41** | HubSpot comparison: role-play the sales flow and write up the gaps | docs | [#37](https://github.com/Hardeep-vt/custom-crm/issues/37), [#38](https://github.com/Hardeep-vt/custom-crm/issues/38), [#39](https://github.com/Hardeep-vt/custom-crm/issues/39), [#40](https://github.com/Hardeep-vt/custom-crm/issues/40), [#41](https://github.com/Hardeep-vt/custom-crm/issues/41) |

## Later (not in v1, not yet broken into tasks)

- **Email & calendar:** Gmail/Outlook sync for emails (replaces manual logging), and **calendar sync** of CRM tasks (Arjun).
- **AI:** **AI summary** of past calls and emails for a rep taking over a deal (Arjun); **AI-generated tasks** from meeting recordings.
- **Gamification (nice-to-have):** Monthly per-rep stats (calls, conversions, deals won), and a leaderboard that tracks volume and effort separately.
- **Marketing:** Website forms, outreach lists, form responses → positive responses handed to Sales; engagement history shown to reps.
- **Other departments:** Finance (confirmed-sale records), Customer Success (onboarding, service data), the master DB with department DBs, and the leadership timeline per company (purchase date, billing frequency, renewal).
- **Products:** Products, SKUs, billing frequency, and line items on deals.
- **Platform:** Multiple pipelines, custom fields, import from CSV/HubSpot, an audit log, and email notifications.

When v1 is done, we pick from this list, using the HubSpot comparison (T41) to prioritise.

