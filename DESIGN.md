# Design — Nine Centres Reading Almanac

## Visual thesis

Reading Almanac treats Human Design as an editorial reference: warm ivory paper, charcoal ink, classical serif headings, practical sans-serif controls, hairline dividers, and one restrained forest-green accent.

## Content plan

The homepage follows a deliberate reading sequence:

1. Poster-like hero with the promise and a complete bodygraph plate.
2. Foundations and the four terms needed to read a chart.
3. Interactive comparison of the five energy types.
4. Bodygraph anatomy with centres and planetary activations.
5. One paid full-reading offer and a four-step process.
6. Client outcomes, the free chart form, FAQ, field notes, and final CTA.

The `/human-design` route handles chart input. `/human-design/[slug]` is the result workspace with the chart, reference guide, energy-type guide, properties drawer, and paid unlock state.

## Interaction thesis

- Hero copy and chart plate enter in a short, ordered sequence.
- The five-type columns expand one strategy at a time.
- Chart form/result views cross-fade without leaving the page.
- FAQ rows, chart guide tabs, drawer, and checkout use native semantic controls.
- Motion is disabled or reduced when `prefers-reduced-motion` is active.

## Design tokens

| Role | Token | Value |
| --- | --- | --- |
| Paper | `--color-cream` | `#FBFBF9` |
| Ink | `--color-ink` | `#17191A` |
| Accent | `--color-accent` | `#0B3D2E` |
| Quiet text | `--color-muted` | `#8B8E86` |
| Rule | `--color-subtle-border` | `#E8E7E1` |
| Display | `--font-display` | Libre Caslon Text |
| Interface | `--font-sans` | Space Grotesk |

Human Design channels retain personality/design distinction with charcoal and oxblood. Defined centres use a muted mineral palette so the diagram remains legible without becoming the page's only color event.

## Composition rules

- Public content is measured against a `1180px` editorial grid.
- The sticky header counts against the first viewport.
- Headings use the serif face at regular weight; controls and body text use the sans face.
- Sections use dividers and open layout before card treatment.
- White panels are reserved for interactive or reference surfaces.
- The chart and reading APIs remain independent of the presentation layer.

## Responsive behavior

At tablet sizes, paired grids stack and reading surfaces become single-column. At mobile sizes, gutters reduce to `20px`, the primary navigation collapses, actions become full-width where helpful, and chart surfaces keep zero horizontal overflow. The result workspace stacks the chart above its guide.

## Accessibility floor

Keep one H1 per route, labeled form fields, native buttons and links, visible focus states, live form status, semantic dialogs, sufficient text contrast, and keyboard-accessible tabs/accordions. Never use color alone to communicate chart, payment, or publishing state.

## Source map

- `src/styles/base.css` — global tokens and typography.
- `src/styles/almanac-home.css` — homepage composition overrides.
- `src/styles/almanac-routes.css` — chart input and result presentation.
- `src/components/shared/Header.astro` and `Footer.astro` — site chrome.
- `src/components/home/sections/` — public editorial sections.
- `src/components/bodygraph/` and `src/data/bodygraph-geometry.ts` — chart surfaces and channel geometry.
- `src/data/public-copy.ts` — Content Studio defaults and SEO copy.

AstroPages Content Studio remains a separate authenticated tool layer and must not be visually confused with public site content.
