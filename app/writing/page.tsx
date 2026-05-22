import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAllPosts } from "@/lib/writing"

export default function WritingPage() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,rgba(248,250,252,0.98),rgba(241,245,249,0.9))] p-8 shadow-sm md:p-10">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft size={20} />
              Back to Home
            </Link>
          </Button>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Writing
          </h1>
          <p className="max-w-2xl text-lg text-slate-600">
            A few project writeups and general writing posts.
          </p>
        </div>

        <div className="space-y-5">
          {posts.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-slate-600">
              No posts here yet, will be populated in <code className="rounded bg-white px-1.5 py-0.5">content/writing</code>.
            </div>
          ) : (
            posts.map((post) => (
              <Link
                key={post.slug}
                href={`/writing/${post.slug}`}
                aria-label={post.title}
                className="group block overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md md:p-7"
              >
                <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.2em] text-slate-500">
                  <p>{post.formattedDate}</p>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <p>Kishan Goli</p>
                </div>

                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 transition group-hover:text-slate-700">
                  {post.title}
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{post.excerpt}</p>

                {post.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700"
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
