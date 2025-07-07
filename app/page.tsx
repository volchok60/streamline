"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, Shield, Users, BarChart3, Star, Menu, Twitter, Linkedin, Github, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, useAnimation } from "framer-motion"
import { useRef, useEffect } from "react"
import ContactForm from "@/components/contact-form"

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

// Animation hook
function useScrollAnimation() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return { ref, controls }
}

export default function LandingPage() {
  const heroAnimation = useScrollAnimation()
  const featuresAnimation = useScrollAnimation()
  const testimonialsAnimation = useScrollAnimation()
  const pricingAnimation = useScrollAnimation()
  const ctaAnimation = useScrollAnimation()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Zap className="h-5 w-5 text-primary-foreground" />
            </motion.div>
            <span className="text-xl font-bold">StreamLine</span>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-6">
            {["Features", "Testimonials", "Pricing", "Contact"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm" className="hidden md:inline-flex">
                Sign In
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="sm">Get Started</Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              className="space-y-8"
              ref={heroAnimation.ref}
              initial="hidden"
              animate={heroAnimation.controls}
              variants={staggerContainer}
            >
              <div className="space-y-4">
                <motion.div variants={staggerItem}>
                  <Badge variant="secondary" className="w-fit">
                    🚀 New: AI-Powered Automation
                  </Badge>
                </motion.div>
                <motion.h1
                  className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
                  variants={staggerItem}
                >
                  Streamline Your
                  <motion.span
                    className="text-primary"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {" "}
                    Workflow
                  </motion.span>
                </motion.h1>
                <motion.p className="text-xl text-muted-foreground max-w-[600px]" variants={staggerItem}>
                  Boost productivity by 300% with our intelligent automation platform. Connect your tools, automate
                  repetitive tasks, and focus on what matters most.
                </motion.p>
              </div>

              <motion.div className="flex flex-col sm:flex-row gap-4" variants={staggerItem}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="text-lg px-8">
                    Start Free Trial
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                    Watch Demo
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div className="flex items-center space-x-8 text-sm text-muted-foreground" variants={staggerItem}>
                <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
                  <Check className="h-4 w-4 text-green-500" />
                  <span>14-day free trial</span>
                </motion.div>
                <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
                  <Check className="h-4 w-4 text-green-500" />
                  <span>No credit card required</span>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="StreamLine Dashboard"
                  width={800}
                  height={600}
                  className="rounded-xl shadow-2xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <motion.div
            className="text-center space-y-4 mb-16"
            ref={featuresAnimation.ref}
            initial="hidden"
            animate={featuresAnimation.controls}
            variants={fadeInUp}
          >
            <Badge variant="secondary" className="w-fit mx-auto">
              Features
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
              Powerful features designed to transform how your team works together
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            animate={featuresAnimation.controls}
          >
            {[
              {
                icon: Zap,
                title: "Smart Automation",
                desc: "AI-powered workflows that learn from your patterns and automate repetitive tasks",
              },
              {
                icon: Users,
                title: "Team Collaboration",
                desc: "Real-time collaboration tools that keep your team synchronized and productive",
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                desc: "Deep insights into your workflow performance with actionable recommendations",
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                desc: "Bank-level security with SOC 2 compliance and end-to-end encryption",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={staggerItem}>
                <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="border-0 shadow-lg h-full">
                    <CardHeader>
                      <motion.div
                        className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <feature.icon className="h-6 w-6 text-primary" />
                      </motion.div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 md:py-32 bg-slate-50">
        <div className="container px-4 md:px-6">
          <motion.div
            className="text-center space-y-4 mb-16"
            ref={testimonialsAnimation.ref}
            initial="hidden"
            animate={testimonialsAnimation.controls}
            variants={fadeInUp}
          >
            <Badge variant="secondary" className="w-fit mx-auto">
              Testimonials
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Loved by teams worldwide</h2>
            <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
              See what our customers have to say about StreamLine
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            animate={testimonialsAnimation.controls}
          >
            {[
              {
                name: "Sarah Johnson",
                role: "CEO, TechCorp",
                initials: "SJ",
                quote:
                  "StreamLine has completely transformed our workflow. We've reduced manual work by 80% and our team is more productive than ever.",
              },
              {
                name: "Michael Chen",
                role: "CTO, StartupXYZ",
                initials: "MC",
                quote:
                  "The automation features are incredible. What used to take hours now happens automatically. Our ROI was immediate.",
              },
              {
                name: "Emily Rodriguez",
                role: "VP Operations, GrowthCo",
                initials: "ER",
                quote:
                  "Best investment we've made for our team. The collaboration features have brought us closer together, even while remote.",
              },
            ].map((testimonial, index) => (
              <motion.div key={index} variants={staggerItem}>
                <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="border-0 shadow-lg h-full">
                    <CardHeader>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + i * 0.1 }}
                          >
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          </motion.div>
                        ))}
                      </div>
                      <CardDescription className="text-base">"{testimonial.quote}"</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-3">
                        <motion.div
                          className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                        >
                          <span className="text-sm font-medium">{testimonial.initials}</span>
                        </motion.div>
                        <div>
                          <p className="font-medium">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <motion.div
            className="text-center space-y-4 mb-16"
            ref={pricingAnimation.ref}
            initial="hidden"
            animate={pricingAnimation.controls}
            variants={fadeInUp}
          >
            <Badge variant="secondary" className="w-fit mx-auto">
              Pricing
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Simple, transparent pricing</h2>
            <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
              Choose the perfect plan for your team size and needs
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            animate={pricingAnimation.controls}
          >
            {[
              {
                name: "Starter",
                price: "$29",
                desc: "Perfect for small teams",
                popular: false,
                features: ["Up to 5 team members", "Basic automation", "Standard support", "5GB storage"],
              },
              {
                name: "Professional",
                price: "$79",
                desc: "Best for growing teams",
                popular: true,
                features: [
                  "Up to 25 team members",
                  "Advanced automation",
                  "Priority support",
                  "100GB storage",
                  "Advanced analytics",
                ],
              },
              {
                name: "Enterprise",
                price: "$199",
                desc: "For large organizations",
                popular: false,
                features: [
                  "Unlimited team members",
                  "Custom automation",
                  "24/7 dedicated support",
                  "Unlimited storage",
                  "Custom integrations",
                ],
              },
            ].map((plan, index) => (
              <motion.div key={index} variants={staggerItem}>
                <motion.div whileHover={{ y: -10, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className={`border-2 relative ${plan.popular ? "border-primary" : ""}`}>
                    {plan.popular && (
                      <motion.div
                        className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                      >
                        <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                      </motion.div>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription>{plan.desc}</CardDescription>
                      <div className="mt-4">
                        <motion.span className="text-4xl font-bold" whileHover={{ scale: 1.1 }}>
                          {plan.price}
                        </motion.span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            className="flex items-center space-x-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + featureIndex * 0.1 }}
                          >
                            <Check className="h-4 w-4 text-green-500" />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          className={`w-full ${plan.popular ? "" : "bg-transparent"}`}
                          variant={plan.popular ? "default" : "outline"}
                        >
                          {plan.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <motion.div
            className="space-y-8 max-w-3xl mx-auto"
            ref={ctaAnimation.ref}
            initial="hidden"
            animate={ctaAnimation.controls}
            variants={staggerContainer}
          >
            <motion.h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl" variants={staggerItem}>
              Ready to streamline your workflow?
            </motion.h2>
            <motion.p className="text-xl opacity-90" variants={staggerItem}>
              Join thousands of teams who have already transformed their productivity with StreamLine. Start your free
              trial today and see the difference in just 24 hours.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={staggerItem}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Start Free Trial
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                >
                  Schedule Demo
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              className="flex items-center justify-center space-x-8 text-sm opacity-75"
              variants={staggerItem}
            >
              {["14-day free trial", "No setup fees", "Cancel anytime"].map((item, index) => (
                <motion.div key={index} className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
                  <Check className="h-4 w-4" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-slate-50">
        <div className="container px-4 md:px-6">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Badge variant="secondary" className="w-fit mx-auto">
              Contact Us
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Let's Start a Conversation</h2>
            <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
              Ready to transform your workflow? Get in touch with our team to discuss your needs and see how StreamLine
              can help.
            </p>
          </motion.div>

          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-slate-900 text-slate-300">
        <div className="container px-4 md:px-6 py-16">
          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className="space-y-4" variants={staggerItem}>
              <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
                <motion.div
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Zap className="h-5 w-5 text-primary-foreground" />
                </motion.div>
                <span className="text-xl font-bold text-white">StreamLine</span>
              </motion.div>
              <p className="text-sm">
                Streamline your workflow and boost productivity with our intelligent automation platform.
              </p>
              <div className="flex space-x-4">
                {[Twitter, Linkedin, Github, Mail].map((Icon, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.9 }}>
                    <Link href="#" className="hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {[
              { title: "Product", links: ["Features", "Pricing", "Integrations", "API"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
              { title: "Support", links: ["Help Center", "Documentation", "Status", "Security"] },
            ].map((section, sectionIndex) => (
              <motion.div key={sectionIndex} className="space-y-4" variants={staggerItem}>
                <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                <ul className="space-y-2 text-sm">
                  {section.links.map((link, linkIndex) => (
                    <motion.li key={linkIndex} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Link href="#" className="hover:text-white transition-colors">
                        {link}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm">© {new Date().getFullYear()} StreamLine. All rights reserved.</p>
            <div className="flex space-x-6 text-sm mt-4 md:mt-0">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05 }}>
                  <Link href="#" className="hover:text-white transition-colors">
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
