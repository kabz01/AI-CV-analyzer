"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Image from "next/image"

const services = [
  {
    title: "Car Wrapping",
    description:
      "Transform your vehicle with our premium vinyl wraps. Choose from a wide range of colors and finishes.",
  },
  {
    title: "Paint Protection Film",
    description: "Protect your car's paint from chips, scratches, and environmental damage with our high-quality PPF.",
  },
  {
    title: "Ceramic Coating",
    description:
      "Enhance your car's shine and protect it from the elements with our professional ceramic coating service.",
  },
]

export default function Services() {
  return (
    <div className="container mx-auto px-6 py-16 pt-32">
      <motion.h1
        className="text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Services
      </motion.h1>
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-gray-800 border-gray-700 h-full">
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">{service.description}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Car Protection Services Catalog */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Car Protection Excellence
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group"
            >
              <Card className="bg-gray-800 border-gray-700 overflow-hidden h-full">
                <div className="relative h-80 md:h-96">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-07-27%20at%2021.43.48_3b5022d9.jpg-1TZlpcZUnX20ei3TxNw5goHMkplQtD.jpeg"
                    alt="Professional paint protection detail work showcasing premium finish quality"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority
                    quality={100}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Precision Detail Work</h3>
                  <p className="text-gray-300">
                    Experience the difference of professional-grade paint protection that enhances your vehicle'natural
                    beauty while providing long-lasting protection.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group"
            >
              <Card className="bg-gray-800 border-gray-700 overflow-hidden h-full">
                <div className="relative h-80 md:h-96">
                  <Image
                    src="/images/services/luxury-detailing.jpg"
                    alt="Luxury vehicle detailing showcasing deep blue metallic finish and professional surface treatment"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority
                    quality={100}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Luxury Vehicle Detailing</h3>
                  <p className="text-gray-300">
                    Experience the pinnacle of automotive craftsmanship with our luxury vehicle detailing services.
                    Specializing in premium finishes and high-end surface treatments.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="group"
            >
              <Card className="bg-gray-800 border-gray-700 overflow-hidden h-full">
                <div className="relative h-80 md:h-96">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-07-27%20at%2021.43.48_fc510ff9.jpg-jZdEmSn0kW7UMFTijyqnMpsZ4RIJam.jpeg"
                    alt="Complete vehicle protection service showing finished results"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority
                    quality={100}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Complete Vehicle Care</h3>
                  <p className="text-gray-300">
                    From comprehensive paint protection to ceramic coating applications, we provide complete vehicle
                    care solutions. Our expert services ensure your investment maintains its pristine condition and
                    retains maximum value for years to come.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            className="mt-16 space-y-6 max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-center mb-8">Our Work Gallery</h3>

            {/* Row 1 - 3 images */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden group">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-28%20at%2021.54.32_86e2a74e-2BqeW9mY555m9Yr8zpqU5PiSPbBySm.jpg"
                  alt="White car front view with professional wrap application"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
              </div>
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden group">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-28%20at%2021.54.30_50ffedba-iboq3OxvEYpf1e41p6AsC1rsojdhEW.jpg"
                  alt="Car in workshop with hood open showing detail work"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
              </div>
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden group">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-28%20at%2021.54.30_e452fbdf-BGbpUe9zAifkMoAZKKWoi6HF82Rn2Q.jpg"
                  alt="White VW car in professional workshop"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
              </div>
            </div>

            {/* Row 2 - 3 images */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden group">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-28%20at%2021.54.31_efbe2f6f-Kyy1Wr4qGbPnVLhS35iFtI388zptHj.jpg"
                  alt="Close-up of PPF application with water droplets"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
              </div>
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden group">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-28%20at%2021.54.31_1100c4f6-V2nuP0nHSCGIwAYmalDibKlzGR88A5.jpg"
                  alt="PPF application on black car hood with professional tools"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
              </div>
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden group">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-28%20at%2021.54.31_0ed76512-n4GevgH08HBYrG3i6Wsh6PfutpgRjB.jpg"
                  alt="Blue car with PPF being applied showing professional finish"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
              </div>
            </div>

            {/* Row 3 - 4 images */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden group">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-28%20at%2021.54.30_8d271376-pHd2vRHHyfIUrrNBoafVL9zGD6bdum.jpg"
                  alt="White VW Golf at shop entrance with professional signage"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                />
              </div>
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden group">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-28%20at%2021.54.31_acde8b44-f0wCjuvFSlwh3DWU6JLKoMSPFsE7Bf.jpg"
                  alt="White car with PPF application and professional tools"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                />
              </div>
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden group">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-28%20at%2021.54.32_ea44c171-EucxITiNmnUwdfYMFBhRNMZecJlZ6d.jpg"
                  alt="Close-up of car door with professional PPF application"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                />
              </div>
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden group">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-28%20at%2021.54.31_475e0e07-4ui48bsHU4u74LY9wumWhn8kDa7jcQ.jpg"
                  alt="White Peugeot SUV at professional shop entrance"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
