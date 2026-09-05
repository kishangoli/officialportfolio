"use client"

import Lenis from "lenis"
import { useEffect } from "react"

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      anchors: true,
      autoRaf: true,
      lerp: 0.085,
      smoothWheel: true,
      stopInertiaOnNavigate: true,
    })

    const scrollToSection = (event: Event) => {
      const target = (event as CustomEvent<string>).detail
      if (target) lenis.scrollTo(target, { offset: -24 })
    }

    window.addEventListener("portfolio:scroll-to", scrollToSection)

    return () => {
      window.removeEventListener("portfolio:scroll-to", scrollToSection)
      lenis.destroy()
    }
  }, [])

  return null
}
