import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="hero-gradient rounded-3xl p-12 md:p-16 lg:p-20 max-w-4xl w-full text-center shadow-2xl">
        <div className="space-y-8">
          {/* Greeting */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground tracking-tight">
              Hello, I'm Kishan
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              I am a DS/CS student at UCSB. I like coding.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              asChild
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-3 text-lg rounded-xl"
            >
              <Link href="/work">My Work</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-foreground/20 hover:bg-foreground/5 px-8 py-3 text-lg rounded-xl bg-transparent"
            >
              <Link href="/about">About Me</Link>
            </Button>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 pt-8">
            <a
              href="https://linkedin.com/in/kishangoli"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground transition-colors"
            >
              <Linkedin size={24} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://github.com/kishangoli"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground transition-colors"
            >
              <Github size={24} />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="kishangoli@ucsb.edu"
              className="p-3 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground transition-colors"
            >
              <Mail size={24} />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
