"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Line =
  | { type: "system"; text: string }
  | { type: "command"; text: string }
  | { type: "output"; text: string; html?: boolean }

const BOOT_LINES = ["booting kishan.dev...", "loading portfolio interface...", "system ready."]

export default function HomePage() {
  const [bootIndex, setBootIndex] = useState(0)
  const [bootDone, setBootDone] = useState(false)
  const [input, setInput] = useState("")
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)

  const [lines, setLines] = useState<Line[]>([
    { type: "system", text: "Last login: today on portfolio.local" },
  ])

  const inputRef = useRef<HTMLInputElement>(null)
  const terminalEndRef = useRef<HTMLDivElement>(null)

  const commandHistory = useRef<string[]>([])

  useEffect(() => {
    if (bootIndex >= BOOT_LINES.length) {
      const t = setTimeout(() => {
        setBootDone(true)
        setLines((prev) => [
          ...prev,
          { type: "system", text: BOOT_LINES[0] },
          { type: "system", text: BOOT_LINES[1] },
          { type: "system", text: BOOT_LINES[2] },
          { type: "output", text: "Type 'help' to explore." },
        ])
      }, 250)
      return () => clearTimeout(t)
    }

    const timer = setTimeout(() => setBootIndex((prev) => prev + 1), 500)
    return () => clearTimeout(timer)
  }, [bootIndex])

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [lines, bootDone])

  useEffect(() => {
    if (bootDone) inputRef.current?.focus()
  }, [bootDone])

  const quickCommands = useMemo(() => ["help", "work", "about", "socials", "email", "clear"], [])

  function appendOutput(text: string) {
    setLines((prev) => [...prev, { type: "output", text }])
  }

  function runCommand(raw: string) {
    const cmd = raw.trim().toLowerCase()
    setLines((prev) => [...prev, { type: "command", text: raw }])

    if (!cmd) return

    commandHistory.current.unshift(raw)
    setHistoryIndex(null)

    switch (cmd) {
      case "help":
        setLines((prev) => [
          ...prev,
          {
            type: "output",
            text:
              "Available commands:\n" +
              "  work     - open work page\n" +
              "  about    - open about page\n" +
              "  socials  - show external links\n" +
              "  email    - copy/display email\n" +
              "  clear    - clear terminal\n" +
              "  help     - show this menu",
          },
        ])
        break

      case "work":
        setLines((prev) => [...prev, { type: "output", text: "Opening /work ..." }])
        setTimeout(() => (window.location.href = "/work"), 500)
        break

      case "about":
        setLines((prev) => [...prev, { type: "output", text: "Opening /about ..." }])
        setTimeout(() => (window.location.href = "/about"), 500)
        break

      case "socials":
        setLines((prev) => [
          ...prev,
          { type: "output", text: "GitHub: github.com/kishangoli" },
          { type: "output", text: "LinkedIn: linkedin.com/in/kishangoli" },
        ])
        break

      case "email":
        navigator.clipboard
          .writeText("kishangoli@ucsb.edu")
          .then(() => appendOutput("Email copied: kishangoli@ucsb.edu"))
          .catch(() => appendOutput("kishangoli@ucsb.edu"))
        break

      case "clear":
        setLines([{ type: "system", text: "Terminal cleared." }])
        break

      default:
        setLines((prev) => [
          ...prev,
          {
            type: "output",
            text: `Command not found: ${cmd}\nType 'help' to see available commands.`,
          },
        ])
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const value = input
    setInput("")
    runCommand(value)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!commandHistory.current.length) return

    if (e.key === "ArrowUp") {
      e.preventDefault()
      const nextIndex =
        historyIndex === null
          ? 0
          : Math.min(historyIndex + 1, commandHistory.current.length - 1)
      setHistoryIndex(nextIndex)
      setInput(commandHistory.current[nextIndex])
    }

    if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex === null) return

      const nextIndex = historyIndex - 1
      if (nextIndex < 0) {
        setHistoryIndex(null)
        setInput("")
      } else {
        setHistoryIndex(nextIndex)
        setInput(commandHistory.current[nextIndex])
      }
    }
  }

  return (
    <main className="min-h-screen bg-[#050b18] text-[#e7efff] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-[#1b2a4a] bg-black/60 shadow-2xl backdrop-blur-md"
        >
          {/* subtle glow (blue) */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(80,150,255,0.14),transparent_45%)]" />

          {/* scanlines */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.2)_50%)] [background-size:100%_4px]" />

          {/* terminal top bar */}
          <div className="flex items-center gap-2 border-b border-[#14213b] px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
            <div className="ml-4 text-sm tracking-wide text-[#9bb1d6]">kishan@portfolio: ~</div>
          </div>

          <div className="min-h-[78vh] px-4 py-5 md:px-6" onClick={() => inputRef.current?.focus()}>
            <div className="mb-6">
              <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-2xl font-semibold md:text-4xl"
              >
                Kishan Goli
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-2 text-sm text-[#9bb1d6] md:text-base"
              >
                CS @ UC Santa Barbara — terminal entrypoint
              </motion.p>
            </div>

            <div className="space-y-3 font-mono text-sm md:text-[15px] leading-7">
              <AnimatePresence initial={false}>
                {lines.map((line, i) => (
                  <motion.div
                    key={`${line.type}-${line.text}-${i}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="whitespace-pre-wrap"
                  >
                    {line.type === "system" && <span className="text-[#7aa7ff]">{line.text}</span>}
                    {line.type === "command" && (
                      <span className="text-[#e7efff]">
                        <span className="text-[#7aa7ff]">visitor@kishan:~$ </span>
                        {line.text}
                      </span>
                    )}
                    {line.type === "output" && <span className="text-[#c8d6ff]">{line.text}</span>}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Real terminal cursor: hide the visible input; show blinking block cursor */}
              {bootDone && (
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <span className="shrink-0 text-[#7aa7ff]">visitor@kishan:~$</span>

                  {/* Hidden-but-functional input so typing still works */}
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    spellCheck={false}
                    className="absolute left-[-9999px] top-auto h-px w-px opacity-0"
                    aria-label="Terminal input"
                  />

                  {/* Render typed text + blinking cursor (block) */}
                  <div className="relative flex-1 whitespace-pre-wrap break-words">
                    <span className="text-[#e7efff]">{input}</span>
                    <span
                      className="ml-[2px] inline-block h-[1.05em] w-[0.65em] align-[-0.2em] bg-[#e7efff] opacity-90 motion-safe:animate-[blink_1s_steps(1,end)_infinite]"
                      aria-hidden="true"
                    />
                  </div>
                </form>
              )}

              <div ref={terminalEndRef} />
            </div>

            {bootDone && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                {quickCommands.map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => runCommand(cmd)}
                    className="rounded-full border border-[#233a63] bg-[#0a1020] px-4 py-2 font-mono text-sm text-[#c8d6ff] transition hover:border-[#5f86ff] hover:text-white"
                  >
                    {cmd}
                  </button>
                ))}
              </motion.div>
            )}

            {bootDone && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="mt-10 flex flex-wrap gap-4 text-sm text-[#9bb1d6]"
              >
                <Link href="/work" className="hover:text-white transition">
                  /work
                </Link>
                <Link href="/about" className="hover:text-white transition">
                  /about
                </Link>
                <a
                  href="https://github.com/kishangoli"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition"
                >
                  github
                </a>
                <a
                  href="https://linkedin.com/in/kishangoli"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition"
                >
                  linkedin
                </a>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* local keyframes for the cursor blink */}
      <style jsx global>{`
        @keyframes blink {
          0%,
          49% {
            opacity: 0;
          }
          50%,
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </main>
  )
}