# landing-blazek — Project Guide

## Project Structure

```
landing-blazek/
├── public/              # Static assets served as-is (favicon, og images, fonts)
├── src/
│   ├── assets/          # Processed assets (images optimized by Astro)
│   ├── components/      # Reusable Astro / UI components
│   ├── layouts/         # Page shell layouts
│   ├── pages/           # File-based routes (.astro, .md)
│   └── styles/          # Global CSS entry point (index.css)
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro 7 |
| Language | TypeScript (strict) |
| Styling | CSS (global in `src/styles/`) |
| Dev server | `localhost:4321` |

## Commands

```bash
pnpm dev      # Start dev server at localhost:4321
pnpm build    # Build to ./dist/
pnpm preview  # Preview production build locally
```

## Hard Rules

### Language
- **Code in English. Documentation in English.**
- No Spanish identifiers, comments, or strings inside source files.

### Comments
- **No comments in code.** Self-documenting names only.
- Exception: a single-line comment when the *why* is a hidden constraint or non-obvious invariant.

### Components
- One `.astro` file per component, placed in `src/components/`.
- Name files in PascalCase: `HeroSection.astro`, `NavBar.astro`.
- No dead code committed.

### Clean Code
- Functions do one thing.
- Names reveal intent; no abbreviations.
- No magic numbers or magic strings — use named CSS custom properties or constants.
- Max function length: 30 lines as a guideline.

### Assets
- Images that need optimization go in `src/assets/` and are imported directly in `.astro` files so Astro can process them.
- Static files that must keep their exact URL (favicon, OG images, robots.txt) go in `public/`.
