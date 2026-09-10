# Codex Developers

Marketing website for Codex Developers (React + Vite) with a small Node API for lead capture.

## Project root

Use the inner project folder:

```text
codex-developers-main/codex-developers-main
```

## Setup

```bash
npm install
```

## Environment

Copy `.env.example` to `.env` and set values as needed:

| Variable | Description |
|---|---|
| `API_PORT` | API port (default `4000`) |
| `ADMIN_TOKEN` | Bearer token required for `/admin` GET/DELETE. **Required in production.** |
| `NODE_ENV` | Set to `production` for production |
| `CORS_ORIGIN` | Allowed origin in production (e.g. `https://yourdomain.com`) |
| `RESEND_API_KEY` | Resend API key for team lead alerts (optional; no email if unset) |
| `NOTIFY_EMAIL` | Team inbox for alerts (default `infocodexdevelopers@gmail.com`) |
| `MAIL_FROM` | Verified From address (default Resend test sender) |

## Development

```bash
npm run dev
```

- Site: http://localhost:3000
- API: http://localhost:4000
- Vite proxies `/api` to the API server

## Production

```bash
npm run build
set NODE_ENV=production
set ADMIN_TOKEN=your-secret-token
npm start
```

`npm start` serves the built `dist/` folder and the consultations API on `API_PORT`.

## Lead forms

- Header / Hero / CTA consultation button → modal → `POST /api/consultations` with `type: "consultation"`
- Contact page form → `POST /api/consultations` with `type: "contact"`
- Admin UI: http://localhost:3000/admin (enter `ADMIN_TOKEN` when prompted)

## Lead storage (Phase 2)

Leads are stored through `server/leadsStore.js`:

1. **SQLite** (`data/leads.db`) via `better-sqlite3` when the native module loads
2. **JSON fallback** (`data/consultations.json`) if SQLite cannot load (common on some Windows setups)

On first successful SQLite start, any existing `consultations.json` rows are migrated into the database and the file is renamed to `consultations.json.migrated`.

API routes stay the same: `GET` / `POST` `/api/consultations`, `DELETE` `/api/consultations/:id`.

## Email notify (team only)

After a lead is saved, the API sends a notification email to the Codex team via [Resend](https://resend.com).

- Module: `server/notifyEmail.js`
- Recipients: `NOTIFY_EMAIL` only (no auto-reply to the visitor)
- If `RESEND_API_KEY` is missing, notify is skipped and the lead is still saved
- Email failures are logged and never fail the form submission

Setup:

1. Copy `.env.example` to `.env`
2. Add `RESEND_API_KEY`
3. Confirm `NOTIFY_EMAIL` and `MAIL_FROM`
4. Restart `npm run dev`

## Notes

- Privacy Policy and Terms pages are placeholders — replace with reviewed legal copy before launch.
- Portfolio / testimonials / social URLs still need real content when available.
- Restart `npm run dev` after backend changes so the API reloads.
