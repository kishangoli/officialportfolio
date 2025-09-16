import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Code, Palette, Zap } from "lucide-react"
import { ContactSection } from "@/components/ContactSection"


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
              I'm a student at UC Santa Barbara, I started off with a little bit of webside development, then transitioned to full-stack,
              and now I spend most of my time in backend development!
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground mb-8">
              When I'm not worrying about work or school, you can find me trying out new coffee or eating food.
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

          <ContactSection />
        </div>
      </div>
    </main>
  )
}
