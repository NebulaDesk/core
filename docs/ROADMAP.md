# ROADMAP.md

## NebulaDesk Core — Roadmap

**Vision:** Local-first PWA that turns the browser into an app host for private, offline widgets. Secure by default. Share when you choose.

---

### M0 — MVP (Core running)
**Target:** Ship installable PWA with 3 starter widgets + export/import.

**Scope**
- PWA shell: `manifest.webmanifest`, `sw.js`, offline cache
- Local storage: IndexedDB + optional AES-GCM (Web Crypto)
- Widget engine v0: load declarative JSON widgets
- Export/Import: single JSON file (optionally encrypted)
- Starter widgets: Currency Converter, Notes, Checklist
- Basic theming (light/dark)
- CSP baseline (`'self'`, allowlist)

**Deliverables**
- `v0.1.0` GitHub release, Pages demo
- Docs: `GETTING_STARTED.md`, `WIDGETS.md`

---

### M1 — Registry & UX
**Scope**
- Widget registry UI (install/enable/disable)
- Settings UI, theme select, compact mode
- Schema v1 + validation
- CSP hardening & threat model doc
- Telemetry: none by default; optional local logs

**Deliverables**
- `v0.2.0` release
- Docs: schema reference, security notes

---

### M2 — Sharing & Gallery
**Scope**
- Optional relay (Cloudflare Worker/R2) for share links (TTL)
- Signed widget packs (basic signing)
- www site: gallery, docs, examples
- Versioning/compat notes

**Deliverables**
- `v0.3.0` release
- Public gallery seeded

---

### M3 — AI Studio (alpha)
**Scope**
- Prompt → widget JSON generator
- Preview sandbox, validator, one-click add
- Local-LLM adapter (optional), provider adapters

**Deliverables**
- `v0.4.0` release (alpha)
