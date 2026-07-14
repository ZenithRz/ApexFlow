# AGENT INSTRUCTIONS — READ THIS FIRST

You are working on the **ApexFlow** project as a collaborative AI agent alongside another agent.

## CRITICAL RULE — You MUST follow this every session:

### Step 1: Read `AGENT_SYNC.md`
Before doing ANYTHING, read the file `AGENT_SYNC.md` in the project root. This file contains:
- **Active assignments** — which files the OTHER agent is currently editing (DO NOT touch those files)
- **File ownership** — which components belong to you vs the other agent
- **Session log** — what has already been done so you don't redo work
- **Conflict rules** — how to handle overlapping changes

### Step 2: Update `AGENT_SYNC.md`
After reading it, ADD YOUR TASK to the "Active Assignments" table:
```
| YourName | Task description | list of files you will edit | in-progress |
```
Then commit the change.

### Step 3: Pull latest before coding
Always run `git pull` to get the latest code from the other agent's commits.

## WHY this matters:

1. **Without reading this file**, you will overwrite the other agent's work and cause merge conflicts
2. **Without updating this file**, the other agent will overwrite YOUR work
3. **Without pulling**, you will be working on outdated code

## Collaboration Rules:
- Never push directly to `main` — use a branch + pull request
- Never edit files assigned to the other agent without coordination
- Always communicate through `AGENT_SYNC.md`, not through code comments
- When your task is done, update the status to `done` in the table

## Your Role:
You are responsible for the components assigned to you in the "File Ownership" section of `AGENT_SYNC.md`. Focus on those files only unless you coordinate with the other agent first.
