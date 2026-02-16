"use client"

import { motion } from "framer-motion"
import { Shield, Languages, Moon, HelpCircle, LogOut, ChevronRight, Camera, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import type { Screen } from "@/app/page"

interface ProfileScreenProps {
  onNavigate: (screen: Screen) => void
}

const menuItems = [
  { id: "kyc", label: "KYC Verification", description: "Verified", icon: Shield, status: "verified" },
  { id: "language", label: "Language", description: "English", icon: Languages },
  { id: "theme", label: "Dark Mode", description: "On", icon: Moon, hasSwitch: true },
  { id: "help", label: "Help & Support", description: "FAQs, Contact us", icon: HelpCircle },
]

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const user = {
    name: "Arjun Sharma",
    phone: "+91 98765 43210",
    email: "arjun@email.com",
    rating: 4.9,
    rides: 156,
    image: "/indian-man-professional-portrait.png",
  }

  return (
    <motion.div
      className="min-h-screen bg-background pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <header className="p-4 pt-safe">
        <h1 className="text-2xl font-bold mb-1">Profile</h1>
        <p className="text-muted-foreground text-sm">Manage your account</p>
      </header>

      {/* Profile Card */}
      <div className="px-4 mb-6">
        <motion.div className="glass rounded-2xl p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={user.image || "/placeholder.svg"}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover ring-2 ring-primary"
              />
              <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-primary text-primary-foreground">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.phone}</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10">
                  <Star className="w-3 h-3 text-primary fill-primary" />
                  <span className="text-sm font-medium">{user.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">{user.rides} rides</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Menu Items */}
      <div className="px-4">
        <div className="glass rounded-2xl overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.button
                key={item.id}
                className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors border-b border-border last:border-b-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <div className="p-2.5 rounded-xl bg-secondary">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    {item.status === "verified" && <span className="w-1.5 h-1.5 rounded-full bg-success" />}
                    {item.description}
                  </p>
                </div>
                {item.hasSwitch ? (
                  <Switch defaultChecked />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-4 mt-6">
        <Button
          variant="outline"
          className="w-full h-12 rounded-xl text-destructive border-destructive/30 hover:bg-destructive/10 bg-transparent"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </Button>
      </div>

      {/* App Version */}
      <p className="text-center text-xs text-muted-foreground mt-6">RideX v2.4.1 • Made with care in India</p>
    </motion.div>
  )
}
