"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h1 className="text-2xl font-light tracking-widest text-foreground">KABIRU</h1>
          <p className="text-xs tracking-widest text-muted-foreground">VISUAL STORYTELLER</p>
        </motion.div>
        <nav className="hidden gap-8 md:flex">
          <a href="#about" className="text-sm tracking-wider text-muted-foreground transition hover:text-accent">
            ABOUT
          </a>
          <a href="#gallery" className="text-sm tracking-wider text-muted-foreground transition hover:text-accent">
            GALLERY
          </a>
          <a href="#contact" className="text-sm tracking-wider text-muted-foreground transition hover:text-accent">
            CONTACT
          </a>
        </nav>
      </div>
    </motion.header>
  )
}
