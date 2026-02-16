"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface MapBackgroundProps {
  showRoutePreview?: boolean
  pickupLocation?: { lat: number; lng: number }
  dropLocation?: { lat: number; lng: number }
}

export function MapBackground({ showRoutePreview = false }: MapBackgroundProps) {
  const [dots, setDots] = useState<{ x: number; y: number; delay: number }[]>([])

  useEffect(() => {
    const newDots = Array.from({ length: 20 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }))
    setDots(newDots)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      {/* Grid pattern */}
      <div className="absolute inset-0 map-grid opacity-40" />

      {/* Animated route lines */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.72 0.14 55)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="oklch(0.72 0.14 55)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="oklch(0.72 0.14 55)" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Main route curves */}
        <motion.path
          d="M -50 300 Q 200 200 400 350 T 800 250 T 1200 400"
          stroke="url(#routeGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <motion.path
          d="M 100 500 Q 300 400 500 450 T 900 350 T 1300 500"
          stroke="url(#routeGradient)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 3.5, delay: 0.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M -100 150 Q 150 250 350 150 T 700 200 T 1100 100"
          stroke="url(#routeGradient)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 4, delay: 1, ease: "easeInOut" }}
        />
      </svg>

      {/* Floating dots representing vehicles */}
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/40"
          style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [0.8, 1, 0.8],
            x: [0, Math.random() * 20 - 10, 0],
            y: [0, Math.random() * 20 - 10, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: dot.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Location markers */}
      {showRoutePreview && (
        <>
          <motion.div
            className="absolute left-1/4 top-1/3"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <div className="relative">
              <div className="w-4 h-4 rounded-full bg-success absolute -translate-x-1/2 -translate-y-1/2" />
              <div className="w-4 h-4 rounded-full bg-success/40 pulse-ring absolute -translate-x-1/2 -translate-y-1/2" />
            </div>
          </motion.div>
          <motion.div
            className="absolute right-1/4 bottom-1/3"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
          >
            <div className="relative">
              <div className="w-4 h-4 rounded-full bg-primary absolute -translate-x-1/2 -translate-y-1/2" />
              <div className="w-4 h-4 rounded-full bg-primary/40 pulse-ring absolute -translate-x-1/2 -translate-y-1/2" />
            </div>
          </motion.div>
        </>
      )}

      {/* Gradient overlay at bottom for content readability */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </div>
  )
}
