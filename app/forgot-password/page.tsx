"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-xl font-bold text-primary-foreground">M</span>
            </div>
            <span className="text-2xl font-semibold">MoveX</span>
          </Link>
        </div>

        {isSubmitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
            <h2 className="text-2xl font-bold">Check your email</h2>
            <p className="mt-2 text-muted-foreground">
              We&apos;ve sent a password reset link to <strong>{email}</strong>
            </p>
            <div className="mt-8 space-y-3">
              <Button asChild className="w-full">
                <Link href="/login">Back to Login</Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                Didn&apos;t receive the email?{" "}
                <button onClick={() => setIsSubmitted(false)} className="text-primary hover:underline">
                  Try again
                </button>
              </p>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="text-center">
              <h2 className="text-2xl font-bold">Forgot your password?</h2>
              <p className="mt-2 text-muted-foreground">
                Enter your email address and we&apos;ll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 pl-10 bg-input"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Reset Link"}
              </Button>
            </form>

            <div className="text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}
