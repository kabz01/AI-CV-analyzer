"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const features = [
  {
    title: "Self-Healing Technology",
    description:
      "Our PPF features advanced self-healing properties that automatically repair minor scratches and swirl marks with heat application.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/repair.jpg-LtV2Tg01jKjb0cqpsehDkqRUEkHU2G.jpeg",
  },
  {
    title: "Superior Protection",
    description:
      "Compare the difference between protected and unprotected surfaces. Our PPF provides ultimate protection against environmental damage.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/with%20or%20without%20ppf.jpg-B2JZJVFenYoLNOYFJZ02YDwZEG57lj.jpeg",
  },
]

const ppfTypes = [
  {
    name: "Gloss PPF",
    description: "Crystal clear protection that enhances your vehicle's natural shine",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gloss%20ppf.jpg-kwmNzrTjnKwcwcFbuGmBgTXEn3pS4b.jpeg",
  },
  {
    name: "Matte PPF",
    description: "Sophisticated matte finish while maintaining full protection",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/matte%20ppf.jpg-r7s6rl9m1y4WoFZzwIWB6VFQI1x1WF.jpeg",
  },
  {
    name: "Gloss Black PPF",
    description: "Sleek black finish with superior protection capabilities",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gloss%20black%20ppf.jpg-3pERD7OLGvgDarivew8Hwv1kQW1uac.jpeg",
  },
]

export default function PaintProtection() {
  const [featureAnimations] = useState(() =>
    features.map(() => ({
      opacity: 0,
      y: 20,
    })),
  )
  const [ppfTypeAnimations] = useState(() =>
    ppfTypes.map(() => ({
      opacity: 0,
      scale: 0.9,
    })),
  )

  const featureRefs = useRef<(HTMLDivElement | null)[]>([])
  const ppfTypeRefs = useRef<(HTMLDivElement | null)[]>([])

  const isElementInViewport = useCallback((el: HTMLElement | null) => {
    if (!el) return false
    const rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }, [])

  const animateOnScroll = useCallback(() => {
    features.forEach((_, index) => {
      const element = featureRefs.current[index]
      if (element && isElementInViewport(element) && featureAnimations[index].opacity === 0) {
        featureAnimations[index] = { opacity: 1, y: 0 }
      }
    })
    ppfTypes.forEach((type, index) => {
      const element = ppfTypeRefs.current[index]
      if (element && isElementInViewport(element) && ppfTypeAnimations[index].opacity === 0) {
        ppfTypeAnimations[index] = { opacity: 1, scale: 1 }
      }
    })
  }, [isElementInViewport, featureAnimations, ppfTypeAnimations])

  useEffect(() => {
    window.addEventListener("scroll", animateOnScroll)
    animateOnScroll() // Initial check

    return () => window.removeEventListener("scroll", animateOnScroll)
  }, [animateOnScroll])

  return (
    <div className="min-h-screen py-16 pt-32">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Paint Protection Film</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Protect your vehicle's paint with our state-of-the-art PPF technology, offering unmatched protection against
            scratches, chips, and environmental damage.
          </p>
        </motion.div>
      </section>

      {/* Benefits of PPF */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Benefits of Paint Protection Film</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">☀️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">UV Protection</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Maintain the condition of your vehicle's paint from harmful UV exposure, effectively reducing sunburn
                and fading over time.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Enhanced Gloss</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Enhance the gloss finish of your vehicle, providing a deeper, more vibrant appearance that maintains its
                brilliance.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔥</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Temperature Resistance</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Provide high-temperature resistance, ensuring your paint protection remains effective even in extreme
                heat conditions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PPF Products and Pricing */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">PPF Products and Pricing</h2>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="pp1">
                <AccordionTrigger>PP1 (7.5 mil) - 140,000 Kshs | 1 Year Warranty</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <p className="font-medium">
                      Premium entry-level paint protection film offering excellent value and performance.
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>7.5 mil thickness for reliable protection against minor impacts</li>
                      <li>Self-healing properties for minor scratches and swirl marks</li>
                      <li>Crystal clear finish that maintains paint visibility</li>
                      <li>UV resistant coating prevents yellowing and degradation</li>
                      <li>Easy maintenance and cleaning</li>
                    </ul>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      <strong>Warranty:</strong> 1 year coverage against peeling, cracking, and yellowing
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="pp2">
                <AccordionTrigger>PP2 (8.5 mil) - 180,000 Kshs | 1.5 Year Warranty</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <p className="font-medium">
                      Enhanced protection with superior durability and advanced self-healing technology.
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>8.5 mil thickness provides enhanced impact resistance</li>
                      <li>Advanced self-healing formula repairs scratches with heat activation</li>
                      <li>Superior optical clarity with anti-glare properties</li>
                      <li>Enhanced UV protection with anti-yellowing technology</li>
                      <li>Improved adhesion for long-lasting application</li>
                      <li>Stain and chemical resistance</li>
                    </ul>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      <strong>Warranty:</strong> 1.5 year coverage against peeling, cracking, yellowing, and adhesion
                      failure
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="pp3">
                <AccordionTrigger>PP3 (10 mil) - 220,000 Kshs | 2 Year Warranty</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <p className="font-medium">
                      Premium maximum protection film with industry-leading durability and performance.
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>10 mil thickness offers maximum protection against rock chips and impacts</li>
                      <li>Professional-grade self-healing technology with rapid recovery</li>
                      <li>Ultra-clear finish with enhanced depth and gloss</li>
                      <li>Superior UV blocking prevents paint fading and oxidation</li>
                      <li>Advanced polymer construction for extreme durability</li>
                      <li>Hydrophobic surface for easy cleaning and maintenance</li>
                      <li>Temperature resistant from -40°F to 200°F</li>
                    </ul>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      <strong>Warranty:</strong> 2 year comprehensive coverage against all defects and performance
                      issues
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Quote System */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Get a Quote</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md mx-auto"
          >
            <Card>
              <CardContent className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="Your phone number" />
                </div>
                <div>
                  <Label htmlFor="ppf-type">PPF Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select PPF type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pp1">PP1 (7.5 mil) - 140,000 Kshs</SelectItem>
                      <SelectItem value="pp2">PP2 (8.5 mil) - 180,000 Kshs</SelectItem>
                      <SelectItem value="pp3">PP3 (10 mil) - 220,000 Kshs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Get Quote</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl font-bold mb-8">Ready to Protect Your Vehicle?</h2>
            <p className="text-xl mb-8">Experience the ultimate protection with our premium PPF solutions.</p>
            <Button size="lg" variant="secondary" className="transform transition-all hover:scale-105 hover:shadow-lg">
              Schedule Installation
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
