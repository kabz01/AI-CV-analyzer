"use client"

import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container mx-auto px-6">
        <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h3 className="mb-4 text-lg font-light tracking-wide text-foreground">KABIRU</h3>
            <p className="text-sm text-muted-foreground">Visual Storyteller & Professional Photographer</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="mb-4 text-sm font-light tracking-widest text-foreground">SPECIALTIES</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#gallery" className="transition hover:text-accent">
                  Events
                </a>
              </li>
              <li>
                <a href="#gallery" className="transition hover:text-accent">
                  Portraits
                </a>
              </li>
              <li>
                <a href="#gallery" className="transition hover:text-accent">
                  Fashion
                </a>
              </li>
              <li>
                <a href="#gallery" className="transition hover:text-accent">
                  Corporate
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="mb-4 text-sm font-light tracking-widest text-foreground">HOURS</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Mon - Fri: 8:00 - 22:00</li>
              <li>Sat: 10:00 - 20:00</li>
              <li>Sun: By Appointment</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="mb-4 text-sm font-light tracking-widest text-foreground">HOURS</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Mon - Fri: 9:00 - 18:00</li>
              <li>Sat: 10:00 - 16:00</li>
              <li>Sun: By Appointment</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 border-t border-border pt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kabiru. All rights reserved. Photography © {new Date().getFullYear()} - All
            images and content are protected.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
