"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export function ContactSection() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-foreground mb-4">Let's Work Together</h2>
      <p className="text-lg text-muted-foreground mb-6">
        I'm always interested in new opportunities and collaborations.
      </p>
      <Button
        onClick={() => setOpen(true)}
        size="lg"
        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-3 text-lg rounded-xl"
      >
        Get In Touch
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-md"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* outer gradient frame */}
            <motion.div
              className="relative p-1 hero-gradient rounded-lg shadow-2xl overflow-hidden w-11/12 max-w-3xl"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* inner content box */}
              <div
                className="bg-gradient-to-br from-secondary/90 to-secondary/70 text-white rounded-md p-12 max-w-3xl mx-auto border border-white/10 shadow-lg relative"
              >
                {/* Close button */}
                <button
                  className="absolute top-4 right-4 text-white p-2 rounded-full bg-white/20 hover:bg-white/30 
                             transition-transform duration-300 ease-in-out hover:rotate-90"
                  onClick={() => setOpen(false)}
                >
                  <X size={24} />
                </button>

                {/* Header */}
                <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-wider uppercase">
                  Contact Me
                </h3>
                <div className="h-1 w-24 bg-white mb-8 mx-auto rounded-full shadow-md" />

                {/* Email */}
                <p className="mb-8 text-lg md:text-xl leading-relaxed">
                  Email:&nbsp;
                  <a
                    href="mailto:kishangoli@ucsb.edu"
                    className="underline font-semibold"
                  >
                    kishangoli@ucsb.edu
                  </a>
                </p>

                {/* OR divider */}
                <p className="text-center mb-6 font-medium text-lg uppercase">or</p>

                {/* LinkedIn button */}
                <div className="flex justify-center">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white/20 p-3 rounded-full"
                  >
                    <a
                      href="https://linkedin.com/in/kishangoli"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <Image
                        src="/linkedin-logo.png"
                        alt="LinkedIn"
                        width={100}
                        height={100}
                      />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}