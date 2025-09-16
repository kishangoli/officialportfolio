"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"

interface Project {
  title: string
  description: string
  tech: string[]
  liveUrl: string
  githubUrl: string
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="w-full relative overflow-hidden group text-foreground group-hover:text-white">
        <CardHeader>
          <CardTitle className="text-2xl">{project.title}</CardTitle>
          <CardDescription className="text-base leading-relaxed">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-semibold mb-2">Tech Used:</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            {project.liveUrl && project.liveUrl !== "#" && (
              <Button asChild size="sm" className="bg-secondary hover:bg-secondary/90">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} className="mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
            <Button asChild variant="outline" size="sm">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github size={16} className="mr-2" />
                Code
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}