"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),
  phone: z.string().optional(),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

// Animation variants
const formVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
}

const fieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

const errorVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 500, damping: 30 },
  },
  exit: { opacity: 0, y: -10, scale: 0.8 },
}

const successVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  })

  const watchedFields = watch()

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Form submitted:", data)
    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after success
    setTimeout(() => {
      setIsSubmitted(false)
      reset()
    }, 3000)
  }

  const getFieldStatus = (fieldName: keyof ContactFormData) => {
    const isTouched = touchedFields[fieldName]
    const hasError = errors[fieldName]
    const hasValue = watchedFields[fieldName]

    if (!isTouched) return "default"
    if (hasError) return "error"
    if (hasValue && !hasError) return "success"
    return "default"
  }

  const getFieldBorderClass = (fieldName: keyof ContactFormData) => {
    const status = getFieldStatus(fieldName)
    switch (status) {
      case "error":
        return "border-red-500 focus:border-red-500 focus:ring-red-500/20"
      case "success":
        return "border-green-500 focus:border-green-500 focus:ring-green-500/20"
      default:
        return "border-gray-300 focus:border-primary focus:ring-primary/20"
    }
  }

  if (isSubmitted) {
    return (
      <motion.div className="text-center py-20" variants={successVariants} initial="hidden" animate="visible">
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6 }}
        >
          <CheckCircle className="w-8 h-8 text-green-600" />
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
        <p className="text-gray-600 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
        <motion.div
          className="w-full bg-green-200 rounded-full h-2"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3 }}
        >
          <motion.div
            className="bg-green-600 h-2 rounded-full"
            initial={{ width: "100%" }}
            animate={{ width: 0 }}
            transition={{ duration: 3 }}
          />
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
      {/* Contact Information */}
      <motion.div
        className="space-y-8"
        variants={formVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={fieldVariants}>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h3>
          <p className="text-gray-600 mb-8">
            Ready to streamline your workflow? Let's discuss how StreamLine can transform your team's productivity.
          </p>
        </motion.div>

        <div className="space-y-6">
          {[
            { icon: Mail, title: "Email", content: "hello@streamline.com", href: "mailto:hello@streamline.com" },
            { icon: Phone, title: "Phone", content: "+1 (555) 123-4567", href: "tel:+15551234567" },
            { icon: MapPin, title: "Office", content: "123 Innovation Drive\nSan Francisco, CA 94105", href: "#" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-4"
              variants={fieldVariants}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <item.icon className="w-5 h-5 text-primary" />
              </motion.div>
              <div>
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <a href={item.href} className="text-gray-600 hover:text-primary transition-colors whitespace-pre-line">
                  {item.content}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fieldVariants}>
          <Card className="border-0 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="text-lg">Quick Response Guarantee</CardTitle>
              <CardDescription>
                We typically respond to all inquiries within 2 hours during business hours.
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      </motion.div>

      {/* Contact Form */}
      <motion.div variants={formVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Send us a Message</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Name Field */}
                <motion.div variants={fieldVariants}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <motion.input
                      {...register("name")}
                      type="text"
                      id="name"
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${getFieldBorderClass("name")}`}
                      placeholder="John Doe"
                      whileFocus={{ scale: 1.02 }}
                    />
                    <AnimatePresence>
                      {getFieldStatus("name") === "success" && (
                        <motion.div
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          variants={errorVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <AnimatePresence>
                    {errors.name && (
                      <motion.div
                        className="flex items-center space-x-2 mt-2"
                        variants={errorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-600">{errors.name.message}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Email Field */}
                <motion.div variants={fieldVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <motion.input
                      {...register("email")}
                      type="email"
                      id="email"
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${getFieldBorderClass("email")}`}
                      placeholder="john@company.com"
                      whileFocus={{ scale: 1.02 }}
                    />
                    <AnimatePresence>
                      {getFieldStatus("email") === "success" && (
                        <motion.div
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          variants={errorVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.div
                        className="flex items-center space-x-2 mt-2"
                        variants={errorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-600">{errors.email.message}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Company Field */}
                <motion.div variants={fieldVariants}>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company *
                  </label>
                  <div className="relative">
                    <motion.input
                      {...register("company")}
                      type="text"
                      id="company"
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${getFieldBorderClass("company")}`}
                      placeholder="Your Company"
                      whileFocus={{ scale: 1.02 }}
                    />
                    <AnimatePresence>
                      {getFieldStatus("company") === "success" && (
                        <motion.div
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          variants={errorVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <AnimatePresence>
                    {errors.company && (
                      <motion.div
                        className="flex items-center space-x-2 mt-2"
                        variants={errorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-600">{errors.company.message}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Phone Field */}
                <motion.div variants={fieldVariants}>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <motion.input
                    {...register("phone")}
                    type="tel"
                    id="phone"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${getFieldBorderClass("phone")}`}
                    placeholder="+1 (555) 123-4567"
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>
              </div>

              {/* Subject Field */}
              <motion.div variants={fieldVariants}>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <div className="relative">
                  <motion.input
                    {...register("subject")}
                    type="text"
                    id="subject"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${getFieldBorderClass("subject")}`}
                    placeholder="How can we help you?"
                    whileFocus={{ scale: 1.02 }}
                  />
                  <AnimatePresence>
                    {getFieldStatus("subject") === "success" && (
                      <motion.div
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        variants={errorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <AnimatePresence>
                  {errors.subject && (
                    <motion.div
                      className="flex items-center space-x-2 mt-2"
                      variants={errorVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-600">{errors.subject.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Message Field */}
              <motion.div variants={fieldVariants}>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <div className="relative">
                  <motion.textarea
                    {...register("message")}
                    id="message"
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 resize-none ${getFieldBorderClass("message")}`}
                    placeholder="Tell us about your project and how we can help..."
                    whileFocus={{ scale: 1.02 }}
                  />
                  <AnimatePresence>
                    {getFieldStatus("message") === "success" && (
                      <motion.div
                        className="absolute right-3 top-4"
                        variants={errorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <AnimatePresence>
                  {errors.message && (
                    <motion.div
                      className="flex items-center space-x-2 mt-2"
                      variants={errorVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-600">{errors.message.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={fieldVariants}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" size="lg" className="w-full text-lg py-3" disabled={isSubmitting || !isValid}>
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.div
                          key="loading"
                          className="flex items-center space-x-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Sending Message...</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="send"
                          className="flex items-center space-x-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
