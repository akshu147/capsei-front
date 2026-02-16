"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin, Navigation, Clock, Star } from "lucide-react"
import { Input } from "@/components/ui/input"

interface LocationSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onFocus?: () => void
  showSuggestions?: boolean
}

const recentLocations = [
  { id: 1, name: "Home", address: "123 Maple Street, Downtown", icon: Star },
  { id: 2, name: "Office", address: "456 Business Park, Tech Hub", icon: Star },
  { id: 3, name: "Central Mall", address: "789 Shopping Avenue", icon: Clock },
  { id: 4, name: "Airport Terminal 2", address: "International Airport Road", icon: Clock },
]

export function LocationSearch({
  value,
  onChange,
  placeholder = "Search location...",
  onFocus,
  showSuggestions = false,
}: LocationSearchProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
    onFocus?.()
  }

  const selectLocation = (location: (typeof recentLocations)[0]) => {
    onChange(location.address)
    setIsFocused(false)
  }

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-10 h-12 bg-secondary/50 border-border/50 rounded-xl focus:ring-2 focus:ring-primary/50"
          onFocus={handleFocus}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
          aria-label="Use current location"
        >
          <Navigation className="w-4 h-4 text-primary" />
        </button>
      </div>

      <AnimatePresence>
        {(isFocused || showSuggestions) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 glass rounded-xl overflow-hidden z-50"
          >
            <div className="p-2">
              <p className="text-xs text-muted-foreground px-2 py-1.5 uppercase tracking-wider">Recent & Saved</p>
              {recentLocations.map((location) => {
                const Icon = location.icon
                return (
                  <button
                    key={location.id}
                    onClick={() => selectLocation(location)}
                    className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary/50 transition-colors text-left"
                  >
                    <div className="p-2 rounded-lg bg-secondary">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{location.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{location.address}</p>
                    </div>
                    <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
