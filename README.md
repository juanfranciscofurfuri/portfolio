# juanfurfuri

Portfolio of Juan Francisco Furfuri. Astro, no UI framework, no CSS framework.

## Run it

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # static output in dist/
```

## Where things are

| Path | What |
|---|---|
| `src/data/en.json`, `src/data/es.json` | Every visible string. Editing the site means editing these. |
| `src/styles/tokens.css` | Colors, type scale, spacing, buttons. The whole design system. |
| `src/components/` | One component per section. |
| `src/pages/` | `index.astro` is English, `es/index.astro` is Spanish. |
| `tools/shot.mjs` | Screenshots the running site at three widths into `shots/`. |

## Contact form

Netlify Forms. The form is named `contact`; submissions land in the Netlify
dashboard and are forwarded by email. No third-party service, no API key.

## Content rule

Every claim on this site traces back to `job-search/01-perfil/profile.md`.
Nothing is added that is not true there.
