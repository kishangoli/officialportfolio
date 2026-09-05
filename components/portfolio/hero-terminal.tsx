"use client"

import { FormEvent, useState } from "react"

const commands: Record<string, { target?: string; response: string }> = {
  project: { target: "#projects", response: "Opening selected projects..." },
  projects: { target: "#projects", response: "Opening selected projects..." },
  experience: { target: "#experience", response: "Opening experience..." },
  contact: { target: "#contact", response: "Opening contact..." },
  help: { response: "Commands: project, experience, contact, clear" },
}

export function HeroTerminal() {
  const [input, setInput] = useState("")
  const [lines, setLines] = useState(["Type 'help' to explore."])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const command = input.trim().toLowerCase()

    if (!command) return

    setInput("")
    if (command === "clear") {
      setLines(["Terminal cleared."])
      return
    }

    const action = commands[command]
    const response = action?.response ?? `Command not found: ${command}`
    setLines((current) => [...current.slice(-2), `$ ${command}`, response])

    if (action?.target) {
      window.dispatchEvent(new CustomEvent("portfolio:scroll-to", { detail: action.target }))
    }
  }

  return (
    <section className="hero-terminal" aria-label="Portfolio terminal">
      <header className="terminal-bar">
        <span className="terminal-dot" />
        <span className="terminal-dot" />
        <span className="terminal-dot" />
        <span className="terminal-title">portfolio@kishan</span>
      </header>
      <div className="terminal-body">
        <p className="terminal-welcome">Kishan&apos;s portfolio terminal</p>
        <div className="terminal-output" aria-live="polite">
          {lines.map((line, index) => <p key={`${line}-${index}`}>{line}</p>)}
        </div>
        <form onSubmit={handleSubmit} className="terminal-input-row">
          <label htmlFor="portfolio-command">$</label>
          <input
            id="portfolio-command"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            autoComplete="off"
            placeholder="try project"
            spellCheck={false}
          />
        </form>
      </div>
    </section>
  )
}
