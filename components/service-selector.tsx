"use client"

import { motion } from "framer-motion"
import { Bike, Car, Truck, Package } from "lucide-react"
import type { ServiceType } from "@/app/page"

interface ServiceSelectorProps {
  onSelect: (service: ServiceType) => void
  selected?: ServiceType
}

const services = [
  {
    id: "bike" as ServiceType,
    name: "Bike Taxi",
    description: "Quick & affordable",
    icon: Bike,
    eta: "2 min",
    color: "from-green-500/20 to-green-500/5",
  },
  {
    id: "car" as ServiceType,
    name: "Car Taxi",
    description: "Comfortable rides",
    icon: Car,
    eta: "4 min",
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    id: "loading" as ServiceType,
    name: "Loading",
    description: "Move your goods",
    icon: Truck,
    eta: "8 min",
    color: "from-purple-500/20 to-purple-500/5",
  },
  {
    id: "parcel" as ServiceType,
    name: "Parcel",
    description: "Send packages",
    icon: Package,
    eta: "Same day",
    color: "from-orange-500/20 to-orange-500/5",
  },
]

export function ServiceSelector({ onSelect, selected }: ServiceSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {services.map((service, index) => {
        const Icon = service.icon
        const isSelected = selected === service.id

        return (
          <motion.button
            key={service.id}
            onClick={() => onSelect(service.id)}
            className={`relative p-4 rounded-2xl glass text-left transition-all duration-300 group ${
              isSelected ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-border"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Background gradient */}
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity`}
            />

            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`p-2.5 rounded-xl ${isSelected ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs text-muted-foreground">{service.eta}</span>
              </div>
              <h3 className="font-semibold text-foreground mb-0.5">{service.name}</h3>
              <p className="text-xs text-muted-foreground">{service.description}</p>
            </div>

            {isSelected && (
              <motion.div
                className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary"
                layoutId="serviceIndicator"
              />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
