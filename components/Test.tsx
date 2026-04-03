'use client'

import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '100%' // 🔥 yaha typo tha (100v lefrontendkobi kr deh)
}

export default function LiveMapPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY
  })

  const [drivers, setDrivers] = useState({})
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const s = io(process.env.NEXT_PUBLIC_API_BASE_URL)
    setSocket(s)

    // 🔥 1. PAGE LOAD PE OLD DATA LE
    s.emit('getDrivers')

    // 🔥 2. OLD DATA RECEIVE
    s.on('allDrivers', (data) => {
      console.log("ALL DRIVERS:", data)
      setDrivers(data)
    })

    // 🔥 3. LIVE UPDATE
    s.on('driverLocationUpdate', (data) => {
      console.log("LIVE UPDATE:", data)

      setDrivers(prev => ({
        ...prev,
        [data.driverId]: {
          lat: data.lat,
          lng: data.lng
        }
      }))
    })

    return () => {
      s.disconnect()
    }
  }, [])

  console.log("DRIVERS STATE:", drivers)

  if (!isLoaded) return <div>Loading Map...</div>

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: 26.2389, lng: 73.0243 }}
      zoom={12}
    >
      {/* 🚗 Drivers */}
      {Object.entries(drivers).map(([id, d]) => (
        <Marker
          key={id}
          position={{ lat: d.lat, lng: d.lng }}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
          }}
        />
      ))}
    </GoogleMap>
  )
}