# Serenity Spa & Wellness

A production-ready luxury spa booking website — Next.js 15, TypeScript, Tailwind, Prisma/Supabase,
Clerk auth, Resend email, Twilio SMS, and Stripe payments.

## 1. What's included

- Full marketing site: hero, services grid + detail pages, about, therapist bio, gallery with
  lightbox, testimonial carousel, contact section with call/WhatsApp/email/iMessage/Signal links
- Real booking system (`/booking`) — not a contact form: validates input, saves to Postgres via
  Prisma, generates a sequential booking ID (`SPA-YYYYMMDD-0001`), and fires SMS + 2 emails
- Admin dashboard (`/admin`, protected by Clerk) — search/filter bookings, change status
  (approve / reject / cancel / reschedule)
- API routes: `POST /api/bookings`, `POST /api/contact`, `GET/PATCH /api/admin/bookings`
- Rate limiting + honeypot spam protection on public forms
- SEO: metadata, Open Graph, JSON-LD schema, sitemap.xml, robots.txt

## 2. Image placeholders — read before launch

Every photo on the site currently comes from **Picsum** (a free, license-free placeholder image
service) with a gold duotone filter so it reads as "spa" regardless of the underlying photo. I did
not pull real photographs from the web into the code — using someone else's photography without a
license, or photos of identifiable people in a personal-care setting, isn't something I can do for
you here.

To finish the site with real photography:

1. Open `lib/images.ts` — every image on the site is referenced from this one file.
2. Replace each URL with either:
   - Your own or your therapist's professional photos (ideal — full ownership, no licensing risk), or
   - Licensed stock photos from **Unsplash** or **Pexels** (both offer free commercial licenses) —
     search "massage therapy", "spa treatment room", "hot stone massage", "facial spa"
3. Remove the `spa-photo` class from an `<img>` tag once you swap in real photography — it's a
   duotone filter applied to make generic placeholders look intentional; your real photos won't need it.

## 3. Local setup

```bash
npm install
cp .env.example .env
# fill in .env with real values — see section 5 below
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

Visit `http://localhost:3000`.

## 4. Project structure

```
app/
  page.tsx                  → home page (assembles all sections)
  booking/page.tsx           → booking form page
  services/[slug]/page.tsx   → individual service detail pages
  admin/page.tsx             → Clerk-protected admin dashboard
  api/bookings/route.ts      → booking submission handler (DB + SMS + email)
  api/contact/route.ts       → contact form handler
  api/admin/bookings/route.ts → admin: list & update bookings
components/
  sections/                 → all public-facing page sections
  admin/dashboard.tsx        → admin bookings table + tabs
lib/
  images.ts                 → single source of truth for all image URLs
  services-data.ts          → service catalog (name, price, duration, description)
  email.ts / sms.ts / stripe.ts → third-party integration wrappers
  validation.ts              → Zod schemas for booking/contact forms
  rate-limit.ts               → basic spam/abuse protection
prisma/schema.prisma        → Users, Customers, Bookings, Services, Payments, Messages, Reviews
```

## 5. Environment variables — where to get each one

| Variable | Where to get it |
|---|---|
| `DATABASE_URL` | Supabase project → Settings → Database → Connection string (use the "Transaction" pooler URL for serverless) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` | clerk.com → your app → API Keys |
| `RESEND_API_KEY` | resend.com → API Keys. You must verify a sending domain before emails deliver reliably. |
| `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_PHONE_NUMBER` | twilio.com console → buy a phone number capable of SMS |
| `BUSINESS_PHONE_NUMBER` | Already set to `+19368668505` — the number that receives owner SMS alerts |
| `BUSINESS_EMAIL` | Already set to `oliviabellaalvaro@gmail.com` — receives owner email alerts |
| `STRIPE_SECRET_KEY` / `STRIPE_PUBLISHABLE_KEY` / `STRIPE_WEBHOOK_SECRET` | dashboard.stripe.com → Developers → API keys / Webhooks |

## 6. Database migration

```bash
npx prisma migrate dev --name init      # local/dev
npx prisma migrate deploy               # production, run in CI/CD or manually before first deploy
```

## 7. Deploying to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel → New Project.
3. Add every variable from `.env.example` in Project Settings → Environment Variables.
4. Set the Build Command to `npm run build` (default) — `postinstall` already runs
   `prisma generate` automatically.
5. After the first deploy, run `npx prisma migrate deploy` against your Supabase database
   (from your machine or a one-off Vercel deploy hook) to create the tables.
6. Add your production domain to Clerk's allowed origins, and verify your sending domain in Resend.

## 8. Notes on what still needs wiring for full production use

- **Stripe checkout flow**: `lib/stripe.ts` has the deposit-calculation helper; you'll still need
  a `/api/checkout` route that creates a Checkout Session and a `/api/webhooks/stripe` route that
  marks `Payment.status = SUCCEEDED` on the `checkout.session.completed` event.
- **Admin calendar grid**: the dashboard's day/week/month toggle is present but renders a table
  today — wire in `react-big-calendar` or `FullCalendar` against the same `/api/admin/bookings` data.
- **Rate limiting**: current implementation is in-memory (fine for low traffic / single instance).
  For real production scale on Vercel's serverless functions, swap in Upstash Redis
  (`@upstash/ratelimit`), since in-memory state doesn't persist across function invocations.
