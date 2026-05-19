# Monogamy — Production Readiness Checklist

## 1. Backend & Auth (Phase 2)
- [ ] Enable Lovable Cloud
- [ ] Email/password + Google sign-in
- [ ] Password reset flow with `/reset-password` page
- [ ] `profiles`, `user_roles` (app_role enum), `attorney_profiles`, `cases`, `case_matches`, `messages`, `subscriptions`, `earnings` tables
- [ ] `has_role()` security-definer function
- [ ] RLS policies on every table (deny-by-default)
- [ ] `handle_new_user` trigger to seed profile + default `client` role
- [ ] Storage bucket `case-files` (private) with membership-based RLS
- [ ] Enable Leaked Password Protection (HIBP)

## 2. Subscriptions (Phase 3)
- [ ] PayPal merchant account + product + plan ($19.99/mo)
- [ ] Paystack merchant account + plan
- [ ] Secrets: `PAYPAL_CLIENT_ID`, `PAYPAL_SECRET`, `PAYPAL_WEBHOOK_ID`, `PAYSTACK_SECRET_KEY`
- [ ] Edge functions: `create-paypal-subscription`, `paypal-webhook`, `create-paystack-subscription`, `paystack-webhook`
- [ ] Webhook signature verification on both
- [ ] Subscription state machine (pending → active → past_due → canceled)
- [ ] Billing portal page: view plan, cancel, change provider
- [ ] Route guards: dashboard/portal require `subscriptions.status='active'`
- [ ] Tax/VAT handling decision documented

## 3. Member Dashboard (Phase 4)
- [ ] `/dashboard` shell with sidebar
- [ ] New case form (practice area, urgency, jurisdiction, description, attachments)
- [ ] Cases list + detail view
- [ ] Matched-attorney card(s)
- [ ] Realtime messaging thread per case
- [ ] Status timeline + email notifications on status change
- [ ] File upload to `case-files` bucket

## 4. Attorney Portal (Phase 5)
- [ ] `/attorney` shell with sidebar
- [ ] Onboarding: bar number, jurisdictions, practice areas, bio, hourly rate, avatar
- [ ] Admin verification flow (`is_verified` toggle)
- [ ] Inbox of assigned cases with accept/decline
- [ ] Realtime messaging with clients
- [ ] Earnings dashboard with date filters and CSV export
- [ ] Public attorney profile pages with SEO

## 5. Admin Console
- [ ] `/admin` (role-gated)
- [ ] Verify attorneys
- [ ] Match cases to attorneys
- [ ] View subscriptions, refunds, support tickets
- [ ] User suspension / role management

## 6. Legal & Compliance
- [ ] Update Privacy Policy (PII handling, payment processors, cookies)
- [ ] Update Terms of Service (subscription terms, refund policy, arbitration)
- [ ] Attorney-Client engagement letter template
- [ ] UPL (Unauthorized Practice of Law) disclaimers on every relevant page
- [ ] Concierge AI: "not legal advice" disclaimer reinforced
- [ ] Jurisdiction-aware attorney matching (only show attorneys licensed in client's state)
- [ ] GDPR / CCPA data-export and delete endpoints
- [ ] Cookie consent banner
- [ ] Accessibility statement (WCAG 2.1 AA target)

## 7. Security Hardening
- [ ] Server-side input validation (Zod) on every edge function
- [ ] Rate limiting on auth + edge functions
- [ ] CSP, HSTS, X-Frame-Options, Referrer-Policy headers
- [ ] Rotate `LOVABLE_API_KEY` if exposed
- [ ] Audit RLS policies with `security--run_security_scan`
- [ ] 2FA option for attorneys and admins
- [ ] Audit log table for sensitive actions

## 8. Observability & Ops
- [ ] Error tracking (Sentry or similar)
- [ ] Uptime monitoring
- [ ] Edge function structured logging
- [ ] Subscription/webhook failure alerts
- [ ] On-call runbook
- [ ] Database backup verification

## 9. Performance & SEO
- [ ] Lighthouse > 90 on key pages
- [ ] Image lazy loading + responsive `srcset`
- [ ] Code-split heavy routes
- [ ] `sitemap.xml` regenerated on build
- [ ] JSON-LD: Organization, Service, FAQPage
- [ ] OpenGraph / Twitter card images per page
- [ ] Canonical URLs

## 10. Quality
- [ ] Vitest unit tests on critical utils + RLS
- [ ] Playwright E2E: signup → subscribe → submit case → message
- [ ] Cross-browser smoke (Chrome, Safari, Firefox, mobile Safari)
- [ ] Empty / loading / error states on every async screen
- [ ] Form validation messages user-friendly

## 11. Launch
- [ ] Custom domain + SSL (Lovable publish)
- [ ] Production secrets set (live PayPal/Paystack)
- [ ] Webhook URLs registered with providers
- [ ] Email domain verified (transactional + auth emails)
- [ ] Pricing in real currency confirmed
- [ ] Soft-launch with seed attorneys
- [ ] Support inbox monitored

## 12. Post-launch
- [ ] Auto-matching algorithm (rules → ML)
- [ ] In-app video consultations (Daily.co / Twilio)
- [ ] E-signature on engagement letters (DocuSign / Dropbox Sign)
- [ ] Invoicing + escrow for milestone billing
- [ ] Reviews & ratings for attorneys
- [ ] Mobile apps (PWA → native via Capacitor)
