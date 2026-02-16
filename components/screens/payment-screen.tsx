"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Wallet, CreditCard, Banknote, Tag, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface PaymentScreenProps {
  onComplete: () => void
  onBack: () => void
}

const paymentMethods = [
  { id: "wallet", name: "RideX Wallet", balance: "₹1,250", icon: Wallet },
  { id: "upi", name: "UPI", description: "Pay via any UPI app", icon: CreditCard },
  { id: "card", name: "Card", description: "Debit / Credit card", icon: CreditCard },
  { id: "cash", name: "Cash", description: "Pay to driver", icon: Banknote },
]

export function PaymentScreen({ onComplete, onBack }: PaymentScreenProps) {
  const [selectedMethod, setSelectedMethod] = useState("wallet")
  const [promoCode, setPromoCode] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const tripDetails = {
    baseFare: 149,
    distance: 8.5,
    distanceCharge: 42.5,
    timeFare: 15,
    platformFee: 5,
    discount: -20,
  }

  const total =
    tripDetails.baseFare +
    tripDetails.distanceCharge +
    tripDetails.timeFare +
    tripDetails.platformFee +
    tripDetails.discount

  const handlePayment = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
      setTimeout(onComplete, 2000)
    }, 2000)
  }

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      {/* Header */}
      <header className="p-4 pt-safe border-b border-border">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-semibold">Payment</h1>
            <p className="text-xs text-muted-foreground">Complete your ride</p>
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {isComplete ? (
          <motion.div
            key="success"
            className="flex flex-col items-center justify-center p-8 min-h-[60vh]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="w-24 h-24 rounded-full bg-success/20 flex items-center justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <CheckCircle2 className="w-12 h-12 text-success" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-muted-foreground text-center mb-4">Thank you for riding with RideX</p>
            <p className="text-3xl font-bold text-primary">₹{total.toFixed(0)}</p>
          </motion.div>
        ) : (
          <motion.div key="payment" className="p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Price Breakdown */}
            <div className="glass rounded-2xl p-4 mb-5">
              <h3 className="font-semibold mb-3">Fare Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base fare</span>
                  <span>₹{tripDetails.baseFare}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Distance ({tripDetails.distance} km)</span>
                  <span>₹{tripDetails.distanceCharge}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time fare</span>
                  <span>₹{tripDetails.timeFare}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Platform fee</span>
                  <span>₹{tripDetails.platformFee}</span>
                </div>
                <div className="flex justify-between text-success">
                  <span>Promo discount</span>
                  <span>₹{tripDetails.discount}</span>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span className="text-primary">₹{total.toFixed(0)}</span>
                </div>
              </div>
            </div>

            {/* Promo Code */}
            <div className="flex gap-2 mb-5">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="pl-10 h-12 rounded-xl"
                />
              </div>
              <Button variant="outline" className="h-12 rounded-xl px-6 bg-transparent">
                Apply
              </Button>
            </div>

            {/* Payment Methods */}
            <div className="mb-5">
              <h3 className="font-semibold mb-3">Payment Method</h3>
              <div className="space-y-2">
                {paymentMethods.map((method) => {
                  const Icon = method.icon
                  const isSelected = selectedMethod === method.id
                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
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
                        <p className="font-medium">{method.name}</p>
                        <p className="text-xs text-muted-foreground">{method.balance || method.description}</p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 ${isSelected ? "border-primary bg-primary" : "border-muted-foreground"}`}
                      >
                        {isSelected && (
                          <motion.div
                            className="w-full h-full flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                          </motion.div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Pay Button */}
            <Button
              className="w-full h-14 rounded-xl text-base font-semibold"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <motion.div
                  className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              ) : (
                `Pay ₹${total.toFixed(0)}`
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
