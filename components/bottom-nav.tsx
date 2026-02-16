"use client"

import { motion } from "framer-motion"
import { Home, Clock, Car, BarChart3, User } from "lucide-react"
import type { Screen } from "@/app/page"

interface BottomNavProps {
  currentScreen: Screen
  onNavigate: (screen: Screen) => void
}

const navItems = [
  { id: "home" as Screen, label: "Home", icon: Home },
  { id: "dashboard" as Screen, label: "Activity", icon: Clock },
  { id: "driver" as Screen, label: "Drive", icon: Car },
  { id: "admin" as Screen, label: "Stats", icon: BarChart3 },
  { id: "profile" as Screen, label: "Profile", icon: User },
]

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 glass-dark px-2 pb-safe z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentScreen === item.id

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                className={`w-5 h-5 relative z-10 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}
              />
              <span
                className={`text-[10px] relative z-10 transition-colors ${isActive ? "text-primary font-medium" : "text-muted-foreground"}`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </motion.nav>
  )
}
