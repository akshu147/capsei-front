"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Package,
  MapPin,
  ChevronLeft,
  Scale,
  Ruler,
  Clock,
  Zap,
  Calendar,
  FileText,
  Box,
  ShoppingBag,
  Gift,
  Shield,
} from "lucide-react"

const parcelTypes = [
  { id: "document", name: "Documents", description: "Papers, files, contracts", icon: FileText, maxWeight: "1 kg" },
  { id: "box", name: "Box Package", description: "Cartons, boxes", icon: Box, maxWeight: "20 kg" },
  {
    id: "shopping",
    name: "Shopping Bag",
    description: "Retail items, clothing",
    icon: ShoppingBag,
    maxWeight: "10 kg",
  },
  { id: "gift", name: "Gift Package", description: "Fragile items, gifts", icon: Gift, maxWeight: "5 kg" },
]

const deliverySpeeds = [
  { id: "instant", name: "Instant Delivery", description: "Within 1 hour", price: "$8.00", icon: Zap },
  { id: "sameday", name: "Same Day", description: "By 8 PM today", price: "$5.00", icon: Clock },
  { id: "scheduled", name: "Scheduled", description: "Pick date & time", price: "$4.00", icon: Calendar },
]

const weightOptions = ["Under 1 kg", "1-5 kg", "5-10 kg", "10-20 kg", "Over 20 kg"]
const sizeOptions = [
  "Small (fits in hand)",
  "Medium (fits in bag)",
  "Large (needs both arms)",
  "Extra Large (furniture)",
]

export default function ParcelPage() {
  const [parcelType, setParcelType] = useState("box")
  const [deliverySpeed, setDeliverySpeed] = useState("sameday")
  const [weight, setWeight] = useState("")
  const [size, setSize] = useState("")
  const [fragile, setFragile] = useState(false)
  const [insurance, setInsurance] = useState(false)

  const selectedSpeed = deliverySpeeds.find((s) => s.id === deliverySpeed)
  const basePrice = selectedSpeed ? Number.parseFloat(selectedSpeed.price.replace("$", "")) : 5
  const insuranceCost = insurance ? 2 : 0
  const fragileCost = fragile ? 1.5 : 0
  const totalPrice = (basePrice + insuranceCost + fragileCost).toFixed(2)

  return (
    <div className="min-h-screen bg-background">
      <header className="glass fixed top-0 left-0 right-0 z-50 mx-4 mt-4 rounded-xl lg:mx-8">
        <div className="flex h-14 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">M</span>
              </div>
              <span className="text-lg font-semibold">MoveX</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">My Parcels</Link>
            </Button>
            <Button variant="outline" size="sm">
              Track Parcel
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-28 pb-16">
        <div className="mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Package className="h-7 w-7 text-primary" />
              </div>
              <h1 className="text-3xl font-bold">Send a Parcel</h1>
              <p className="mt-2 text-muted-foreground">Fast and reliable parcel delivery across the city</p>
            </div>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Pickup & Delivery</CardTitle>
                    <CardDescription>Enter the addresses for pickup and delivery</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickup-address">Pickup Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-success" />
                        <Input id="pickup-address" placeholder="Enter pickup address" className="h-11 pl-10 bg-input" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="delivery-address">Delivery Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                        <Input
                          id="delivery-address"
                          placeholder="Enter delivery address"
                          className="h-11 pl-10 bg-input"
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="sender-phone">Sender Phone</Label>
                        <Input id="sender-phone" placeholder="+1 (555) 000-0000" className="h-11 bg-input" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="receiver-phone">Receiver Phone</Label>
                        <Input id="receiver-phone" placeholder="+1 (555) 000-0000" className="h-11 bg-input" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Parcel Details</CardTitle>
                    <CardDescription>Tell us about your package</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="mb-3 block">Parcel Type</Label>
                      <RadioGroup
                        value={parcelType}
                        onValueChange={setParcelType}
                        className="grid gap-3 sm:grid-cols-2"
                      >
                        {parcelTypes.map((type) => (
                          <Label
                            key={type.id}
                            htmlFor={type.id}
                            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                              parcelType === type.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-muted-foreground/50"
                            }`}
                          >
                            <RadioGroupItem value={type.id} id={type.id} className="sr-only" />
                            <type.icon className="h-5 w-5 text-primary" />
                            <div className="flex-1">
                              <div className="text-sm font-medium">{type.name}</div>
                              <div className="text-xs text-muted-foreground">{type.description}</div>
                            </div>
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="weight" className="flex items-center gap-2">
                          <Scale className="h-4 w-4" />
                          Weight
                        </Label>
                        <Select value={weight} onValueChange={setWeight}>
                          <SelectTrigger id="weight" className="h-11 bg-input">
                            <SelectValue placeholder="Select weight" />
                          </SelectTrigger>
                          <SelectContent>
                            {weightOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="size" className="flex items-center gap-2">
                          <Ruler className="h-4 w-4" />
                          Size
                        </Label>
                        <Select value={size} onValueChange={setSize}>
                          <SelectTrigger id="size" className="h-11 bg-input">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            {sizeOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Package Description (Optional)</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your package contents..."
                        className="min-h-[80px] resize-none bg-input"
                      />
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="fragile" checked={fragile} onCheckedChange={(c) => setFragile(c === true)} />
                        <Label htmlFor="fragile" className="text-sm cursor-pointer">
                          Fragile Item (+$1.50)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="insurance"
                          checked={insurance}
                          onCheckedChange={(c) => setInsurance(c === true)}
                        />
                        <Label htmlFor="insurance" className="text-sm cursor-pointer">
                          <span className="flex items-center gap-1">
                            <Shield className="h-3.5 w-3.5" />
                            Add Insurance (+$2.00)
                          </span>
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Delivery Speed</CardTitle>
                    <CardDescription>Choose how fast you want your parcel delivered</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={deliverySpeed} onValueChange={setDeliverySpeed} className="space-y-3">
                      {deliverySpeeds.map((speed) => (
                        <Label
                          key={speed.id}
                          htmlFor={`speed-${speed.id}`}
                          className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors ${
                            deliverySpeed === speed.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-muted-foreground/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value={speed.id} id={`speed-${speed.id}`} className="sr-only" />
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                              <speed.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{speed.name}</div>
                              <div className="text-xs text-muted-foreground">{speed.description}</div>
                            </div>
                          </div>
                          <span className="font-semibold text-primary">{speed.price}</span>
                        </Label>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Delivery Fee</span>
                        <span>{selectedSpeed?.price || "$5.00"}</span>
                      </div>
                      {fragile && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Fragile Handling</span>
                          <span>$1.50</span>
                        </div>
                      )}
                      {insurance && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Insurance</span>
                          <span>$2.00</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Platform Fee</span>
                        <span>$0.00</span>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="text-primary">${totalPrice}</span>
                      </div>
                    </div>

                    <Button size="lg" className="w-full h-12 mt-4">
                      Schedule Pickup
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      By confirming, you agree to our Terms of Service
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
