"use client"

import { useLoadScript } from "@react-google-maps/api"

const libraries: ("places")[] = ["places"]

export default function GoogleMapsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
    libraries,
    id: "google-map-script",
  })

  if (loadError) return <p>Error loading Google Maps</p>
  if (!isLoaded) return <p>Loading Maps...</p>

  return <>{children}</>
}
