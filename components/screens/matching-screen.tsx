"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { X, MapPin, Star } from "lucide-react"
import { MapBackground } from "@/components/map-background"
import { Button } from "@/components/ui/button"

interface MatchingScreenProps {
  onDriverFound: () => void
  onCancel: () => void
}

const nearbyDrivers = [
  {
    id: 1,
    name: "Rajesh K.",
    rating: 4.8,
    distance: "0.5 km",
    vehicle: "Honda Activa",
    image: "/indian-driver-portrait.jpg",
  },
  {
    id: 2,
    name: "Amit S.",
    rating: 4.9,
    distance: "0.8 km",
    vehicle: "TVS Jupiter",
    image: "/indian-man-portrait.png",
  },
  {
    id: 3,
    name: "Suresh M.",
    rating: 4.7,
    distance: "1.2 km",
    vehicle: "Bajaj Pulsar",
    image: "/indian-male-portrait.jpg",
  },
]

export function MatchingScreen({ onDriverFound, onCancel }: MatchingScreenProps) {
  const [searchPhase, setSearchPhase] = useState<"searching" | "found">("searching")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setSearchPhase("found")
          return 100
        }
        return prev + 2
      })
    }, 60)

    return () => clearInterval(progressInterval)
  }, [])

  useEffect(() => {
    if (searchPhase === "found") {
      const timer = setTimeout(onDriverFound, 2000)
      return () => clearTimeout(timer)
    }
  }, [searchPhase, onDriverFound])

  return (
    <motion.div
      className="min-h-screen relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MapBackground showRoutePreview />

      {/* Cancel Button */}
      <header className="relative z-10 p-4 pt-safe">
        <Button variant="ghost" size="icon" onClick={onCancel} className="rounded-xl">
          <X className="w-5 h-5" />
        </Button>
      </header>

      {/* Center Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div className="text-center" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          {/* Animated Search Rings */}
          <div className="relative w-32 h-32 mx-auto mb-6">
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                animate={{
                  scale: [1, 2, 2],
                  opacity: [0.6, 0.2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: ring * 0.4,
                  ease: "easeOut",
                }}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-2">
            {searchPhase === "searching" ? "Finding your driver..." : "Driver found!"}
          </h2>
          <p className="text-muted-foreground text-sm mb-4">
            {searchPhase === "searching" ? "Looking for the best match nearby" : "Connecting you with your ride"}
          </p>

          {/* Progress Bar */}
          <div className="w-48 mx-auto h-1.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      </div>

      {/* Nearby Drivers */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 glass-dark rounded-t-3xl"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
        </div>

        <div className="px-4 pb-6">
          <h3 className="text-sm font-medium mb-3">Nearby Drivers</h3>
          <div className="space-y-2">
            {nearbyDrivers.map((driver, index) => (
              <motion.div
                key={driver.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <img
                  src={driver.image || "/placeholder.svg"}
                  alt={driver.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{driver.name}</p>
                  <p className="text-xs text-muted-foreground">{driver.vehicle}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-primary fill-primary" />
                    <span className="text-sm font-medium">{driver.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{driver.distance}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-4 rounded-xl bg-transparent" onClick={onCancel}>
            Cancel Search
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
