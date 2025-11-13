"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" ref={ref} className="relative bg-background py-20 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start">
          {/* Profile Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center order-2 lg:order-1"
          >
            <div className="relative w-full max-w-md">
              <div className="aspect-[3/4] overflow-hidden rounded-lg border border-border bg-secondary">
                <img
                  src="/images/dsc-8356-20-281-29.jpeg"
                  alt="Kabiru - Visionary Photographer"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col justify-start order-1 lg:order-2 pt-4 lg:pt-0"
          >
            <div className="mb-10">
              <h2 className="mb-2 text-5xl lg:text-6xl font-light tracking-tight text-foreground leading-tight">
                Visionary <span className="text-accent">Photographer</span>
              </h2>
              <p className="text-base text-muted-foreground tracking-wide mt-4">
                Visual Storyteller & Creative Director
              </p>
            </div>

            <div className="space-y-6 text-justify text-foreground leading-relaxed">
              <p>
                I am Kabiru, a visionary photographer and innovative visual storyteller dedicated to capturing the
                extraordinary in every moment. With a distinctive creative vision and an unwavering commitment to
                artistic excellence,i transform fleeting moments into timeless visual narratives that resonate with
                depth, authenticity and profound emotional connection.
              </p>
              <p>
                Whether capturing the raw energy of live events, the intimate elegance of
                portraits the bold sophistication of fashion or the strategic narrative of corporate imagery, each
                frame is meticulously crafted to tell a compelling story that challenges perceptions and inspires.
              </p>
              <p>
                Driven by an insatiable curiosity and passion for visual innovation, I blend technical mastery with
                intuitive artistry. My work stands as a testament to the transformative power of perspective, light and
                composition creating images that elevate perspectives and leave lasting impressions on all who
                experience them.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
