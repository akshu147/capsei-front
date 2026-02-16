"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Package, Scale, Ruler, Zap, Clock } from "lucide-react"
import { MapBackground } from "@/components/map-background"
import { LocationSearch } from "@/components/location-search"
import { Button } from "@/components/ui/button"

interface ParcelScreenProps {
  onBook: () => void
  onBack: () => void
}

const parcelTypes = [
  { id: "document", name: "Documents", icon: "📄", maxWeight: "500g" },
  { id: "small", name: "Small Box", icon: "📦", maxWeight: "5kg" },
  { id: "medium", name: "Medium Box", icon: "📦", maxWeight: "15kg" },
  { id: "large", name: "Large Item", icon: "🧳", maxWeight: "30kg" },
]

const deliveryOptions = [
  { id: "express", name: "Express", time: "1-2 hours", price: 149, icon: Zap },
  { id: "standard", name: "Standard", time: "Same day", price: 99, icon: Clock },
  { id: "economy", name: "Economy", time: "Next day", price: 59, icon: Package },
]

export function ParcelScreen({ onBook, onBack }: ParcelScreenProps) {
  const [pickup, setPickup] = useState("")
  const [drop, setDrop] = useState("")
  const [selectedType, setSelectedType] = useState("small")
  const [selectedDelivery, setSelectedDelivery] = useState("standard")

  const selectedDeliveryOption = deliveryOptions.find((d) => d.id === selectedDelivery)

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
            <h1 className="font-semibold">Send Parcel</h1>
            <p className="text-xs text-muted-foreground">Fast & secure delivery</p>
          </div>
        </div>
      </header>

      {/* Bottom Sheet */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 glass-dark rounded-t-3xl max-h-[75vh] overflow-y-auto"
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
                <LocationSearch value={pickup} onChange={setPickup} placeholder="Pickup address" />
                <LocationSearch value={drop} onChange={setDrop} placeholder="Delivery address" />
              </div>
            </div>
          </div>

          {/* Parcel Type */}
          <div className="mb-5">
            <h3 className="text-sm font-medium mb-3">Parcel Type</h3>
            <div className="grid grid-cols-2 gap-2">
              {parcelTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-3 rounded-xl text-left transition-all ${
                    selectedType === type.id
                      ? "bg-primary/10 ring-2 ring-primary"
                      : "bg-secondary/50 hover:bg-secondary"
                  }`}
                >
                  <span className="text-2xl mb-1 block">{type.icon}</span>
                  <p className="font-medium text-sm">{type.name}</p>
                  <p className="text-xs text-muted-foreground">Up to {type.maxWeight}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Weight & Size */}
          <div className="flex gap-3 mb-5">
            <div className="flex-1 p-3 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-2 mb-1">
                <Scale className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Weight</span>
              </div>
              <p className="font-semibold">2.5 kg</p>
            </div>
            <div className="flex-1 p-3 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-2 mb-1">
                <Ruler className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Size</span>
              </div>
              <p className="font-semibold">30 x 20 x 15 cm</p>
            </div>
          </div>

          {/* Delivery Speed */}
          <div className="mb-5">
            <h3 className="text-sm font-medium mb-3">Delivery Speed</h3>
            <div className="space-y-2">
              {deliveryOptions.map((option) => {
                const Icon = option.icon
                const isSelected = selectedDelivery === option.id
                return (
                  <button
                    key={option.id}
                    onClick={() => setSelectedDelivery(option.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                      isSelected ? "bg-primary/10 ring-2 ring-primary" : "bg-secondary/50 hover:bg-secondary"
                    }`}
                  >
                    <div
                      className={`p-2.5 rounded-xl ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium">{option.name}</p>
                      <p className="text-xs text-muted-foreground">{option.time}</p>
                    </div>
                    <p className="font-semibold text-primary">₹{option.price}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Book Button */}
          <Button className="w-full h-14 rounded-xl text-base font-semibold" onClick={onBook}>
            Book Delivery • ₹{selectedDeliveryOption?.price}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
