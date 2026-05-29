# Latitude Intelligence — Next.js

Production-ready Next.js 14 (App Router) + Tailwind CSS port of the Latitude Intelligence website. Deploy to Vercel in one click.

## Stack

- **Framework:** Next.js 14 (App Router, React Server Components)
- **Styling:** Tailwind CSS + custom global CSS (design tokens, glassmorphism, animations)
- **Type-safe:** TypeScript everywhere
- **Fonts:** `next/font` with Instrument Serif + Geist + Geist Mono — zero CLS
- **Animations:** Canvas (intelligence globe), Intersection-Observer reveals, magnetic buttons, animated counters, custom cursor — all client-side, gracefully degrade with `prefers-reduced-motion`
- **Forms:** API route at `/api/contact` (Edge runtime) with optional [Resend](https://resend.com) integration; mailto fallback if the API is unreachable

## Folder structure

```
.
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Single-page composition
│   ├── globals.css             # Design system + animations
│   └── api/contact/route.ts    # Contact form handler (edge)
├── components/
│   ├── Nav.tsx                 # Sticky nav with blur on scroll
│   ├── Hero.tsx                # Hero copy + CTAs + metric rail
│   ├── HeroCanvas.tsx          # Animated intelligence globe (canvas)
│   ├── About.tsx               # Vision/mission cards
│   ├── StoryModal.tsx          # Founder story modal (verbatim copy)
│   ├── Founder.tsx             # Portrait, credentials, expertise, publication
│   ├── Services.tsx            # 4 glassmorphism service cards
│   ├── Programs.tsx            # 9-cell programs grid
│   ├── Trust.tsx               # Animated counters
│   ├── Contact.tsx             # Form + Calendly card
│   ├── Footer.tsx
│   ├── CustomCursor.tsx        # Blend-mode dot + ring
│   └── RevealRuntime.tsx       # Page-wide reveal/magnetic/counter logic
├── public/assets/              # Founder photo + logo files
├── tailwind.config.ts
├── next.config.mjs
└── .env.example
```

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_CALENDLY_URL` | optional | Booking link shown in the Contact section. |
| `CONTACT_TO_EMAIL` | optional | Team inbox (default: `info@latitudeintelligence.in`). |
| `RESEND_API_KEY` | optional | Enables real email delivery via [Resend](https://resend.com). Without it, the API logs the inquiry and the UI still shows success. |
| `RESEND_FROM_EMAIL` | optional | The sender. Must be a verified Resend domain in production. |

## Replacing assets

Drop into `public/assets/`:

- `suraj-sagan.jpeg` — founder portrait (square, ≥600px recommended)
- `latitude-logo.png` — full official logo (transparent PNG)
- `latitude-mark.png` — globe-mark only (used in nav)

## Deploying to Vercel

1. Push this folder to a Git repo (GitHub, GitLab, or Bitbucket).
2. Import the repo into [Vercel](https://vercel.com/new). The defaults are correct — Vercel auto-detects Next.js.
3. Add environment variables in **Project Settings → Environment Variables**.
4. (Optional) For real email delivery:
   - Sign up at <https://resend.com>, verify your sending domain.
   - Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL` in Vercel.
5. Hit **Deploy**.

Custom domain: in Vercel **Project → Settings → Domains**, add `latitudeintelligence.in` and follow DNS instructions.

## What the contact form does

When the form is submitted:

1. `POST /api/contact` validates required fields and runs on the Edge runtime.
2. If `RESEND_API_KEY` is set:
   - Sends the inquiry to `CONTACT_TO_EMAIL` (team).
   - Sends the confirmation message specified in the brief to the user.
3. If the API is unreachable, the client opens the user's mail app with a pre-filled message to `info@latitudeintelligence.in`.
4. The success banner shown is exactly: **"Thanks for reaching us. We will get back to you soon."**

## Accessibility & motion

- Reveal animations and counters degrade to plain visibility when `prefers-reduced-motion: reduce` is set.
- Custom cursor is suppressed on coarse pointers (touch).
- All interactive elements expose proper labels and focus states.

## License

Proprietary © Latitude Intelligence 2026.
