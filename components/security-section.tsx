"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Server, Eye } from "lucide-react"

const securityFeatures = [
  {
    icon: Shield,
    title: "SOC 2 Type II Certified",
    description: "Independently audited security controls that meet the highest industry standards.",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "Your data is encrypted in transit and at rest using AES-256 encryption.",
  },
  {
    icon: Server,
    title: "Multi-Region Infrastructure",
    description: "Globally distributed data centers with automatic failover and 99.99% uptime SLA.",
  },
  {
    icon: Eye,
    title: "Privacy by Design",
    description: "GDPR and CCPA compliant. Your data stays yours—we never sell or share it.",
  },
]

export function SecuritySection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              Enterprise-grade security you can trust
            </h2>
            <p className="mt-4 text-muted-foreground text-pretty leading-relaxed">
              Built from the ground up with security in mind. We protect your data with the same rigor used by Fortune
              500 companies.
            </p>

            <div className="mt-10 space-y-6">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square max-w-md mx-auto relative">
              {/* Animated security visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-full h-full rounded-full border border-border"
                />
              </div>
              <div className="absolute inset-8 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 45, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-full h-full rounded-full border border-primary/30"
                />
              </div>
              <div className="absolute inset-16 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-full h-full rounded-full border border-primary/50"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="w-24 h-24 rounded-2xl bg-primary/10 backdrop-blur-xl flex items-center justify-center"
                >
                  <Shield className="w-12 h-12 text-primary" />
                </motion.div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute top-10 right-10 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs text-muted-foreground"
              >
                256-bit SSL
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute bottom-10 left-10 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs text-muted-foreground"
              >
                99.99% Uptime
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
