import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAllPosts, getPostBySlug } from "@/lib/writing"

type WritingPostPageProps = {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: WritingPostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Writing",
    }
  }

  return {
    title: `${post.title} | Writing`,
    description: post.excerpt,
  }
}

export default function WritingPostPage({ params }: WritingPostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-3xl">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/writing" className="flex items-center gap-2">
            <ArrowLeft size={20} />
            Back to Writing
          </Link>
        </Button>

        <article className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-sm md:p-10">
          <header className="border-b border-slate-200 pb-8">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{post.formattedDate}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              {post.title}
            </h1>
            {post.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
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
          </header>

          <div
            className="mt-8 space-y-6"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </div>
    </main>
  )
}
