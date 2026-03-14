# Design Guideline — d41sy.com

## Aesthetic

Minimalist, typographic, academic. Inspired by technical documentation aesthetics.
Reference: amilabs.xyz — monospace font stack, near-monochrome, flat layouts separated by thin rules.

## Color Palette

| Token | Light | Dark |
|-------|-------|------|
| Background | `#FAFAFA` | `#0A0A0A` |
| Text | `#1A1A1A` | `#EBEBEB` |
| Accent | `#2563EB` | `#60A5FA` |
| Muted | `#6B7280` | `#9CA3AF` |
| Border | `#E5E7EB` | `#2A2A2A` |

No gradients. One accent color. Everything else is monochrome.

## Typography Scale

| Element | Font | Weight | Size |
|---------|------|--------|------|
| H1 (name) | Atkinson Hyperlegible Mono | 700 | `clamp(1.5rem, 4vw, 3rem)` |
| H2 (sections) | Atkinson Hyperlegible Mono | 600 | `clamp(1rem, 2.5vw, 1.375rem)` |
| H3 (subsections) | IBM Plex Mono | 500 | `1rem` |
| Body | Inter | 400 | `1rem` |
| Meta/dates | IBM Plex Mono | 300 | `0.8rem` |

All H1 and H2 use `font-variant: small-caps`.
H1 uses `text-shadow: 0 0 0.2px currentColor` for subtle weight boost.

## Layout

- Max width: `52rem` (832px)
- Container padding: `1.5rem` horizontal
- Section padding: `4rem` vertical
- Section separator: `1px solid var(--color-border)` top border

## Anti-Patterns (NEVER DO)

- No rounded corners (no `border-radius` except 50% on timeline dots)
- No box shadows
- No gradients or color fills on cards
- No decorative illustrations or icons used as decoration
- No animation libraries (GSAP, Framer Motion, etc.)
- No floating cards or elevated surfaces
- No purple/pink color schemes
- No generic AI-generated aesthetic

## Animations

Only two animation types are permitted:

1. **Scroll reveal**: `opacity: 0 → 1` + `translateY(20px → 0)`, 0.6s ease-out, 0.1s stagger between siblings
2. **Link hover underline**: `::after` pseudo-element `width: 0 → 100%`, 0.25s ease, slides from left

Both must be disabled when `prefers-reduced-motion: reduce`.

## Component Conventions

- Sections use `id` attributes for smooth-scroll nav
- Content from YAML files via Astro content collections
- Bold markers in author strings: `**Name**` → `<strong>Name</strong>` via `set:html`
- Tags/badges: flat border, no fill, IBM Plex Mono, uppercase, 0.7rem

## Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| 375px (mobile) | Single column, smaller headings |
| 640px | Two-column sections activate |
| 1024px+ | Full layout |
