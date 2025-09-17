"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import * as Toast from "@radix-ui/react-toast"
import { Button } from "@/components/ui/button"
import { Mail, Linkedin, MapPin, Github, Check } from "lucide-react"
import { ArrowLeft } from "lucide-react"
import { ProjectCard, Project } from "@/components/ProjectCard"
import { ContactSection } from "@/components/ContactSection"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function WorkPage() {
  const [toastOpen, setToastOpen] = useState(false)
  const timerRef = useRef<number>()

  // clear on unmount
  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  // copy email address to clipboard + show toast
  function handleCopyEmail() {
    navigator.clipboard.writeText("kishangoli@ucsb.edu")
    setToastOpen(true)
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      setToastOpen(false)
    }, 2000)
  }

  const projects: Project[] = [
    {
      company: "Shopify",
      role: "Software Engineer",
      summary:
        "Built an interactive fitness & health web app (frontend + backend) in the 48-hour Shopify San Francisco Shop Mini Hackathon, now getting deployed to over 5M+ users.",
      tech: ["Shopify Mini SDK", "Vite", "React", "FalAI"],
      videoUrl: "/shopify-demo.mp4",
    },
    {
      company: "HopeJam",
      role: "Backend Software Engineer Intern",
      summary:
        "Built a real-time, synchronous music-sheet platform with live chord sheet and notation control for hosts and participants.",
      tech: ["FastAPI/RESTful EPs", "PostgreSQL", "CI/CD"],
      imageUrl: "/hopejam-demo.jpg",
      externalUrl: "https://github.com/hopekcc/summer-intern-2025",
    },
    {
      company: "Research Chat Platform",
      role: "Machine Learning Research",
      summary:
        "Developed a research-oriented live chat application with emotion recognition using WebSockets and Flask.",
      tech: ["Python", "Flask", "WebSockets", "Redis"],
      //imageUrl: "/images/livechat.png",
      externalUrl: "#", // Add your link here
    },
    {
      company: "Data Science UCSB",
      role: "Director of Software Development",
      summary:
        "Lead full-stack development of DS UCSB websites and scripting for 600+ members and yearly incoming members.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      imageUrl: "/datascienceucsb-demo.jpg",
      externalUrl: "https://datascienceucsb.org/",
    },
  ]

  return (
    <Toast.Provider swipeDirection="right">
      <main className="min-h-screen p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <Button asChild variant="ghost">
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft size={20} />
                  Back to Home
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/about">About Me</Link>
              </Button>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              My Work Experience
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Here are some of the things that I do!
            </p>
          </div>

          {/* Two-column layout: left profile card, right projects */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left profile card */}
            <motion.div
              className="relative bg-gray-50 rounded-lg shadow-lg w-full overflow-hidden self-start lg:sticky lg:top-20"
              style={{ perspective: 1000 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{
                scale: 1.03,
                rotateX: 5,
                rotateY: -5,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
            >
              {/* decorative gradient header */}
              <div className="absolute top-0 left-0 w-full h-36 bg-gradient-to-br from-primary to-secondary" />
              <div className="p-6 pt-20 relative">
                {/* replace placeholder with real image */}
                <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border-4 border-white bg-gray-200">
                  <Image
                    src="/avatar.jpg"
                    alt="Kishan Goli"
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* name */}
                <h2 className="text-2xl font-semibold mb-2">Kishan Goli</h2>
                {/* location with pin icon */}
                <p className="flex items-center text-muted-foreground mb-4">
                  <MapPin size={16} className="mr-1" /> Santa Barbara, CA
                </p>
                {/* short bio */}
                <p className="text-sm leading-relaxed text-gray-700 mb-6">
                  I'm a student @ UC Santa Barbara! I'm currently working on
                  backend development and infrastructure.
                </p>
                {/* social / contact icons */}
                <div className="flex space-x-4">
                  <button
                    onClick={handleCopyEmail}
                    className="
                      p-3 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground
                      transition-colors transition-transform duration-150 ease-out active:scale-110
                    "
                    aria-label="Copy email"
                  >
                    <Mail size={20} />
                  </button>
                  <a
                    href="https://linkedin.com/in/kishangoli"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      p-3 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground
                      transition-colors
                    "
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="https://github.com/kishangoli"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      p-3 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground
                      transition-colors
                    "
                    aria-label="GitHub"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right: Projects Stack */}
            <div className="flex flex-col space-y-12">
              {projects.map((proj, i) => (
                <ProjectCard key={i} project={proj} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Toast Viewport */}
      <Toast.Viewport
        className="fixed top-5 right-5 z-[2147483647] flex flex-col gap-2 p-4 outline-none"
      />

      {/* animated toast */}
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
