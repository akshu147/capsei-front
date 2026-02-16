"use client"

import { motion } from "framer-motion"
import { Clock, MapPin, ChevronRight, Wallet, Gift, Bookmark, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Screen } from "@/app/page"

interface DashboardScreenProps {
  onNavigate: (screen: Screen) => void
}

const rideHistory = [
  { id: 1, type: "car", from: "Home", to: "Office", date: "Today, 9:30 AM", price: 149, status: "completed" },
  { id: 2, type: "bike", from: "Office", to: "Gym", date: "Yesterday, 6:00 PM", price: 49, status: "completed" },
  {
    id: 3,
    type: "parcel",
    from: "Home",
    to: "Friend's Place",
    date: "Jan 15, 2:00 PM",
    price: 99,
    status: "delivered",
  },
  { id: 4, type: "car", from: "Airport", to: "Hotel", date: "Jan 14, 11:00 PM", price: 549, status: "completed" },
]

const quickActions = [
  { id: "wallet", name: "Wallet", value: "₹1,250", icon: Wallet },
  { id: "offers", name: "Offers", value: "3 new", icon: Gift },
  { id: "saved", name: "Saved", value: "5 places", icon: Bookmark },
]

export function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  return (
    <motion.div
      className="min-h-screen bg-background pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <header className="p-4 pt-safe">
        <h1 className="text-2xl font-bold mb-1">Activity</h1>
        <p className="text-muted-foreground text-sm">Your rides and deliveries</p>
      </header>

      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <motion.button
                key={action.id}
                className="glass p-4 rounded-2xl text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <p className="font-semibold text-sm">{action.value}</p>
                <p className="text-xs text-muted-foreground">{action.name}</p>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Recent Rides */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Recent Activity</h2>
          <Button variant="ghost" size="sm" className="text-primary">
            See all
          </Button>
        </div>

        <div className="space-y-3">
          {rideHistory.map((ride, index) => (
            <motion.div
              key={ride.id}
              className="glass p-4 rounded-2xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${ride.type === "parcel" ? "bg-orange-500/10" : "bg-blue-500/10"}`}>
                  {ride.type === "parcel" ? (
                    <Package className="w-5 h-5 text-orange-500" />
                  ) : (
                    <MapPin className="w-5 h-5 text-blue-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm">{ride.from}</p>
                    <ChevronRight className="w-3 h-3 text-muted-foreground" />
                    <p className="font-medium text-sm">{ride.to}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{ride.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{ride.price}</p>
                  <p className="text-xs text-success capitalize">{ride.status}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subscription Banner */}
      <motion.div
        className="mx-4 mt-6 p-4 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/20">
            <Gift className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">RideX Premium</h3>
            <p className="text-sm text-muted-foreground">Get 20% off on all rides</p>
          </div>
          <Button size="sm" className="rounded-xl">
            Subscribe
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
