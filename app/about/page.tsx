import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Code, Palette, Zap } from "lucide-react"

export default function AboutPage() {
  const skills = [
    {
      icon: <Code size={24} />,
      title: "Frontend Development",
      description: "React, Next.js, TypeScript, and modern CSS frameworks",
    },
    {
      icon: <Palette size={24} />,
      title: "UI/UX Design",
      description: "Creating intuitive and beautiful user experiences",
    },
    {
      icon: <Zap size={24} />,
      title: "Performance",
      description: "Optimizing applications for speed and accessibility",
    },
  ]

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft size={20} />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About Me</h1>
        </div>

        {/* Content */}
        <div className="space-y-12">
          {/* Bio Section */}
          <div className="prose prose-lg max-w-none">
            <p className="text-xl leading-relaxed text-foreground mb-6">
              I'm a passionate developer and designer who loves creating digital experiences that make a difference.
              With a background in both technical development and creative design, I bring a unique perspective to every
              project.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground mb-8">
              When I'm not coding, you can find me exploring new technologies, contributing to open source projects, or
              enjoying a good cup of coffee while sketching out ideas for my next project.
            </p>
          </div>

          {/* Skills Section */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">What I Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <Card key={index} className="text-center p-6">
                  <CardContent className="space-y-4">
                    <div className="flex justify-center text-accent">{skill.icon}</div>
                    <h3 className="text-lg font-semibold text-foreground">{skill.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{skill.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Let's Work Together</h2>
            <p className="text-lg text-muted-foreground mb-6">
              I'm always interested in new opportunities and collaborations.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-3 text-lg rounded-xl"
            >
              <a href="mailto:your.email@example.com">Get In Touch</a>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
