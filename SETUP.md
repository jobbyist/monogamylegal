# Formspree + reCAPTCHA Setup Guide

This guide covers how to configure spam protection for the lead generation form at `/start` using Formspree and Google reCAPTCHA.

---

## 1. Formspree Configuration

The form at `/start` already submits to Formspree using the endpoint defined in `src/pages/Start.tsx`:

```ts
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqaqkwzb";
```

To update or replace this endpoint:
1. Log in to [formspree.io](https://formspree.io)
2. Navigate to your form project
3. Copy your form endpoint ID
4. Replace `xqaqkwzb` in the constant above with your form ID

---

## 2. Enabling reCAPTCHA Spam Protection (Formspree Plugin)

Formspree supports reCAPTCHA natively. Follow these steps:

### Step 1 — Get reCAPTCHA Keys

1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin/create)
2. Choose **reCAPTCHA v3** (recommended — invisible, no user friction) or **reCAPTCHA v2 Checkbox**
3. Add your domain (e.g., `monogamy.legal`, `www.monogamy.legal`)
4. Copy your **Site Key** and **Secret Key**

### Step 2 — Add reCAPTCHA to Formspree Dashboard

1. In Formspree, open your form settings
2. Go to **Plugins → reCAPTCHA**
3. Enter your **Secret Key**
4. Save settings

### Step 3 — Add reCAPTCHA to the Frontend

Install the React reCAPTCHA package:

```bash
npm install react-google-recaptcha
```

Or for reCAPTCHA v3:

```bash
npm install react-google-recaptcha-v3
```

#### reCAPTCHA v3 Integration

1. Add your Site Key to `.env`:
   ```
   VITE_RECAPTCHA_SITE_KEY=your_site_key_here
   ```

2. Wrap your app (in `src/main.tsx`) with the provider:
   ```tsx
   import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

   <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}>
     <App />
   </GoogleReCaptchaProvider>
   ```

3. In `src/pages/Start.tsx`, add the token to form submissions:
   ```tsx
   import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

   const { executeRecaptcha } = useGoogleReCaptcha();

   // Inside handleSubmit, before fetching:
   const token = await executeRecaptcha('lead_form_submit');

   // Add to Formspree payload:
   body: JSON.stringify({
     ...formData,
     "g-recaptcha-response": token,
   })
   ```

#### reCAPTCHA v2 Integration

1. Add your Site Key to `.env`:
   ```
   VITE_RECAPTCHA_SITE_KEY=your_site_key_here
   ```

2. In the submit step of the form, add the reCAPTCHA widget:
   ```tsx
   import ReCAPTCHA from 'react-google-recaptcha';

   const recaptchaRef = useRef<ReCAPTCHA>(null);

   // In the JSX before the submit button:
   <ReCAPTCHA
     ref={recaptchaRef}
     sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
     onChange={(token) => setCaptchaToken(token)}
   />

   // Include in payload:
   "g-recaptcha-response": captchaToken
   ```

---

## 3. Additional Formspree Spam Protections

Beyond reCAPTCHA, Formspree offers:

| Feature | How to Enable |
|---------|---------------|
| Honeypot field | Add a hidden field named `_gotcha` to your form |
| Submission rate limiting | Configure in Formspree Dashboard → Settings |
| Email domain blocking | Formspree Dashboard → Spam Filters |
| Akismet spam filtering | Enable in Formspree Dashboard → Plugins |

### Honeypot (no setup required):

Add this hidden field inside the `<form>` element in `Start.tsx`:
```tsx
<input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
```

---

## 4. Clerk Authentication Setup

The Login/Sign Up modal (`src/components/LoginModal.tsx`) includes placeholder instructions for Clerk. To configure:

1. Create an account at [clerk.com](https://clerk.com)
2. Create a new application
3. Add environment variable:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
   ```
4. Install Clerk:
   ```bash
   npm install @clerk/clerk-react
   ```
5. Follow the full integration guide in `src/components/LoginModal.tsx`

---

## 5. Icon Asset — monogamyappicon.png

The file `public/monogamyappicon.png` is currently a placeholder (32×32 black square).

**To replace it with the real icon:**
1. Download the `monogamyappicon.png` from the project assets
2. Place it at `public/monogamyappicon.png`
3. It will automatically be used as:
   - Website favicon
   - Apple Touch Icon
   - Monogamy AI chatbot icon
   - Audio player thumbnail icon (if referenced)

The `index.html` already references `/monogamyappicon.png` for both the favicon and Apple Touch Icon.
