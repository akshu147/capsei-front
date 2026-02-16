"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, MapPin, Navigation, Clock, Calendar, Car, Bike, Truck } from "lucide-react"
import { MapBackground } from "@/components/map-background"
import { LocationSearch } from "@/components/location-search"
import { Button } from "@/components/ui/button"
import type { ServiceType } from "@/app/page"

interface BookingScreenProps {
  serviceType: ServiceType
  bookingData: {
    pickup: string
    drop: string
    vehicleType: string
    scheduleType: "instant" | "scheduled"
    scheduledTime: Date | null
  }
  setBookingData: (data: typeof bookingData | ((prev: typeof bookingData) => typeof bookingData)) => void
  onBook: () => void
  onBack: () => void
}

interface Vehicle {
  id: string
  name: string
  capacity: string
  price: number
  eta: string
  icon: typeof Car
}

const vehiclesByService: Record<ServiceType, Vehicle[]> = {
  bike: [
    { id: "bike-standard", name: "Standard Bike", capacity: "1 person", price: 49, eta: "2 min", icon: Bike },
    { id: "bike-premium", name: "Premium Bike", capacity: "1 person", price: 79, eta: "3 min", icon: Bike },
  ],
  car: [
    { id: "mini", name: "Mini", capacity: "4 seats", price: 149, eta: "3 min", icon: Car },
    { id: "sedan", name: "Sedan", capacity: "4 seats", price: 199, eta: "4 min", icon: Car },
    { id: "suv", name: "SUV", capacity: "6 seats", price: 299, eta: "5 min", icon: Car },
    { id: "premium", name: "Premium", capacity: "4 seats", price: 449, eta: "6 min", icon: Car },
  ],
  loading: [
    { id: "tata-ace", name: "Tata Ace", capacity: "750 kg", price: 399, eta: "10 min", icon: Truck },
    { id: "pickup", name: "Pickup Truck", capacity: "1000 kg", price: 549, eta: "12 min", icon: Truck },
    { id: "tempo", name: "Tempo", capacity: "2000 kg", price: 799, eta: "15 min", icon: Truck },
  ],
  parcel: [],
}

export function BookingScreen({ serviceType, bookingData, setBookingData, onBook, onBack }: BookingScreenProps) {
  const [selectedVehicle, setSelectedVehicle] = useState(vehiclesByService[serviceType][0]?.id || "")
  const vehicles = vehiclesByService[serviceType]

  const selectedVehicleData = vehicles.find((v) => v.id === selectedVehicle)
  const estimatedPrice = selectedVehicleData?.price || 0
  const distance = "8.5 km"
  const duration = "25 min"

  return (
    <motion.div
      className="min-h-screen relative"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <MapBackground showRoutePreview />

      {/* Header */}
      <header className="relative z-10 p-4 pt-safe">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-semibold">
              {serviceType === "bike" && "Bike Taxi"}
              {serviceType === "car" && "Car Taxi"}
              {serviceType === "loading" && "Loading Vehicle"}
            </h1>
            <p className="text-xs text-muted-foreground">Select your ride</p>
          </div>
        </div>
      </header>

      {/* Bottom Sheet */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 glass-dark rounded-t-3xl max-h-[70vh] overflow-y-auto"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
        </div>

        <div className="px-4 pb-6">
          {/* Location Inputs */}
          <div className="space-y-3 mb-5">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-success" />
                <div className="w-0.5 h-8 bg-border" />
                <div className="w-3 h-3 rounded-full bg-primary" />
              </div>
              <div className="flex-1 space-y-2">
                <LocationSearch
                  value={bookingData.pickup}
                  onChange={(val) => setBookingData((prev) => ({ ...prev, pickup: val }))}
                  placeholder="Pickup location"
                />
                <LocationSearch
                  value={bookingData.drop}
                  onChange={(val) => setBookingData((prev) => ({ ...prev, drop: val }))}
                  placeholder="Drop location"
                />
              </div>
            </div>
          </div>

          {/* Route Info */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 mb-5">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{distance}</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{duration}</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Via Ring Road</span>
            </div>
          </div>

          {/* Schedule Options */}
          <div className="flex gap-2 mb-5">
            <Button
              variant={bookingData.scheduleType === "instant" ? "default" : "outline"}
              className="flex-1 rounded-xl"
              onClick={() => setBookingData((prev) => ({ ...prev, scheduleType: "instant" }))}
            >
              <Clock className="w-4 h-4 mr-2" />
              Now
            </Button>
            <Button
              variant={bookingData.scheduleType === "scheduled" ? "default" : "outline"}
              className="flex-1 rounded-xl"
              onClick={() => setBookingData((prev) => ({ ...prev, scheduleType: "scheduled" }))}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </Button>
          </div>

          {/* Vehicle Selection */}
          <div className="mb-5">
            <h3 className="text-sm font-medium mb-3">Select Vehicle</h3>
            <div className="space-y-2">
              {vehicles.map((vehicle) => {
                const Icon = vehicle.icon
                const isSelected = selectedVehicle === vehicle.id
                return (
                  <motion.button
                    key={vehicle.id}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                      isSelected ? "bg-primary/10 ring-2 ring-primary" : "bg-secondary/50 hover:bg-secondary"
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className={`p-2.5 rounded-xl ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium">{vehicle.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {vehicle.capacity} • {vehicle.eta} away
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">₹{vehicle.price}</p>
                      <p className="text-xs text-muted-foreground">estimated</p>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Book Button */}
          <Button className="w-full h-14 rounded-xl text-base font-semibold" onClick={onBook}>
            Book {selectedVehicleData?.name} • ₹{estimatedPrice}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
