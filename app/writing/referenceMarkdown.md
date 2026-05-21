---
title: "Using Markdown for My Writing"
date: "2026-05-21"
excerpt: "A starter post for this site, now backed by local Markdown files inside the repo."
tags: ["writing", "markdown", "nextjs"]
published: true
---

# Writing lives in the repo now

This page is powered by a plain `.md` file inside `content/writing`, which means new posts can be written in the same workflow as code.

## Why this setup works

- Content stays local and version-controlled.
- The writing index updates automatically when a new file is added.
- Individual posts get their own URLs.
- Code fences, headings, quotes, and inline code all render cleanly.

## Example code block

```ts
export function hello(name: string) {
  return `hello, ${name}`
}
```

> Markdown is a better fit for writing than hardcoding posts into React components.

## New post workflow

1. Add a new file in `content/writing`.
2. Include `title`, `date`, and optional `excerpt` frontmatter.
3. Write the body in Markdown.
4. Visit `/writing` and the post will appear automatically.
