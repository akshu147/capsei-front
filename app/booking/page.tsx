'use client'

import type React from 'react'

import { useState, Suspense, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Bike,
  Car,
  Truck,
  Package,
  MapPin,
  Navigation,
  Clock,
  CalendarIcon,
  ChevronLeft,
  Search,
  Star,
  Users,
  Briefcase
} from 'lucide-react'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { getExactCurrentLocation } from '@/components/Getcurrentlocationfunction'
import { getAddressAutocomplete } from '@/components/Autocompletelocation'
import axios from 'axios'

type ServiceType = 'bike' | 'car' | 'loading' | 'parcel'

interface VehicleOption {
  id: string
  name: string
  description: string
  capacity: string
  price: string
  eta: string
  icon: React.ReactNode

  // 👇 ye sab optional kar do
  total?: number
  baseFare?: number
  distanceFare?: number
  platformFee?: number
}

interface PlaceSuggestion {
  label: string
  placeId: string
}

const vehicleOptions: Record<ServiceType, VehicleOption[]> = {
  bike: [
    {
      id: 'standard',
      name: 'Standard Bike',
      description: 'Quick solo ride',
      capacity: '1 person',
      price: '₹0',
      eta: '2 min',
      icon: <Bike className='h-5 w-5' />
    },
    {
      id: 'premium',
      name: 'Premium Bike',
      description: 'Helmets included',
      capacity: '1 person',
      price: '₹0',
      eta: '3 min',
      icon: <Bike className='h-5 w-5' />
    }
  ],
  car: [
    {
      id: 'City Car',
      name: 'City Car',
      description: 'Compact and affordable',
      capacity: '4 seats',
      price: '₹0',
      eta: '4 min',
      icon: <Car className='h-5 w-5' />
    },
    {
      id: 'sedan',
      name: 'Sedan',
      description: 'Comfortable ride',
      capacity: '4 seats',
      price: '₹0',
      eta: '5 min',
      icon: <Car className='h-5 w-5' />
    },
    {
      id: 'suv',
      name: 'SUV',
      description: 'Spacious premium',
      capacity: '6 seats',
      price: '₹0',
      eta: '6 min',
      icon: <Users className='h-5 w-5' />
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Luxury experience',
      capacity: '4 seats',
      price: '₹0',
      eta: '8 min',
      icon: <Briefcase className='h-5 w-5' />
    }
  ],
  loading: [
    {
      id: 'pickup',
      name: 'Pickup Truck',
      description: 'Small loads',
      capacity: '500 kg',
      price: '₹0',
      eta: '10 min',
      icon: <Truck className='h-5 w-5' />
    },
    {
      id: 'tempo',
      name: 'Tempo',
      description: 'Medium cargo',
      capacity: '1000 kg',
      price: '₹0',
      eta: '12 min',
      icon: <Truck className='h-5 w-5' />
    },
    {
      id: 'truck',
      name: 'Full Truck',
      description: 'Heavy cargo',
      capacity: '2000 kg',
      price: '₹0',
      eta: '15 min',
      icon: <Truck className='h-5 w-5' />
    }
  ],
  parcel: [
    {
      id: 'instant',
      name: 'Instant Delivery',
      description: 'Within 1 hour',
      capacity: '5 kg',
      price: '₹0',
      eta: '45 min',
      icon: <Package className='h-5 w-5' />
    },
    {
      id: 'sameday',
      name: 'Same Day',
      description: 'By end of day',
      capacity: '10 kg',
      price: '₹0',
      eta: '6 hrs',
      icon: <Package className='h-5 w-5' />
    },
    {
      id: 'scheduled',
      name: 'Scheduled',
      description: 'Pick your time',
      capacity: '15 kg',
      price: '₹0',
      eta: 'Custom',
      icon: <Clock className='h-5 w-5' />
    }
  ]
}

// const savedPlaces = [
//   { name: "Home", address: "123 Oak Street, Downtown", icon: "🏠" },
//   { name: "Office", address: "456 Business Park, Tower A", icon: "🏢" },
//   { name: "Gym", address: "789 Fitness Ave", icon: "🏋️" },
// ]

function BookingPageContent () {
  const [service, setService] = useState<ServiceType>('car')
  const [selectedVehicle, setSelectedVehicle] = useState<string>('sedan')
  const [scheduleType, setScheduleType] = useState<'now' | 'later'>('now')
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>()
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false)
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false)
  const currentVehicles = vehicleOptions[service]
  const selectedVehicleData =
    currentVehicles.find(v => v.id === selectedVehicle) || currentVehicles[0]
  const ifuserexiist = useSelector((state: any) => state.userExist.value)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [pickupsuggestion, setpickupsuggestion] = useState<PlaceSuggestion[]>([])
  const [dropsuggestion, setdropsuggestion] = useState<PlaceSuggestion[]>([])
  // const [onlysuggestion, setsuggestion] = useState([])
  const [pickup, setPickup] = useState<{
    label: string
    place_id: string
  } | null>(null)

  const [dropoff, setDropoff] = useState<{
    label: string
    place_id: string
  } | null>(null)
  const [fareData, setFareData] = useState<any>(null)
  const [loadingFare, setLoadingFare] = useState(false)
  const [thecurrentVehicles, settheCurrentVehicles] = useState<VehicleOption[]>(
    vehicleOptions['car']
  )

  const router = useRouter()
  //  useEffect(() => {
  //   if (!ifuserexiist) {
  //     router.replace("/login") // replace is better than push
  //   } else {
  //     setCheckingAuth(false)
  //   }
  // }, [ifuserexiist, router])
  // if (checkingAuth) {
  //   return null // ya spinner
  // }

  // get current location
  async function handleGetLocation () {
    try {
      const loc = await getExactCurrentLocation() as { lat: number; lng: number }
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            latlng: `${loc.lat},${loc.lng}`,
            key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY
          }
        }
      )

      const result = res.data.results[0]

      setPickup({
        label: result.formatted_address,
        place_id: result.place_id
      })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (!pickup) return

    const timeout = setTimeout(async () => {
      const data = await getAddressAutocomplete(pickup.label)
      setpickupsuggestion(data)
    }, 400)

    return () => clearTimeout(timeout)
  }, [pickup])

  useEffect(() => {
    if (!dropoff) return

    const timeout = setTimeout(async () => {
      const data = await getAddressAutocomplete(dropoff.label)
      setdropsuggestion(data)
    }, 400)

    return () => clearTimeout(timeout)
  }, [dropoff])

  const getprices = async () => {
    if (!pickup?.place_id || !dropoff?.place_id) return

    try {
      setLoadingFare(true)
      const detail = {
        pick_placeId: pickup.place_id,
        drop_PlaceId: dropoff.place_id,
        serviceType: service
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ride/calculate-price`,
        detail,  { withCredentials: true }
      )
      console.log(res)

      // backend se aane wale vehicles ko RadioGroup ke liye map karte hain
      const vehiclesData = res.data.vehicles.map((v: any) => {
        const defaultOption = vehicleOptions[service].find(
          opt => opt.id === v.vehicleType
        )

        return {
          id: v.vehicleType,
          name: defaultOption?.name || v.vehicleType,
          description: defaultOption?.description || '',
          capacity: defaultOption?.capacity || '',
          price: `₹${v.total}`,
          total: v.total,
          baseFare: v.baseFare,
          distanceFare: v.distanceFare,
          platformFee: v.platformFee,
          eta: defaultOption?.eta || '',
          icon: defaultOption?.icon || null
        }
      })

      settheCurrentVehicles(vehiclesData)
      setSelectedVehicle(vehiclesData[0]?.id || '')
      setFareData(res.data)
    } catch (err: any) {
      console.error(err.response?.data || err.message)
    } finally {
      setLoadingFare(false)
    }
  }

  useEffect(() => {
    if (dropoff) {
      getprices()
    }
  }, [service, pickup, dropoff])

  // useEffect(() => {
  //   if (pickup && dropoff) {
  //     getprices()
  //   }
  // }, [pickup, dropoff, selectedVehicle])

  // const aookride = async()=> {
  //   try {

  //   }
  //   catch(err){
  //     console.log("something went wrong")
  //   }
  // }

  return (
    <div className='min-h-screen bg-background'>
      <header className='glass fixed top-0 left-0 right-0 z-50 mx-4 mt-4 rounded-xl lg:mx-8'>
        <div className='flex h-14 items-center justify-between px-6'>
          <div className='flex items-center gap-4'>
            <Button variant='ghost' size='icon' asChild>
              <Link href='/'>
                <ChevronLeft className='h-5 w-5' />
              </Link>
            </Button>
            <Link href='/' className='flex items-center gap-2'>
              <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary'>
                <span className='text-sm font-bold text-primary-foreground'>
                  C
                </span>
              </div>
              <span className='text-lg font-semibold'>Capsei</span>
            </Link>
          </div>
          <div className='flex items-center gap-3'>
            <Button variant='ghost' size='sm' asChild>
              <Link href='/dashboard'>My Rides</Link>
            </Button>
            <Button variant='outline' size='sm'>
              Help
            </Button>
          </div>
        </div>
      </header>

      <div className='flex min-h-screen pt-24'>
        <aside className='hidden w-120 shrink-0 border-r border-border bg-card p-6 lg:block xl:w-130'>
          <div className='space-y-6'>
            <div>
              <h1 className='text-2xl font-bold'>Book a Ride</h1>
              <p className='mt-1 text-sm text-muted-foreground'>
                Enter your pickup and drop-off locations
              </p>
            </div>

            <div className='space-y-4'>
              <div className='relative'>
                <Label htmlFor='pickup' className='sr-only'>
                  Pickup Location
                </Label>
                <div className='relative'>
                  <div className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2'>
                    <div className='flex h-3 w-3 items-center justify-center rounded-full bg-success'>
                      <div className='h-1.5 w-1.5 rounded-full bg-background' />
                    </div>
                  </div>
                  <Input
                    id='pickup'
                    placeholder='Enter pickup location'
                    value={pickup?.label || ''}
                    onChange={e =>
                      setPickup({
                        label: e.target.value,
                        place_id: ''
                      })
                    }
                    onFocus={() => setShowPickupSuggestions(true)}
                    onBlur={() =>
                      setTimeout(() => setShowPickupSuggestions(false), 200)
                    }
                    className='h-12 pl-10 bg-input'
                  />
                  <Button
                    variant='ghost'
                    size='icon'
                    className='absolute right-1 top-1/2 -translate-y-1/2'
                  >
                    <Navigation className='h-4 w-4' />
                  </Button>
                </div>
                <Button
                  onClick={() => {
                    handleGetLocation()
                    setScheduleType('now')
                  }}
                >
                  <MapPin className='mr-2 h-4 w-100' />
                  Use Current Location
                </Button>

                {showPickupSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='absolute left-0 right-0 top-full z-10 mt-2 rounded-lg border border-border bg-popover p-2 shadow-xl'
                  >
                    <div className='mb-2 px-2 text-xs font-medium text-muted-foreground'>
                      Saved Places
                    </div>
                    {pickupsuggestion.map((place, index) => (
                      <button
                        key={place.placeId || index}
                        className='flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-secondary'
                        onMouseDown={() => {
                          setPickup({
                            label: place.label,
                            place_id: place.placeId
                          })
                          setShowPickupSuggestions(false)
                        }}
                      >
                        <MapPin className='h-4 w-4 text-green-300' />
                        <div>
                          <div className='text-sm font-medium'>
                            {place.label}
                          </div>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              <div className='relative'>
                <Label htmlFor='dropoff' className='sr-only'>
                  Drop-off Location
                </Label>
                <div className='relative'>
                  <div className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2'>
                    <div className='flex h-3 w-3 items-center justify-center rounded-full bg-primary'>
                      <div className='h-1.5 w-1.5 rounded-full bg-primary-foreground' />
                    </div>
                  </div>
                  <Input
                    id='dropoff'
                    placeholder='Enter drop-off location'
                    value={dropoff?.label || ''}
                    onChange={e =>
                      setDropoff({
                        label: e.target.value,
                        place_id: ''
                      })
                    }
                    onFocus={() => setShowDropoffSuggestions(true)}
                    onBlur={() =>
                      setTimeout(() => setShowDropoffSuggestions(false), 200)
                    }
                    className='h-12 pl-10 bg-input'
                  />
                  <Button
                    variant='ghost'
                    size='icon'
                    className='absolute right-1 top-1/2 -translate-y-1/2'
                  >
                    <Search className='h-4 w-4' />
                  </Button>
                </div>
                {showDropoffSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='absolute left-0 right-0 top-full z-10 mt-2 rounded-lg border border-border bg-popover p-2 shadow-xl'
                  >
                    <div className='mb-2 px-2 text-xs font-medium text-muted-foreground'>
                      Saved Places
                    </div>
                    {dropsuggestion.map((place, index) => (
                      <button
                        key={place.placeId || index}
                        className='flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-secondary'
                        onMouseDown={() => {
                          setDropoff({
                            label: place.label,
                            place_id: place.placeId
                          })
                          setShowDropoffSuggestions(false)
                        }}
                      >
                        <MapPin className='h-4 w-4 text-muted-foreground' />
                        <div>
                          <div className='text-sm font-medium'>
                            {place.label}
                          </div>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            <Tabs
              value={service}
              onValueChange={v => setService(v as ServiceType)}
            >
              <TabsList className='grid w-full grid-cols-4 bg-secondary'>
                <TabsTrigger
                  value='bike'
                  className='gap-1.5 data-[state=active]:border-primary'
                >
                  <Bike className='h-4 w-4' />
                  <span className='hidden sm:inline'>Bike</span>
                </TabsTrigger>
                <TabsTrigger
                  value='car'
                  className='gap-1.5 data-[state=active]:border-primary'
                >
                  <Car className='h-4 w-4' />
                  <span className='hidden sm:inline'>Car</span>
                </TabsTrigger>
                <TabsTrigger
                  value='loading'
                  className='gap-1.5 data-[state=active]:border-primary'
                >
                  <Truck className='h-4 w-4' />
                  <span className='hidden sm:inline'>Loading</span>
                </TabsTrigger>
                <TabsTrigger value='parcel'>
                  <Package className='h-4 w-4' />
                  <span className='hidden sm:inline'>Parcel</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value={service} className='mt-4'>
                <div className='space-y-3'>
                  <div className='text-sm font-medium'>Select Vehicle Type</div>
                  <RadioGroup
                    value={selectedVehicle}
                    onValueChange={setSelectedVehicle}
                    className='space-y-2'
                  >
                    {thecurrentVehicles.map(vehicle => (
                      <Label
                        key={vehicle.id}
                        htmlFor={vehicle.id}
                        className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors ${
                          selectedVehicle === vehicle.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border bg-background hover:border-muted-foreground/50'
                        }`}
                      >
                        <div className='flex items-center gap-3'>
                          <RadioGroupItem
                            value={vehicle.id}
                            id={vehicle.id}
                            className='sr-only'
                          />
                          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-secondary'>
                            {vehicle.icon}
                          </div>
                          <div>
                            <div className='font-medium'>{vehicle.name}</div>
                            <div className='text-xs text-muted-foreground'>
                              {vehicle.description} · {vehicle.capacity}
                            </div>
                          </div>
                        </div>
                        <div className='text-right'>
                          <div className='font-semibold text-primary'>
                            {vehicle.price}
                          </div>
                          <div className='text-xs text-muted-foreground'>
                            {vehicle.eta}
                          </div>
                        </div>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
              </TabsContent>
            </Tabs>

            <Card className='border-border bg-secondary/30'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm font-medium'>
                  Schedule Ride
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex gap-2'>
                  <Button
                    variant={scheduleType === 'now' ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => setScheduleType('now')}
                    className='flex-1'
                  >
                    <Clock className='mr-2 h-4 w-4' />
                    Ride Now
                  </Button>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={
                          scheduleType === 'later' ? 'default' : 'outline'
                        }
                        size='sm'
                        onClick={() => setScheduleType('later')}
                        className='flex-1'
                      >
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {scheduledDate
                          ? format(scheduledDate, 'MMM d, h:mm a')
                          : 'Schedule'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={scheduledDate}
                        onSelect={setScheduledDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>
            </Card>

            <Card className='border-border bg-secondary/30'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm font-medium'>
                  Fare Estimate
                </CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const selected = thecurrentVehicles.find(
                    v => v.id === selectedVehicle
                  )

                  if (!selected) return <div>Loading fare...</div>

                  return (
                    <div className='space-y-2'>
                      <div className='flex justify-between text-sm'>
                        <span className='text-muted-foreground'>Base Fare</span>
                        <span>₹{selected.baseFare}</span>
                      </div>

                      <div className='flex justify-between text-sm'>
                        <span className='text-muted-foreground'>
                          Distance ({fareData?.distance_km ?? 0} km)
                        </span>
                        <span>₹{selected.distanceFare}</span>
                      </div>

                      <div className='flex justify-between text-sm'>
                        <span className='text-muted-foreground'>
                          Platform Fee
                        </span>
                        <span>₹{selected.platformFee}</span>
                      </div>

                      <div className='my-2 border-t border-border' />

                      <div className='flex justify-between font-semibold'>
                        <span>Total Estimate</span>
                        <span className='text-primary'>₹{selected.total}</span>
                      </div>
                    </div>
                  )
                })()}
              </CardContent>
            </Card>
            <Button
              size='lg'
              className='w-full h-12 text-base'
              disabled={!pickup || !dropoff}
            >
              Confirm Booking
            </Button>
          </div>
        </aside>

        <main className='flex-1 relative'>
          <div className='absolute inset-0 map-grid bg-card'>
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='relative w-full max-w-2xl px-8'>
                <div className='absolute left-1/4 top-1/4'>
                  <div className='relative'>
                    <div className='absolute inset-0 rounded-full bg-success pulse-ring' />
                    <div className='relative flex h-6 w-6 items-center justify-center rounded-full bg-success shadow-lg'>
                      <div className='h-3 w-3 rounded-full bg-background' />
                    </div>
                  </div>
                  <div className='mt-2 whitespace-nowrap rounded-md bg-card px-3 py-1.5 text-xs font-medium shadow-lg border border-border'>
                    {pickup?.label || 'Pickup location'}
                  </div>
                </div>

                <svg
                  className='absolute left-1/4 top-1/4 h-48 w-[60%]'
                  viewBox='0 0 300 150'
                >
                  <motion.path
                    d='M 20 20 Q 150 100 280 20'
                    fill='none'
                    stroke='oklch(0.75 0.14 55)'
                    strokeWidth='3'
                    strokeDasharray='8 6'
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: 'loop',
                      repeatDelay: 1
                    }}
                  />
                </svg>

                <div className='absolute right-1/4 top-1/4'>
                  <div className='flex h-6 w-6 items-center justify-center rounded-full bg-primary shadow-lg'>
                    <div className='h-3 w-3 rounded-full bg-primary-foreground' />
                  </div>
                  <div className='mt-2 whitespace-nowrap rounded-md bg-card px-3 py-1.5 text-xs font-medium shadow-lg border border-border'>
                    {pickup?.label || 'Pickup location'}
                  </div>
                </div>

                <motion.div
                  className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                  animate={{ x: [-50, 50, -50] }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut'
                  }}
                >
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border shadow-xl'>
                    <Car className='h-5 w-5 text-primary' />
                  </div>
                </motion.div>

                <motion.div
                  className='absolute top-2/3 left-1/3'
                  animate={{ y: [-10, 10, -10] }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                    delay: 0.5
                  }}
                >
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-card border border-border shadow-lg opacity-60'>
                    <Bike className='h-4 w-4 text-muted-foreground' />
                  </div>
                </motion.div>

                <motion.div
                  className='absolute top-1/2 right-1/3'
                  animate={{ y: [10, -10, 10] }}
                  transition={{
                    duration: 3.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                    delay: 1
                  }}
                >
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-card border border-border shadow-lg opacity-60'>
                    <Car className='h-4 w-4 text-muted-foreground' />
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='absolute bottom-8 left-8 right-8 lg:left-auto lg:right-8 lg:w-80'
              >
                <Card className='border-border bg-card/95 backdrop-blur-sm'>
                  <CardContent className='p-4'>
                    <div className='flex items-center gap-3'>
                      <div className='flex h-12 w-12 items-center justify-center rounded-full bg-secondary'>
                        <Clock className='h-6 w-6 text-primary' />
                      </div>
                      <div>
                        <div className='text-sm text-muted-foreground'>
                          Estimated arrival
                        </div>
                        <div className='text-lg font-semibold'>
                          {selectedVehicleData.eta}
                        </div>
                      </div>
                    </div>
                    <div className='mt-3 flex items-center gap-2 rounded-lg bg-secondary/50 p-2'>
                      <Star className='h-4 w-4 fill-warning text-warning' />
                      <span className='text-sm'>4.8 average driver rating</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          <div className='absolute left-4 right-4 top-4 lg:hidden'>
            <Card className='border-border bg-card/95 backdrop-blur-sm'>
              <CardContent className='p-4'>
                <Button
                  variant='outline'
                  className='w-full justify-start bg-transparent'
                  asChild
                >
                  <Link href='#booking-panel'>
                    <MapPin className='mr-2 h-4 w-4' />
                    Configure your ride
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
export default function BookingPage () {
  return (
    <Suspense fallback={null}>
      <BookingPageContent />
    </Suspense>
  )
}
