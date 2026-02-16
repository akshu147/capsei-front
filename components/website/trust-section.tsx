"use client"

import { motion } from "framer-motion"
import { Shield, UserCheck, MapPin, HeadphonesIcon, Award, Lock } from "lucide-react"

const trustItems = [
  {
    icon: UserCheck,
    title: "Verified Drivers",
    description: "All drivers undergo thorough background checks and identity verification.",
  },
  {
    icon: Shield,
    title: "Insurance Coverage",
    description: "Every ride is covered by our comprehensive insurance policy.",
  },
  {
    icon: MapPin,
    title: "Live Tracking",
    description: "Share your trip with family and track rides in real-time.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Our support team is available round the clock for any assistance.",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    description: "PCI-DSS compliant payment processing for all transactions.",
  },
  {
    icon: Award,
    title: "Quality Assured",
    description: "Regular vehicle inspections and driver training programs.",
  },
]

export function TrustSection() {
  return (
    <section className="border-t border-border bg-card/50 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium uppercase tracking-wider text-primary"
          >
            Trust & Safety
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Your safety is our priority
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-pretty text-muted-foreground"
          >
            We have implemented multiple layers of safety measures to ensure you have a secure and comfortable
            experience.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4 rounded-xl border border-border bg-background p-5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-16 flex max-w-3xl flex-wrap items-center justify-center gap-8"
        >
          {["ISO 27001 Certified", "GDPR Compliant", "SOC 2 Type II"].map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm"
            >
              <Shield className="h-4 w-4 text-primary" />
              <span>{badge}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
