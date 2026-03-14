# Plan: Personal Website d41sy.com

## Context

Tien-Dat wants a personal academic website at d41sy.com inspired by the minimalist, technical aesthetic of [amilabs.xyz](https://amilabs.xyz/). The site will serve as a research profile for PhD applications (Fall 2027 targets: CMU, MIT, Stanford, Berkeley, UW, ETH Zurich, Oxford). Content comes from the vault's `About Me - Tien-Dat Le.md`.

The reference site uses: monospace/sans-serif font stack (Atkinson Hyperlegible Mono, IBM Plex Mono, Inter), fluid typography with `clamp()`, small-caps headings, near-monochrome palette, flat layouts separated by thin rules, and zero decorative elements.

---

## Technology

| Layer | Choice |
|-------|--------|
| Framework | **Astro 5.x** (SSG) -- zero JS by default, content collections |
| Styling | TailwindCSS v4 |
| Fonts | Atkinson Hyperlegible Mono, IBM Plex Mono, Inter (self-hosted via @fontsource) |
| Icons | Phosphor Icons |
| Animations | CSS + Intersection Observer (no library) |
| Deploy | Vercel (free tier, auto-deploy from GitHub) |

**Project location:** `.`

---

## Design System

### Colors
- Light: `#FAFAFA` bg, `#1A1A1A` text, `#2563EB` accent
- Dark: `#0A0A0A` bg, `#EBEBEB` text, `#60A5FA` accent
- No gradients. Monochrome with single blue accent.

### Typography
- H1: Atkinson Hyperlegible Mono 700, `clamp(1.5rem, 4vw, 3rem)`, small-caps, `text-shadow: 0 0 0.2px currentColor`
- H2: Atkinson Hyperlegible Mono 600, small-caps
- H3: IBM Plex Mono 500
- Body: Inter 400, line-height 1.6
- Meta/dates: IBM Plex Mono 300, 0.8rem

### Anti-patterns (from user's own UI research notes)
- NO rounded corners everywhere, NO purple-pink gradients, NO floating cards with shadows
- NO generic AI-generated look. Sharp, flat, typographic.

### Animations
- Scroll reveal: fade-in + translate-y 20px, 0.6s ease-out, stagger 0.1s
- Hover: underline slide-in from left on links
- Nothing else. Academic site, not a product landing page.

---

## Sections (single-page, smooth scroll nav)

### 1. Hero
- Name in large small-caps: "Tien-Dat Le"
- Title: "EngD Researcher, TU/e"
- Tagline: "Adversarially robust ML for safety-critical systems"
- Narrative hook: "From offensive security at scale to defensive ML to provably robust systems for critical infrastructure."
- Contact row: Email | GitHub | LinkedIn | X | Scholar (Phosphor icons)

### 2. Research
- Research interests (2-3 sentences)
- Narrative arc as timeline: Vietnam (Zalo, "how do attackers evade detection?") -> Korea (SCH, "is this model secure against adversarial manipulation?") -> Netherlands (TU/e, "how do we certify ML safety in production?")
- Current project: DigiRES

### 3. Publications (headline section)
- Grouped: Under Review, First Author, Contributing, Workshop
- Each entry: category tag, title (linked to DOI), authors (name bolded), journal, year, citation count
- Content collection: `src/content/publications/publications.yaml`

### 4. Experience
- Two columns: Research (left) | Industry (right)
- Research: DigiRES @ TU/e, IoT Network Lab @ SCH (with sub-projects)
- Industry: Zalo/VNG (70M users, 5+ critical vulns), Kmin Academy

### 5. Education
- Timeline: TU/e -> SCH (4.2/4.5) -> HCMUS (3.5/4.0, Top GPA)

### 6. Skills & Service
- Two columns: Technical Skills | Peer Review (10 reviews, 5 journals)

### 7. Honors
- 4 entries as flat list

### 8. Footer
- Name, email, year. Social links. No fluff.

---

## File Structure

```
d41sy.com/
  astro.config.mjs
  tailwind.config.mjs
  package.json
  CLAUDE.md
  docs/design-guideline.md
  public/
    favicon.svg
    og-image.png
  src/
    layouts/BaseLayout.astro
    components/
      Nav.astro
      Hero.astro
      Research.astro
      Publications.astro
      Experience.astro
      Education.astro
      Skills.astro
      Honors.astro
      Footer.astro
      ScrollReveal.astro       # Island: Intersection Observer
      ThemeToggle.astro        # Island: dark/light toggle
    content/
      config.ts                # Content collection schemas
      publications/publications.yaml
      experience/experience.yaml
    pages/index.astro
    styles/global.css          # CSS custom properties, fonts, base
```

---

## Implementation Order

### Phase 1: Scaffold
1. Create directory `~/dev/d41sy.com/`, init git repo
2. `npm create astro@latest`, install Tailwind, fonts, Phosphor
3. Set up `BaseLayout.astro` with CSS custom properties, font imports
4. Implement dark/light theme toggle (inline script in `<head>` to prevent flash)
5. Write `docs/design-guideline.md` + project `CLAUDE.md`

### Phase 2: Content & Sections
1. Create content collections (publications.yaml, experience.yaml) from vault molecule note
2. Build sections top to bottom: Hero -> Research -> Publications -> Experience -> Education -> Skills -> Honors -> Footer
3. Sticky nav with smooth scroll anchors

### Phase 3: Polish
1. ScrollReveal component (fade-in on scroll)
2. Hover animations
3. Responsive testing (mobile 375px, tablet 768px, desktop 1200px+)
4. Favicon, OG image, meta tags, JSON-LD structured data (Person + ScholarlyArticle)
5. Lighthouse audit (target: 100/100)

### Phase 4: Deploy
1. Push to GitHub (`d41sys/d41sy.com`)
2. Connect Vercel, configure custom domain
3. Add `robots.txt` + sitemap (Astro built-in)

---

## Content Sync

Manual. Update vault molecule note first, then update YAML in `src/content/`, push to GitHub. Content changes infrequently (new publication every few months).

---

## Verification

1. `npm run build` -- no errors, static output
2. `npm run preview` -- check all sections render, nav works, theme toggle works
3. Responsive: test at 375px, 768px, 1200px widths
4. Lighthouse: Performance 100, Accessibility 100, Best Practices 100, SEO 100
5. Dark mode: check all sections in both modes
6. Links: all DOI links resolve, social links correct
7. Content: compare publications against vault molecule note for accuracy

