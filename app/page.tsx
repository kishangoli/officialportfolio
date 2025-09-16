"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import * as Toast from "@radix-ui/react-toast"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function HomePage() {
  const [toastOpen, setToastOpen] = useState(false)
  const timerRef = useRef<number>()

  // clear on unmount
  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  function handleCopyEmail() {
    navigator.clipboard.writeText("kishangoli@ucsb.edu")
    setToastOpen(true)
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      setToastOpen(false)
    }, 2000)
  }

  return (
    <Toast.Provider swipeDirection="right">
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="hero-gradient rounded-3xl p-12 md:p-16 lg:p-20 max-w-4xl w-full text-center shadow-2xl">
          <div className="space-y-8">
            {/* Greeting */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground tracking-tight">
                Hello, I'm Kishan
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                @ uc santa barbara.
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                asChild
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-3 text-lg rounded-xl"
              >
                <Link href="/work">My Work</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-foreground/20 hover:bg-foreground/5 px-8 py-3 text-lg rounded-xl bg-transparent"
              >
                <Link href="/about">About Me</Link>
              </Button>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center gap-6 pt-8">
              <a
                href="https://linkedin.com/in/kishangoli"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground transition-colors"
              >
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://github.com/kishangoli"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground transition-colors"
              >
                <Github size={24} />
                <span className="sr-only">GitHub</span>
              </a>
              <button
                onClick={handleCopyEmail}
                className="
                  p-3 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground
                  transition-colors transition-transform duration-150 ease-out
                  active:scale-110
                "
              >
                <Mail size={24} />
                <span className="sr-only">Email</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Toast Viewport must be rendered once */}
      <Toast.Viewport
        className="
          fixed top-5 right-5 z-[2147483647]
          flex flex-col gap-2 p-4 outline-none
        "
      />

      {/* AnimatePresence + motion.div for slide-in/out */}
      <AnimatePresence>
        {toastOpen && (
          <Toast.Root asChild>
            <motion.div
              className="
                grid grid-cols-[auto_max-content] items-center gap-x-4
                rounded-md bg-white p-4 shadow-lg text-gray-900
                border-2 border-secondary
              "
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="flex items-center gap-2">
                <Check className="text-secondary" size={16} />
                <Toast.Title className="text-sm font-medium">
                  Copied to clipboard!
                </Toast.Title>
              </div>
            </motion.div>
          </Toast.Root>
        )}
      </AnimatePresence>
    </Toast.Provider>
  )
}
