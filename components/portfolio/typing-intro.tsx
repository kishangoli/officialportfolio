"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"

export function TypingIntro({ text }: { text: string }) {
  const reduceMotion = useReducedMotion()
  const [visibleLength, setVisibleLength] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduceMotion) {
      setVisibleLength(text.length)
      return
    }

    let delay = deleting ? 55 : 65

    if (!deleting && visibleLength === text.length) {
      delay = 2200
    } else if (deleting && visibleLength === 0) {
      delay = 700
    }

    const timeout = window.setTimeout(() => {
      if (!deleting && visibleLength === text.length) {
        setDeleting(true)
      } else if (deleting && visibleLength === 0) {
        setDeleting(false)
      } else {
        setVisibleLength((length) => length + (deleting ? -1 : 1))
      }
    }, delay)

    return () => window.clearTimeout(timeout)
  }, [deleting, reduceMotion, text, visibleLength])

  if (reduceMotion) {
    return <span>{text}</span>
  }

  return (
    <span className="typing-intro" aria-label={text}>
      <span className="typing-intro-sizer" aria-hidden="true">{text}</span>
      <span className="typing-intro-text" aria-hidden="true">
        {text.slice(0, visibleLength)}
        <span className="typing-intro-cursor" />
      </span>
    </span>
  )
}
