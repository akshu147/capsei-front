"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Phone, MessageCircle, AlertTriangle, ChevronUp, Star, Navigation } from "lucide-react"
import { MapBackground } from "@/components/map-background"
import { Button } from "@/components/ui/button"

interface ActiveRideScreenProps {
  onComplete: () => void
  onBack: () => void
}

export function ActiveRideScreen({ onComplete }: ActiveRideScreenProps) {
  const [progress, setProgress] = useState(0)
  const [eta, setEta] = useState(12)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 1000)
          return 100
        }
        return prev + 1
      })
      setEta((prev) => Math.max(0, prev - 0.12))
    }, 300)

    return () => clearInterval(interval)
  }, [onComplete])

  const driver = {
    name: "Rajesh Kumar",
    rating: 4.8,
    trips: 2453,
    vehicle: "Honda City",
    plate: "MH 12 AB 1234",
    image: "/indian-driver-portrait-professional.jpg",
  }

  return (
    <motion.div
      className="min-h-screen relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MapBackground showRoutePreview />

      {/* Trip Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-secondary z-20">
        <motion.div className="h-full bg-primary" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
      </div>

      {/* Header with ETA */}
      <header className="relative z-10 p-4 pt-safe">
        <motion.div className="glass rounded-2xl p-4" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Arriving in</p>
              <p className="text-2xl font-bold">{Math.ceil(eta)} min</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Distance left</p>
              <p className="font-semibold">{(8.5 * (1 - progress / 100)).toFixed(1)} km</p>
            </div>
          </div>

          {/* Live Route Info */}
          <div className="flex items-center gap-2 mt-3 p-2 rounded-lg bg-primary/10">
            <Navigation className="w-4 h-4 text-primary" />
            <span className="text-sm">Via Ring Road • Light traffic</span>
          </div>
        </motion.div>
      </header>

      {/* Bottom Sheet - Driver Info */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 glass-dark rounded-t-3xl"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
        </div>

        <div className="px-4 pb-6">
          {/* Driver Card */}
          <div className="flex items-center gap-4 mb-4">
            <img
              src={driver.image || "/placeholder.svg"}
              alt={driver.name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-primary"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{driver.name}</h3>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10">
                  <Star className="w-3 h-3 text-primary fill-primary" />
                  <span className="text-xs font-medium">{driver.rating}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{driver.trips.toLocaleString()} trips</p>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" className="rounded-full bg-transparent">
                <Phone className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full bg-transparent">
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="p-3 rounded-xl bg-secondary/50 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{driver.vehicle}</p>
                <p className="text-sm text-muted-foreground">{driver.plate}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Color</p>
                <p className="font-medium">White</p>
              </div>
            </div>
          </div>

          {/* Trip Details */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex flex-col items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-success" />
              <div className="w-0.5 h-6 bg-border" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Pickup</p>
                <p className="text-sm font-medium">123 Maple Street, Downtown</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Drop</p>
                <p className="text-sm font-medium">456 Business Park, Tech Hub</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="destructive" className="flex-1 rounded-xl">
              <AlertTriangle className="w-4 h-4 mr-2" />
              SOS
            </Button>
            <Button variant="outline" className="flex-1 rounded-xl bg-transparent">
              <ChevronUp className="w-4 h-4 mr-2" />
              Share Trip
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
