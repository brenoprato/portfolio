# Breno Porto — Portfolio

Minimalist, fast, static web portfolio with a modern macOS terminal aesthetic (**Ghostty / Kitty** inspired), **Midnight Cobalt & Violet** color palette, **JetBrains Mono** self-hosted typography, and macOS-style spring animations.

Navigation is 100% visual and clickable, with optional keyboard shortcuts (`1`, `2`, `3`, `←`, `→`, `Home`, `End`) and URL hash deep-linking (`#about`, `#projects`, `#contact`).

## Highlights

- **Opening sequence (`hello!, i'm breno!`):** typing animation transitioning into the hero header via Motion shared layout (`layoutId`), skippable on click or any key, persisted per session (`sessionStorage`), replayable from the titlebar, and fully respecting `prefers-reduced-motion`.
- **Internationalization (`EN` / `PT-BR`):** instant language toggle in the titlebar, defaulting to `EN`, persisted in `localStorage`, and syncing `document.documentElement.lang` and `document.title`.
- **Data-driven architecture:** profile, technical pillars, and projects live in typed modules under `src/data/`.
- **Accessible & responsive:** WAI-ARIA Tabs pattern (`tablist`, `tab`, `tabpanel`), `:focus-visible` outlines, `aria-live` copy feedback, safe-area insets, and mobile-first layout (`>= 320px`).

## Tech Stack

- **Core:** Vite 8 · React 19 · TypeScript (strict)
- **Styling:** Tailwind CSS v4 · CSS Custom Properties (`src/styles/tokens.css`) · `@fontsource-variable/jetbrains-mono`
- **Motion & Icons:** `motion/react` · `lucide-react`
- **Testing:** Vitest · jsdom · React Testing Library · `@testing-library/user-event`

## Project Structure

```text
.
├── index.html                 # Metadata, Open Graph, favicon
├── public/favicon.svg         # Minimalist Midnight Cobalt SVG favicon
├── vite.config.ts             # Portable static build (base: VITE_BASE_PATH ?? './')
├── vitest.config.ts           # Vitest + jsdom test configuration
└── src/
    ├── App.tsx                # MotionConfig, I18nProvider, LayoutGroup, shell
    ├── styles/
    │   ├── tokens.css         # Midnight Cobalt & Violet semantic CSS variables
    │   └── index.css          # Tailwind v4 @theme inline, base & cursor styles
    ├── data/
    │   ├── types.ts           # Strict TypeScript models
    │   ├── profile.ts         # Identity, education, bio, side quests, links
    │   ├── pillars.ts         # 4 technical pillars
    │   └── projects.ts        # Typed project list (burnout-study, mp3-tui)
    ├── i18n/
    │   ├── dictionaries.ts    # EN and PT-BR UI strings & ARIA labels
    │   └── I18nContext.tsx    # Locale state + localStorage persistence
    ├── hooks/                 # useReducedMotion, useIntroSequence, useTabNavigation, useClipboard
    ├── utils/                 # Safe storage wrappers & URL hash parser
    ├── components/            # TerminalWindow, TitleBar, TabBar, StatusBar, tabs, intro
    └── test/                  # Unit & integration tests (7 files, 26 tests)
```

## Scripts

```bash
npm install        # Install dependencies
npm run dev        # Start local dev server
npm run typecheck  # Run TypeScript strict check (tsc --noEmit)
npm test           # Run Vitest suite
npm run build      # Typecheck + production static build into dist/
npm run preview    # Preview production build locally
```

## Customization

- **Add a new project:** append a typed `Project` entry to `PROJECTS` in `src/data/projects.ts` (`demoUrl` is optional).
- **Add another theme:** define a new `[data-theme="..."]` block overriding the semantic CSS variables in `src/styles/tokens.css`.
- **Subpath deployment (e.g., GitHub Pages):** `vite.config.ts` defaults to `base: './'`, or you can set `VITE_BASE_PATH=/your-repo/ npm run build`.
