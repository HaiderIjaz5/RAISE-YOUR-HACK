"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Phone, Clock, Globe, Star } from "lucide-react"

interface LocationMapProps {
  location: {
    name: string
    address: string
    coordinates: { lat: number; lng: number }
    phone?: string
    website?: string
    hours?: string
    rating?: number
    reviews?: number
    type: string
  }
}

export function LocationMap({ location }: LocationMapProps) {
  const [directions, setDirections] = useState(false)

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`
    window.open(url, "_blank")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            Location & Contact
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleGetDirections}
            className="border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 bg-transparent"
          >
            <Navigation className="mr-2 h-4 w-4" />
            Directions
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Map Container */}
        <div className="relative">
          <div
            className="h-48 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 rounded-lg overflow-hidden"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fillOpacity='0.03'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          >
            {/* Location Marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                <MapPin className="h-4 w-4" />
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="absolute top-2 right-2 flex flex-col gap-1">
              <Button variant="secondary" size="sm" className="w-8 h-8 p-0">
                +
              </Button>
              <Button variant="secondary" size="sm" className="w-8 h-8 p-0">
                -
              </Button>
            </div>

            {/* Map Type Toggle */}
            <div className="absolute bottom-2 left-2">
              <Badge variant="secondary" className="text-xs">
                Satellite
              </Badge>
            </div>
          </div>
        </div>

        {/* Location Details */}
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="font-medium">{location.name}</div>
              <div className="text-sm text-muted-foreground">{location.address}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {location.coordinates.lat.toFixed(6)}, {location.coordinates.lng.toFixed(6)}
              </div>
            </div>
          </div>

          {location.phone && (
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">{location.phone}</div>
                <div className="text-xs text-muted-foreground">Phone</div>
              </div>
            </div>
          )}

          {location.hours && (
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">{location.hours}</div>
                <div className="text-xs text-muted-foreground">Hours</div>
              </div>
            </div>
          )}

          {location.website && (
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <div>
                <a
                  href={location.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-emerald-600 hover:underline"
                >
                  Visit Website
                </a>
                <div className="text-xs text-muted-foreground">Website</div>
              </div>
            </div>
          )}

          {location.rating && (
            <div className="flex items-center space-x-3">
              <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
              <div>
                <div className="text-sm font-medium">
                  {location.rating} ({location.reviews} reviews)
                </div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-transparent border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300"
            onClick={handleGetDirections}
          >
            <Navigation className="mr-2 h-4 w-4" />
            Get Directions
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-transparent border-sky-200 hover:bg-sky-50 hover:border-sky-300"
          >
            <Phone className="mr-2 h-4 w-4" />
            Call
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
