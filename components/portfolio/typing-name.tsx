"use client"

import { motion, useReducedMotion } from "framer-motion"

export function TypingName({ name }: { name: string }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <span>{name}</span>
  }

  return (
    <span className="typing-name" aria-label={name}>
      {Array.from(name).map((character, index) => (
        <motion.span
          key={`${character}-${index}`}
          className="typing-character"
          aria-hidden="true"
          initial={{ opacity: 0, y: "0.22em", filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.36, delay: 0.28 + index * 0.085, ease: [0.22, 1, 0.36, 1] }}
        >
          {character === " " ? "\u00a0" : character}
        </motion.span>
      ))}
    </span>
  )
}
