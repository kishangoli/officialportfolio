"use client"

import { useEffect, useState } from "react"

export function CursorAccent() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)")
    const motionQuery = window.matchMedia("(prefers-reduced-motion: no-preference)")
    const updateEnabled = () => setEnabled(pointerQuery.matches && motionQuery.matches)

    updateEnabled()
    pointerQuery.addEventListener("change", updateEnabled)
    motionQuery.addEventListener("change", updateEnabled)

    return () => {
      pointerQuery.removeEventListener("change", updateEnabled)
      motionQuery.removeEventListener("change", updateEnabled)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return

    const cursor = document.documentElement
    let frame = 0

    const updateInteractive = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null
      const control = target?.closest(
        'a[href], button, input:not([type="hidden"]), select, textarea, summary, [role="button"], [role="link"]',
      )
      const isInteractive = Boolean(
        control && !control.matches(":disabled") && !control.closest('[inert], [aria-disabled="true"]'),
      )
      cursor.classList.toggle("custom-cursor-interactive", isInteractive)
    }

    const updatePosition = (event: PointerEvent) => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        cursor.style.setProperty("--cursor-x", `${event.clientX}px`)
        cursor.style.setProperty("--cursor-y", `${event.clientY}px`)
        cursor.classList.add("custom-cursor-active")
        updateInteractive(event)
      })
    }

    const hideCursor = () => {
      window.cancelAnimationFrame(frame)
      cursor.classList.remove("custom-cursor-active", "custom-cursor-interactive")
      cursor.style.removeProperty("--cursor-x")
      cursor.style.removeProperty("--cursor-y")
    }

    window.addEventListener("pointermove", updatePosition, { passive: true })
    window.addEventListener("pointerover", updateInteractive, { passive: true })
    document.documentElement.addEventListener("pointerleave", hideCursor)
    window.addEventListener("blur", hideCursor)
    return () => {
      hideCursor()
      window.removeEventListener("pointermove", updatePosition)
      window.removeEventListener("pointerover", updateInteractive)
      document.documentElement.removeEventListener("pointerleave", hideCursor)
      window.removeEventListener("blur", hideCursor)
    }
  }, [enabled])

  return enabled ? <span className="cursor-accent" aria-hidden="true" /> : null
}
