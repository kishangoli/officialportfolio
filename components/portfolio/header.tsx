import Link from "next/link"

import { profile } from "@/lib/portfolio"

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="site-mark" aria-label={`${profile.name} home`}>
        {profile.name.split(" ").map((part) => part[0]).join("")}
      </Link>
      <nav className="site-nav" aria-label="Primary navigation">
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <Link href="/writing">Writing</Link>
        <a href={`mailto:${profile.email}`}>Contact</a>
      </nav>
    </header>
  )
}
