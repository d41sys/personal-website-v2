# CLAUDE.md — d41sy.com

## Project

Academic personal website for Tien-Dat Le at d41sy.com.
Target audience: PhD admissions committees (Fall 2027 applications).

## Tech Stack

- **Framework**: Astro 5.x (static site generation)
- **Styling**: TailwindCSS v4 via `@tailwindcss/vite` Vite plugin (no `tailwind.config.mjs`)
- **Fonts**: Self-hosted via `@fontsource` — Atkinson Hyperlegible Mono, IBM Plex Mono, Inter
- **Icons**: Inline SVG (Phosphor-style)
- **Animations**: CSS + Intersection Observer only — no JS animation library

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Build for production (outputs to dist/)
npm run preview   # Preview production build
```

## File Structure

```
src/
  layouts/BaseLayout.astro     # HTML shell, meta tags, theme init script
  components/
    Nav.astro                  # Sticky nav with smooth-scroll links
    Hero.astro                 # Name, title, tagline, contact row
    Research.astro             # Interests + narrative arc timeline
    Publications.astro         # Grouped publications from content collection
    Experience.astro           # Two-column research/industry
    Education.astro            # Vertical timeline
    Skills.astro               # Tech skills + peer review service
    Honors.astro               # Awards flat list
    Footer.astro               # Name, email, year, social links
    ScrollReveal.astro         # Intersection Observer init script
    ThemeToggle.astro          # Dark/light toggle button
    SectionHeading.astro       # Reusable h2 + accent rule
    PublicationEntry.astro     # Single publication row
  content/
    config.ts                  # Zod schemas for content collections
    publications/publications.yaml
    experience/experience.yaml
  pages/index.astro            # Page assembly
  styles/global.css            # Design tokens, base styles
public/
  favicon.svg
  og-image.svg                 # TODO: replace with 1200x630 PNG
  robots.txt
docs/design-guideline.md
```

## Design Constraints (DO NOT VIOLATE)

- No rounded corners
- No box shadows
- No gradients
- No decorative illustrations
- No animation libraries
- Sharp, flat, typographic only

## Content Updates

Content lives in YAML files:
- `src/content/publications/publications.yaml` — update when new papers publish
- `src/content/experience/experience.yaml` — update when roles change

After editing YAML, run `npm run build` to verify no schema errors.

## Known TODOs

- [ ] Replace `og-image.svg` with a proper 1200x630 PNG
- [ ] Verify 4th author on J.7 in publications.yaml (marked with TODO comment)
- [ ] Add Google Scholar certifications link when available
