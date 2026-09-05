import Image from "next/image"
import { ArrowUpRight, Github } from "lucide-react"

import { SectionReveal } from "@/components/portfolio/section-reveal"
import { projects } from "@/lib/portfolio"

export function ProjectsSection() {
  return (
    <section id="projects" className="portfolio-section" aria-labelledby="projects-heading">
      <SectionReveal>
        <div className="section-heading">
          <p className="eyebrow">Selected work</p>
          <h2 id="projects-heading">Projects I have found to be useful</h2>
        </div>
      </SectionReveal>
      <div className="project-grid">
        {projects.map((project, index) => (
          <SectionReveal key={project.slug}>
            <article className={`project-card ${project.featured ? "project-card-featured" : ""}`}>
              <a
                className="project-card-link"
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${project.title} on GitHub`}
              />
              <div className="project-card-content">
                <div className="project-meta">
                  <span>{project.organization}</span>
                </div>
                <h3>{project.title}</h3>
                <p className="project-role">{project.role}</p>
                <p className="project-summary">{project.summary}</p>
                <ul className="tag-list" aria-label={`${project.title} technologies`}>
                  {project.tech.map((tech) => <li key={tech}>{tech}</li>)}
                </ul>
                {project.links.length > 0 && (
                  <div className="project-links">
                    {project.links.map((link) => (
                      <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                        {link.kind === "github" ? <Github size={16} aria-hidden="true" /> : <ArrowUpRight size={16} aria-hidden="true" />}
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              {project.media && (
                <div className="project-media">
                  {project.media.type === "video" ? (
                    <video src={project.media.src} autoPlay loop muted playsInline aria-label={project.media.alt} />
                  ) : (
                    <Image src={project.media.src} alt={project.media.alt} fill sizes={index < 2 ? "(max-width: 760px) 100vw, 50vw" : "(max-width: 760px) 100vw, 40vw"} />
                  )}
                </div>
              )}
            </article>
          </SectionReveal>
        ))}
      </div>
    </section>
  )
}
