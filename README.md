# landing-blazek

Landing page for BLAZEK, built with Astro 7 (SSR) and deployed to Vercel. Visitors take a quiz
that matches them to a garment, then join a waitlist that stores the contact in Resend and sends
a welcome email.

## Setup

```sh
pnpm install
cp .env.example .env   # then fill in the Resend values
pnpm dev               # http://localhost:4321
```

The Turnstile keys in `.env.example` are Cloudflare's always-pass test keys, so only the three
Resend values need real credentials to get the waitlist working locally.

## Commands

| Command          | Action                                       |
| :--------------- | :------------------------------------------- |
| `pnpm dev`       | Dev server at `localhost:4321`                |
| `pnpm build`     | Production build to `./dist/`                 |
| `pnpm preview`   | Preview the production build locally          |
| `pnpm storybook` | Component and email previews at `localhost:6006` |

## Environment variables

All six are required. The schema lives in `astro.config.mjs` under `env.schema`, so a missing
variable fails the **build** rather than failing at runtime when someone submits the form.

| Variable | Where it comes from |
| :--- | :--- |
| `RESEND_API_KEY` | [resend.com/api-keys](https://resend.com/api-keys), needs *Sending access* |
| `RESEND_AUDIENCE_ID` | [resend.com/audiences](https://resend.com/audiences), the audience UUID |
| `RESEND_FROM_EMAIL` | `Name <address@domain>`; the domain must be verified in Resend (SPF + DKIM) |
| `PUBLIC_SITE_URL` | Site origin, no trailing slash. Also validated against the request `Origin` header |
| `PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare dashboard > Turnstile |
| `TURNSTILE_SECRET_KEY` | Cloudflare dashboard > Turnstile |

Load all six in Vercel (Production **and** Preview) before deploying, or the build fails.

## Waitlist flow

`WaitlistForm.tsx` → `POST /api/waitlist` → Turnstile verification → Resend contact + welcome email.

`src/pages/api/waitlist.ts` is public, so it is layered behind several checks. Requests are
rejected before reaching Resend when they fail the `Origin` check, exceed the per-IP rate limit,
carry a body over 2 KB, or fail Turnstile verification.

Note that the in-memory rate limiter in `src/lib/rateLimit.ts` is per serverless instance and
resets on cold start. It is a cheap extra layer, not the main defense — that role belongs to
Turnstile and the Cloudflare edge rules below.

## Cloudflare setup

The domain is on Cloudflare. These steps are manual and are what actually absorb volumetric
attacks, before traffic reaches Vercel:

1. **DNS**: proxy enabled (orange cloud) pointing at Vercel, SSL/TLS mode **Full (strict)**.
2. **Rate limiting rule** on path `/api/waitlist`: ~10 requests per minute per IP, action *Block*.
3. **Turnstile**: create a widget for the domain; its two keys go into the env vars above.
4. **Bot Fight Mode**: enabled.

## Known follow-ups

- The welcome email has no `List-Unsubscribe` header, which Gmail and Yahoo expect from bulk
  senders. Adding one requires a real unsubscribe route; a header pointing at a non-existent path
  is worse than none, since providers probe it.
- The CSP in `src/middleware.ts` allows `'unsafe-inline'` for scripts because Astro emits inline
  scripts to hydrate islands. Tightening it needs nonces via Astro's `experimental.csp`.
