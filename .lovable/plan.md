# Monogamy Platform Build Plan

This is a large, multi-part request. I'll tackle it in phases so each piece lands cleanly. Below is the proposed scope, plus a few decisions I need from you before backend work starts.

---

## Phase 1 — Quick UI fixes + render check (do first, no backend)

1. **Footer logo** — match header logo (28px height, same `monogamy-logo.png`, dark-mode invert).
2. **Floating Concierge button** — restyle as white pill, rounded corners, animated blue↔orange gradient border (CSS conic-gradient + rotation), keep existing dialog behavior.
3. **Full-site smoke test** — load Home, Practice Areas, How It Works, Pricing, About, Contact, FAQ, and the mobile menu in the preview; fix any render errors found.

## Phase 2 — Backend foundation (Lovable Cloud)

4. Enable **Lovable Cloud** (Supabase under the hood) for database, auth, storage, edge functions.
5. Auth: email/password + Google sign-in, with a `profiles` table and `user_roles` table (`client`, `attorney`, `admin`) using the security-definer `has_role()` pattern (never roles on profiles).
6. Tables: `profiles`, `user_roles`, `attorney_profiles`, `cases`, `case_matches`, `messages`, `subscriptions`, `earnings`.
7. RLS policies for every table.

## Phase 3 — Subscription payments (PayPal + Paystack)

8. Pricing page → "Subscribe $19.99/mo" → choose **PayPal** or **Paystack**.
9. Edge functions: `create-paypal-subscription`, `paypal-webhook`, `create-paystack-subscription`, `paystack-webhook` — each verifies the event and writes to `subscriptions`.
10. Post-payment redirect → `/dashboard` with `subscriptions.status = 'active'`.
11. Route guard: dashboard + portal require active subscription (admins exempt).

**Decision needed (Q1 below):** PayPal and Paystack both require your own merchant credentials — Lovable's built-in seamless payments only cover Stripe/Paddle. I'll need you to create the products in each provider and supply API keys via the secrets tool before I can wire them up.

## Phase 4 — Member dashboard (`/dashboard`)

12. Submit a legal request (practice area, urgency, description, jurisdiction, file uploads to Storage).
13. View matched attorneys (admin-assigned for v1; auto-matching is a Phase 6 stretch).
14. Messaging thread with assigned attorney (Supabase Realtime).
15. Case progress timeline (status: submitted → matched → in_progress → closed).

## Phase 5 — Attorney portal (`/attorney`)

16. Onboarding: bar number, jurisdictions, practice areas, bio, hourly rate, avatar.
17. Inbox of incoming/assigned cases with accept/decline.
18. Messaging with clients (same realtime thread).
19. Earnings dashboard (sum from `earnings` table — stub data until billing flows are added).

## Phase 6 — Polish & SEO

20. Header CTA changes based on auth state (Sign In / Dashboard).
21. SEO meta + JSON-LD on each page.
22. Loading + empty + error states across new screens.

---

## Production-readiness to-do list (delivered as `PRODUCTION_CHECKLIST.md`)

Legal & compliance, security hardening, payments go-live, attorney verification, observability, performance, accessibility, testing, deployment, support ops — full checklist written to the repo so you can track it.

---

## Technical notes

- **Roles**: `app_role` enum + `user_roles` table + `has_role(uuid, app_role)` security-definer fn. Never read roles client-side from `profiles`.
- **Auth listener**: `onAuthStateChange` set up *before* `getSession()` in an `AuthProvider`.
- **Payments**: PayPal Subscriptions API and Paystack Subscriptions API, both server-side via edge functions with webhook signature verification. No card data ever touches our app.
- **Realtime messaging**: Supabase Realtime on `messages` table filtered by `case_id`.
- **Storage**: private `case-files` bucket, RLS by `case_id` membership.
- **Concierge button**: gradient border via `::before` pseudo with `background: conic-gradient(from var(--angle), #3b82f6, #f97316, #3b82f6)` animated through `@property --angle`.

---

## Sequencing

I recommend I ship **Phase 1 right now** (UI fixes + render verification + production checklist) in this turn, then start Phase 2 in the next turn after you answer the questions below. Phase 3 needs your PayPal/Paystack keys before it can be completed.

## Questions I need answered before Phase 2+

1. **Payments**: confirm PayPal + Paystack (vs Lovable's built-in Stripe/Paddle which need no account setup). PayPal/Paystack = you provide keys.
2. **Profile data**: any custom fields beyond name, avatar, phone for client profiles?
3. **Attorney verification**: should attorney signup be self-serve (with an `is_verified` flag flipped by admin) or invite-only?
4. **Google sign-in**: include it alongside email/password? (Default yes.)