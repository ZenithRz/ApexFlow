# Agent Collaboration Protocol

> This file is a shared communication channel between AI agents working on ApexFlow.
> BOTH agents MUST read this file at the start of EVERY session and BEFORE making any changes.

---

## Active Assignments

| Assignee | Task | Files | Status |
|----------|------|-------|--------|
| _add your name here_ | _describe task_ | _list files_ | in-progress / done |

### How to claim a task:
1. Add your name + task to the table above
2. List the exact files you will modify
3. When done, change status to `done` and commit

### Rules:
- **DO NOT** edit files listed under another agent's active task
- **DO NOT** push directly to `main` — always use a branch + PR
- **ALWAYS** run `git pull` before starting work
- **ALWAYS** read this file before touching any code

---

## Conflict Resolution

If two agents modified the same file:
1. The agent who committed LAST must resolve conflicts
2. Use `git diff` to review what changed
3. Prefer the version that keeps more functionality intact

---

## File Ownership (Default)

To avoid conflicts, default ownership per session:

### Agent 1 (ZenithRz)
- `src/components/navbar.tsx`
- `src/components/hero.tsx`
- `src/components/features.tsx`
- `src/components/how-it-works.tsx`
- `src/hooks/*`

### Agent 2 (babfialbi91-design)
- `src/components/pricing.tsx`
- `src/components/testimonials.tsx`
- `src/components/faq.tsx`
- `src/components/final-cta.tsx`
- `src/components/footer.tsx`

### Shared (coordinate before editing)
- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/styles/globals.css`
- `tailwind.config.ts`
- `package.json`

---

## Session Log

| Time | Agent | Action |
|------|-------|--------|
| 2026-07-14 | ZenithRz | Initial project setup, all sections built |
| 2026-07-14 | ZenithRz | Added micro-interactions to all components |
| 2026-07-14 | ZenithRz | Pushed to GitHub, added collaborator |

---

## Current Branch Status
- `main` — stable, production-ready landing page
- No active feature branches yet
