# Northstar Financial

A Hugo financial research library. Add Markdown files anywhere inside `content/`.
Published reports automatically appear on the homepage and have their own reading pages.
The original AMPX report remains at its existing URL.

## Add a report

Plain Markdown works: use a first-level heading (`# Report title`) for its title.
Without a heading or metadata title, the filename is used. No date, ticker, or
company is invented for files that omit them.

For richer cards and newest-first sorting, optionally add YAML front matter:

```yaml
---
title: "Company research assessment"
date: 2026-09-06
description: "A concise summary of the research."
category: "Equity research"
ticker: "SYMBOL"
company: "Company name"
horizon: "3–5 years"
risk: "Speculative"
draft: false
---
```

All fields are optional. Dates in the future and `draft: true` are excluded by
Hugo's normal build. Undated reports appear after dated ones.
Use headings (`##`, `###`) for the automatic report navigator.
Use subfolders for organization; every published report is still listed on the homepage.

## Preview and build

With mise installed, run `mise install`, then `hugo server` for a local preview.
Run `hugo --gc --minify` to generate the static site in `dist/`.

Adding a Markdown file updates a running local preview automatically.
Every push to `main` runs the GitHub Actions workflow in
`.github/workflows/pages.yml`, builds Hugo, and deploys to GitHub Pages.
Commit and push new Markdown files to publish them; local edits alone do not publish.
The workflow also supports manual runs from the GitHub Actions tab.

Public site: https://ronihcohen.github.io/northstar-financial/

Repository: https://github.com/ronihcohen/northstar-financial

The workflow uses GitHub's automatic token; no personal access token secret is required.
Site branding is in `hugo.toml` and `layouts/_default/baseof.html`.
