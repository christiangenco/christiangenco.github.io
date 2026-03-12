# christian.gen.co — Personal Website

Christian Genco's personal blog and website.

## Architecture
Custom Node.js static site generator (not Jekyll/Hugo):
- Markdown content in `_*` folders (`_posts/`, `_notes/`, `_books/`, etc.)
- `x/render.js` parses front matter + markdown, renders EJS templates, and writes static HTML
- `x/buildAssets.sh` copies assets and compiles CSS via PostCSS/Tailwind
- Local build output goes to `build/` (with published static output tracked in `docs/`)

## Development
```bash
npm start
```
This runs asset compilation + markdown/template rendering in watch mode and serves `build/` locally.

## Deployment
GitHub Pages, auto-deploys on push to main.
