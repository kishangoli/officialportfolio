import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
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
    <main className="writing-page min-h-screen px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-3xl">
        <Link href="/writing" className="writing-back mb-8">
          <ArrowLeft size={20} />
          Back to Writing
        </Link>

        <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-10">
          <header className="border-b border-white/10 pb-8">
            <p className="text-sm uppercase tracking-[0.24em] text-white/45">{post.formattedDate}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              {post.title}
            </h1>
            {post.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/65"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div
            className="writing-content mt-8 space-y-6 text-white/75"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </div>
    </main>
  )
}
