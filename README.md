# NebulaDesk Core

> **Local-first. Offline. Personal.**  

NebulaDesk turns your **browser into an app host** for small, private, shareable widgets — dashboards, converters, checklists, notes, and tools that live entirely on your device.

---

## 🌐 Live Demo

You can try NebulaDesk Core directly in your browser here:  
👉 **[https://nebuladesk.github.io/core/](https://nebuladesk.github.io/core/)**  

It works offline after the first load and can be installed as a PWA.

---

## 🌌 Vision

NebulaDesk reimagines the browser as a secure, local-first runtime — not just a viewer.  
Users can **build**, **run**, and **share** lightweight widgets that work offline, store data locally, and can be exported or synced on demand.

No installs. No tracking. No cloud dependencies.

- You own your data.  
- You own your tools.

---

## 🚀 Features (MVP)

- Installable **Progressive Web App (PWA)**
- Works fully **offline** (Service Worker)
- **Local storage** (IndexedDB + optional AES encryption)
- **Widget engine** — declarative JSON or lightweight JS sandbox
- **Export / Import** all user data as JSON
- Example widgets: currency converter, notes, checklist
- Minimal UI with light/dark themes
- Privacy-by-design — no backend required

---

## 🧱 Project Structure

```
core/
├─ public/
│  ├─ index.html
│  ├─ manifest.webmanifest
│  ├─ sw.js
│  └─ icons/
├─ src/
│  ├─ app.js / app.ts
│  ├─ widgets/
│  ├─ data/
│  ├─ ui/
│  └─ security/
├─ widgets/
│  ├─ currency-converter.json
│  ├─ notes.json
│  └─ checklist.json
└─ docs/
   ├─ GETTING_STARTED.md
   └─ WIDGETS.md
```

---

## 🌍 Part of the NebulaDesk Ecosystem

| Repo | Purpose |
|------|----------|
| `nebuladesk/core` | PWA runtime (this repo) |
| `nebuladesk/widgets` | Community widget gallery |
| `nebuladesk/relay` | Optional sharing API (Cloudflare Worker) |
| `nebuladesk/ai-studio` | AI tool for generating widgets from prompts |
| `nebuladesk/www` | Public docs, gallery, and landing page |

---

## 🔒 Security Principles

- Local-first: data stored only on device by default  
- Optional passphrase-based encryption (Web Crypto AES-GCM)  
- No network access unless a widget explicitly requests it  
- Strong Content-Security-Policy ('self' only, allow-listed APIs)  
- Optional future: signed widget packs for integrity verification  

---

## 🧩 Widget Schema (draft)

```
{
  "id": "finance.currency-converter",
  "name": "Currency Converter",
  "permissions": { "network": false, "storage": true },
  "ui": { "layout": [] },
  "state": {},
  "logic": {}
}
```

---

## 🗺️ Roadmap

**Milestone 0 (MVP):**
- PWA shell + offline caching  
- Encrypted local storage  
- Example widgets & JSON schema  
- Export/import user data  

**Milestone 1:**
- Widget registry + theming  
- Settings UI  
- CSP hardening  

**Milestone 2:**
- Sharing relay (Cloudflare Worker)  
- Signed widgets, versioning, gallery  

**Milestone 3:**
- AI-Studio: prompt → widget generator  

---

## 🛠️ Development

Clone and serve locally:

```
git clone https://github.com/nebuladesk/core.git
cd core
python3 -m http.server 8000
```

Then open:  
👉 http://localhost:8000

You’ll see NebulaDesk Core running entirely in your browser.

---

## 🧾 License

Licensed under the **Apache License 2.0**.  

See [LICENSE](LICENSE) for details.

---

## 👥 Contributing

Contributions are welcome once the base schema stabilizes.  
Ideas, issues, and early widget prototypes are encouraged — even experimental ones.
