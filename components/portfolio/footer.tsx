import { ArrowUpRight, Mail } from "lucide-react"

import { profile } from "@/lib/portfolio"

export function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div>
        <p className="eyebrow">Let&apos;s build something useful</p>
        <h2>Have a project or opportunity in mind?</h2>
      </div>
      <a className="footer-email" href={`mailto:${profile.email}`}>
        <Mail size={18} aria-hidden="true" /> {profile.email} <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </footer>
  )
}
