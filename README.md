# ZEC Code — Clinic Landing Page Template

A reusable, production-ready landing page for dental, dermatology, physiotherapy and other medical practices. Built with Next.js (App Router), React, TypeScript and Tailwind CSS.

All clinic-specific content lives in one file: `src/config/site.ts`.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npx tsc --noEmit   # type-check
npm run build      # production build
npm start
```

## Project structure

```
src/
  config/site.ts          All content, brand colours, contact details, services, doctors, FAQs
  lib/phone.ts            Egyptian mobile validation (returns E.164 or null)
  lib/whatsapp.ts         wa.me link builder
  components/             One component per page section, plus shared UI and icons
  app/layout.tsx          Metadata, language/direction, brand colour variables
  app/globals.css         Theme tokens, focus and reduced-motion rules
  app/page.tsx            Section order for the home page
  app/privacy/page.tsx    Privacy policy draft (must be reviewed before publishing)
public/images/            Clinic photography (see "Images" below)
```

## Customising for a new clinic

Edit `src/config/site.ts`:

| Area | Field(s) |
| --- | --- |
| Name, logo, tagline, SEO | `brand` (`name`, `logoInitials`, `logoImage`, `tagline`, `description`, `url`, `locale`) |
| Brand colours | `colors` (applied as CSS variables, so Tailwind utilities follow them) |
| Language and direction | `brand.lang`, `brand.dir` (`"ltr"` or `"rtl"`) |
| Contact | `contact` (`phone`, `whatsappNumber`, `email`, `address`, `mapUrl`, `hours`) |
| Navigation | `nav` |
| Hero | `hero` (eyebrow, headline, subheadline, trust line, image) |
| Trust points | `trust` |
| Services | `services.items` (title, description, icon) |
| About | `about` (copy, highlights, image) |
| Doctors | `doctors.items` (name, title, specialty, qualifications, optional `image`, `sample`) |
| Patient steps | `journey.steps` |
| Reviews | `reviews`. Leave empty to hide the section. Add only authorised, verifiable reviews. |
| FAQs | `faqs.items` |
| Appointment form copy | `appointment` |
| Footer | `footer` (`copyrightYear`, disclaimer, privacy path) |

Set `isDemo: false` once every demonstration item has been replaced. The "Demonstration content" note in the footer disappears when it is off.

### Sample content

The following is demonstration copy and must be replaced before launch:

- Clinic name, logo initials and description (`brand`)
- All phone numbers, WhatsApp number, email and address (`contact`)
- Trust, about and FAQ copy
- Doctor profiles. These are marked `sample: true` and show a "Sample profile" label until replaced. Qualifications read "Qualification to be added by clinic".
- Privacy policy text (`src/app/privacy/page.tsx`)

Do not publish medical claims, credentials, statistics, prices or availability that the clinic has not verified.

## Images

The hero and about sections expect photographs in `public/images/`:

| File | Used by | Suggested framing |
| --- | --- | --- |
| `hero.jpg` | Hero (right column, desktop; full width, mobile) | Landscape or 4:3, at least 1600px wide. Bright, real consultation or clinic interior. |
| `about.jpg` | About section | Portrait 4:5, at least 1200px wide. Reception or waiting area with natural light. |
| Doctor portraits | Doctors section (optional, set `image` per doctor) | Portrait 4:5, consistent lighting and background. |

These files are not included in the template. When a file is missing, the page shows a branded panel instead of a broken image, and the build prints a `[photo] Missing image` warning. Add the files, then rebuild.

Use photography the clinic owns or is licensed to use. Stock images are acceptable only if their licence permits commercial use.

## Appointment form

The form does not have a booking backend. When submitted, it validates the input and opens WhatsApp with a pre-filled inquiry addressed to the clinic. The page states clearly that this is an inquiry and that the appointment is not booked until the clinic confirms it. Nothing is stored by the website.

Validation accepts Egyptian mobile numbers (010, 011, 012, 015), with or without `+20` or `0020`. To extend validation to other countries, update `src/lib/phone.ts`.

### Connecting a real booking system

To store or route requests in a CRM, email inbox or booking tool:

1. Add a server route (a Route Handler under `src/app/api/`) or a third-party form service endpoint.
2. Validate the payload on the server as well as in the browser.
3. Replace the `window.open` call in `src/components/AppointmentForm.tsx` with a request to that endpoint.
4. Show success only after the endpoint confirms receipt, and keep the wording "request received", not "booked".
5. Protect the endpoint against spam (for example, a rate limit or a honeypot field).
6. Update the privacy policy to name the service that receives the data.

## Fonts

The design calls for Manrope. The template currently uses a font stack that falls back to Inter and the system UI font, because external font hosts were not reachable while the template was built. To self-host Manrope:

1. Place the font file(s) in `src/app/fonts/`.
2. Load them with `next/font/local` in `src/app/layout.tsx` and apply the variable to `<html>`.
3. The `--font-sans` token in `src/app/globals.css` already lists Manrope first.

## Accessibility and motion

- Semantic landmarks (`header`, `nav`, `main`, `section` with labels, `footer`), a skip link, visible focus rings, and form labels with `aria-invalid` and `aria-describedby`.
- The mobile menu uses `aria-expanded`/`aria-controls` and closes with Escape.
- The FAQ uses native `<details>` and `<summary>`.
- Motion is limited to a short hero fade and hover transitions. All motion is disabled under `prefers-reduced-motion`.

## Analytics

No analytics is configured. To track appointment requests and contact clicks, add your provider's script in `layout.tsx` and call its event API from `AppointmentForm.tsx` and the contact links, after the patient has consented where the law requires it.

## Before launch checklist

- [ ] Replace all sample content listed above and set `isDemo: false`
- [ ] Add `public/images/hero.jpg` and `public/images/about.jpg` (and doctor portraits if used)
- [ ] Add only verified doctor qualifications and authorised reviews
- [ ] Check every phone number, WhatsApp number and map link
- [ ] Have the privacy policy and medical disclaimer reviewed for the clinic's jurisdiction
- [ ] Self-host the brand font (see "Fonts")
- [ ] Connect a booking backend, or keep the WhatsApp handoff and say so accurately
- [ ] Set `url` and `metadataBase` for the production domain; update `footer.copyrightYear`
- [ ] Run `npm run lint`, `npx tsc --noEmit` and `npm run build`
- [ ] Review the page at mobile, tablet and desktop widths with real photography

## Arabic and RTL

The structure supports it: `brand.lang` and `brand.dir` set the document direction, and layout uses logical spacing and alignment classes (`ps-`, `pe-`, `text-start`). Arabic copy still needs to be written and checked, and the hero headline and FAQ layouts should be reviewed in RTL before launch.
