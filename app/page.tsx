import { CursorAccent } from "@/components/portfolio/cursor-accent"
import { ExperienceSection } from "@/components/portfolio/experience-section"
import { Footer } from "@/components/portfolio/footer"
import { Hero } from "@/components/portfolio/hero"
import { SiteHeader } from "@/components/portfolio/header"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { SectionReveal } from "@/components/portfolio/section-reveal"
import { SmoothScroll } from "@/components/portfolio/smooth-scroll"

export default function HomePage() {
  return (
    <main className="portfolio-shell">
      <CursorAccent />
      <SmoothScroll />
      <div className="portfolio-frame">
        <SiteHeader />
        <Hero />
        <ExperienceSection />
        <ProjectsSection />
        <SectionReveal><Footer /></SectionReveal>
      </div>
    </main>
  )
}
