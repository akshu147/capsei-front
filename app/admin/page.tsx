"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  LayoutDashboard,
  Car,
  Package,
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  Settings,
  LogOut,
  Search,
  Bell,
  Filter,
  Download,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Bike,
  Truck,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  MapPin,
} from "lucide-react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { name: "Rides", icon: Car, href: "/admin/rides" },
  { name: "Parcels", icon: Package, href: "/admin/parcels" },
  { name: "Drivers", icon: Users, href: "/admin/drivers" },
  { name: "Users", icon: Users, href: "/admin/users" },
  { name: "Revenue", icon: DollarSign, href: "/admin/revenue" },
  { name: "Analytics", icon: Activity, href: "/admin/analytics" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
]

const revenueData = [
  { name: "Mon", rides: 4200, parcels: 1800 },
  { name: "Tue", rides: 3800, parcels: 2100 },
  { name: "Wed", rides: 5100, parcels: 1900 },
  { name: "Thu", rides: 4700, parcels: 2400 },
  { name: "Fri", rides: 6200, parcels: 2800 },
  { name: "Sat", rides: 7500, parcels: 3200 },
  { name: "Sun", rides: 5800, parcels: 2600 },
]

const serviceDistribution = [
  { name: "Car Taxi", value: 45, color: "oklch(0.75 0.14 55)" },
  { name: "Bike Taxi", value: 30, color: "oklch(0.65 0.18 145)" },
  { name: "Loading", value: 15, color: "oklch(0.65 0.15 220)" },
  { name: "Parcel", value: 10, color: "oklch(0.7 0.15 280)" },
]

const hourlyData = [
  { hour: "6AM", rides: 120 },
  { hour: "8AM", rides: 450 },
  { hour: "10AM", rides: 380 },
  { hour: "12PM", rides: 420 },
  { hour: "2PM", rides: 350 },
  { hour: "4PM", rides: 480 },
  { hour: "6PM", rides: 650 },
  { hour: "8PM", rides: 520 },
  { hour: "10PM", rides: 280 },
]

const activeRides = [
  {
    id: "R-7821",
    driver: "John M.",
    rider: "Sarah K.",
    type: "Sedan",
    status: "in-progress",
    pickup: "Downtown Station",
    dropoff: "Airport T2",
    eta: "12 min",
  },
  {
    id: "R-7822",
    driver: "Mike D.",
    rider: "Emma W.",
    type: "Bike",
    status: "in-progress",
    pickup: "Central Mall",
    dropoff: "Tech Park",
    eta: "8 min",
  },
  {
    id: "R-7823",
    driver: "Chris L.",
    rider: "Alex T.",
    type: "SUV",
    status: "picking-up",
    pickup: "Hilton Hotel",
    dropoff: "Convention Center",
    eta: "3 min",
  },
  {
    id: "R-7824",
    driver: "David R.",
    rider: "Lisa M.",
    type: "Hatchback",
    status: "in-progress",
    pickup: "University",
    dropoff: "City Hospital",
    eta: "15 min",
  },
  {
    id: "R-7825",
    driver: "Sam K.",
    rider: "James B.",
    type: "Tempo",
    status: "loading",
    pickup: "Warehouse District",
    dropoff: "Industrial Area",
    eta: "25 min",
  },
]

const topDrivers = [
  { name: "John Miller", rides: 156, rating: 4.95, earnings: "$2,450" },
  { name: "Sarah Connor", rides: 142, rating: 4.92, earnings: "$2,180" },
  { name: "Mike Johnson", rides: 138, rating: 4.88, earnings: "$2,050" },
  { name: "Emily Davis", rides: 125, rating: 4.91, earnings: "$1,890" },
  { name: "Chris Wilson", rides: 118, rating: 4.85, earnings: "$1,720" },
]

function AdminPageContent() {
  const [activeNav, setActiveNav] = useState("Dashboard")
  const [dateRange, setDateRange] = useState("7d")

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-border bg-sidebar lg:block">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">M</span>
            </div>
            <div>
              <span className="text-lg font-semibold">MoveX</span>
              <span className="ml-1 text-xs text-muted-foreground">Admin</span>
            </div>
          </Link>
        </div>

        <nav className="space-y-1 p-3">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveNav(item.name)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                activeNav === item.name
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-sidebar-border p-4">
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground">
            <LogOut className="h-5 w-5" />
            Log out
          </Button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 lg:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">M</span>
              </div>
            </Link>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." className="w-64 pl-10 bg-secondary border-0" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-32 bg-secondary border-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="p-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold">Dashboard Overview</h1>
                <p className="text-muted-foreground">Monitor your platform performance in real-time</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-border">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">$48,290</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-sm">
                    <ArrowUpRight className="h-4 w-4 text-success" />
                    <span className="text-success">+12.5%</span>
                    <span className="text-muted-foreground">vs last week</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Rides</p>
                      <p className="text-2xl font-bold">1,247</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
                      <Car className="h-6 w-6 text-success" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-sm">
                    <ArrowUpRight className="h-4 w-4 text-success" />
                    <span className="text-success">+8.2%</span>
                    <span className="text-muted-foreground">vs yesterday</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Online Drivers</p>
                      <p className="text-2xl font-bold">892</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                      <Users className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-sm">
                    <ArrowDownRight className="h-4 w-4 text-destructive" />
                    <span className="text-destructive">-3.1%</span>
                    <span className="text-muted-foreground">vs peak hour</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Parcels</p>
                      <p className="text-2xl font-bold">342</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10">
                      <Package className="h-6 w-6 text-warning" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-sm">
                    <ArrowUpRight className="h-4 w-4 text-success" />
                    <span className="text-success">+5.4%</span>
                    <span className="text-muted-foreground">deliveries today</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="border-border lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg">Revenue Overview</CardTitle>
                    <CardDescription>Daily revenue from rides and parcels</CardDescription>
                  </div>
                  <Tabs defaultValue="combined" className="w-auto">
                    <TabsList className="h-8 bg-secondary">
                      <TabsTrigger value="combined" className="text-xs h-6">
                        Combined
                      </TabsTrigger>
                      <TabsTrigger value="rides" className="text-xs h-6">
                        Rides
                      </TabsTrigger>
                      <TabsTrigger value="parcels" className="text-xs h-6">
                        Parcels
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0.008 260)" />
                      <XAxis dataKey="name" stroke="oklch(0.55 0 0)" fontSize={12} />
                      <YAxis stroke="oklch(0.55 0 0)" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "oklch(0.1 0.008 260)",
                          border: "1px solid oklch(0.2 0.008 260)",
                          borderRadius: "8px",
                        }}
                        labelStyle={{ color: "oklch(0.98 0 0)" }}
                      />
                      <Bar dataKey="rides" fill="oklch(0.75 0.14 55)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="parcels" fill="oklch(0.65 0.15 220)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Service Distribution</CardTitle>
                  <CardDescription>Breakdown by service type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={serviceDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {serviceDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "oklch(0.1 0.008 260)",
                          border: "1px solid oklch(0.2 0.008 260)",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 space-y-2">
                    {serviceDistribution.map((item) => (
                      <div key={item.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-muted-foreground">{item.name}</span>
                        </div>
                        <span className="font-medium">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="border-border lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg">Active Rides</CardTitle>
                    <CardDescription>Real-time ride monitoring</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    View All
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ride ID</TableHead>
                        <TableHead>Driver</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>ETA</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activeRides.map((ride) => (
                        <TableRow key={ride.id}>
                          <TableCell className="font-medium">{ride.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-7 w-7">
                                <AvatarFallback className="text-xs">
                                  {ride.driver
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{ride.driver}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              {ride.type === "Bike" ? (
                                <Bike className="h-4 w-4 text-muted-foreground" />
                              ) : ride.type === "Tempo" ? (
                                <Truck className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Car className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span className="text-sm">{ride.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3 text-success" />
                              <span className="max-w-[80px] truncate">{ride.pickup}</span>
                              <span>→</span>
                              <span className="max-w-[80px] truncate">{ride.dropoff}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {ride.status === "in-progress" ? (
                              <Badge className="bg-success/10 text-success hover:bg-success/20">
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                In Progress
                              </Badge>
                            ) : ride.status === "picking-up" ? (
                              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                                <Clock className="mr-1 h-3 w-3" />
                                Picking Up
                              </Badge>
                            ) : (
                              <Badge className="bg-warning/10 text-warning hover:bg-warning/20">
                                <Package className="mr-1 h-3 w-3" />
                                Loading
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="font-medium text-primary">{ride.eta}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg">Top Drivers</CardTitle>
                    <CardDescription>This week&apos;s top performers</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topDrivers.map((driver, index) => (
                    <div key={driver.name} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium truncate">{driver.name}</span>
                          <span className="text-sm font-semibold text-primary">{driver.earnings}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{driver.rides} rides</span>
                          <span className="flex items-center gap-0.5">
                            <TrendingUp className="h-3 w-3 text-success" />
                            {driver.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card className="border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Hourly Ride Trends</CardTitle>
                <CardDescription>Number of rides per hour today</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0.008 260)" />
                    <XAxis dataKey="hour" stroke="oklch(0.55 0 0)" fontSize={12} />
                    <YAxis stroke="oklch(0.55 0 0)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(0.1 0.008 260)",
                        border: "1px solid oklch(0.2 0.008 260)",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "oklch(0.98 0 0)" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="rides"
                      stroke="oklch(0.75 0.14 55)"
                      strokeWidth={2}
                      dot={{ fill: "oklch(0.75 0.14 55)", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <Suspense fallback={null}>
      <AdminPageContent />
    </Suspense>
  )
}
