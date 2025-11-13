"use client"

import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AnimatePresence } from "framer-motion"

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedCategory, setSelectedCategory] = useState("Events")

  const categories = ["Events", "Portraits", "Fashion", "Corporate"]

  const galleryItems = {
    Events: [
      {
        id: 1,
        src: "/event-concert-stage-lighting.jpg",
        title: " Concert",
      },
      {
        id: 2,
        src: "/event-dj-palestine-performance.jpg",
        title: "DJ Performance",
      },
      {
        id: 3,
        src: "/event-dj-turntable-crowd.jpg",
        title: "Nyumbani",
      },
      {
        id: 4,
        src: "/event-dj-booth-neon-lighting.jpg",
        title: "Electronic Energy",
      },
      {
        id: 5,
        src: "/event-ambient-performer-night.jpg",
        title: "Ambient Sessions",
      },
      {
        id: 6,
        src: "/event-nightlife-collage.jpg",
        title: "Nightlife Energy",
      },
      {
        id: 7,
        src: "/images/event-dj-rawdzilla-red.jpg",
        title: "Rawdzilla Performance",
      },
      {
        id: 8,
        src: "/images/event-dj-jessica-mabeke.jpg",
        title: "Jessica Mabeke",
      },
    ],
    Portraits: [
      {
        id: 1,
        src: "/portrait-graduation-celebration.jpg",
        title: "Graduation Moment",
      },
      {
        id: 2,
        src: "/portrait-fashion-motion.jpg",
        title: "Dynamic Fashion",
      },
      {
        id: 3,
        src: "/portrait-urban-style.jpg",
        title: "Urban Style",
      },
      {
        id: 4,
        src: "/portrait-leopard-bold.jpg",
        title: "Bold Expression",
      },
      {
        id: 5,
        src: "/portrait-artistic-black-white.jpg",
        title: "Artistic Vision",
      },
      {
        id: 6,
        src: "/portrait-editorial-sparkle.jpg",
        title: "Editorial Elegance",
      },
    ],
    Fashion: [
      {
        id: 1,
        src: "/fashion-red-background-portrait.jpg",
        title: "Bold Red Statement",
      },
      {
        id: 2,
        src: "/fashion-detail-jewelry.jpg",
        title: "Detail & Style",
      },
      {
        id: 3,
        src: "/corporate-fashion-urban.jpg",
        title: "Urban Fashion",
      },
      {
        id: 4,
        src: "/corporate-jewelry-statement.jpg",
        title: "Statement Jewelry",
      },
    ],
    Corporate: [
      {
        id: 1,
        src: "/fashion-corporate-workshop.jpg",
        title: "Corporate Workshop",
      },
      {
        id: 2,
        src: "/corporate-conference-room.jpg",
        title: "Conference Setting",
      },
      {
        id: 3,
        src: "/fashion-corporate-presentation.jpg",
        title: "Professional Presentation",
      },
      {
        id: 4,
        src: "/fashion-group-portrait.jpg",
        title: "Team Collaboration",
      },
    ],
  }

  return (
    <section id="gallery" ref={ref} className="bg-background py-20 lg:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-5xl lg:text-6xl font-light tracking-tight text-foreground leading-tight">
            Featured <span className="text-accent">Collections</span>
          </h2>
          <p className="text-muted-foreground mt-4">Curated moments across four distinct photographic specialties</p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16 flex flex-wrap justify-center gap-4"
        >
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant="outline"
              className={`tracking-wider transition-all ${
                selectedCategory === category
                  ? "border-accent bg-accent text-background hover:bg-accent"
                  : "border-border hover:border-accent"
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {galleryItems[selectedCategory as keyof typeof galleryItems].length > 0 ? (
              galleryItems[selectedCategory as keyof typeof galleryItems].map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="group relative overflow-hidden rounded-lg border border-border"
                >
                  <div className="aspect-square overflow-hidden bg-secondary">
                    <img
                      src={item.src || "/placeholder.svg"}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-muted-foreground">Coming soon - photos from this category will be added here</p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
