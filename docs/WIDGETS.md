# WIDGETS.md

## Writing a widget (draft)

**Principles:** declarative first, minimal logic, least-privilege.

### Example (concept)
```
{
  "id": "finance.currency-converter",
  "name": "Currency Converter",
  "permissions": { "network": false, "storage": true },
  "ui": {
    "layout": [
      { "component": "number", "id": "try", "label": "TRY", "bind": "state.try" },
      { "component": "number", "id": "eur", "label": "EUR", "bind": "state.eur" }
    ]
  },
  "state": { "try": 0, "eur": 0, "rateEurTry": 36.0 },
  "logic": {
    "onChange": [
      { "when": "try", "do": "state.eur = round(state.try / state.rateEurTry, 2)" }
    ]
  }
}
```

### Permissions
- `network`: false by default. If true, only allowlisted hosts.
- `storage`: read/write local state
- `crypto`: access to local encrypt/decrypt helpers

### Security
- No DOM access from logic; message-pass to runtime
- CSP locked to `'self'` + allowlist
