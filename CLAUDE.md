@AGENTS.md

# usama-dev — Usama Riasat's portfolio

Personal portfolio for **Usama Riasat**, Senior Software Engineer (AI agents & chatbots, LLM fine-tuning,
n8n / Make.com / GoHighLevel automation, HIPAA-grade healthcare platforms). Public repo:
`github.com/OsamaRiasat/usama-dev`. Deploy target is Vercel; no custom domain yet.

The goal is a showcase-grade, interactive site where **projects are the most prominent thing**.
Dark-first, lime accent, precise "engineering" feel (Linear/Vercel-level polish, not a template).

## Commands

```bash
npm run dev        # dev server (Turbopack) → http://localhost:3000
npm run build      # production build — every page is statically generated
npm run start      # serve the build
npm run lint       # ESLint (must pass)
npx tsc --noEmit   # type-check (must pass)
npm run shots      # regenerate README screenshots (needs `next start -p 3124` running — see below)
```

Before calling any change done: `npx eslint . && npx tsc --noEmit && npm run build`, then check it visually
(see "Visual verification").

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 (CSS-first config) ·
`motion` (import from `motion/react`) · `lenis` smooth scroll · `cmdk` command palette · `lucide-react` icons ·
`clsx`. Dev-only: `puppeteer-core` for screenshots.

- **Next 16 has breaking changes** — read `node_modules/next/dist/docs/` before using unfamiliar APIs (see AGENTS.md).
  Route `params` are a Promise; type pages with the global `PageProps<"/route/[slug]">` / `LayoutProps<"/">` helpers.
- `lucide-react` (v1.x) has **no brand icons** — GitHub/LinkedIn live in `components/ui/BrandIcons.tsx`.
- Tailwind v4: theme tokens are declared in `app/globals.css` under `@theme inline`; there is no tailwind.config.

## Layout of the code

```
app/
  layout.tsx               fonts, metadata, flash-free theme boot script, Nav, CommandPalette, CursorGlow, SmoothScroll
  page.tsx                 home: Hero → Stats → Capabilities → Projects → Approach → Experience → Skills → Contact (+ JSON-LD)
  projects/[slug]/page.tsx case study (generateStaticParams, dynamicParams = false)
  opengraph-image.tsx      generated social card · sitemap.ts · robots.ts · not-found.tsx · icon.svg
  globals.css              design tokens (dark default + [data-theme="light"]), grain, grid, marquee, reduced-motion
components/
  Nav.tsx                  navItems (section ids) + openPalette(); active-section pill via IntersectionObserver
  CommandPalette.tsx       ⌘K — sections, projects, actions
  sections/                Hero, NodeGraph (canvas), Typewriter, Stats, Capabilities, Approach, Experience, Skills, Contact
  projects/                Projects (filters), ProjectCard, ProjectVisual (browser frame), ProjectMock (illustrated UIs), Gallery (lightbox)
  ui/                      Reveal, SectionHeading, SmoothScroll (scrollToTarget), CursorGlow, ThemeToggle (toggleTheme), BrandIcons
content/                   ALL copy lives here — edit content, not components
  profile.ts               name, tagline, intro, typewriter phrases, stats, links, certificates, education
  projects.ts              Project type, projects[] (array order = display order), categories, getProject()
  experience.ts            timeline; wrap numbers in [[...]] to render them as highlighted metrics
  skills.ts                skills bento groups
scripts/readme-shots.mjs   README screenshot capture
public/                    Usama-Riasat-Resume.pdf, projects/<slug>/ screenshot folders
.github/assets/            README screenshots (JPEG)
```

## Content model & how to change things

**Projects** (`content/projects.ts`) — each has slug, title, tagline, summary, categories, role, optional
`link` / `period` / `confidential`, stack, metrics (first 3 show on the home card, all on the case study),
problem, solution, architecture (flow steps), features, `images`, `mock`, `hue`.

- `images: { cover?, full?, mobile?, gallery? }` — paths under `/projects/<slug>/`. Sizes: cover 1920×1080,
  full = 1440px-wide full-page capture (pans top→bottom on hover), mobile 390×844, gallery 1920×1080.
  With no `cover`/`full`, `ProjectMock` renders an illustrated, always-dark UI for that project.
- `mock` picks the illustration: chat · clinical · vision · funding · shop · paint · flow (n8n canvas) · crm
  (GHL pipeline) · finetune (loss curves + chat). Add a new kind in the `MockKind` type and the `Body` map.
- `hue` (0–360) tints the mock, glow and metric colour for that project.
- `categories` drive the filter tabs; the `categories` array sets tab order.
- **Stack names must match skill names in `content/skills.ts` exactly** (case/punctuation-insensitive) —
  that's how hovering a skill links to the projects that use it.
- `confidential: true` shows an NDA badge and "internal · confidential" in the frame (Clinical AI Platform).

**Adding a home-page section:** add the component to `app/page.tsx`, give it an `id`, add the id to `navItems`
in `Nav.tsx`, and **renumber** the `index` props on `SectionHeading` (currently Capabilities 01, Work 02,
Approach 03, Experience 04, Skills 05) plus the hard-coded `06` in `Contact.tsx`.

## Design system & conventions

- Colours are CSS variables (`--bg`, `--bg-elev`, `--surface`, `--line`, `--line-strong`, `--fg`, `--muted`,
  `--faint`, `--accent` #c8f031, `--accent-ink`, `--accent-soft`) exposed as Tailwind colours (`bg-bg`,
  `text-muted`, `border-line`, `bg-accent`…). Never hard-code theme colours in components; mocks are the
  exception (they're intentionally always dark, like screenshots).
- Theme: `data-theme` on `<html>`, dark by default, persisted in localStorage `theme`; the inline script in
  `layout.tsx` applies it before paint. Tailwind `dark:` variant maps to `[data-theme="dark"]`.
- Fonts: Geist (sans), Geist Mono (labels, chips, eyebrows), Instrument Serif **italic only** (accent words
  like "*intelligent*", "*shipped.*"). Headline pattern: `title` + serif-italic lime `accent` via `SectionHeading`.
- Motion: use `Reveal` for scroll-in; keep animations transform/opacity-only. Everything must respect
  `prefers-reduced-motion`, and continuous animations must pause off-screen / when idle (NodeGraph uses
  IntersectionObserver + ResizeObserver, CursorGlow stops its rAF when settled, Approach autoplay pauses
  off-screen, Stats counters write to the DOM instead of re-rendering).
- Only mark components `"use client"` when they need state, effects or motion.
- **User decisions — don't reintroduce:** no logo in the navbar; no 3D tilt / pointer glare on project frames.
- Mobile matters: check 390px width; keep mocks legible (hide secondary mock panels below `sm`).

## Visual verification

Headless Chrome's CLI `--screenshot` does **not** finish motion animations — use puppeteer-core:
run `npm run build && npx next start -p 3124`, then drive `/Applications/Google Chrome.app` with
puppeteer-core (see `scripts/readme-shots.mjs` for the pattern: set localStorage theme with
`evaluateOnNewDocument`, scroll element into view, wait ~1.8s for reveals, screenshot). Scroll offsets need
≈ −110 to −150px so content isn't hidden under the fixed nav.

`npm run shots` rewrites `.github/assets/*.jpg`; commit them only when the UI actually changed
(re-runs produce animation-timing noise otherwise — `git checkout -- .github/assets` to discard).

## Environment gotchas (this machine)

- `pnpm` via corepack fails with EACCES on `~/.cache` — use **npm**. If npm's cache is not writable, set
  `npm_config_cache` to a writable temp dir.
- macOS has no `timeout`; use `perl -e 'alarm 60; exec @ARGV' <cmd>`.
- `gh` CLI is not installed; the git remote is SSH via host alias `osama` (`git@osama:OsamaRiasat/usama-dev.git`).

## Git & publishing rules

- The repo is **public**. Commits are authored **Usama Riasat <osamariasat@gmail.com>**.
- **Never add Claude attribution** (no `Co-Authored-By: Claude`, no "Generated with Claude Code") to commits or PRs.
- Only commit/push when asked. Keep commit messages short, imperative, with a bulleted body.

## Facts & decisions

- LinkedIn: `linkedin.com/in/osamariasat` (the résumé *text* says "usamariasat" — that's wrong).
  GitHub: `OsamaRiasat`. Email `osamariasat@gmail.com` is public on the site.
- Phone number is **not** shown on the site, but the public résumé PDF contains it — user approved that.
- Clinical AI Platform (IGNIS Health) is under NDA: architecture/mock only, never real screenshots.
- All 9 projects are real work: DeftGPT, LeadFlow AI, Clinical AI Platform, Support Copilot, GHL Growth
  Engine, ZangerSecurity, Retail Capital, NookMart, GoPainting.
- Impact numbers (35% accuracy, 10K+ users, 99.9% uptime, 30% latency, 40% faster delivery) come from the résumé.

## Open items

- Real screenshots for projects (all currently use illustrated mocks) → drop into `public/projects/<slug>/`
  and set `images` in `content/projects.ts`.
- Deploy to Vercel; once a domain exists set `NEXT_PUBLIC_SITE_URL` (used by metadataBase, sitemap, robots).
