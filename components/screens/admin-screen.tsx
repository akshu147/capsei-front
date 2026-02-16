"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, Car, DollarSign, ArrowUp, ArrowDown } from "lucide-react"
import type { Screen } from "@/app/page"

interface AdminScreenProps {
  onNavigate: (screen: Screen) => void
}

const stats = [
  {
    id: "revenue",
    label: "Revenue",
    value: "₹2.4L",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-primary",
  },
  { id: "rides", label: "Live Rides", value: "1,247", change: "+8.2%", trend: "up", icon: Car, color: "text-blue-500" },
  {
    id: "drivers",
    label: "Active Drivers",
    value: "892",
    change: "-2.1%",
    trend: "down",
    icon: Users,
    color: "text-green-500",
  },
  {
    id: "users",
    label: "New Users",
    value: "3,421",
    change: "+24.5%",
    trend: "up",
    icon: TrendingUp,
    color: "text-purple-500",
  },
]

const servicePerformance = [
  { service: "Car Taxi", rides: 4521, revenue: "₹1.2L", percentage: 45 },
  { service: "Bike Taxi", rides: 3210, revenue: "₹48K", percentage: 32 },
  { service: "Parcel", rides: 1540, revenue: "₹38K", percentage: 15 },
  { service: "Loading", rides: 821, revenue: "₹56K", percentage: 8 },
]

export function AdminScreen({ onNavigate }: AdminScreenProps) {
  return (
    <motion.div
      className="min-h-screen bg-background pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <header className="p-4 pt-safe">
        <h1 className="text-2xl font-bold mb-1">Analytics</h1>
        <p className="text-muted-foreground text-sm">Real-time platform metrics</p>
      </header>

      {/* Stats Grid */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.id}
                className="glass p-4 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-xl bg-secondary ${stat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs ${stat.trend === "up" ? "text-success" : "text-destructive"}`}
                  >
                    {stat.trend === "up" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    {stat.change}
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="px-4 mb-6">
        <h3 className="font-semibold mb-3">Revenue Trend</h3>
        <div className="glass rounded-2xl p-4">
          <div className="flex items-end justify-between h-32 gap-2">
            {[65, 45, 75, 55, 85, 70, 90].map((height, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-primary/20 rounded-t-lg relative overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
              >
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-lg"
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                />
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
      </div>

      {/* Service Performance */}
      <div className="px-4">
        <h3 className="font-semibold mb-3">Service Performance</h3>
        <div className="space-y-3">
          {servicePerformance.map((service, index) => (
            <motion.div
              key={service.service}
              className="glass p-4 rounded-2xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{service.service}</p>
                <p className="text-sm text-muted-foreground">{service.rides.toLocaleString()} rides</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${service.percentage}%` }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  />
                </div>
                <span className="text-sm font-semibold w-16 text-right">{service.revenue}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Driver & User Growth */}
      <div className="px-4 mt-6">
        <h3 className="font-semibold mb-3">Growth Metrics</h3>
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            className="glass p-4 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-muted-foreground">Total Users</span>
            </div>
            <p className="text-2xl font-bold">2.4M</p>
            <p className="text-xs text-success">+15% this month</p>
          </motion.div>
          <motion.div
            className="glass p-4 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Car className="w-4 h-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Total Drivers</span>
            </div>
            <p className="text-2xl font-bold">125K</p>
            <p className="text-xs text-success">+8% this month</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
