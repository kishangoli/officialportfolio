import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getAllPosts } from "@/lib/writing"

export default function WritingPage() {
  const posts = getAllPosts()

  return (
    <main className="writing-page min-h-screen px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 md:p-10">
          <Link href="/" className="writing-back mb-6">
            <ArrowLeft size={20} />
            Back to Home
          </Link>

          <h1 className="mb-4 text-4xl font-bold text-[var(--text)] md:text-5xl">
            Writing
          </h1>
          <p className="max-w-2xl text-lg text-[var(--text-muted)]">
            A few project writeups and general writing posts.
          </p>
        </div>

        <div className="space-y-5">
          {posts.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-[var(--line)] bg-[var(--surface)] p-8 text-[var(--text-muted)]">
              No posts here yet, will be populated in <code className="rounded bg-[var(--surface-strong)] px-1.5 py-0.5">content/writing</code>.
            </div>
          ) : (
            posts.map((post) => (
              <Link
                key={post.slug}
                href={`/writing/${post.slug}`}
                aria-label={post.title}
                className="group block overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6 transition hover:-translate-y-0.5 hover:border-[var(--accent-strong)] hover:bg-[var(--surface-strong)] md:p-7"
              >
                <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  <p>{post.formattedDate}</p>
                  <span className="h-1 w-1 rounded-full bg-[var(--text-muted)]" />
                  <p>Kishan Goli</p>
                </div>

                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--text)] transition group-hover:text-[var(--accent)]">
                  {post.title}
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--text-muted)]">{post.excerpt}</p>

                {post.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1 text-sm text-[var(--text-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
