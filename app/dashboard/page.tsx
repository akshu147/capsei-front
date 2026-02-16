'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import {
  LayoutDashboard,
  Car,
  Package,
  Wallet,
  MapPin,
  Gift,
  Settings,
  LogOut,
  ChevronRight,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  CreditCard,
  Building,
  Home,
  Briefcase,
  Search,
  Bell,
  User
} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { setUserDetail } from '@/store/userdetailslice/userdetailslice'

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'My Rides', icon: Car, href: '/dashboard/rides' },
  { name: 'My Parcels', icon: Package, href: '/dashboard/parcels' },
  { name: 'Wallet', icon: Wallet, href: '/dashboard/wallet' },
  { name: 'Saved Places', icon: MapPin, href: '/dashboard/places' },
  { name: 'Offers', icon: Gift, href: '/dashboard/offers' },
  { name: 'Settings', icon: Settings, href: '/dashboard/settings' }
]

const recentRides = [
  {
    id: 'R001',
    date: 'Today, 2:30 PM',
    from: '123 Oak Street',
    to: '456 Business Park',
    type: 'Car Taxi',
    status: 'completed',
    price: '$12.50',
    driver: 'John D.',
    rating: 5
  },
  {
    id: 'R002',
    date: 'Yesterday, 9:15 AM',
    from: 'Home',
    to: 'Airport Terminal 2',
    type: 'Sedan',
    status: 'completed',
    price: '$35.00',
    driver: 'Sarah M.',
    rating: 5
  },
  {
    id: 'R003',
    date: 'Jan 14, 6:00 PM',
    from: 'Office',
    to: 'Central Mall',
    type: 'Bike Taxi',
    status: 'cancelled',
    price: '$0.00',
    driver: '-',
    rating: null
  },
  {
    id: 'R004',
    date: 'Jan 13, 11:30 AM',
    from: 'Gym',
    to: 'Home',
    type: 'Hatchback',
    status: 'completed',
    price: '$8.75',
    driver: 'Mike R.',
    rating: 4
  }
]

const recentParcels = [
  {
    id: 'P001',
    date: 'Today, 10:00 AM',
    from: 'Office',
    to: 'Customer - James Wilson',
    type: 'Document',
    status: 'in-transit',
    price: '$5.00'
  },
  {
    id: 'P002',
    date: 'Yesterday, 3:00 PM',
    from: 'Home',
    to: "Mom's Place",
    type: 'Box Package',
    status: 'delivered',
    price: '$8.50'
  },
  {
    id: 'P003',
    date: 'Jan 12, 1:00 PM',
    from: 'Warehouse',
    to: 'Client - ABC Corp',
    type: 'Shopping Bag',
    status: 'delivered',
    price: '$6.00'
  }
]

const savedPlaces = [
  {
    id: 1,
    name: 'Home',
    address: '123 Oak Street, Downtown, NY 10001',
    icon: Home
  },
  {
    id: 2,
    name: 'Office',
    address: '456 Business Park, Tower A, Floor 12',
    icon: Briefcase
  },
  { id: 3, name: 'Gym', address: '789 Fitness Ave, Midtown', icon: Building }
]

const offers = [
  {
    id: 1,
    title: '50% Off First Ride',
    description: 'Use code FIRST50 for new users',
    expiry: 'Valid till Jan 31',
    type: 'discount'
  },
  {
    id: 2,
    title: 'Free Delivery',
    description: 'On parcels above $20',
    expiry: 'Valid till Feb 15',
    type: 'parcel'
  },
  {
    id: 3,
    title: '$5 Cashback',
    description: 'On SUV rides this week',
    expiry: 'Valid till Jan 20',
    type: 'cashback'
  }
]

export default function DashboardPage () {
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [historyTab, setHistoryTab] = useState('rides')
  const [checkingAuth, setCheckingAuth] = useState(true)
  const userdetail = useSelector((state: any) => state.userdetail.value)
  const ifuserexiist = useSelector((state: any) => state.userExist.value)
  const dispatch = useDispatch()

  const router = useRouter()
 const usercookiedata = useSelector((state:any) => state.userdetail.value);

// First letter safely
const logoname = (usercookiedata?.name?.[0] || '').toUpperCase();

  useEffect(() => {
  const userExist = localStorage.getItem("userExist") === "true";
  if(!userExist) {
    router.replace('/login')
  }
 else {
      setCheckingAuth(false)
    }
  }, [ifuserexiist, router])
  if (checkingAuth) {
    return null // ya spinner
  }


  return (
    <div className='min-h-screen bg-background'>
      <aside className='fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-border bg-sidebar lg:block'>
        <div className='flex h-16 items-center gap-2 border-b border-sidebar-border px-6'>
          <Link href='/' className='flex items-center gap-2'>
            <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-primary'>
              <span className='text-lg font-bold text-primary-foreground'>
                M
              </span>
            </div>
            <span className='text-xl font-semibold'>MoveX</span>
          </Link>
        </div>

        <div className='p-4'>
          <div className='flex items-center gap-3 rounded-xl bg-sidebar-accent p-3'>
            <Avatar className='h-10 w-10'>
              <AvatarImage src='/public/icon.svg' />
              <AvatarFallback>{logoname}</AvatarFallback>
            </Avatar>
            <div className='flex-1 min-w-0'>
              <div className='truncate font-medium text-sm'>{usercookiedata.name}</div>
              <div className='truncate text-xs text-muted-foreground'>
                {usercookiedata.email}
              </div>
            </div>
          </div>
        </div>

        <nav className='space-y-1 px-3'>
          {navigation.map(item => (
            <button
              key={item.name}
              onClick={() => setActiveNav(item.name)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                activeNav === item.name
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
            >
              <item.icon className='h-5 w-5' />
              {item.name}
            </button>
          ))}
        </nav>

        <div className='absolute bottom-0 left-0 right-0 border-t border-sidebar-border p-4'>
          <Button
            variant='ghost'
            className='w-full justify-start gap-3 text-muted-foreground hover:text-foreground'
          >
            <LogOut className='h-5 w-5' />
            Log out
          </Button>
        </div>
      </aside>

      <div className='lg:pl-64'>
        <header className='sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
          <div className='flex items-center gap-4'>
            <Link href='/' className='flex items-center gap-2 lg:hidden'>
              <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary'>
                <span className='text-sm font-bold text-primary-foreground'>
                  M
                </span>
              </div>
            </Link>
            <div className='relative hidden sm:block'>
              <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
              <Input
                placeholder='Search rides, parcels...'
                className='w-64 pl-10 bg-secondary border-0'
              />
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <Button variant='ghost' size='icon' className='relative'>
              <Bell className='h-5 w-5' />
              <span className='absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary' />
            </Button>
            <Button variant='ghost' size='icon' className='lg:hidden'>
              <User className='h-5 w-5' />
            </Button>
          </div>
        </header>

        <main className='p-6'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='space-y-6'
          >
            <div>
              <h1 className='text-2xl font-bold'>Welcome back, John</h1>
              <p className='text-muted-foreground'>
                Here&apos;s an overview of your activity
              </p>
            </div>

            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card className='border-border'>
                <CardContent className='p-5'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm text-muted-foreground'>
                        Total Rides
                      </p>
                      <p className='text-2xl font-bold'>127</p>
                    </div>
                    <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10'>
                      <Car className='h-6 w-6 text-primary' />
                    </div>
                  </div>
                  <p className='mt-2 text-xs text-muted-foreground'>
                    +12 this month
                  </p>
                </CardContent>
              </Card>

              <Card className='border-border'>
                <CardContent className='p-5'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm text-muted-foreground'>
                        Parcels Sent
                      </p>
                      <p className='text-2xl font-bold'>43</p>
                    </div>
                    <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10'>
                      <Package className='h-6 w-6 text-blue-500' />
                    </div>
                  </div>
                  <p className='mt-2 text-xs text-muted-foreground'>
                    +5 this month
                  </p>
                </CardContent>
              </Card>

              <Card className='border-border'>
                <CardContent className='p-5'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm text-muted-foreground'>
                        Wallet Balance
                      </p>
                      <p className='text-2xl font-bold'>$245.00</p>
                    </div>
                    <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-success/10'>
                      <Wallet className='h-6 w-6 text-success' />
                    </div>
                  </div>
                  <Button
                    variant='link'
                    className='mt-1 h-auto p-0 text-xs text-primary'
                  >
                    Add money
                  </Button>
                </CardContent>
              </Card>

              <Card className='border-border'>
                <CardContent className='p-5'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm text-muted-foreground'>
                        Total Saved
                      </p>
                      <p className='text-2xl font-bold'>$89.50</p>
                    </div>
                    <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10'>
                      <Gift className='h-6 w-6 text-warning' />
                    </div>
                  </div>
                  <p className='mt-2 text-xs text-muted-foreground'>
                    From offers & discounts
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className='flex gap-4'>
              <Button asChild>
                <Link href='/booking'>
                  <Car className='mr-2 h-4 w-4' />
                  Book a Ride
                </Link>
              </Button>
              <Button variant='outline' asChild>
                <Link href='/parcel'>
                  <Package className='mr-2 h-4 w-4' />
                  Send Parcel
                </Link>
              </Button>
            </div>

            <div className='grid gap-6 lg:grid-cols-3'>
              <div className='lg:col-span-2'>
                <Card className='border-border'>
                  <CardHeader className='flex flex-row items-center justify-between pb-2'>
                    <div>
                      <CardTitle className='text-lg'>Recent Activity</CardTitle>
                      <CardDescription>
                        Your ride and parcel history
                      </CardDescription>
                    </div>
                    <Button variant='ghost' size='sm'>
                      View All
                      <ChevronRight className='ml-1 h-4 w-4' />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={historyTab} onValueChange={setHistoryTab}>
                      <TabsList className='mb-4 bg-secondary'>
                        <TabsTrigger value='rides'>Rides</TabsTrigger>
                        <TabsTrigger value='parcels'>Parcels</TabsTrigger>
                      </TabsList>

                      <TabsContent value='rides' className='m-0'>
                        <div className='space-y-3'>
                          {recentRides.map(ride => (
                            <div
                              key={ride.id}
                              className='flex items-center justify-between rounded-lg border border-border bg-card p-4'
                            >
                              <div className='flex items-center gap-4'>
                                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-secondary'>
                                  <Car className='h-5 w-5 text-muted-foreground' />
                                </div>
                                <div>
                                  <div className='flex items-center gap-2'>
                                    <span className='font-medium'>
                                      {ride.type}
                                    </span>
                                    {ride.status === 'completed' ? (
                                      <Badge
                                        variant='secondary'
                                        className='bg-success/10 text-success hover:bg-success/20'
                                      >
                                        <CheckCircle2 className='mr-1 h-3 w-3' />
                                        Completed
                                      </Badge>
                                    ) : (
                                      <Badge
                                        variant='secondary'
                                        className='bg-destructive/10 text-destructive hover:bg-destructive/20'
                                      >
                                        <XCircle className='mr-1 h-3 w-3' />
                                        Cancelled
                                      </Badge>
                                    )}
                                  </div>
                                  <div className='mt-1 text-sm text-muted-foreground'>
                                    {ride.from} → {ride.to}
                                  </div>
                                  <div className='mt-0.5 text-xs text-muted-foreground'>
                                    {ride.date}
                                  </div>
                                </div>
                              </div>
                              <div className='text-right'>
                                <div className='font-semibold'>
                                  {ride.price}
                                </div>
                                {ride.driver !== '-' && (
                                  <div className='text-xs text-muted-foreground'>
                                    {ride.driver}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value='parcels' className='m-0'>
                        <div className='space-y-3'>
                          {recentParcels.map(parcel => (
                            <div
                              key={parcel.id}
                              className='flex items-center justify-between rounded-lg border border-border bg-card p-4'
                            >
                              <div className='flex items-center gap-4'>
                                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-secondary'>
                                  <Package className='h-5 w-5 text-muted-foreground' />
                                </div>
                                <div>
                                  <div className='flex items-center gap-2'>
                                    <span className='font-medium'>
                                      {parcel.type}
                                    </span>
                                    {parcel.status === 'delivered' ? (
                                      <Badge
                                        variant='secondary'
                                        className='bg-success/10 text-success hover:bg-success/20'
                                      >
                                        <CheckCircle2 className='mr-1 h-3 w-3' />
                                        Delivered
                                      </Badge>
                                    ) : (
                                      <Badge
                                        variant='secondary'
                                        className='bg-primary/10 text-primary hover:bg-primary/20'
                                      >
                                        <Clock className='mr-1 h-3 w-3' />
                                        In Transit
                                      </Badge>
                                    )}
                                  </div>
                                  <div className='mt-1 text-sm text-muted-foreground'>
                                    {parcel.from} → {parcel.to}
                                  </div>
                                  <div className='mt-0.5 text-xs text-muted-foreground'>
                                    {parcel.date}
                                  </div>
                                </div>
                              </div>
                              <div className='text-right'>
                                <div className='font-semibold'>
                                  {parcel.price}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              <div className='space-y-6'>
                <Card className='border-border'>
                  <CardHeader className='pb-3'>
                    <CardTitle className='text-lg'>Wallet</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 p-4'>
                      <div className='text-sm text-muted-foreground'>
                        Available Balance
                      </div>
                      <div className='mt-1 text-3xl font-bold'>$245.00</div>
                    </div>
                    <div className='flex gap-2'>
                      <Button className='flex-1' size='sm'>
                        <Plus className='mr-1 h-4 w-4' />
                        Add Money
                      </Button>
                      <Button
                        variant='outline'
                        className='flex-1 bg-transparent'
                        size='sm'
                      >
                        <CreditCard className='mr-1 h-4 w-4' />
                        Cards
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className='border-border'>
                  <CardHeader className='flex flex-row items-center justify-between pb-3'>
                    <CardTitle className='text-lg'>Saved Places</CardTitle>
                    <Button variant='ghost' size='icon' className='h-8 w-8'>
                      <Plus className='h-4 w-4' />
                    </Button>
                  </CardHeader>
                  <CardContent className='space-y-2'>
                    {savedPlaces.map(place => (
                      <div
                        key={place.id}
                        className='flex items-center gap-3 rounded-lg p-2 hover:bg-secondary'
                      >
                        <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-secondary'>
                          <place.icon className='h-4 w-4 text-muted-foreground' />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <div className='text-sm font-medium'>
                            {place.name}
                          </div>
                          <div className='truncate text-xs text-muted-foreground'>
                            {place.address}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className='border-border'>
                  <CardHeader className='pb-3'>
                    <CardTitle className='text-lg'>Active Offers</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-3'>
                    {offers.map(offer => (
                      <div
                        key={offer.id}
                        className='rounded-lg border border-border bg-secondary/30 p-3'
                      >
                        <div className='flex items-start justify-between'>
                          <div>
                            <div className='text-sm font-medium'>
                              {offer.title}
                            </div>
                            <div className='text-xs text-muted-foreground'>
                              {offer.description}
                            </div>
                          </div>
                          <Gift className='h-4 w-4 text-primary' />
                        </div>
                        <div className='mt-2 text-xs text-muted-foreground'>
                          {offer.expiry}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
