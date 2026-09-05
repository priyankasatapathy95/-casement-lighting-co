# Casement Lighting Co. — Final Project (Week 4)

A complete, responsive, multi-page business website for a fictional
lighting design studio, built for the Developer Arena internship's final
project. This README follows the exact structure required by the
submission checklist, in order, so each requirement is easy to locate.

---

## 1. Project Overview & Objectives

**The business:** Casement Lighting Co., a small residential, commercial,
and landscape lighting design studio.

**Why this business:** a services business naturally needs several
distinct pages (Home, About, Services, Contact) without padding, and
its subject matter — light, warmth, craft — gave a clear, specific
direction for the visual design rather than a generic template look.

**Objectives for this project:**
- Plan and build a complete, multi-page responsive website
- Apply everything from Weeks 1–3 (HTML structure, CSS layout/theming,
  JavaScript interactivity) to a single cohesive site
- Implement a real contact form with client-side validation
- Follow accessibility and performance basics, not just visual design
- Deploy the finished site to GitHub Pages

---

## 2. Setup & Installation Instructions

1. Install [Visual Studio Code](https://code.visualstudio.com/) (or any
   code editor).
2. Clone or download this repository.
3. Open the project folder in your editor.
4. Open `index.html` in a browser, or use the VS Code "Live Server"
   extension to serve the folder with auto-reload.
5. No build tools, package managers, or frameworks are required — this
   is plain HTML, CSS, and vanilla JavaScript. Google Fonts are loaded
   via a `<link>` tag in each page's `<head>`.
6. To view every page, open `index.html`, `about.html`, `services.html`,
   and `contact.html` — or just click through the site's navigation
   from the homepage.

---

## 3. Code Structure

```
business-site/
├── index.html              # Home page
├── about.html               # About / studio story / process
├── services.html            # 5 services, each with an included-work list
├── contact.html              # Contact form + studio contact info
├── README.md                 # This documentation file
├── css/
│   └── style.css             # Single shared stylesheet for all pages
├── js/
│   └── script.js              # Shared JavaScript: nav toggle + form validation
├── images/
│   ├── logo-mark.svg          # Site logo (vector)
│   ├── work-residential.svg   # Work sample illustration
│   ├── work-commercial.svg    # Work sample illustration
│   └── work-landscape.svg     # Work sample illustration
└── screenshots/                # Screenshots for this documentation
```

**Why one shared `style.css` and `script.js`:** all four pages use the
same header, footer, navigation, buttons, and form styling, so a single
shared file avoids duplicating rules per page and keeps the whole site
visually consistent — a change to the color palette or button style
only has to happen in one place.

**`style.css` internal organization** (in this order, marked with
section comments): Reset → Design tokens (`:root` custom properties) →
Base element styles → Header/Nav → Hero → Layout/Grid/Cards → page-
specific sections (About values/process, Services cards, Contact
form) → Footer → Responsive media queries at the bottom.

**`script.js` internal organization:** one `init...()` function per
feature (mobile nav, contact form), called from a single
`DOMContentLoaded` listener, plus small reusable validation/UI-state
helper functions shared across all form fields.

---

## 4. Design Decisions

- **Color palette:** a warm charcoal background (`#1b1815`) with a
  brass/amber accent (`#c79a56`–`#f6dfae`) — chosen because it's
  literally the color of warm lamplight, tying the palette directly to
  what the business does rather than picking colors arbitrarily.
- **Typography:** `Fraunces` (a warm serif with some character) for all
  headings, paired with `Work Sans` for body text — two clearly distinct
  typefaces so the pairing reads as a deliberate choice.
- **The glow effect** behind the hero headline is a soft radial gradient
  meant to evoke a light source turning on — a single, deliberate
  visual moment rather than decoration repeated on every section.
- **Numbered process steps** on the About page are used only for the
  4-step consultation → plan → install → follow-up sequence, because
  that content is genuinely a sequence — not applied elsewhere as
  decoration.
- **Work sample images** are original SVG illustrations (abstract
  lighting scenes) rather than stock photography, which keeps file
  sizes small and avoids any copyright concerns.

---

## 5. How Technical Requirements Were Met

| Requirement | How it was implemented |
|---|---|
| At least 3 HTML pages | 4 pages: `index.html`, `about.html`, `services.html`, `contact.html`, all sharing consistent header/nav/footer |
| Fully responsive design | Mobile-first media queries at 860px and 640px breakpoints; grids collapse from 3 → 2 → 1 columns; navigation collapses into a hamburger menu on small screens |
| Contact form with validation | `contact.html` validates name, email, project type, and message as required, with an optional but format-checked phone field — see Section 6 below |
| Image optimization | All images are hand-authored SVG (vector), so file sizes are a few KB each with no quality loss at any screen size; below-the-fold images use `loading="lazy"` and explicit `width`/`height` to prevent layout shift |
| Navigation between pages | A shared nav bar links all 4 pages on every page, with `aria-current="page"` marking the active page for both sighted and screen-reader users |
| Deployed to free hosting | Deployed to GitHub Pages (see live link in the repository) |

---

## 6. Form Validation Logic

The contact form (`contact.html`) validates 4 required fields and 1
optional field:

- **Name:** required, must not be empty after trimming whitespace.
- **Email:** required, checked against a regular expression requiring
  text, an `@`, more text, a dot, and more text.
- **Project type:** required, must have a `<select>` option chosen.
- **Message:** required, must be at least 10 characters after trimming.
- **Phone (optional):** if left blank, it's valid — the field is
  optional. If filled in, it's checked against a loose pattern allowing
  digits, spaces, dashes, parentheses, and a leading `+`, so it doesn't
  reject valid formats like `(503) 555-0118` or `+1 503 555 0118`.

Each field validates on `blur` (as the user tabs away) and clears its
error as soon as they start correcting it (on `input`). Submitting the
form re-validates everything at once; if anything fails, submission is
blocked and the specific fields are highlighted — nothing is ever
silently accepted or silently rejected.

---

## 7. Interactive Features

1. **Mobile navigation toggle** — a hamburger button (`☰` / `✕`) shows
   only below 640px, toggling a `.is-open` class on the nav menu and
   updating `aria-expanded` for accessibility. Clicking any link inside
   the open menu closes it automatically.
2. **Real-time contact form validation** — described in detail above.
3. **Active page indicator** — the current page's nav link is marked
   with `aria-current="page"` and an underline, set directly per page
   so it always matches, even with JavaScript disabled.

---

## 8. Accessibility Features

- A "Skip to main content" link, visible on keyboard focus, lets
  keyboard users bypass the repeated header/nav on every page.
- All navigation, header, and footer content uses semantic landmarks
  (`<header>`, `<nav>`, `<main>`, `<footer>`).
- Every image has descriptive `alt` text (decorative icons use
  `aria-hidden="true"` and empty `alt=""` instead, so screen readers
  don't announce them as content).
- All form fields have associated `<label>` elements via `for`/`id`.
- Form errors are exposed via a dedicated element per field plus a
  `role="status" aria-live="polite"` region for the overall submit
  result, so screen reader users hear validation feedback.
- Focus is never hidden — `:focus-visible` has a clear, high-contrast
  outline throughout the site, including on the mobile menu button.
- `prefers-reduced-motion` is respected: smooth scrolling and
  transitions are disabled for users who have that OS setting on.

---

## 9. Performance & Optimization Notes

- All imagery is SVG rather than raster photography — each file is a
  few KB, scales to any screen density with no blur, and required no
  external image-compression step.
- `loading="lazy"` is set on the work-sample gallery images (below the
  fold on the homepage) so they don't block the initial page load.
- Fonts are loaded from Google Fonts with `rel="preconnect"` hints to
  reduce connection setup time.
- CSS uses a single shared stylesheet cached across all 4 pages, rather
  than per-page styles, so navigating between pages doesn't re-download
  styling.

---

## 10. Testing Evidence

- Verified in a real Chromium browser that all 4 pages load with zero
  console errors.
- Confirmed the responsive layout at both 1200px (desktop) and 390px
  (mobile) viewport widths — grids and the nav bar collapse correctly
  at each breakpoint.
- Tested the mobile hamburger menu: opens on click, updates its icon
  and `aria-expanded`, and closes automatically after a link is chosen.
- Tested the contact form directly:
  - Submitting empty shows all 4 required-field errors.
  - An invalid phone number (e.g. "abc") is caught even though the
    field is optional; leaving it blank passes.
  - A fully valid submission shows a success message and resets the
    form.
- Manually re-tested all of the above in the browser after deployment
  to confirm identical behavior on GitHub Pages.

---

## 11. Screenshots

- `screenshots/home-desktop.jpg` — homepage, desktop width
- `screenshots/home-mobile.jpg` — homepage, mobile width
- `screenshots/mobile-nav-menu.jpg` — mobile hamburger menu open
- `screenshots/about-desktop.jpg` — About page with values and process
- `screenshots/services-desktop.jpg` — Services page, 5-service grid
- `screenshots/contact-desktop.jpg` — Contact page with form
- `screenshots/form-validation-errors.jpg` — all field errors after an
  empty submit
- `screenshots/form-validation-success.jpg` — success state after a
  valid submit

---

## 12. What I Learned

This project tied together all three previous weeks into one real
website rather than a single page: HTML structure repeated consistently
across pages, CSS custom properties used to keep a full color/type
system consistent everywhere, and JavaScript reused across pages
through small, page-agnostic functions that no-op safely if their
elements aren't present (e.g. the form validation code doesn't error
out on pages with no contact form). I also spent more time up front on
planning — a color and type system, a content plan for each page —
before writing any code, which made the CSS far more consistent than
if I'd styled each page as I built it.
