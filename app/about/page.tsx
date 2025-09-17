"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Code, Palette, Zap } from "lucide-react"
import { ContactSection } from "@/components/ContactSection"


export default function AboutPage() {
  const skills = [
    {
      icon: <Code size={24} />,
      title: "Backend Development",
      description: "Developing and designing APIs, endpoints, databases, and server logic.",
    },
    {
      icon: <Zap size={24} />,
      title: "Performance",
      description: "Optimizing applications for speed and accessibility. Play around with all sorts of modern tools!",
    },
    {
      icon: <Palette size={24} />,
      title: "Frontend Development",
      description: "React, Next.js, TypeScript, and modern design frameworks.",
    },
  ]

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <Button asChild variant="ghost">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft size={20} />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/work">Work Page</Link>
            </Button>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About Me</h1>
        </div>

        {/* Content */}
        <div className="space-y-12">
          {/* Bio Section */}
          <div className="prose prose-lg max-w-none">
            <p className="text-xl leading-relaxed text-foreground mb-6">
              If there is not much on here right now, I will probably add to it as I go. Kinda want to keep this as a page for more fun stuff.
              <br></br>
              <br></br>
              When I'm not thinking about work or school, I will probably be trying new food or coffee. I'll try to add pictures below at some point.
            
            </p>
            
          </div>

          {/* Skills Section
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">What I Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="group"
                  whileHover={{
                    scale: 1.05,
                    rotateX: 7,
                    rotateY: -7,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                  style={{ perspective: 1000 }}
                >
                  <Card className="text-center p-6 h-full">
                    <CardContent className="space-y-4">
                      <div className="flex justify-center text-secondary transition-transform duration-300 group-hover:scale-125">
                        {skill.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {skill.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {skill.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div> */}

          <ContactSection />
        </div>
      </div>
    </main>
  )
}
