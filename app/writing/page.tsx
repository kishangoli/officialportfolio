import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

type WritingPost = {
  title: string
  date: string
  href: string
}

const posts: WritingPost[] = [
  {
    title: "",
    date: "TBA",
    href: "/writing",
  },
]

export default function WritingPage() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft size={20} />
              Back to Home
            </Link>
          </Button>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Writing
          </h1>
          <p className="text-lg text-muted-foreground">
            Planning to write a little further about things I am working on.
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.title}
              className="relative border-b border-border py-4"
            >
              <Link href={post.href} className="absolute inset-0" aria-label={post.title} />
              <div className="relative z-10 flex items-center gap-4 text-sm md:text-base">
                <p className="whitespace-nowrap text-muted-foreground">{post.date}</p>
                <h2 className="font-semibold text-foreground">{post.title}</h2>
                <p className="ml-auto whitespace-nowrap text-muted-foreground">
                  <Link href="/about" className="relative z-20 underline underline-offset-4">
                    Kishan Goli
                  </Link>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
