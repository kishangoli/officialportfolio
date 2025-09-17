"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button" // Import Button
import { ExternalLink } from "lucide-react" // Import an icon for the button
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

export interface Project {
  company: string
  role: string
  summary: string
  tech: string[]
  imageUrl?: string
  videoUrl?: string
  externalUrl?: string // Add externalUrl
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        scale: 1.03,
        rotateX: 5,
        rotateY: -5,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      style={{ perspective: 1000 }}
    >
      <Card className="w-full h-full relative overflow-hidden bg-white shadow-md rounded-lg p-6 flex flex-col">
        <div className="flex-grow">
          {/* Company Name (smaller font) */}
          <p className="text-sm text-muted-foreground mb-1">{project.company}</p>

          {/* Role Name (big and bold) */}
          <h3 className="text-2xl font-bold text-foreground mb-2">{project.role}</h3>

          {/* Summary (one-liner) */}
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            {project.summary}
          </p>

          {/* Tech Stack Bubbles */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-secondary/10 text-secondary text-sm font-medium rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Media and Links */}
        <div>
          {/* Large Image/Demo */}
          <div className="rounded-lg overflow-hidden mb-4">
            {project.videoUrl ? (
              <video
                src={project.videoUrl}
                width={800}
                height={450}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover"
              />
            ) : (
              project.imageUrl && (
                <Image
                  src={project.imageUrl}
                  alt={`${project.company} - ${project.role}`}
                  width={800}
                  height={450}
                  className="w-full h-auto object-cover"
                />
              )
            )}
          </div>

          {/* External Link Button */}
          {project.externalUrl && project.externalUrl !== "#" && (
            <div className="mt-4">
              <Button
                asChild
                size="sm"
                className="
                  group bg-secondary text-secondary-foreground hover:bg-secondary/90 
                  transition-transform duration-200 ease-out hover:-translate-y-1
                "
              >
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink
                    size={16}
                    className="mr-2 transition-transform duration-300 group-hover:rotate-[-15deg]"
                  />
                  Check it out
                </a>
              </Button>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}