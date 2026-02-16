"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, ChevronUp } from "lucide-react"
import { MapBackground } from "@/components/map-background"
import { LocationSearch } from "@/components/location-search"
import { ServiceSelector } from "@/components/service-selector"
import { Button } from "@/components/ui/button"
import type { Screen, ServiceType } from "@/app/page"

interface HomeScreenProps {
  onServiceSelect: (service: ServiceType) => void
  onNavigate: (screen: Screen) => void
}

export function HomeScreen({ onServiceSelect }: HomeScreenProps) {
  const [pickup, setPickup] = useState("")
  const [selectedService, setSelectedService] = useState<ServiceType | undefined>()

  const handleServiceSelect = (service: ServiceType) => {
    setSelectedService(service)
  }

  const handleContinue = () => {
    if (selectedService) {
      onServiceSelect(selectedService)
    }
  }

  return (
    <motion.div
      className="min-h-screen relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Map Background */}
      <MapBackground />

      {/* Header */}
      <header className="relative z-10 p-4 pt-safe">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold">
              <span className="text-primary">Ride</span>X
            </h1>
            <p className="text-xs text-muted-foreground">Your mobility partner</p>
          </div>
          <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
            <MapPin className="w-4 h-4 mr-1.5" />
            Mumbai
          </Button>
        </motion.div>
      </header>

      {/* Bottom Sheet */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 glass-dark rounded-t-3xl pb-24"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
        </div>

        <div className="px-4 pb-4">
          {/* Title */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-4">
            <h2 className="text-xl font-semibold mb-1">Where to?</h2>
            <p className="text-sm text-muted-foreground">Choose your service and destination</p>
          </motion.div>

          {/* Location Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-5"
          >
            <LocationSearch value={pickup} onChange={setPickup} placeholder="Enter pickup location" />
          </motion.div>

          {/* Service Selector */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <ServiceSelector onSelect={handleServiceSelect} selected={selectedService} />
          </motion.div>

          {/* Continue Button */}
          {selectedService && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
              <Button className="w-full h-12 rounded-xl text-base font-semibold" onClick={handleContinue}>
                Continue
                <ChevronUp className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
