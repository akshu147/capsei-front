"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Shield, BarChart3, Cpu } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Real-time Sync",
    description: "Instant data synchronization across all devices with sub-millisecond latency. Never miss a beat.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption, SOC 2 compliance, and advanced threat detection built into every layer.",
  },
  {
    icon: BarChart3,
    title: "Infinite Scale",
    description: "Auto-scaling infrastructure that grows with your business. From prototype to millions of users.",
  },
  {
    icon: Cpu,
    title: "AI-Powered",
    description: "Intelligent automation that learns from your workflow. Let AI handle the repetitive tasks.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Built for modern teams</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-pretty">
            Everything you need to ship faster, collaborate better, and scale effortlessly.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card/50 backdrop-blur-xl border-border hover:border-primary/30 transition-all duration-300 group h-full">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
