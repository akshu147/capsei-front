"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Bike, Car, Truck, Package, ArrowRight, CheckCircle2 } from "lucide-react"

const services = [
  {
    icon: Bike,
    title: "Bike Taxi",
    description: "Quick and affordable two-wheeler rides for daily commutes and short distances.",
    features: ["Fastest pickup times", "Beat traffic easily", "Eco-friendly option"],
    price: "Starting at $2",
    href: "/booking?service=bike",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    icon: Car,
    title: "Car Taxi",
    description: "Comfortable sedan, hatchback, and SUV rides for individuals and groups.",
    features: ["AC rides", "Multiple car options", "Airport transfers"],
    price: "Starting at $5",
    href: "/booking?service=car",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Truck,
    title: "Loading Vehicle",
    description: "Trucks, tempos, and pickups for moving goods, furniture, and heavy cargo.",
    features: ["Various sizes available", "Loading assistance", "Hourly or per-trip"],
    price: "Starting at $15",
    href: "/booking?service=loading",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: Package,
    title: "Parcel Delivery",
    description: "Same-day and scheduled deliveries for documents, packages, and e-commerce.",
    features: ["Real-time tracking", "Proof of delivery", "Insurance available"],
    price: "Starting at $3",
    href: "/parcel",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
]

export function ServicesSection() {
  return (
    <section className="py-24" id="services">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium uppercase tracking-wider text-primary"
          >
            Our Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl"
          >
            One platform, all your mobility needs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-pretty text-muted-foreground"
          >
            From quick bike rides to heavy cargo transport, we have you covered with reliable and affordable options.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50"
            >
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${service.bg}`}>
                <service.icon className={`h-6 w-6 ${service.color}`} />
              </div>

              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>

              <ul className="mt-4 space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">{service.price}</span>
                <Button variant="ghost" size="sm" asChild className="group/btn">
                  <Link href={service.href}>
                    Book Now
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
