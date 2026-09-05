import profileData from "@/content/site/profile.json"
import projectsData from "@/content/site/projects.json"
import experienceData from "@/content/site/experience.json"

export type SocialLink = {
  label: "GitHub" | "LinkedIn"
  url: string
}

export type PortfolioProfile = {
  name: string
  eyebrow: string
  intro: string
  location: string
  email: string
  resumeUrl: string
  socials: SocialLink[]
}

export type ProjectLink = {
  label: string
  url: string
  kind: "github" | "external"
}

export type ProjectMedia = {
  type: "image" | "video"
  src: string
  alt: string
}

export type Project = {
  slug: string
  title: string
  organization: string
  role: string
  summary: string
  tech: string[]
  media?: ProjectMedia
  repoUrl: string
  links: ProjectLink[]
  featured: boolean
}

export type Experience = {
  id: string
  company: string
  logo: string
  role: string
  period: string
  location: string
  summary: string
  highlights: string[]
  tags: string[]
}

export const profile = profileData as PortfolioProfile
export const projects = projectsData as Project[]
export const experience = experienceData as Experience[]
