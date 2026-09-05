import { ArrowDownRight, Github, Linkedin, Mail } from "lucide-react"

import { HeroTerminal } from "@/components/portfolio/hero-terminal"
import { TypingIntro } from "@/components/portfolio/typing-intro"
import { TypingName } from "@/components/portfolio/typing-name"
import { profile } from "@/lib/portfolio"

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
}

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <p className="eyebrow">{profile.eyebrow}</p>
        <h1 id="hero-heading">
          <TypingName name={profile.name} />
        </h1>
        <p className="hero-intro"><TypingIntro text={profile.intro} /></p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            View projects <ArrowDownRight size={18} aria-hidden="true" />
          </a>
          <a className="button button-secondary" href={`mailto:${profile.email}`}>
            <Mail size={18} aria-hidden="true" /> Contact me
          </a>
        </div>
        <div className="hero-socials" aria-label="Social links">
          {profile.socials.map((social) => {
            const Icon = socialIcons[social.label]
            return (
              <a key={social.label} href={social.url} target="_blank" rel="noreferrer">
                <Icon size={18} aria-hidden="true" />
                <span className="sr-only">{social.label}</span>
              </a>
            )
          })}
        </div>
      </div>
      <HeroTerminal />
      <p className="hero-location">Based in {profile.location}</p>
    </section>
  )
}
