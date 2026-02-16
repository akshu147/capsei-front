"use client"
import confetti from "canvas-confetti"
export const fireConfetti = () => {
  confetti({
    particleCount: 600,
    spread: 200,
    origin: { y: 0.6 }
  })
}