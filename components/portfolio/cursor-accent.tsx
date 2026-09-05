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

    const updatePosition = (event: PointerEvent) => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        cursor.style.setProperty("--cursor-x", `${event.clientX}px`)
        cursor.style.setProperty("--cursor-y", `${event.clientY}px`)
      })
    }

    window.addEventListener("pointermove", updatePosition, { passive: true })
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", updatePosition)
    }
  }, [enabled])

  return enabled ? <span className="cursor-accent" aria-hidden="true" /> : null
}
