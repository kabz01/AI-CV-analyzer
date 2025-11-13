"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const contactMethods = [
    { icon: "📞", label: "Phone", value: "+254758448773", href: null, isText: true },
    { icon: "✉️", label: "Email", value: "Denniskabiru55@gmail.com", href: null, isText: true },
    {
      icon: "📸",
      label: "Instagram",
      value: "@kabi.ru",
      href: "https://www.instagram.com/kabi.ru/?__pwa=1#",
      isText: false,
    },
  ]

  return (
    <section id="contact" ref={ref} className="relative bg-background py-20 lg:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-5xl lg:text-6xl font-light tracking-tight text-foreground leading-tight">
            Let's <span className="text-accent">Connect</span>
          </h2>
          <p className="max-w-2xl text-muted-foreground mt-4">
            Ready to bring your vision to life? Whether it's a special event, editorial shoot, or corporate project, I'd
            love to collaborate.
          </p>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <h3 className="mb-8 text-2xl font-light tracking-tight text-foreground">Get in Touch</h3>
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={method.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  >
                    {method.isText ? (
                      <div className="group flex items-start gap-4 rounded-lg border border-border p-4">
                        <span className="text-2xl">{method.icon}</span>
                        <div>
                          <p className="text-sm tracking-wide text-muted-foreground">{method.label}</p>
                          <p className="mt-1 font-light text-foreground">{method.value}</p>
                        </div>
                      </div>
                    ) : (
                      <a
                        href={method.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-4 rounded-lg border border-border p-4 transition hover:border-accent hover:bg-secondary/50"
                      >
                        <span className="text-2xl">{method.icon}</span>
                        <div>
                          <p className="text-sm tracking-wide text-muted-foreground">{method.label}</p>
                          <p className="mt-1 font-light text-accent group-hover:text-accent">{method.value}</p>
                        </div>
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h3 className="mb-8 text-2xl font-light tracking-tight text-foreground">Send a Message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="tracking-wide">Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          {...field}
                          className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="tracking-wide">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your@email.com"
                          {...field}
                          className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="tracking-wide">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about your project, vision, and requirements..."
                          className="min-h-[140px] border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <a
                  href="https://wa.me/254758448773?text=Hi%20Kabiru%2C%20I%20would%20like%20to%20inquire%20about%20your%20photography%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center bg-accent text-background font-light tracking-wider hover:bg-accent/90 rounded-md px-4 py-2 transition"
                >
                  💬 Chat on WhatsApp
                </a>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
