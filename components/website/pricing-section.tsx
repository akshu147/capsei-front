"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Pay As You Go",
    price: "$0",
    period: "no commitment",
    description: "For occasional riders who need flexibility.",
    features: ["Standard fare pricing", "All vehicle types available", "Basic ride tracking", "Email support"],
    cta: "Start Riding",
    href: "/register",
    highlighted: false,
  },
  {
    name: "MoveX Plus",
    price: "$2",
    period: "per month",
    description: "For regular commuters who want savings.",
    features: [
      "10% off all rides",
      "Priority driver matching",
      "No surge pricing",
      "Premium support",
      "Free cancellations",
    ],
    cta: "Get Plus",
    href: "/register?plan=plus",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$4",
    period: "per month",
    description: "For teams and businesses with logistics needs.",
    features: [
      "20% off all rides",
      "Unlimited team members",
      "Monthly invoicing",
      "Dedicated account manager",
      "API access",
      "Analytics dashboard",
    ],
    cta: "Contact Sales",
    href: "/contact",
    highlighted: false,
  },
]

export function PricingSection() {
  return (
    <section className="py-24" id="pricing">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium uppercase tracking-wider text-primary"
          >
            Pricing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-pretty text-muted-foreground"
          >
            Start free and upgrade when you need more features and savings.
          </motion.p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-xl border p-6 ${
                plan.highlighted ? "border-primary bg-card" : "border-border bg-card/50"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Recommended
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">/{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="mb-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-success" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button asChild variant={plan.highlighted ? "default" : "outline"} className="w-full">
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
