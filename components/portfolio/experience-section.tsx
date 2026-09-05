import Image from "next/image"
import { MapPin } from "lucide-react"

import { SectionReveal } from "@/components/portfolio/section-reveal"
import { experience } from "@/lib/portfolio"

export function ExperienceSection() {
  return (
    <section id="experience" className="portfolio-section experience-section" aria-labelledby="experience-heading">
      <SectionReveal>
        <div className="section-heading">
          <p className="eyebrow">Experience</p>
          <h2 id="experience-heading">Enterprises and organizations I have worked on:</h2>
        </div>
      </SectionReveal>
      <div className="experience-list">
        {experience.map((item) => (
          <SectionReveal key={item.id}>
            <article className="experience-item">
              <div className="experience-period">{item.period}</div>
              <div className="experience-detail">
                <div className="experience-heading">
                  <div className="experience-logo" aria-hidden="true">
                    {item.logo ? (
                      <Image src={item.logo} alt="" fill sizes="4rem" />
                    ) : (
                      <span>{item.company.slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <div className="experience-title-row">
                    <h3>{item.role}</h3>
                    <p>{item.company}</p>
                  </div>
                </div>
                {item.location && <p className="experience-location"><MapPin size={15} aria-hidden="true" />{item.location}</p>}
                <p className="experience-summary">{item.summary}</p>
                {item.highlights.length > 0 && (
                  <ul className="experience-highlights">
                    {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                )}
                <ul className="tag-list" aria-label={`${item.company} skills`}>
                  {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </div>
            </article>
          </SectionReveal>
        ))}
      </div>
    </section>
  )
}
