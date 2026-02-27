'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Phone, Star } from 'lucide-react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '100vh'
}

const userLocation = { lat: 26.2389, lng: 73.0243 } // Jodhpur example

export default function RideTrackingPage () {
  const [rideStatus, setRideStatus] = useState<'searching' | 'accepted'>(
    'searching'
  )

  const [driverLocation, setDriverLocation] = useState({
    lat: 26.23,
    lng: 73.02
  })

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!
  })

  // Simulate driver movement after accept
  useEffect(() => {
    if (rideStatus === 'accepted') {
      const interval = setInterval(() => {
        setDriverLocation(prev => ({
          lat: prev.lat + 0.0005,
          lng: prev.lng + 0.0005
        }))
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [rideStatus])

  if (!isLoaded) return <div>Loading Map...</div>

  return (
    <div className='relative h-screen w-full'>
      {/* REAL GOOGLE MAP */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation}
        zoom={14}
        options={{
          disableDefaultUI: true,
          zoomControl: true
        }}
      >
        {/* User Marker */}
        {/* <Marker position={userLocation} /> */}
        <Marker
          position={userLocation}
          icon={{
            url: '/capsei.png', // public folder me rakho
            scaledSize: new window.google.maps.Size(35, 35),
            anchor: new window.google.maps.Point(17, 17)
          }}
        />

        {/* Searching Mode - Show Multiple Drivers */}
        {rideStatus === 'searching' && (
          <>
            <Marker position={{ lat: 26.24, lng: 73.03 }} />
            <Marker position={{ lat: 26.235, lng: 73.018 }} />
            <Marker position={{ lat: 26.242, lng: 73.025 }} />
          </>
        )}

        {/* Accepted Driver */}
        {rideStatus === 'accepted' && <Marker position={driverLocation} />}
      </GoogleMap>

      {/* SEARCHING UI */}
      {rideStatus === 'searching' && (
        <div className='absolute bottom-0 left-0 right-0 p-6'>
          <Card className='border-primary/40 shadow-xl'>
            <CardContent className='p-6 text-center space-y-4'>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className='mx-auto text-2xl'
              >
                🔍
              </motion.div>
              <div className='text-lg font-semibold'>Finding Captain...</div>
              <Button onClick={() => setRideStatus('accepted')}>
                Simulate Accept
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* DRIVER DETAIL CARD */}
      {rideStatus === 'accepted' && (
        <motion.div
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          className='absolute bottom-0 left-0 right-0 p-6'
        >
          <Card className='border-primary shadow-2xl'>
            <CardContent className='p-6 space-y-4'>
              <div className='flex justify-between items-center'>
                <div>
                  <h2 className='font-semibold text-lg'>Ravi Kumar</h2>
                  <p className='text-sm text-muted-foreground'>
                    Honda City • RJ14AB1234
                  </p>
                </div>
                <Badge className='bg-green-500/10 text-green-600'>
                  Arriving
                </Badge>
              </div>

              <div className='flex items-center gap-4 text-sm'>
                <div className='flex items-center gap-1'>
                  <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                  4.8
                </div>
                <div>2 mins away</div>
                <div>1.2 km</div>
              </div>

              <div className='flex gap-3'>
                <Button className='flex-1'>
                  <Phone className='mr-2 h-4 w-4' />
                  Call
                </Button>
                <Button variant='outline' className='flex-1'>
                  Cancel Ride
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
