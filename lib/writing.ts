import fs from "node:fs"
import path from "node:path"

const WRITING_DIRECTORY = path.join(process.cwd(), "content", "writing")

type FrontmatterValue = string | string[] | boolean | undefined

type Frontmatter = {
  title?: string
  date?: string
  excerpt?: string
  published?: boolean
  tags?: string[] | string
} & Record<string, FrontmatterValue>

export type WritingPost = {
  slug: string
  title: string
  date: string
  formattedDate: string
  excerpt: string
  content: string
  html: string
  tags: string[]
}

function parseFrontmatter(raw: string): { frontmatter: Frontmatter; content: string } {
  if (!raw.startsWith("---\n")) {
    return { frontmatter: {}, content: raw.trim() }
  }

  const closingMarker = raw.indexOf("\n---\n", 4)
  if (closingMarker === -1) {
    return { frontmatter: {}, content: raw.trim() }
  }

  const frontmatterBlock = raw.slice(4, closingMarker)
  const content = raw.slice(closingMarker + 5).trim()
  const frontmatter: Frontmatter = {}

  for (const line of frontmatterBlock.split("\n")) {
    const separatorIndex = line.indexOf(":")
    if (separatorIndex === -1) continue

    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1).trim()

    if (!key) continue

    if (value.startsWith("[") && value.endsWith("]")) {
      frontmatter[key as keyof Frontmatter] = value
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean)
      continue
    }

    if (value === "true" || value === "false") {
      frontmatter[key as keyof Frontmatter] = value === "true"
      continue
    }

    frontmatter[key as keyof Frontmatter] = value.replace(/^["']|["']$/g, "")
  }

  return { frontmatter, content }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function renderInlineMarkdown(text: string) {
  const codeTokens: string[] = []
  let rendered = escapeHtml(text).replace(/`([^`]+)`/g, (_, code: string) => {
    const token = `__CODE_TOKEN_${codeTokens.length}__`
    codeTokens.push(`<code class="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-900">${escapeHtml(code)}</code>`)
    return token
  })

  rendered = rendered
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")

  return codeTokens.reduce(
    (result, tokenHtml, index) => result.replace(`__CODE_TOKEN_${index}__`, tokenHtml),
    rendered,
  )
}

function renderMarkdown(markdown: string) {
  const lines = markdown.split("\n")
  const html: string[] = []
  const paragraphBuffer: string[] = []
  const listBuffer: string[] = []
  let listType: "ul" | "ol" | null = null
  let codeFence = false
  let codeLanguage = ""
  const codeBuffer: string[] = []

  function flushParagraph() {
    if (!paragraphBuffer.length) return
    html.push(
      `<p class="text-lg leading-8 text-slate-700">${renderInlineMarkdown(paragraphBuffer.join(" "))}</p>`,
    )
    paragraphBuffer.length = 0
  }

  function flushList() {
    if (!listType || !listBuffer.length) return
    const items = listBuffer
      .map((item) => `<li class="text-lg leading-8 text-slate-700">${renderInlineMarkdown(item)}</li>`)
      .join("")
    const listClass =
      listType === "ul"
        ? "ml-6 list-disc space-y-2 marker:text-slate-400"
        : "ml-6 list-decimal space-y-2 marker:text-slate-400"
    html.push(`<${listType} class="${listClass}">${items}</${listType}>`)
    listBuffer.length = 0
    listType = null
  }

  function flushCodeBlock() {
    if (!codeFence) return
    const languageLabel = codeLanguage
      ? `<div class="border-b border-slate-700/60 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-400">${escapeHtml(codeLanguage)}</div>`
      : ""
    html.push(
      `<pre class="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 text-slate-100"><code>${languageLabel}<div class="p-4 font-mono text-sm leading-7">${escapeHtml(codeBuffer.join("\n"))}</div></code></pre>`,
    )
    codeBuffer.length = 0
    codeLanguage = ""
    codeFence = false
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd()

    if (line.startsWith("```")) {
      flushParagraph()
      flushList()

      if (codeFence) {
        flushCodeBlock()
      } else {
        codeFence = true
        codeLanguage = line.slice(3).trim()
      }
      continue
    }

    if (codeFence) {
      codeBuffer.push(rawLine)
      continue
    }

    if (!line.trim()) {
      flushParagraph()
      flushList()
      continue
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/)
    if (headingMatch) {
      flushParagraph()
      flushList()
      const level = headingMatch[1].length
      const content = renderInlineMarkdown(headingMatch[2])
      const headingClasses = [
        "",
        "mt-12 text-4xl font-semibold tracking-tight text-slate-950",
        "mt-10 text-3xl font-semibold tracking-tight text-slate-950",
        "mt-8 text-2xl font-semibold tracking-tight text-slate-950",
        "mt-6 text-xl font-semibold text-slate-950",
        "mt-6 text-lg font-semibold uppercase tracking-wide text-slate-700",
        "mt-4 text-base font-semibold uppercase tracking-wide text-slate-600",
      ]
      html.push(`<h${level} class="${headingClasses[level]}">${content}</h${level}>`)
      continue
    }

    if (/^---+$/.test(line)) {
      flushParagraph()
      flushList()
      html.push('<hr class="my-10 border-slate-200" />')
      continue
    }

    const unorderedMatch = line.match(/^[-*]\s+(.*)$/)
    if (unorderedMatch) {
      flushParagraph()
      if (listType && listType !== "ul") flushList()
      listType = "ul"
      listBuffer.push(unorderedMatch[1])
      continue
    }

    const orderedMatch = line.match(/^\d+\.\s+(.*)$/)
    if (orderedMatch) {
      flushParagraph()
      if (listType && listType !== "ol") flushList()
      listType = "ol"
      listBuffer.push(orderedMatch[1])
      continue
    }

    const quoteMatch = line.match(/^>\s?(.*)$/)
    if (quoteMatch) {
      flushParagraph()
      flushList()
      html.push(
        `<blockquote class="rounded-r-2xl border-l-4 border-slate-300 bg-slate-50 px-5 py-4 text-lg italic leading-8 text-slate-700">${renderInlineMarkdown(quoteMatch[1])}</blockquote>`,
      )
      continue
    }

    paragraphBuffer.push(line)
  }

  flushParagraph()
  flushList()
  flushCodeBlock()

  return html.join("\n")
}

function formatDate(date: string) {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsed)
}

function toExcerpt(content: string) {
  return content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^#+\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/[*_`[\]]/g, "")
    .replace(/\((.*?)\)/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180)
}

function normalizeTags(tags?: string[] | string) {
  if (!tags) return []
  if (Array.isArray(tags)) return tags
  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
}

export function getAllPosts() {
  if (!fs.existsSync(WRITING_DIRECTORY)) {
    return []
  }

  const entries = fs
    .readdirSync(WRITING_DIRECTORY, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))

  const posts = entries
    .map((entry) => {
      const slug = entry.name.replace(/\.md$/, "")
      const raw = fs.readFileSync(path.join(WRITING_DIRECTORY, entry.name), "utf8")
      const { frontmatter, content } = parseFrontmatter(raw)

      if (frontmatter.published === false) {
        return null
      }

      return {
        slug,
        title: frontmatter.title || slug.replace(/-/g, " "),
        date: frontmatter.date || "",
        formattedDate: formatDate(frontmatter.date || ""),
        excerpt: frontmatter.excerpt || toExcerpt(content),
        content,
        html: renderMarkdown(content),
        tags: normalizeTags(frontmatter.tags),
      } satisfies WritingPost
    })
    .filter((post): post is WritingPost => Boolean(post))

  return posts.sort((a, b) => {
    const left = new Date(a.date).getTime()
    const right = new Date(b.date).getTime()
    return right - left
  })
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug)
}
