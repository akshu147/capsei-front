"use client"

import { motion } from "framer-motion"
import { MapPin, Search, CreditCard, Navigation } from "lucide-react"

const steps = [
  {
    icon: MapPin,
    title: "Enter Location",
    description: "Add your pickup and drop-off addresses using our smart search or pin on map.",
  },
  {
    icon: Search,
    title: "Choose Service",
    description: "Select from bike taxi, car, loading vehicle, or parcel delivery based on your needs.",
  },
  {
    icon: CreditCard,
    title: "Confirm & Pay",
    description: "Review fare estimate and confirm. Pay via wallet, card, or cash after the trip.",
  },
  {
    icon: Navigation,
    title: "Track & Arrive",
    description: "Track your driver in real-time and get notified when they arrive at pickup.",
  },
]

export function HowItWorks() {
  return (
    <section className="border-y border-border bg-card/50 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium uppercase tracking-wider text-primary"
          >
            How It Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Book your ride in seconds
          </motion.h2>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-1/2 hidden h-0.5 -translate-y-1/2 bg-border lg:block" />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative text-center"
              >
                <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background">
                  <step.icon className="h-7 w-7 text-primary" />
                  <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
