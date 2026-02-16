"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Github, Mail, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"

export function AuthPreview() {
  const [loginState, setLoginState] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [registerState, setRegisterState] = useState<"idle" | "loading" | "success" | "error">("idle")

  const simulateAction = (setState: (state: "idle" | "loading" | "success" | "error") => void) => {
    setState("loading")
    setTimeout(() => {
      setState(Math.random() > 0.3 ? "success" : "error")
      setTimeout(() => setState("idle"), 2000)
    }, 1500)
  }

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Seamless Authentication</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-pretty">
            Secure, flexible sign-in options with enterprise-grade protection. Get started in seconds.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-card/50 backdrop-blur-xl border-border hover:border-primary/30 transition-colors">
              <CardHeader>
                <CardTitle className="text-foreground">Welcome back</CardTitle>
                <CardDescription className="text-muted-foreground">Sign in to your account to continue</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-foreground">
                    Email
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="name@company.com"
                    className="bg-secondary/50 border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-foreground">
                    Password
                  </Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-secondary/50 border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => simulateAction(setLoginState)}
                  disabled={loginState === "loading"}
                >
                  {loginState === "loading" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loginState === "success" && <CheckCircle className="mr-2 h-4 w-4 text-green-400" />}
                  {loginState === "error" && <AlertCircle className="mr-2 h-4 w-4 text-red-400" />}
                  {loginState === "loading"
                    ? "Signing in..."
                    : loginState === "success"
                      ? "Success!"
                      : loginState === "error"
                        ? "Try again"
                        : "Sign in"}
                </Button>

                <div className="relative">
                  <Separator className="bg-border" />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                    or continue with
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                  <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
                    <Mail className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Register Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-card/50 backdrop-blur-xl border-border hover:border-primary/30 transition-colors">
              <CardHeader>
                <CardTitle className="text-foreground">Create account</CardTitle>
                <CardDescription className="text-muted-foreground">Start your 14-day free trial today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="first-name" className="text-foreground">
                      First name
                    </Label>
                    <Input
                      id="first-name"
                      placeholder="John"
                      className="bg-secondary/50 border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name" className="text-foreground">
                      Last name
                    </Label>
                    <Input
                      id="last-name"
                      placeholder="Doe"
                      className="bg-secondary/50 border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-foreground">
                    Email
                  </Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="name@company.com"
                    className="bg-secondary/50 border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-foreground">
                    Password
                  </Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-secondary/50 border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => simulateAction(setRegisterState)}
                  disabled={registerState === "loading"}
                >
                  {registerState === "loading" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {registerState === "success" && <CheckCircle className="mr-2 h-4 w-4 text-green-400" />}
                  {registerState === "error" && <AlertCircle className="mr-2 h-4 w-4 text-red-400" />}
                  {registerState === "loading"
                    ? "Creating account..."
                    : registerState === "success"
                      ? "Account created!"
                      : registerState === "error"
                        ? "Try again"
                        : "Get Started"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By signing up, you agree to our{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
