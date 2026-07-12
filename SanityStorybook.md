# Adding Storybook to `apps/web`

Storybook belongs in **`apps/web`** (the Next.js UI app). `apps/studio` is Sanity and
doesn't need it.

**Stack this is written for:** Next.js 16 · React 19 · Tailwind v4 · TypeScript · pnpm 11 monorepo · Storybook 10.

---

## 1. Initialize from inside the web app

```bash
cd apps/web
pnpm dlx storybook@latest init
```

The initializer auto-detects Next.js + pnpm, installs the right deps into `apps/web`,
creates a `.storybook/` folder, adds example stories under `src/stories/`, and adds
`storybook` + `build-storybook` scripts to `apps/web/package.json`.

> **Monorepo note:** run it *inside* `apps/web` so deps land in that workspace package,
> not the root. After it finishes, run `pnpm install` from the repo root (`sw_portfolio/`)
> so the root lockfile picks everything up.

---

## 2. Pick the framework when prompted

| Option | When to choose |
|---|---|
| **`@storybook/nextjs-vite`** (Vite) | Faster, the default path in Storybook 10, plays well with Tailwind v4 via `@tailwindcss/vite`. **Recommended.** |
| **`@storybook/nextjs`** (webpack5) | Mature fallback. Handles `next/image`, `next/font`, App Router mocking out of the box. Use if you hit a Next-16-specific gap. |

---

## 3. Wire up Tailwind v4 (main gotcha)

Storybook won't apply your styles unless you import them. In `.storybook/preview.ts`:

```ts
import '../src/app/globals.css';
```

With the **Vite** framework, also register the Tailwind plugin in `.storybook/main.ts`:

```ts
import tailwindcss from '@tailwindcss/vite';

export default {
  // ...
  viteFinal: async (config) => {
    config.plugins = config.plugins ?? [];
    config.plugins.push(tailwindcss());
    return config;
  },
};
```

With the **webpack** `@storybook/nextjs` framework, the existing
`postcss.config.mjs` (`@tailwindcss/postcss`) is picked up automatically — no extra step.

---

## 4. Approve the `esbuild` build

During `init`, pnpm prompts **"Choose which packages to build"** and lists `esbuild`.
Press `space` to select it, then `Enter` — esbuild's postinstall downloads its native
binary and Storybook won't bundle without it.

If you skip it (or hit `ERR_PNPM_IGNORED_BUILDS` later), approve it from the repo root:

```bash
pnpm approve-builds
```

---

## 5. Install Playwright with Chromium (component testing)

`init` also asks **"Do you want to install Playwright with Chromium now?"** — say **yes**.

Storybook 10 sets up the Vitest test addon (`@storybook/addon-vitest`), which runs your
stories as real component tests in a headless browser. That browser is Playwright's
Chromium (~130 MB). Accepting now makes `pnpm --filter web test` and the Storybook
"Run tests" button work out of the box.

It's purely additive — decline and Storybook still works for viewing components; you just
install the browser later with:

```bash
pnpm exec playwright install chromium
```

> **CI note:** the Chromium binary isn't committed, so CI needs its own install step
> before the Storybook tests can run:
>
> ```bash
> pnpm exec playwright install --with-deps chromium
> ```

---

## 6. Run it

```bash
pnpm --filter web storybook
```

Opens on http://localhost:6006.

---

## 7. How the scripts are wired

`init` adds the Storybook scripts to **`apps/web` only**:

```json
"storybook": "storybook dev -p 6006",
"build-storybook": "storybook build"
```

**Storybook is NOT part of the root `pnpm dev`.** The root `package.json` runs:

```json
"dev": "pnpm run --parallel dev"
```

That runs the script named `dev` in every workspace package — `next dev` (web) +
`sanity dev` (studio). Storybook's script is named `storybook`, not `dev`, so it's left out.

| Command (from repo root) | Runs |
|---|---|
| `pnpm dev` | Next.js **+** Sanity Studio (parallel) |
| `pnpm --filter web dev` | Next.js only |
| `pnpm --filter web storybook` | Storybook only → http://localhost:6006 |

To run Storybook from the root without renaming Storybook's script, add a passthrough to
the **root** `package.json`:

```json
"storybook": "pnpm --filter web storybook"
```

Then `pnpm storybook` works from the repo root.

---

## Open decision: where do stories live?

- **web-local** (default) — stories sit in `apps/web` next to their components.
- **shared `packages/ui`** — if you later extract a shared component package, point
  Storybook's `stories` glob in `.storybook/main.ts` at `../../packages/ui` too.

---

## Docs

- Next.js framework guide: https://storybook.js.org/docs/get-started/frameworks/nextjs
- Install / init: https://storybook.js.org/docs/get-started/install
- Tailwind + Storybook: https://storybook.js.org/recipes/tailwindcss
