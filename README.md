# Kishan Goli Portfolio

A static Next.js portfolio with content stored locally and no backend or database.

## Edit portfolio content

- `content/site/profile.json` controls the hero copy, contact email, location, and social links.
- `content/site/projects.json` controls the project grid, media, technology tags, and external links.
- `content/site/experience.json` controls the experience timeline. Set an entry's `logo` to a local path such as `/logos/company.svg`; the UI fits every logo into the same square frame.
- `content/writing/` contains Markdown writing posts.

Project media paths point to files in `public/`. Leave a project's `links` array empty when there is no public link to show.

## Run locally

```bash
npm install
npm run dev
```

## Validate

```bash
npx tsc --noEmit
npm run build
```
