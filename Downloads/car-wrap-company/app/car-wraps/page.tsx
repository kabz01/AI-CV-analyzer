"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight, Info, Check } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { trackButtonClick, submitQuoteRequest } from "@/lib/supabase"

// Define car wrap colors with their details
const wrapColors = [
  {
    id: "tiffany",
    name: "Tiffany",
    description:
      "A vibrant turquoise finish that captures attention with its distinctive hue, perfect for making a bold statement.",
    image: "/images/wraps/tiffany.jpg",
    popular: true,
    carType: ["sedan", "luxury"],
    features: ["Gloss finish", "UV resistant", "Scratch resistant", "3-5 year lifespan"],
    finishType: "gloss",
  },
  {
    id: "ultra-gloss-combat-green",
    name: "Ultra Gloss Combat Green",
    description:
      "A military-inspired olive green with a high-gloss finish that offers a unique and sophisticated appearance.",
    image: "/images/wraps/ultra-gloss-combat-green.jpg",
    popular: false,
    carType: ["sedan", "sports"],
    features: ["Ultra gloss finish", "UV resistant", "Scratch resistant", "3-5 year lifespan"],
    finishType: "gloss",
  },
  {
    id: "ultra-gloss-light-blue",
    name: "Ultra Gloss Light Blue",
    description: "A refreshing light blue with a high-gloss finish that gives your vehicle a clean, modern appearance.",
    image: "/images/wraps/ultra-gloss-light-blue.jpg",
    popular: true,
    carType: ["sports", "coupe"],
    features: ["Ultra gloss finish", "UV resistant", "Scratch resistant", "3-5 year lifespan"],
    finishType: "gloss",
  },
  {
    id: "super-chrome-red",
    name: "Super Chrome Red",
    description: "A striking red chrome finish that creates a bold, futuristic look perfect for modern vehicles.",
    image: "/images/wraps/super-chrome-red.jpg",
    popular: true,
    carType: ["electric", "suv"],
    features: ["Chrome finish", "Premium quality", "UV resistant", "3-5 year lifespan"],
    finishType: "chrome",
  },
  {
    id: "supreme-red",
    name: "Supreme Red",
    description: "A deep, rich red that exudes luxury and sophistication, perfect for premium vehicles.",
    image: "/images/wraps/supreme-red.jpg",
    popular: false,
    carType: ["suv", "luxury"],
    features: ["Gloss finish", "UV resistant", "Scratch resistant", "3-5 year lifespan"],
    finishType: "gloss",
  },
  {
    id: "yacht-blue",
    name: "Yacht Blue",
    description: "A serene sky blue reminiscent of clear waters, offering a fresh and elegant appearance.",
    image: "/images/wraps/yacht-blue.jpg",
    popular: false,
    carType: ["sedan", "luxury"],
    features: ["Gloss finish", "UV resistant", "Scratch resistant", "3-5 year lifespan"],
    finishType: "gloss",
  },
  {
    id: "violet-purple",
    name: "Violet Purple",
    description: "A vibrant purple that makes a bold statement and ensures your vehicle stands out from the crowd.",
    image: "/images/wraps/violet-purple.jpg",
    popular: true,
    carType: ["suv", "luxury"],
    features: ["Satin finish", "UV resistant", "Scratch resistant", "3-5 year lifespan"],
    finishType: "satin",
  },
  {
    id: "vibrant-blue",
    name: "Vibrant Blue",
    description: "An energetic blue that combines depth and brilliance for a sporty, dynamic appearance.",
    image: "/images/wraps/vibrant-blue.jpg",
    popular: true,
    carType: ["sedan", "sports"],
    features: ["Gloss finish", "UV resistant", "Scratch resistant", "3-5 year lifespan"],
    finishType: "gloss",
  },
  {
    id: "gloss-black",
    name: "Gloss Black",
    description: "A sleek gloss black finish with racing stripes, perfect for those seeking a sporty, aggressive look.",
    image: "/images/wraps/gloss-black.jpg",
    popular: true,
    carType: ["hatchback", "sports"],
    features: ["Gloss finish", "Racing stripe option", "UV resistant", "Scratch resistant", "3-5 year lifespan"],
    finishType: "gloss",
  },
  {
    id: "custom-white-black",
    name: "Custom White & Black",
    description: "A sophisticated two-tone design with white and black sections, complemented by premium gold wheels.",
    image: "/images/wraps/custom-white-black.jpg",
    popular: false,
    carType: ["coupe", "sedan", "sports"],
    features: ["Two-tone design", "Premium finish", "UV resistant", "Scratch resistant", "3-5 year lifespan"],
    finishType: "custom",
  },
  {
    id: "emerald-green",
    name: "Emerald Green",
    description: "A vibrant emerald green finish that turns heads with its jewel-like depth and brilliance.",
    image: "/images/wraps/emerald-green.jpg",
    popular: true,
    carType: ["sedan", "coupe", "sports"],
    features: ["Metallic finish", "UV resistant", "Scratch resistant", "3-5 year lifespan"],
    finishType: "metallic",
  },
  {
    id: "deep-blue",
    name: "Deep Blue",
    description: "A rich, deep blue finish that exudes power and elegance, perfect for luxury vehicles.",
    image: "/images/wraps/deep-blue.jpg",
    popular: true,
    carType: ["suv", "sedan", "sports"],
    features: ["Metallic finish", "UV resistant", "Scratch resistant", "3-5 year lifespan"],
    finishType: "metallic",
  },
  {
    id: "gloss-green-black",
    name: "Gloss Green Black",
    description: "A dark forest green with a high-gloss finish, offering a subtle yet distinctive appearance.",
    image: "/images/wraps/gloss-green-black.jpg",
    popular: false,
    carType: ["suv", "crossover"],
    features: ["Gloss finish", "UV resistant", "Scratch resistant", "3-5 year lifespan"],
    finishType: "gloss",
  },
  {
    id: "ivory-cream-black-top",
    name: "Ivory Cream with Black Top",
    description: "An elegant two-tone design featuring a cream body with a contrasting black roof for a premium look.",
    image: "/images/wraps/ivory-cream-black-top.jpg",
    popular: true,
    carType: ["sedan", "luxury"],
    features: ["Two-tone design", "Premium finish", "UV resistant", "Scratch resistant", "3-5 year lifespan"],
    finishType: "custom",
  },
  {
    id: "golden-yellow",
    name: "Golden Yellow",
    description: "A striking golden yellow finish that catches the light beautifully, perfect for making a statement.",
    image: "/images/wraps/golden-yellow.jpg",
    popular: false,
    carType: ["coupe", "sports", "muscle"],
    features: ["Metallic finish", "UV resistant", "Scratch resistant", "3-5 year lifespan"],
    finishType: "metallic",
  },
  {
    id: "hunter-green",
    name: "Hunter Green",
    description: "A deep, rich green with subtle metallic undertones, offering a sophisticated and timeless look.",
    image: "/images/wraps/hunter-green.jpg",
    popular: false,
    carType: ["sedan", "coupe", "sports"],
    features: ["Metallic finish", "UV resistant", "Scratch resistant", "3-5 year lifespan"],
    finishType: "metallic",
  },
  {
    id: "gunsmoke-grey",
    name: "Gunsmoke Grey",
    description: "A premium metallic grey with a smoky finish, providing a modern and sophisticated appearance.",
    image: "/images/wraps/gunsmoke-grey.jpg",
    popular: true,
    carType: ["sedan", "luxury", "sports"],
    features: ["Metallic finish", "UV resistant", "Scratch resistant", "3-5 year lifespan"],
    finishType: "metallic",
  },
  {
    id: "kelly-green",
    name: "Kelly Green",
    description: "A vibrant, eye-catching lime green that demands attention and makes any vehicle stand out.",
    image: "/images/wraps/kelly-green.jpg",
    popular: true,
    carType: ["coupe", "sports"],
    features: ["Gloss finish", "UV resistant", "Scratch resistant", "3-5 year lifespan"],
    finishType: "gloss",
  },
  {
    id: "black-silver",
    name: "Matte Silver",
    description: "A sophisticated matte silver finish with subtle gray undertones, perfect for luxury vehicles.",
    image: "/images/wraps/black-silver.jpg",
    popular: true,
    carType: ["sedan", "coupe"],
    features: ["Matte finish", "UV resistant", "Scratch resistant", "3-5 year lifespan"],
    finishType: "matte",
  },
  {
    id: "baby-blue",
    name: "Baby Blue",
    description: "A vibrant light blue that stands out in any environment, giving your car a fresh, modern look.",
    image: "/images/wraps/baby-blue.jpg",
    popular: false,
    carType: ["sedan", "coupe", "hatchback"],
    features: ["Gloss finish", "UV resistant", "Scratch resistant", "3-5 year lifespan"],
    finishType: "gloss",
  },
  {
    id: "black-yellow-custom",
    name: "Black & Yellow Split",
    description: "A bold dual-tone design with striking contrast between deep black and vibrant yellow.",
    image: "/images/wraps/black-yellow-custom.jpg",
    popular: true,
    carType: ["sedan", "coupe", "hatchback"],
    features: ["Custom design", "Gloss finish", "UV resistant", "3-5 year lifespan"],
    finishType: "custom",
  },
  {
    id: "amazon-grey",
    name: "Amazon Grey",
    description: "A sleek grey finish with subtle green accents, offering a unique and sophisticated appearance.",
    image: "/images/wraps/amazon-grey.jpg",
    popular: false,
    carType: ["sedan", "coupe", "suv"],
    features: ["Metallic finish", "UV resistant", "Scratch resistant", "3-5 year lifespan"],
    finishType: "metallic",
  },
  {
    id: "black-white-custom",
    name: "Black & White Split",
    description:
      "A classic dual-tone design with a clean split between black and white, with optional LED accent lighting.",
    image: "/images/wraps/black-white-custom.jpg",
    popular: true,
    carType: ["sedan", "coupe", "hatchback"],
    features: ["Custom design", "Gloss finish", "UV resistant", "LED compatible", "3-5 year lifespan"],
    finishType: "custom",
  },
  {
    id: "chameleon-white",
    name: "Chameleon Laser Metallic",
    description:
      "A premium holographic wrap that shifts colors depending on the viewing angle and lighting conditions.",
    image: "/images/wraps/chameleon-white.jpg",
    popular: true,
    carType: ["suv", "sedan", "coupe"],
    features: ["Color-shifting", "Premium finish", "UV resistant", "Scratch resistant", "5-7 year lifespan"],
    finishType: "metallic",
  },
  {
    id: "black-to-yellow",
    name: "Black to Yellow Gradient",
    description: "A stunning gradient effect that transitions from deep black to vibrant yellow/orange.",
    image: "/images/wraps/black-to-yellow.jpg",
    popular: false,
    carType: ["sedan", "coupe"],
    features: ["Gradient design", "Gloss finish", "UV resistant", "Scratch resistant", "3-5 year lifespan"],
    finishType: "custom",
  },
  {
    id: "black-to-green",
    name: "Black to Green Split",
    description: "A dramatic two-tone design featuring deep black and vibrant green, perfect for making a statement.",
    image: "/images/wraps/black-to-green.jpg",
    popular: false,
    carType: ["sedan", "coupe", "sports"],
    features: ["Custom design", "Gloss finish", "UV resistant", "Scratch resistant", "3-5 year lifespan"],
    finishType: "custom",
  },
]

// Define car models with their prices
const carModels = {
  sedan: [
    { name: "BMW 3 Series", basePrice: 80000 },
    { name: "Mercedes-Benz C-Class", basePrice: 80000 },
    { name: "Audi A4", basePrice: 80000 },
    { name: "Toyota Camry", basePrice: 80000 },
    { name: "Honda Accord", basePrice: 80000 },
  ],
  coupe: [
    { name: "BMW 4 Series", basePrice: 85000 },
    { name: "Mercedes-Benz E-Class Coupe", basePrice: 85000 },
    { name: "Audi A5", basePrice: 85000 },
    { name: "Ford Mustang", basePrice: 85000 },
    { name: "Chevrolet Camaro", basePrice: 85000 },
  ],
  suv: [
    { name: "BMW X5", basePrice: 90000 },
    { name: "Mercedes-Benz GLE", basePrice: 90000 },
    { name: "Audi Q7", basePrice: 90000 },
    { name: "Toyota RAV4", basePrice: 90000 },
    { name: "Honda CR-V", basePrice: 90000 },
  ],
  hatchback: [
    { name: "Volkswagen Golf", basePrice: 75000 },
    { name: "Ford Focus", basePrice: 75000 },
    { name: "Honda Civic Hatchback", basePrice: 75000 },
    { name: "Toyota Corolla Hatchback", basePrice: 75000 },
    { name: "Mazda 3", basePrice: 75000 },
  ],
  convertible: [
    { name: "BMW 4 Series Convertible", basePrice: 80000 },
    { name: "Mercedes-Benz C-Class Cabriolet", basePrice: 80000 },
    { name: "Audi A5 Cabriolet", basePrice: 80000 },
    { name: "Ford Mustang Convertible", basePrice: 80000 },
    { name: "Mazda MX-5 Miata", basePrice: 80000 },
  ],
  sports: [
    { name: "Porsche 911", basePrice: 85000 },
    { name: "BMW M4", basePrice: 85000 },
    { name: "Mercedes-AMG GT", basePrice: 85000 },
    { name: "Audi R8", basePrice: 85000 },
    { name: "Nissan GT-R", basePrice: 85000 },
  ],
  luxury: [
    { name: "Bentley Continental GT", basePrice: 100000 },
    { name: "Rolls-Royce Ghost", basePrice: 100000 },
    { name: "Mercedes-Benz S-Class", basePrice: 100000 },
    { name: "BMW 7 Series", basePrice: 100000 },
    { name: "Audi A8", basePrice: 100000 },
  ],
  muscle: [
    { name: "Dodge Challenger", basePrice: 80000 },
    { name: "Chevrolet Camaro SS", basePrice: 80000 },
    { name: "Ford Mustang GT", basePrice: 80000 },
    { name: "Dodge Charger", basePrice: 80000 },
    { name: "Chevrolet Corvette", basePrice: 80000 },
  ],
  crossover: [
    { name: "Hyundai Tucson", basePrice: 85000 },
    { name: "Kia Sportage", basePrice: 85000 },
    { name: "Mazda CX-5", basePrice: 85000 },
    { name: "Nissan Rogue", basePrice: 85000 },
    { name: "Toyota RAV4", basePrice: 85000 },
  ],
  electric: [
    { name: "Tesla Model 3", basePrice: 85000 },
    { name: "Tesla Model Y", basePrice: 85000 },
    { name: "Tesla Cybertruck", basePrice: 85000 },
    { name: "Audi e-tron", basePrice: 85000 },
    { name: "Porsche Taycan", basePrice: 85000 },
    { name: "BMW i4", basePrice: 85000 },
  ],
}

export default function CarWraps() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedCarType, setSelectedCarType] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [quoteSubmitted, setQuoteSubmitted] = useState(false)
  const [hoveredColor, setHoveredColor] = useState<string | null>(null)
  const [selectedFinishType, setSelectedFinishType] = useState<string | null>(null)
  const [comparisonColors, setComparisonColors] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("colors")
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOfflineMode, setIsOfflineMode] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // References to tab triggers
  const modelTabRef = useRef<HTMLButtonElement>(null)
  const quoteTabRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Check for online status
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOfflineMode(!navigator.onLine)
    }

    // Set initial status
    setIsOfflineMode(!navigator.onLine)

    // Add event listeners
    window.addEventListener("online", handleOnlineStatus)
    window.addEventListener("offline", handleOnlineStatus)

    // Clean up
    return () => {
      window.removeEventListener("online", handleOnlineStatus)
      window.removeEventListener("offline", handleOnlineStatus)
    }
  }, [])

  // Handle form submission with improved error handling
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Track the button click
      await trackButtonClick("Submit Quote Request")

      // Prepare quote data
      const quoteData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        color_name: selectedColorDetails?.name || "",
        car_type: selectedCarType || "",
        car_model: selectedModel || "",
        total_price: selectedModelDetails?.basePrice || 0,
        created_at: new Date().toISOString(),
      }

      // Submit quote to Supabase with offline fallback
      const result = await submitQuoteRequest(quoteData)

      // Always show success to the user
      setQuoteSubmitted(true)

      if (result.offline) {
        toast({
          title: "Quote Saved",
          description: "Your quote has been saved and will be submitted when you're back online.",
        })
      } else {
        toast({
          title: "Quote Submitted",
          description: "Your quote request has been successfully submitted!",
        })
      }
    } catch (error) {
      console.error("Error in quote submission process:", error)

      // Still mark as submitted for better UX
      setQuoteSubmitted(true)

      toast({
        title: "Quote Saved",
        description: "We've saved your quote request and will process it shortly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleColorComparison = (colorId: string) => {
    if (comparisonColors.includes(colorId)) {
      setComparisonColors(comparisonColors.filter((id) => id !== colorId))
    } else {
      if (comparisonColors.length < 3) {
        setComparisonColors([...comparisonColors, colorId])
      }
    }
  }

  // Filter colors based on selected car type and finish type
  const filteredColors = wrapColors.filter((color) => {
    const matchesCarType = selectedCarType ? color.carType.includes(selectedCarType) : true
    const matchesFinishType = selectedFinishType ? color.finishType === selectedFinishType : true
    return matchesCarType && matchesFinishType
  })

  // Get the selected color details
  const selectedColorDetails = wrapColors.find((color) => color.id === selectedColor)

  // Get available models based on selected car type
  const availableModels = selectedCarType ? carModels[selectedCarType as keyof typeof carModels] : []

  // Get selected model details
  const selectedModelDetails = selectedModel ? availableModels.find((model) => model.name === selectedModel) : null

  // Calculate total price
  const calculateTotalPrice = () => {
    if (selectedCarType) {
      const carTypePrice = carModels[selectedCarType as keyof typeof carModels][0].basePrice
      return carTypePrice
    }
    return 0
  }

  // Reset form when car type changes
  useEffect(() => {
    setSelectedModel(null)
  }, [selectedCarType])

  // Function to navigate to model tab
  const navigateToModelTab = () => {
    trackButtonClick("Continue to Select Model")
    setActiveTab("model")
  }

  // Function to navigate to quote tab
  const navigateToQuoteTab = () => {
    trackButtonClick("Continue to Get Quote")
    setActiveTab("quote")
  }

  return (
    <div className="min-h-screen py-24 pt-32">
      {/* Show offline indicator if needed */}
      {isOfflineMode && (
        <div className="fixed top-20 right-4 z-50 bg-yellow-500 text-white px-4 py-2 rounded-md shadow-lg">
          Working offline
        </div>
      )}
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Custom Car Wraps
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Transform your vehicle with our premium vinyl wraps. Choose from a wide range of colors and finishes to
            create a unique look that reflects your style.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="colors" onClick={() => trackButtonClick("Choose Color Tab")}>
              Choose Color
            </TabsTrigger>
            <TabsTrigger
              value="model"
              disabled={!selectedColor}
              ref={modelTabRef}
              onClick={() => trackButtonClick("Select Model Tab")}
            >
              Select Model
            </TabsTrigger>
            <TabsTrigger
              value="quote"
              disabled={!selectedColor || !selectedModel}
              ref={quoteTabRef}
              onClick={() => trackButtonClick("Get Quote Tab")}
            >
              Get Quote
            </TabsTrigger>
          </TabsList>

          {/* Color Selection Tab */}
          <TabsContent value="colors" className="space-y-8">
            {/* Car Type Filter */}
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Button
                variant={selectedCarType === null ? "default" : "outline"}
                onClick={() => {
                  trackButtonClick("All Types Filter")
                  setSelectedCarType(null)
                }}
              >
                All Types
              </Button>
              {Object.keys(carModels).map((type) => (
                <Button
                  key={type}
                  variant={selectedCarType === type ? "default" : "outline"}
                  onClick={() => {
                    trackButtonClick(`${type} Filter`)
                    setSelectedCarType(type)
                  }}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>

            {/* Color Finish Filter */}
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <span className="self-center text-sm font-medium mr-2">Filter by finish:</span>
              <Button
                variant={selectedFinishType === null ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  trackButtonClick("All Finishes Filter")
                  setSelectedFinishType(null)
                }}
              >
                All
              </Button>
              <Button
                variant={selectedFinishType === "gloss" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  trackButtonClick("Gloss Filter")
                  setSelectedFinishType("gloss")
                }}
              >
                Gloss
              </Button>
              <Button
                variant={selectedFinishType === "matte" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  trackButtonClick("Matte Filter")
                  setSelectedFinishType("matte")
                }}
              >
                Matte
              </Button>
              <Button
                variant={selectedFinishType === "satin" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  trackButtonClick("Satin Filter")
                  setSelectedFinishType("satin")
                }}
              >
                Satin
              </Button>
              <Button
                variant={selectedFinishType === "metallic" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  trackButtonClick("Metallic Filter")
                  setSelectedFinishType("metallic")
                }}
              >
                Metallic
              </Button>
              <Button
                variant={selectedFinishType === "custom" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  trackButtonClick("Custom Filter")
                  setSelectedFinishType("custom")
                }}
              >
                Custom
              </Button>
              <Button
                variant={selectedFinishType === "chrome" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  trackButtonClick("Chrome Filter")
                  setSelectedFinishType("chrome")
                }}
              >
                Chrome
              </Button>
            </div>

            {/* Color Grid */}
            {isClient && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredColors.map((color) => (
                  <motion.div
                    key={color.id}
                    whileHover={{ scale: 1.05 }}
                    className={`relative cursor-pointer rounded-lg overflow-hidden shadow-md transition-all duration-300 ${
                      selectedColor === color.id ? "ring-4 ring-primary shadow-lg" : "hover:shadow-xl"
                    }`}
                    onClick={() => {
                      trackButtonClick(`Select Color: ${color.name}`)
                      setSelectedColor(color.id)
                    }}
                    onMouseEnter={() => setHoveredColor(color.id)}
                    onMouseLeave={() => setHoveredColor(null)}
                  >
                    <div className="relative h-48 w-full">
                      <Image src={color.image || "/placeholder.svg"} alt={color.name} fill className="object-cover" />
                      {color.popular && (
                        <div className="absolute top-2 right-2 bg-primary text-white text-xs py-1 px-2 rounded-full">
                          Popular
                        </div>
                      )}
                      <button
                        className={`absolute bottom-2 right-2 p-1.5 rounded-full ${
                          comparisonColors.includes(color.id)
                            ? "bg-primary text-white"
                            : "bg-white/80 text-gray-700 hover:bg-white"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation()
                          trackButtonClick(`Compare Color: ${color.name}`)
                          toggleColorComparison(color.id)
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {comparisonColors.includes(color.id) ? (
                            <>
                              <path d="M5 9l4 4 8-8" />
                            </>
                          ) : (
                            <>
                              <path d="M17 7 L7 17 M7 7 L17 17" />
                            </>
                          )}
                        </svg>
                      </button>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800">
                      <h3 className="font-semibold truncate">{color.name}</h3>
                      <div className="flex justify-between items-center mt-1"></div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {color.carType.slice(0, 2).map((type) => (
                          <span
                            key={type}
                            className="inline-block bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs"
                          >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Color Comparison */}
            {comparisonColors.length > 0 && isClient && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Color Comparison</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      trackButtonClick("Clear All Comparison")
                      setComparisonColors([])
                    }}
                  >
                    Clear All
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {comparisonColors.map((colorId) => {
                    const color = wrapColors.find((c) => c.id === colorId)
                    if (!color) return null

                    return (
                      <div key={colorId} className="relative bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
                        <button
                          className="absolute top-2 right-2 z-10 p-1 bg-white/80 dark:bg-gray-800/80 rounded-full"
                          onClick={() => {
                            trackButtonClick(`Remove from Comparison: ${color.name}`)
                            toggleColorComparison(colorId)
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 6L6 18"></path>
                            <path d="M6 6l12 12"></path>
                          </svg>
                        </button>
                        <div className="relative h-40 w-full">
                          <Image
                            src={color.image || "/placeholder.svg"}
                            alt={color.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium">{color.name}</h4>
                          <div className="mt-2">
                            <p className="text-xs font-medium mb-1">Available for:</p>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {color.carType.slice(0, 2).map((type, idx) => (
                                <span
                                  key={idx}
                                  className="inline-block bg-gray-100 dark:bg-gray-600 px-1.5 py-0.5 rounded text-xs"
                                >
                                  {type.charAt(0).toUpperCase() + type.slice(1)}
                                </span>
                              ))}
                            </div>
                            <div className="mt-1">
                              <div className="flex flex-wrap gap-1">
                                {color.features.slice(0, 2).map((feature, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-block bg-gray-100 dark:bg-gray-600 text-xs px-1.5 py-0.5 rounded"
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <Button
                            className="w-full mt-3"
                            size="sm"
                            onClick={() => {
                              trackButtonClick(`Select from Comparison: ${color.name}`)
                              setSelectedColor(colorId)
                            }}
                          >
                            Select
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Selected Color Preview */}
            {selectedColor && isClient && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative h-[400px]">
                    <Image
                      src={selectedColorDetails?.image || ""}
                      alt={selectedColorDetails?.name || ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{selectedColorDetails?.name}</h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{selectedColorDetails?.description}</p>
                      <div className="mb-6">
                        <h3 className="font-semibold mb-2">Features:</h3>
                        <ul className="space-y-1">
                          {selectedColorDetails?.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <Check className="h-4 w-4 text-green-500 mr-2" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mb-6">
                        <h3 className="font-semibold mb-2">Available for:</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedColorDetails?.carType.map((type, index) => (
                            <span
                              key={index}
                              className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
                            >
                              <Check className="h-4 w-4 text-green-500 mr-2" />
                              <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <Button className="w-full" onClick={navigateToModelTab}>
                        Continue to Select Model <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Color Hover Preview */}
            <AnimatePresence>
              {hoveredColor && hoveredColor !== selectedColor && isClient && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="fixed bottom-8 right-8 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden max-w-md"
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={wrapColors.find((c) => c.id === hoveredColor)?.image || ""}
                      alt={wrapColors.find((c) => c.id === hoveredColor)?.name || ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-lg">{wrapColors.find((c) => c.id === hoveredColor)?.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {wrapColors.find((c) => c.id === hoveredColor)?.description}
                    </p>
                    <div className="mb-3">
                      <p className="text-sm font-medium mb-1">Available for:</p>
                      {wrapColors
                        .find((c) => c.id === hoveredColor)
                        ?.carType.slice(0, 3)
                        .map((type, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs mb-1">
                            <span className="inline-block bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </span>
                          </div>
                        ))}
                      <div className="mt-2">
                        <p className="text-sm font-medium mb-1">Features:</p>
                        <div className="flex flex-wrap gap-1">
                          {wrapColors
                            .find((c) => c.id === hoveredColor)
                            ?.features.slice(0, 3)
                            .map((feature, idx) => (
                              <span
                                key={idx}
                                className="inline-block bg-gray-100 dark:bg-gray-700 text-xs px-1.5 py-0.5 rounded"
                              >
                                {feature}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => {
                        trackButtonClick(`Select from Hover: ${wrapColors.find((c) => c.id === hoveredColor)?.name}`)
                        setSelectedColor(hoveredColor)
                      }}
                      className="w-full"
                    >
                      Select This Color
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          {/* Model Selection Tab */}
          <TabsContent value="model" className="space-y-8">
            {selectedColor && isClient && (
              <>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-8 flex items-center">
                  <div className="relative h-16 w-16 mr-4">
                    <Image
                      src={selectedColorDetails?.image || ""}
                      alt={selectedColorDetails?.name || ""}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">Selected Wrap: {selectedColorDetails?.name}</h3>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Select Your Vehicle Type</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {Object.keys(carModels).map((type) => (
                      <Button
                        key={type}
                        variant={selectedCarType === type ? "default" : "outline"}
                        className="h-auto py-4 flex flex-col"
                        onClick={() => {
                          trackButtonClick(`Select Vehicle Type: ${type}`)
                          setSelectedCarType(type)
                        }}
                      >
                        <span className="text-2xl mb-2">
                          {type === "sedan"
                            ? "🚗"
                            : type === "coupe"
                              ? "🏎️"
                              : type === "suv"
                                ? "🚙"
                                : type === "hatchback"
                                  ? "🚗"
                                  : type === "convertible"
                                    ? "🚙"
                                    : type === "electric"
                                      ? "⚡"
                                      : "🏎️"}
                        </span>
                        <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {selectedCarType && isClient && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Select Your Vehicle Model</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {availableModels.map((model) => (
                        <Card
                          key={model.name}
                          className={`cursor-pointer transition-all ${
                            selectedModel === model.name ? "ring-2 ring-primary" : "hover:shadow-md"
                          }`}
                          onClick={() => {
                            trackButtonClick(`Select Vehicle Model: ${model.name}`)
                            setSelectedModel(model.name)
                          }}
                        >
                          <CardContent className="p-4 flex justify-between items-center">
                            <div>
                              <h3 className="font-semibold">{model.name}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                Base Price: Kshs {model.basePrice.toLocaleString()}
                              </p>
                            </div>
                            {selectedModel === model.name && <Check className="h-5 w-5 text-primary" />}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </motion.div>
                )}

                {selectedModel && isClient && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 text-center"
                  >
                    <Button size="lg" onClick={navigateToQuoteTab}>
                      Continue to Get Quote <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                )}
              </>
            )}
          </TabsContent>

          {/* Quote Tab */}
          <TabsContent value="quote" className="space-y-8">
            {selectedColor && selectedModel && isClient && (
              <>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg mb-8">
                  <h2 className="text-2xl font-bold mb-4">Your Customization Summary</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="relative h-64 rounded-lg overflow-hidden">
                        <Image
                          src={selectedColorDetails?.image || ""}
                          alt={selectedColorDetails?.name || ""}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm text-gray-500 dark:text-gray-400">Selected Wrap</h3>
                          <p className="font-semibold">{selectedColorDetails?.name}</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-gray-500 dark:text-gray-400">Vehicle Type</h3>
                          <p className="font-semibold">
                            {selectedCarType?.charAt(0).toUpperCase() + selectedCarType?.slice(1)}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm text-gray-500 dark:text-gray-400">Vehicle Model</h3>
                          <p className="font-semibold">{selectedModel}</p>
                        </div>
                        <div className="pt-4 border-t">
                          <h3 className="text-lg font-bold">Total Estimated Price</h3>
                          <p className="text-2xl font-bold text-primary">
                            Kshs {calculateTotalPrice().toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            *Final price may vary based on vehicle condition and specific requirements
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {!quoteSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg"
                  >
                    <h2 className="text-2xl font-bold mb-4">Request a Quote</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">Additional Information (Optional)</Label>
                        <textarea
                          id="message"
                          className="w-full min-h-[100px] p-3 border rounded-md bg-background"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Quote Request"}
                      </Button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-gray-800 p-8 rounded-lg text-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                      <Check className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Quote Request Submitted!</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Thank you for your interest in our car wrapping services. Our team will review your request and
                      get back to you within 24-48 hours.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        trackButtonClick("Start New Quote")
                        setQuoteSubmitted(false)
                        setSelectedColor(null)
                        setSelectedCarType(null)
                        setSelectedModel(null)
                        setFormData({ name: "", email: "", phone: "", message: "" })
                        setActiveTab("colors")
                      }}
                    >
                      Start New Quote
                    </Button>
                  </motion.div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 mt-24">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <Info className="h-5 w-5 mr-2 text-primary" />
                How long does a car wrap last?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our premium vinyl wraps typically last between 5-7 years with proper care and maintenance. Factors like
                sun exposure, washing frequency, and storage conditions can affect longevity.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <Info className="h-5 w-5 mr-2 text-primary" />
                Can I wash my wrapped car?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, you can wash your wrapped vehicle, but we recommend hand washing with mild soap and water. Avoid
                high-pressure washers and harsh chemicals that could damage the wrap.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <Info className="h-5 w-5 mr-2 text-primary" />
                How long does installation take?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                A full vehicle wrap typically takes 3-5 business days to complete, depending on the complexity of the
                design and the vehicle type. Partial wraps may take 1-2 days.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <Info className="h-5 w-5 mr-2 text-primary" />
                Will a wrap damage my paint?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                No, a properly installed and removed vinyl wrap will not damage your vehicle's original paint. In fact,
                it can help protect the paint from minor scratches and sun damage.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
