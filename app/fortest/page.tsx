'use client'

import { useEffect, useRef, useState } from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { io } from 'socket.io-client'

export default function RideTracking({ rideId }: { rideId: string }) {
  const [driverLocation, setDriverLocation] = useState({
    lat: 26.2389,
    lng: 73.0243
  })

  const prevLocation = useRef(driverLocation)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!
  })

  const animateMarker = (newLoc: { lat: number; lng: number }) => {
    const start = prevLocation.current
    const end = newLoc

    const duration = 1000 // 1 sec
    const frames = 60
    let frame = 0

    const animate = () => {
      frame++
      const progress = frame / frames

      const lat = start.lat + (end.lat - start.lat) * progress
      const lng = start.lng + (end.lng - start.lng) * progress

      setDriverLocation({ lat, lng })

      if (frame < frames) {
        requestAnimationFrame(animate)
      } else {
        prevLocation.current = end
      }
    }

    animate()
  }

  // 🔌 Socket connect
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL)

    socket.emit('join-ride', rideId)

    socket.on('driver-location-update', (data) => {
      console.log('📍 New Location:', data)

      animateMarker({
        lat: data.lat,
        lng: data.lng
      })
    })

    return () => socket.disconnect()
  }, [rideId])

  if (!isLoaded) return <p>Loading map...</p>

  return (
    <GoogleMap
      center={driverLocation}
      zoom={15}
      mapContainerStyle={{ width: '100%', height: '500px' }}
    >
      <Marker position={driverLocation} />
    </GoogleMap>
  )
}