"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Power, MapPin, Navigation, Clock, DollarSign, TrendingUp, X, Check } from "lucide-react"
import { MapBackground } from "@/components/map-background"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import type { Screen } from "@/app/page"

interface DriverAppScreenProps {
  onNavigate: (screen: Screen) => void
}

export function DriverAppScreen({ onNavigate }: DriverAppScreenProps) {
  const [isOnline, setIsOnline] = useState(true)
  const [showRideRequest, setShowRideRequest] = useState(false)

  const earnings = {
    today: 1850,
    week: 12450,
    trips: 8,
  }

  const rideRequest = {
    pickup: "Central Mall, Shopping Avenue",
    drop: "Tech Park, Sector 5",
    distance: "5.2 km",
    fare: 149,
    rating: 4.8,
  }

  const toggleOnline = () => {
    setIsOnline(!isOnline)
    if (!isOnline) {
      setTimeout(() => setShowRideRequest(true), 3000)
    }
  }

  return (
    <motion.div
      className="min-h-screen relative pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MapBackground />

      {/* Header */}
      <header className="relative z-10 p-4 pt-safe">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Driver Mode</h1>
            <p className={`text-sm ${isOnline ? "text-success" : "text-muted-foreground"}`}>
              {isOnline ? "Online - Accepting rides" : "Offline"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{isOnline ? "Go Offline" : "Go Online"}</span>
            <Switch checked={isOnline} onCheckedChange={toggleOnline} className="data-[state=checked]:bg-success" />
          </div>
        </div>
      </header>

      {/* Online Status Card */}
      <div className="relative z-10 px-4 mb-6">
        <motion.div
          className={`glass rounded-2xl p-6 text-center ${isOnline ? "ring-2 ring-success/50" : ""}`}
          animate={{ scale: isOnline ? 1 : 0.98 }}
        >
          <div
            className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
              isOnline ? "bg-success/20" : "bg-muted"
            }`}
          >
            <Power className={`w-10 h-10 ${isOnline ? "text-success" : "text-muted-foreground"}`} />
          </div>
          <h2 className="text-xl font-semibold mb-1">{isOnline ? "You're Online" : "You're Offline"}</h2>
          <p className="text-muted-foreground text-sm">
            {isOnline ? "Waiting for ride requests..." : "Toggle to start accepting rides"}
          </p>
        </motion.div>
      </div>

      {/* Earnings Summary */}
      <div className="relative z-10 px-4 mb-6">
        <h3 className="font-semibold mb-3">Today's Earnings</h3>
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            className="glass p-4 rounded-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <DollarSign className="w-5 h-5 mx-auto mb-2 text-primary" />
            <p className="text-lg font-bold">₹{earnings.today}</p>
            <p className="text-xs text-muted-foreground">Today</p>
          </motion.div>
          <motion.div
            className="glass p-4 rounded-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <TrendingUp className="w-5 h-5 mx-auto mb-2 text-success" />
            <p className="text-lg font-bold">₹{earnings.week.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">This Week</p>
          </motion.div>
          <motion.div
            className="glass p-4 rounded-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Navigation className="w-5 h-5 mx-auto mb-2 text-blue-500" />
            <p className="text-lg font-bold">{earnings.trips}</p>
            <p className="text-xs text-muted-foreground">Trips</p>
          </motion.div>
        </div>
      </div>

      {/* Heatmap Preview */}
      <div className="relative z-10 px-4">
        <h3 className="font-semibold mb-3">Demand Heatmap</h3>
        <div className="glass rounded-2xl p-4 h-40 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-orange-500/20 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-orange-500/40 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-orange-500" />
                </div>
              </div>
              <p className="text-sm font-medium">High demand</p>
              <p className="text-xs text-muted-foreground">Central Mall Area</p>
            </div>
          </div>
          <div className="absolute top-4 right-4 px-2 py-1 rounded-lg bg-orange-500/20 text-orange-500 text-xs font-medium">
            1.5x surge
          </div>
        </div>
      </div>

      {/* Ride Request Modal */}
      <AnimatePresence>
        {showRideRequest && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md glass rounded-2xl p-6"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">New Ride Request</h3>
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10">
                  <Clock className="w-3 h-3 text-primary" />
                  <span className="text-sm font-medium text-primary">15s</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-success" />
                  <div className="w-0.5 h-8 bg-border" />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Pickup</p>
                    <p className="font-medium">{rideRequest.pickup}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Drop</p>
                    <p className="font-medium">{rideRequest.drop}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{rideRequest.distance}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">₹{rideRequest.fare}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 h-12 rounded-xl bg-transparent"
                  onClick={() => setShowRideRequest(false)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Decline
                </Button>
                <Button
                  className="flex-1 h-12 rounded-xl bg-success hover:bg-success/90"
                  onClick={() => {
                    setShowRideRequest(false)
                    onNavigate("active-ride")
                  }}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Accept
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
