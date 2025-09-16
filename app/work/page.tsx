import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { ProjectCard } from "@/components/ProjectCard"
import { ContactSection } from "@/components/ContactSection"

export default function WorkPage() {
  const projects = [
    {
      title: "GearUp; Shopify SF Hackathon",
      description:
        "Interactive fitness & health web app built in a 48-hr Shopify Shop Mini hackathon. Now getting deployed to 5M+ users!",
      tech: ["Shopify Mini SDK", "Vite", "React", "Tailwind CSS"],
      liveUrl: "https://screen.studio/share/6floeNUF",
      githubUrl: "https://github.com/kishangoli/ourMini",
    },
    {
      title: "HopeJam",
      description:
        "Synchronous music‐sheet platform where host controls playback and notation in real time.",
      tech: ["FastAPI/RESTful EPs", "PostgreSQL (Dockerized)", "React", "TypeScript"],
      liveUrl: "#",
      githubUrl: "https://github.com/hopekcc/summer-intern-2025",
    },
    {
      title: "Live Chat App",
      description:
        "Research oriented chat application enabling real-time messaging via WebSockets. Designed for emotion-recognition experiment research.",
      tech: ["Python", "Flask", "WebSockets", "Redis"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Data Science UCSB Website",
      description:
        "Website to showcase the Data Science UCSB org to our 600+ current members and incoming members.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "GitHub Actions", "Vercel"],
      liveUrl: "https://github.com/data-science-ucsb/ds-website-new",
      githubUrl: "https://datascienceucsb.org/",
    },
  ]

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft size={20} />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">My Work</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Here are some of projects that I have done in my free time.
          </p>
        </div>

        {/* Projects Stack */}
        <div className="flex flex-col space-y-12">
          {projects.map((proj, i) => (
            <ProjectCard key={i} project={proj} />
          ))}
        </div>

        {/* Contact CTA with Modal */}
        <ContactSection />
      </div>
    </main>
  )
}
