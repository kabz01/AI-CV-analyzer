"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 bg-background border-b transition-all duration-300 ${
        isScrolled ? "py-2 shadow-md" : "py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Link href="/" className="flex items-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`relative ${
                  isScrolled ? "h-14 w-40 md:h-16 md:w-48" : "h-16 w-48 md:h-20 md:w-56"
                } transition-all duration-300`}
              >
                <Image src="/images/m28_logo.png" alt="M28 Automotive Logo" fill className="object-contain" priority />
              </motion.div>
            </Link>
          </motion.div>
          <div className="hidden md:flex items-center space-x-4">
            {["Home", "Services", "Wraps", "About", "Contact"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={item === "Home" ? "/" : item === "Wraps" ? "/car-wraps" : `/${item.toLowerCase()}`}
                  className="text-foreground/80 hover:text-foreground transition-colors duration-200"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>
          <Button className="md:hidden">Menu</Button>
        </div>
      </nav>
    </motion.header>
  )
}

export default Header
