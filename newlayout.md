# Portfolio Revamp Plan

## Goal

Migrate the current terminal-style landing page into a cleaner portfolio homepage inspired by the referenced layout:

- full-screen hero with strong typography
- your name as the primary focus
- a subtle custom cursor treatment
- a cool vector-like 3D visual in the background/right side
- clear sections for Projects and Experience
- content driven by local JSON files or equivalent static data modules
- no backend, database, CMS, or server-side persistence

This document is a planning file only. It does not require implementation changes yet.

## Current Repo Assessment

### Current app structure

- Framework: `Next.js 14.2.16` with App Router
- Styling: `Tailwind CSS v4`
- Animation: `framer-motion`
- UI helpers: `shadcn/ui` style `Button` and `Card`
- Icons: `lucide-react`
- Fonts: `geist`
- Analytics: `@vercel/analytics`
- Content: local markdown in `content/writing/`

### Current page structure

- `app/page.tsx`: terminal-style interactive homepage
- `app/work/page.tsx`: work/projects page with profile card and project cards
- `app/about/page.tsx`: about page
- `app/writing/page.tsx` and `app/writing/[slug]/page.tsx`: writing section
- `components/ProjectCard.tsx`: project card rendering
- `components/ContactSection.tsx`: modal-based contact UI

### Current repo issues relevant to migration

- Homepage experience is entirely centered around the terminal interaction model.
- Project and experience content is hardcoded inside page/component files instead of being content-driven.
- Design tokens are partly duplicated:
  - `app/globals.css`
  - `styles/globals.css`
- Repo contains both `package-lock.json` and `pnpm-lock.yaml`, which indicates mixed package-manager history.
- `next.config.mjs` currently suppresses build/lint/type failures:
  - `eslint.ignoreDuringBuilds: true`
  - `typescript.ignoreBuildErrors: true`
- There is a large dependency surface relative to the actual UI being used.
- `README.md` is effectively empty.

## Target Direction

### High-level product direction

Replace the “terminal as the product” concept with a modern visual portfolio homepage that still feels technical, but no longer behaves like a simulated shell.

The new site should feel:

- intentional, minimal, and polished
- bold in typography
- technical without looking like a terminal toy
- simple to maintain
- fast on mobile and desktop

### Core page architecture

Recommended structure:

1. Hero
2. Projects
3. Experience
4. Optional Writing or Contact footer

This can be a single-page portfolio first, with optional retained subpages later for writing or project detail.

## Visual Design Plan

### Hero section

Primary composition:

- left side:
  - your name in large bold type
  - one short descriptor line or two lines max
  - compact links for GitHub, LinkedIn, email, resume
  - one primary CTA such as `View Projects`
- right side or background layer:
  - a lightweight 3D/vector-inspired object
  - subtle motion tied to scroll or pointer movement

### Suggested hero copy structure

- eyebrow: `Computer Science Student / Software Engineer`
- headline: `Kishan Goli`
- subheadline: one concise sentence describing focus area
- CTA row:
  - `View Projects`
  - `View Experience` or `Resume`

### Background / 3D visual direction

Recommended options, in order of implementation safety:

1. CSS-only faux-3D geometric object
2. SVG-based layered vector object with parallax transforms
3. lightweight WebGL scene using React Three Fiber only if needed

Best initial choice:

- use layered SVG or CSS transforms to create a rotating wireframe/glass/mesh-like form
- keep it abstract, not logo-centric
- place it behind or to the right of the hero text
- add low-amplitude motion only

Suggested visual styles:

- translucent cube / prism
- stacked orbital rings
- floating grid plane with perspective
- wireframe sphere or faceted crystal

### Cursor treatment

User request:

- not a complex custom cursor
- can be a dot or a Mac-like pointer feel

Recommended implementation:

- keep the native cursor on mobile
- on desktop, optionally add a small trailing accent or halo rather than replacing the browser cursor completely
- avoid a large gimmicky cursor that harms usability

Plan options:

1. safest: native cursor only, with hover states doing the work
2. recommended: native cursor plus tiny motion-follow accent
3. avoid unless proven stable: full custom cursor replacing the pointer

### Typography direction

The site should rely on scale and weight more than decoration.

Recommended typography system:

- keep `Geist Sans` if you want a modern engineering aesthetic with minimal dependency change
- alternatively evaluate one more expressive headline font only if it materially improves the look
- maintain high contrast, large type, and tight spacing in the hero

### Color direction

Avoid generic pure black with neon blue terminal styling.

Recommended palette direction:

- background: charcoal / graphite / warm black
- text: near-white
- accent: one controlled cool accent
  - soft mint
  - icy cyan
  - muted steel blue
- supporting surfaces: translucent dark panels or faint grid overlays

### Motion direction

Use motion sparingly and intentionally:

- hero text fade/slide on load
- 3D visual slow drift or rotation
- section reveal on scroll
- card hover lift for projects

Avoid:

- constant noisy motion
- terminal blinking gimmicks
- large cursor distortion effects

## Information Architecture

### Recommended sections

#### 1. Hero

Purpose:

- communicate identity immediately
- set visual tone
- provide quick navigation

Content:

- name
- title/descriptor
- short intro
- social links
- CTA buttons

#### 2. Projects

Purpose:

- show strongest work with consistent presentation

Content per project:

- title
- role
- organization or context
- short summary
- tech stack
- date or period
- links
  - GitHub
  - live demo
  - case study
- media
  - image or video thumbnail

#### 3. Experience

Purpose:

- show internships, research, leadership, and incoming roles

Content per entry:

- company / org
- role
- date range
- location
- one-sentence summary
- 2-4 impact bullets
- stack or domain tags if helpful

#### 4. Optional writing/footer/contact

Options:

- keep writing as a separate page linked from footer/nav
- or include a minimal footer with contact and resume links only

## Content Model Plan

### Why JSON/static data

You asked for fillable JSON-style content. That is the right choice here because:

- no backend is needed
- content is easy to edit
- projects and experience can be mapped into UI sections cleanly
- the site remains deployable as a static portfolio

### Recommended data files

Proposed structure:

- `content/site/profile.json`
- `content/site/projects.json`
- `content/site/experience.json`
- optionally `content/site/socials.json`

Alternative:

- use `.ts` data modules instead of JSON if you want comments and type safety

Best recommendation:

- use TypeScript data modules for stronger typing
- keep the schema JSON-like and easy to edit
- if strict JSON is preferred, validate it with Zod during build

### Proposed profile schema

```json
{
  "name": "Kishan Goli",
  "headline": "Software Engineer and CS student building backend and product systems.",
  "subheadline": "Focused on infrastructure, developer tools, and thoughtful UI.",
  "location": "Santa Barbara, CA",
  "email": "kishangoli@ucsb.edu",
  "resumeUrl": "/resume.pdf",
  "socials": [
    { "label": "GitHub", "url": "https://github.com/kishangoli" },
    { "label": "LinkedIn", "url": "https://linkedin.com/in/kishangoli" }
  ]
}
```

### Proposed projects schema

```json
[
  {
    "slug": "shopify-mini",
    "title": "Shopify Fitness Mini",
    "organization": "Shopify",
    "role": "Software Engineer",
    "period": "2026",
    "summary": "Built an interactive fitness and health web app during a 48-hour hackathon.",
    "impact": [
      "Shipped frontend and backend features under a compressed timeline",
      "Built toward deployment at Shopify scale"
    ],
    "tech": ["React", "TypeScript", "Vite", "Shopify Mini SDK"],
    "image": "/shopify-demo.mp4",
    "links": {
      "demo": "",
      "github": "",
      "caseStudy": ""
    },
    "featured": true
  }
]
```

### Proposed experience schema

```json
[
  {
    "id": "ibm-2026",
    "company": "IBM",
    "role": "Incoming Software Engineer",
    "period": "Fall 2026",
    "location": "",
    "summary": "Incoming engineering role.",
    "highlights": [],
    "tags": ["Software Engineering"]
  }
]
```

### Content rules

- keep summaries to 1-2 sentences max
- keep bullets impact-oriented
- normalize dates and labels
- use one media strategy per project:
  - image
  - video thumbnail
  - or no media

## Technical Architecture Plan

### Recommended app structure after migration

- `app/page.tsx`
  - one-page portfolio shell
- `components/portfolio/Hero.tsx`
- `components/portfolio/ProjectsSection.tsx`
- `components/portfolio/ExperienceSection.tsx`
- `components/portfolio/SiteHeader.tsx`
- `components/portfolio/SocialLinks.tsx`
- `components/portfolio/BackgroundVisual.tsx`
- `components/portfolio/CursorAccent.tsx` (optional)
- `content/site/...`
- `lib/content/...`
- optional:
  - keep `app/writing/*`
  - keep project detail pages only if needed later

### Rendering strategy

Recommended:

- prefer Server Components for static content sections
- isolate animation-only parts into small client components
- do not make the entire homepage client-rendered unless animation requirements force it

This matters because the current homepage is fully client-side due to terminal interaction. The new layout should be simpler and lighter.

### Animation stack recommendation

Use `framer-motion` only if you want to keep the current animation system.

Good uses:

- reveal transitions
- subtle hover motion
- parallax wrappers

Do not use it for:

- heavy 3D rendering
- replacing the cursor itself unless the effect is trivial

If the 3D visual is CSS/SVG based, `framer-motion` is enough.

If true 3D is required later:

- add `three`
- add `@react-three/fiber`
- optionally add `@react-three/drei`

Do not add those unless the simpler SVG/CSS approach is not visually strong enough.

## Dependency Plan

### Dependencies likely worth keeping

- `next`
- `react`
- `react-dom`
- `tailwindcss`
- `postcss`
- `framer-motion` if animations remain
- `lucide-react`
- `geist`
- `clsx`
- `tailwind-merge`
- `class-variance-authority` only if `Button` variants remain useful
- `@radix-ui/react-slot` only if the current `Button` component remains
- `@vercel/analytics` only if you want analytics in production

### Dependencies likely removable after redesign, subject to import audit during implementation

These appear unused or unnecessary for the requested portfolio direction:

- `@hookform/resolvers`
- `@radix-ui/react-accordion`
- `@radix-ui/react-alert-dialog`
- `@radix-ui/react-aspect-ratio`
- `@radix-ui/react-avatar`
- `@radix-ui/react-checkbox`
- `@radix-ui/react-collapsible`
- `@radix-ui/react-context-menu`
- `@radix-ui/react-dialog`
- `@radix-ui/react-dropdown-menu`
- `@radix-ui/react-hover-card`
- `@radix-ui/react-label`
- `@radix-ui/react-menubar`
- `@radix-ui/react-navigation-menu`
- `@radix-ui/react-popover`
- `@radix-ui/react-progress`
- `@radix-ui/react-radio-group`
- `@radix-ui/react-scroll-area`
- `@radix-ui/react-select`
- `@radix-ui/react-separator`
- `@radix-ui/react-slider`
- `@radix-ui/react-switch`
- `@radix-ui/react-tabs`
- `@radix-ui/react-toast`
- `@radix-ui/react-toggle`
- `@radix-ui/react-toggle-group`
- `@radix-ui/react-tooltip`
- `cmdk`
- `date-fns`
- `embla-carousel-react`
- `input-otp`
- `next-themes`
- `react-day-picker`
- `react-hook-form`
- `react-resizable-panels`
- `recharts`
- `sonner`
- `vaul`
- `zod` if JSON validation is not used

### Dependencies to review for version/pinning quality

- `@radix-ui/react-slot` is set to `latest`
- `@vercel/analytics` is set to `latest`
- `geist` is set to `latest`
- `next-themes` is set to `latest`

Plan:

- remove packages that are not needed
- pin retained packages to explicit versions
- use one package manager only

### Package-manager cleanup

Choose one:

- `npm`
- or `pnpm`

Recommended:

- pick one and remove the other lockfile

Current state indicates both:

- `package-lock.json`
- `pnpm-lock.yaml`

That should be cleaned up during implementation to avoid drift.

## Deprecated / Cleanup Plan

### What “deprecated dependencies and whatnot” should mean here

This should include:

1. remove unused packages
2. stop relying on `latest` version ranges
3. remove old unused files/directories
4. stop suppressing lint/type errors in config
5. reduce UI libraries that are no longer part of the design

### Files and areas to review during cleanup

- `package.json`
- `package-lock.json` / `pnpm-lock.yaml`
- `components/theme-provider.tsx`
- `styles/globals.css`
- old terminal-specific code in `app/page.tsx`
- old modal/contact patterns if no longer needed
- unused images in `public/`
- `src/` directory contents if still empty or legacy

### Config cleanup items

#### `next.config.mjs`

Current plan:

- remove `ignoreDuringBuilds`
- remove `ignoreBuildErrors`
- keep `images.unoptimized` only if deployment strategy still needs it

#### TypeScript and linting

Current plan:

- ensure the new layout passes typecheck and lint cleanly
- avoid suppressing build correctness issues

## UX Plan

### Navigation

Recommended options:

1. one-page nav with anchor links
2. sticky minimal top nav
3. no large nav, only compact top-right links

Best recommendation:

- simple sticky header with:
  - name or monogram
  - Projects
  - Experience
  - Writing
  - Resume / Contact

### Projects section layout

Recommended layout:

- stacked cards or 2-column responsive cards
- stronger first featured project
- each card should prioritize:
  - title
  - one-sentence outcome
  - tech tags
  - links

Avoid:

- oversized generic cards
- too much descriptive text

### Experience section layout

Recommended layout:

- vertical timeline or clean stacked rows
- company, role, dates, location
- short impact bullets

Best recommendation:

- stacked experience entries with a thin accent line or timeline marker
- keep it readable and scannable

### Contact treatment

Current contact flow uses a modal.

Recommended new approach:

- simpler inline contact/footer block
- email, LinkedIn, GitHub, resume

Reason:

- a modal is unnecessary for a simple portfolio
- inline contact is easier and cleaner

## Accessibility Plan

The redesign should preserve or improve usability:

- maintain visible keyboard focus states
- never hide important content behind hover-only interactions
- do not replace the cursor in a way that breaks precision
- honor `prefers-reduced-motion`
- ensure text contrast stays high
- keep semantic heading order
- make CTA buttons and external links screen-reader friendly

## Performance Plan

The homepage should stay lightweight.

Recommended constraints:

- avoid heavy WebGL unless clearly necessary
- compress images and video previews
- use `next/image` for raster assets where appropriate
- keep client-side JS minimal
- lazy-load any expensive decorative component

Performance decision:

- default to CSS/SVG motion first
- escalate to 3D libraries only if the design is still not compelling enough

## Implementation Sequence

### Phase 1: Audit and stabilization

1. inventory all routes and shared components still worth keeping
2. choose the single package manager
3. identify unused dependencies with import audit
4. remove config suppression in a controlled branch
5. decide whether writing remains a separate page

### Phase 2: Content extraction

1. move project data out of `app/work/page.tsx`
2. move experience data into its own structured file
3. centralize profile/contact/social data
4. standardize media paths and naming

### Phase 3: Homepage rebuild

1. remove terminal interaction from `app/page.tsx`
2. create new hero section
3. add abstract background visual
4. add projects section
5. add experience section
6. add footer/contact block
7. add optional sticky anchor nav

### Phase 4: Cleanup and consolidation

1. remove old homepage-only terminal code
2. remove unused UI primitives and dependencies
3. remove duplicate CSS sources if not needed
4. simplify contact modal patterns
5. pin dependency versions

### Phase 5: QA and deployment readiness

1. test desktop responsiveness
2. test mobile layout
3. test reduced motion behavior
4. test keyboard navigation
5. test Lighthouse basics
6. verify production build without suppressed errors

## Specific Implementation Recommendations

### Recommendation 1: Keep the site mostly static

Use static content and server-rendered sections wherever possible.

### Recommendation 2: Avoid full custom cursor replacement

Use either:

- native cursor only
- or a minimal decorative trailing accent on desktop

### Recommendation 3: Start with SVG/CSS pseudo-3D, not Three.js

This gives the visual effect you want without adding major complexity.

### Recommendation 4: Use typed data modules unless strict JSON is required

This will make maintenance easier and reduce schema mistakes.

### Recommendation 5: Collapse “about” into the homepage unless it has unique long-form content

Projects and experience are the real priorities for the redesign.

## Proposed File-Level Migration Map

### Likely to replace or heavily rewrite

- `app/page.tsx`
- `app/globals.css`
- `components/ProjectCard.tsx`
- `components/ContactSection.tsx`

### Likely to keep with adaptation

- `app/layout.tsx`
- `app/writing/page.tsx`
- `app/writing/[slug]/page.tsx`
- `lib/writing.ts`
- `components/ui/button.tsx`

### Likely removable or review-only

- `components/theme-provider.tsx`
- `styles/globals.css`
- large sets of unused Radix-based dependencies

## Acceptance Criteria For The Future Migration

The redesign should be considered complete when:

- the terminal-only homepage is replaced with a modern portfolio hero
- the hero clearly centers your name and role
- a subtle vector/3D-style background visual exists and performs well
- projects are rendered from structured local data
- experience is rendered from structured local data
- no backend or database exists in the architecture
- unused/deprecated dependencies are removed
- retained dependencies are pinned intentionally
- the app builds cleanly without lint/type suppression
- the site works well on mobile and desktop

## Open Decisions To Make Before Implementation

These are the only product decisions that should be finalized before coding:

1. keep `framer-motion` or reduce motion further
2. use native cursor only vs. decorative cursor accent
3. keep writing as a separate page vs. homepage link only
4. use JSON files vs. typed TypeScript data modules
5. use CSS/SVG pseudo-3D vs. real Three.js scene

## Recommended Final Approach

If the goal is the cleanest migration with the least risk, the best implementation path is:

- keep Next.js + Tailwind
- keep `framer-motion` for subtle motion only
- rebuild the homepage as a single-page portfolio
- use static typed data modules for projects and experience
- create an abstract SVG/CSS pseudo-3D background visual
- keep native cursor behavior, optionally adding a very small desktop-only accent
- remove the unused Radix/shadcn dependency bulk
- retain writing as a separate lightweight page if you still want it

This approach matches your requested visual direction while keeping the codebase much simpler than the current terminal-first setup.
