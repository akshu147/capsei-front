"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react"

const stats = [
  { label: "Total Revenue", value: "$45,231", change: "+20.1%", trend: "up", icon: DollarSign },
  { label: "Active Users", value: "2,350", change: "+180", trend: "up", icon: Users },
  { label: "Conversion Rate", value: "3.2%", change: "-0.4%", trend: "down", icon: TrendingUp },
  { label: "Avg. Session", value: "4m 32s", change: "+12%", trend: "up", icon: Activity },
]

const activities = [
  { user: "Sarah Chen", action: "deployed v2.3.0 to production", time: "2 minutes ago" },
  { user: "Alex Rivera", action: "merged PR #1234", time: "15 minutes ago" },
  { user: "Jordan Lee", action: "created new workspace", time: "1 hour ago" },
  { user: "Taylor Kim", action: "updated billing settings", time: "3 hours ago" },
]

export function DashboardPreview() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Powerful analytics dashboard</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-pretty">
            Real-time insights at your fingertips. Monitor, analyze, and optimize your workflow.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <Card className="bg-card/50 backdrop-blur-xl border-border overflow-hidden">
            <CardHeader className="border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 text-sm text-muted-foreground">Dashboard Overview</span>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-secondary/30 border-border">
                      <CardContent className="pt-4 pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <stat.icon className="w-4 h-4 text-muted-foreground" />
                          <span
                            className={`text-xs flex items-center gap-1 ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}
                          >
                            {stat.trend === "up" ? (
                              <ArrowUpRight className="w-3 h-3" />
                            ) : (
                              <ArrowDownRight className="w-3 h-3" />
                            )}
                            {stat.change}
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Chart Placeholder */}
              <div className="grid lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 bg-secondary/30 border-border">
                  <CardHeader>
                    <CardTitle className="text-sm text-foreground">Revenue Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 flex items-end justify-between gap-2 px-4">
                      {[40, 70, 45, 90, 65, 80, 95, 75, 85, 100, 70, 88].map((height, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${height}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05, duration: 0.5 }}
                          className="flex-1 bg-primary/60 rounded-t hover:bg-primary transition-colors"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Activity Feed */}
                <Card className="bg-secondary/30 border-border">
                  <CardHeader>
                    <CardTitle className="text-sm text-foreground">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activities.map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-medium text-primary">
                              {activity.user
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground truncate">
                              <span className="font-medium">{activity.user}</span>{" "}
                              <span className="text-muted-foreground">{activity.action}</span>
                            </p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
