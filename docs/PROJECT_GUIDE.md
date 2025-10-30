# PROJECT_GUIDE.md

## NebulaDesk Core — GitHub Project Setup (no CLI)

1) Go to **Projects** → **New project** → Name: `Roadmap`.
2) **Views**:
   - Board: Columns = Backlog / In-Progress / Review / Done
   - Table: add fields *Milestone* (text), *Target* (date), *Area* (select)
3) **Custom fields**:
   - Area: Core, Widgets, Security, Docs, Relay, AI
   - Target: date
4) **Add items** (paste as notes, then convert to issues):
   - `[M0][Core] PWA shell (manifest, sw.js, cache)` (Area=Core, Target=YYYY-MM-DD)
   - `[M0][Core] IndexedDB + AES-GCM store`
   - `[M0][Widgets] Currency Converter`
   - `[M0][Widgets] Notes`
   - `[M0][Widgets] Checklist`
   - `[M0][Core] Export/Import`
   - `[M0][Security] CSP baseline`
   - `[M0][Docs] GETTING_STARTED, WIDGETS`
5) Convert each note → **Create issue**, assign labels & milestone.
6) Automation: In **Settings → Workflows**, enable “Item added to project → set status to Backlog”; “Issue closed → set status to Done”.

> Tip: Track milestones M0–M3 using GitHub Milestones and the Project’s “Group by Milestone” view.
