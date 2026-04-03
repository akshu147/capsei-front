'use client'

import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import {
  Menu,
  X,
  Bell,
  Settings,
  User,
  LogOut,
  Home,
  Wallet,
  MapPin,
  FileText,
  BarChart3,
  HelpCircle,
  Clock,
  MapPinIcon,
  AlertCircle,
  CheckCircle,
  Calendar,
  ChevronRight,
  Import
} from 'lucide-react'
import axios from 'axios'
const earningsData = [
  { day: 'Mon', earnings: 320, rides: 12 },
  { day: 'Tue', earnings: 280, rides: 10 },
  { day: 'Wed', earnings: 450, rides: 18 },
  { day: 'Thu', earnings: 390, rides: 14 },
  { day: 'Fri', earnings: 520, rides: 22 },
  { day: 'Sat', earnings: 480, rides: 20 },
  { day: 'Sun', earnings: 410, rides: 16 }
]

const rideData = [
  {
    id: 1,
    from: '123 Main St',
    to: '456 Oak Ave',
    fare: '$24.50',
    time: '2:30 PM',
    duration: '18 min',
    status: 'Completed',
    rating: 5
  },
  {
    id: 2,
    from: '789 Pine Rd',
    to: '321 Elm St',
    fare: '$18.75',
    time: '1:45 PM',
    duration: '12 min',
    status: 'Completed',
    rating: 5
  },
  {
    id: 3,
    from: '654 Maple Dr',
    to: '987 Cedar Ln',
    fare: '$32.00',
    time: '12:15 PM',
    duration: '25 min',
    status: 'Completed',
    rating: 4
  },
  {
    id: 4,
    from: '111 Birch Way',
    to: '222 Spruce St',
    fare: '$15.25',
    time: '11:20 AM',
    duration: '10 min',
    status: 'Completed',
    rating: 5
  }
]

const documents = [
  {
    id: 1,
    name: 'Driver License',
    status: 'Verified',
    expires: '2025-12-15',
    progress: 100
  },
  {
    id: 2,
    name: 'Vehicle Registration',
    status: 'Verified',
    expires: '2026-06-30',
    progress: 80
  },
  {
    id: 3,
    name: 'Insurance Certificate',
    status: 'Pending',
    expires: '2025-08-20',
    progress: 60
  },
  {
    id: 4,
    name: 'Profile Photo',
    status: 'Required',
    expires: null,
    progress: 40
  },
  {
    id: 5,
    name: 'Aadhar card',
    status: 'Required',
    expires: null,
    progress: 20
  }
]

const notifications = [
  {
    id: 1,
    type: 'document',
    title: 'Insurance Certificate Update',
    message: 'Your insurance certificate needs to be renewed by August 20.',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    type: 'bonus',
    title: '50% Bonus Available',
    message: 'Complete 5 more rides today to unlock 50% earnings bonus.',
    timestamp: '4 hours ago'
  },
  {
    id: 3,
    type: 'ride',
    title: 'High Demand Alert',
    message: 'High demand in downtown area. Earn 1.5x multiplier rates.',
    timestamp: '6 hours ago'
  },
  {
    id: 4,
    type: 'alert',
    title: 'Vehicle Inspection Reminder',
    message: 'Schedule your monthly vehicle inspection before next week.',
    timestamp: '1 day ago'
  }
]

export default function DriverDashboard () {
  const [isOnline, setIsOnline] = useState(false)
  const [socket, setSocket] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dismissedNotifications, setDismissedNotifications] = useState<
    number[]
  >([])

  const dismissNotification = (id: number) => {
    setDismissedNotifications([...dismissedNotifications, id])
  }

  const visibleNotifications = notifications.filter(
    n => !dismissedNotifications.includes(n.id)
  )
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const driverToken = Cookies.get('driverToken')

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/driver/get-driver-status`,
          {
            headers: {
              Authorization: `Bearer ${driverToken}`
            }
          }
        )

        setIsOnline(res.data.is_online) // 🔥 DB se set hoga
      } catch (err) {
        console.log(err)
      }
    }

    fetchStatus()
  }, [])

  const handleToggle = async () => {
    const newStatus = !isOnline
    setIsOnline(newStatus)

    try {
      const driverToken = Cookies.get('driverToken')

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/driver/update-driver-status`,
        {
          is_online: newStatus
        },
        {
          headers: {
            Authorization: `Bearer ${driverToken}`
          }
        }
      )
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    let watchId

    let lastLat = null
    let lastLng = null
    let lastTime = 0

    const DISTANCE_THRESHOLD = 0.0001
    const TIME_THRESHOLD = 5000

    if (isOnline && socket) {
      watchId = navigator.geolocation.watchPosition(
        async pos => {
          const { latitude, longitude, accuracy } = pos.coords

          if (accuracy > 200) return

          const now = Date.now()
          let moved = false

          if (lastLat !== null && lastLng !== null) {
            const latDiff = Math.abs(latitude - lastLat)
            const lngDiff = Math.abs(longitude - lastLng)

            if (latDiff > DISTANCE_THRESHOLD || lngDiff > DISTANCE_THRESHOLD) {
              moved = true
            }
          } else {
            moved = true
          }

          const timePassed = now - lastTime > TIME_THRESHOLD
          if (!moved && !timePassed) return

          lastLat = latitude
          lastLng = longitude
          lastTime = now

          try {
            const token = Cookies.get('driverToken')
            const decoded = jwtDecode(token)
            console.log(decoded, "gandmara")

            if (!token) {
              console.log('❌ Token not found')
              return
            }

            // ✅ API update
            await axios.post(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/driver/update-driver-location`,
              { lat: latitude, lng: longitude },
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            )

            // ✅ SOCKET EMIT
            socket.emit('driverLocation', {
              driverId: 232432423, 
              lat: latitude,
              lng: longitude,
              heading: pos.coords.heading || 0,
              speed: pos.coords.speed || 0,
              isOnline: true,
              vehicleType: 'bike',
              timestamp: Date.now(),
            })

            console.log('📍 Sent location:', latitude, longitude)
          } catch (err) {
            console.log('Error sending location:', err.message)
          }
        },
        err => console.log('GPS Error:', err),
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000
        }
      )
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId)
    }
  }, [isOnline, socket])

  useEffect(() => {
    const s = io(process.env.NEXT_PUBLIC_API_BASE_URL)
    setSocket(s)

    return () => s.disconnect()
  }, [])
  console.log(isOnline)

  return (
    <div className='flex h-screen bg-slate-950 text-white overflow-hidden'>
      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform z-50 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className='p-6 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-lg font-bold'>
              R
            </div>
            <span className='font-bold text-lg'>RideHub</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className='lg:hidden'>
            <X className='w-5 h-5' />
          </button>
        </div>

        <nav className='px-4 py-6 space-y-2'>
          {[
            { icon: Home, label: 'Dashboard', active: true },
            { icon: Wallet, label: 'Earnings' },
            { icon: MapPin, label: 'Active Rides' },
            { icon: FileText, label: 'Documents' },
            { icon: BarChart3, label: 'Analytics' }
          ].map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${
                item.active
                  ? 'bg-primary text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <item.icon className='w-5 h-5' />
              <span className='text-sm font-medium'>
                <a href='#document'>{item.label}</a>
              </span>
            </div>
          ))}
        </nav>

        <div className='absolute bottom-6 left-4 right-4 space-y-2'>
          <div className='flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 cursor-pointer transition'>
            <HelpCircle className='w-5 h-5' />
            <span className='text-sm font-medium'>Help & Support</span>
          </div>
          <div className='flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 cursor-pointer transition'>
            <LogOut className='w-5 h-5' />
            <span className='text-sm font-medium'>Logout</span>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-40 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Top Navbar */}
        <div className='bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between'>
          <button onClick={() => setSidebarOpen(true)} className='lg:hidden'>
            <Menu className='w-6 h-6' />
          </button>

          <div className='hidden md:flex flex-1 mx-6'>
            <input
              type='text'
              placeholder='Search rides, locations...'
              className='w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-600'
            />
          </div>

          <div className='flex items-center gap-4 ml-auto'>
            <Bell className='w-5 h-5 cursor-pointer hover:text-blue-400 transition' />
            <Settings className='w-5 h-5 cursor-pointer hover:text-blue-400 transition' />
            <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer'>
              <User className='w-5 h-5' />
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className='flex-1 overflow-y-auto'>
          <div className='p-6 max-w-7xl mx-auto space-y-8'>
            {/* Header */}
            <div>
              <h1 className='text-4xl font-bold text-white'>
                Welcome back, Driver!
              </h1>
              <p className='text-slate-400 mt-2'>
                Here's your performance overview for today.
              </p>
            </div>

            {/* Online Toggle */}
            <div className='flex items-center gap-4'>
              <button
                onClick={handleToggle}
                className={`relative w-16 h-8 rounded-full transition-colors ${
                  isOnline ? 'bg-green-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    isOnline ? 'translate-x-9' : 'translate-x-1'
                  }`}
                />
              </button>
              <div onClick={handleToggle}>
                <p className='font-semibold'>
                  {isOnline ? 'Online' : 'Offline'}
                </p>
                <p className='text-sm text-slate-400'>
                  {isOnline ? 'Available for new rides' : 'Not accepting rides'}
                </p>
              </div>
            </div>

            {/* KPI Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              {[
                {
                  label: "Today's Earnings",
                  value: '$127.50',
                  trend: '+12%',
                  color: 'from-green-600 to-emerald-600'
                },
                {
                  label: 'Total Rides',
                  value: '18',
                  trend: '+5%',
                  color: 'from-blue-600 to-cyan-600'
                },
                {
                  label: 'Driver Rating',
                  value: '4.85',
                  trend: '+0.2',
                  color: 'from-purple-600 to-pink-600'
                },
                {
                  label: 'Online Hours',
                  value: '8.5h',
                  trend: '+1.5h',
                  color: 'from-orange-600 to-red-600'
                }
              ].map((card, i) => (
                <div
                  key={i}
                  className={`bg-gradient-to-br ${card.color} p-6 rounded-xl text-white`}
                >
                  <p className='text-sm opacity-90'>{card.label}</p>
                  <p className='text-2xl font-bold mt-2'>{card.value}</p>
                  <p className='text-xs mt-2 opacity-75'>
                    ↑ {card.trend} from last week
                  </p>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
              {/* Earnings Chart */}
              <div className='bg-slate-900 border border-slate-800 rounded-xl p-6'>
                <h2 className='text-xl font-bold mb-4'>Weekly Earnings</h2>
                <ResponsiveContainer width='100%' height={300}>
                  <LineChart data={earningsData}>
                    <CartesianGrid strokeDasharray='3 3' stroke='#334155' />
                    <XAxis dataKey='day' stroke='#64748b' />
                    <YAxis stroke='#64748b' />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #475569'
                      }}
                    />
                    <Line
                      type='monotone'
                      dataKey='earnings'
                      stroke='#3b82f6'
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Rides Chart */}
              <div className='bg-slate-900 border border-slate-800 rounded-xl p-6'>
                <h2 className='text-xl font-bold mb-4'>Rides Completed</h2>
                <ResponsiveContainer width='100%' height={300}>
                  <BarChart data={earningsData}>
                    <CartesianGrid strokeDasharray='3 3' stroke='#334155' />
                    <XAxis dataKey='day' stroke='#64748b' />
                    <YAxis stroke='#64748b' />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #475569'
                      }}
                    />
                    <Bar dataKey='rides' fill='#8b5cf6' />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Ride Activity and Earnings Summary */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              {/* Ride Activity */}
              <div className='lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6'>
                <h2 className='text-xl font-bold mb-4'>Recent Rides</h2>
                <div className='space-y-3 max-h-96 overflow-y-auto'>
                  {rideData.map(ride => (
                    <div
                      key={ride.id}
                      className='flex items-start justify-between p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition cursor-pointer'
                    >
                      <div className='flex-1'>
                        <div className='flex items-center gap-2'>
                          <MapPinIcon className='w-4 h-4 text-blue-400' />
                          <p className='text-sm text-slate-300'>
                            {ride.from} → {ride.to}
                          </p>
                        </div>
                        <div className='flex items-center gap-4 mt-2 text-xs text-slate-400'>
                          <span className='flex items-center gap-1'>
                            <Clock className='w-3 h-3' />
                            {ride.time}
                          </span>
                          <span>{ride.duration}</span>
                          <span className='flex items-center gap-1'>
                            <CheckCircle className='w-3 h-3 text-green-500' />
                            {ride.status}
                          </span>
                        </div>
                      </div>
                      <div className='text-right'>
                        <p className='font-bold text-green-400'>{ride.fare}</p>
                        <p className='text-xs text-slate-400 mt-1'>
                          ⭐ {ride.rating}.0
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Earnings Summary */}
              <div className='space-y-4'>
                {[
                  { period: 'This Week', amount: '$2,450', change: '+8%' },
                  { period: 'This Month', amount: '$9,680', change: '+15%' },
                  {
                    period: 'Total Earnings',
                    amount: '$48,320',
                    change: '+22%'
                  }
                ].map((item, i) => (
                  <div
                    key={i}
                    className='bg-slate-900 border border-slate-800 rounded-xl p-4'
                  >
                    <p className='text-sm text-slate-400'>{item.period}</p>
                    <p className='text-2xl font-bold mt-2'>{item.amount}</p>
                    <p className='text-xs text-green-400 mt-1'>
                      ↑ {item.change}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents and Notifications */}
            <div
              className='grid grid-cols-1 lg:grid-cols-2 gap-8'
              id='document'
            >
              {/* Documents */}
              <div className='bg-slate-900 border border-slate-800 rounded-xl p-6'>
                <h2 className='text-xl font-bold mb-4'>Documents</h2>
                <div className='max-h-96 overflow-y-auto'>
                  {documents.map(doc => (
                    <div key={doc.id} className='p-4 bg-slate-800 rounded-lg'>
                      <div className='flex items-center justify-between mb-2'>
                        <div className='flex items-center gap-3'>
                          <FileText className='w-5 h-5 text-blue-400' />
                          <div>
                            <p className='font-medium'>{doc.name}</p>
                            {doc.expires && (
                              <p className='text-xs text-slate-400'>
                                Expires: {doc.expires}
                              </p>
                            )}
                          </div>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            doc.status === 'Verified'
                              ? 'bg-green-900 text-green-300'
                              : doc.status === 'Pending'
                              ? 'bg-yellow-900 text-yellow-300'
                              : 'bg-red-900 text-red-300'
                          }`}
                        >
                          {doc.status}
                        </span>
                      </div>
                      <div className='w-full bg-slate-700 rounded-full h-2'>
                        <div
                          className='bg-blue-600 h-2 rounded-full'
                          style={{ width: `${doc.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notifications */}
              <div className='bg-slate-900 border border-slate-800 rounded-xl p-6'>
                <h2 className='text-xl font-bold mb-4'>
                  Notifications ({visibleNotifications.length})
                </h2>
                <div className='space-y-3 max-h-96 overflow-y-auto'>
                  {visibleNotifications.map(notif => (
                    <div
                      key={notif.id}
                      className='p-4 bg-slate-800 rounded-lg flex gap-3'
                    >
                      <div>
                        {notif.type === 'document' && (
                          <AlertCircle className='w-5 h-5 text-yellow-500' />
                        )}
                        {notif.type === 'bonus' && (
                          <CheckCircle className='w-5 h-5 text-green-500' />
                        )}
                        {notif.type === 'ride' && (
                          <MapPinIcon className='w-5 h-5 text-blue-500' />
                        )}
                        {notif.type === 'alert' && (
                          <Bell className='w-5 h-5 text-red-500' />
                        )}
                      </div>
                      <div className='flex-1'>
                        <p className='font-medium text-sm'>{notif.title}</p>
                        <p className='text-xs text-slate-400 mt-1'>
                          {notif.message}
                        </p>
                        <p className='text-xs text-slate-500 mt-2'>
                          {notif.timestamp}
                        </p>
                      </div>
                      <button
                        onClick={() => dismissNotification(notif.id)}
                        className='text-slate-500 hover:text-slate-300'
                      >
                        <X className='w-4 h-4' />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='h-8' />
          </div>
        </div>
      </div>
    </div>
  )
}
