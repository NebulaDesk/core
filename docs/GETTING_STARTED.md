# GETTING_STARTED.md

## Run locally (no build tools)

1. Clone the repo and serve statically:
   - `python3 -m http.server 8000` or any static server
2. Open `http://localhost:8000`
3. Install as an app (PWA prompt) → use offline.

## Folder map
- `public/` — PWA shell (manifest, service worker, icons)
- `src/` — UI, storage, widget runtime
- `widgets/` — example widgets (JSON)
- `docs/` — guides

## Next steps
- Edit a sample widget in `widgets/`
- Try Export/Import in settings
- Toggle encryption (set passphrase)
