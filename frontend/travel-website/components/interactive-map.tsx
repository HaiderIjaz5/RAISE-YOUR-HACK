"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Navigation, Layers, ZoomIn, ZoomOut } from "lucide-react"

interface MapLocation {
  id: number
  name: string
  type: "hotel" | "restaurant" | "activity" | "destination"
  lat: number
  lng: number
  rating: number
  price?: number
  image: string
  description: string
}

interface InteractiveMapProps {
  locations: MapLocation[]
  selectedLocation?: number
  onLocationSelect?: (location: MapLocation) => void
  center?: { lat: number; lng: number }
  zoom?: number
}

const pakistanLocations: MapLocation[] = [
  {
    id: 1,
    name: "Murree",
    type: "destination",
    lat: 33.9062,
    lng: 73.3903,
    rating: 4.8,
    image: "/images/murree.jpg",
    description: "Beautiful hill station with stunning mountain views",
  },
  {
    id: 2,
    name: "Skardu",
    type: "destination",
    lat: 35.2971,
    lng: 75.6333,
    rating: 4.9,
    image: "/images/skardu.jpg",
    description: "Gateway to K2 and breathtaking landscapes",
  },
  {
    id: 3,
    name: "Hunza Valley",
    type: "destination",
    lat: 36.3167,
    lng: 74.65,
    rating: 4.9,
    image: "/images/hunza.jpg",
    description: "Paradise on earth with ancient culture",
  },
  {
    id: 4,
    name: "Mountain View Resort",
    type: "hotel",
    lat: 33.91,
    lng: 73.395,
    rating: 4.8,
    price: 85,
    image: "/images/hotel-1.jpg",
    description: "Luxury resort with panoramic mountain views",
  },
  {
    id: 5,
    name: "Traditional Balti House",
    type: "restaurant",
    lat: 35.298,
    lng: 75.634,
    rating: 4.6,
    price: 25,
    image: "/images/restaurant-1.jpg",
    description: "Authentic Pakistani cuisine with mountain views",
  },
  {
    id: 6,
    name: "K2 Base Camp Trek",
    type: "activity",
    lat: 35.8825,
    lng: 76.5133,
    rating: 4.9,
    price: 450,
    image: "/images/activity-1.jpg",
    description: "14-day adventure to K2 base camp",
  },
]

export function InteractiveMap({
  locations = pakistanLocations,
  selectedLocation,
  onLocationSelect,
  center = { lat: 34.0479, lng: 71.5197 }, // Pakistan center
  zoom = 6,
}: InteractiveMapProps) {
  const [mapCenter, setMapCenter] = useState(center)
  const [mapZoom, setMapZoom] = useState(zoom)
  const [activeLocation, setActiveLocation] = useState<MapLocation | null>(null)
  const [mapStyle, setMapStyle] = useState<"satellite" | "terrain" | "roadmap">("terrain")

  const handleLocationClick = (location: MapLocation) => {
    setActiveLocation(location)
    setMapCenter({ lat: location.lat, lng: location.lng })
    setMapZoom(12)
    onLocationSelect?.(location)
  }

  const getMarkerColor = (type: string) => {
    switch (type) {
      case "hotel":
        return "bg-sky-500"
      case "restaurant":
        return "bg-emerald-500"
      case "activity":
        return "bg-amber-500"
      case "destination":
        return "bg-emerald-600"
      default:
        return "bg-gray-500"
    }
  }

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case "hotel":
        return "🏨"
      case "restaurant":
        return "🍽️"
      case "activity":
        return "🏔️"
      case "destination":
        return "📍"
      default:
        return "📍"
    }
  }

  return (
    <div className="space-y-4">
      {/* Map Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={mapStyle === "roadmap" ? "default" : "outline"}
            size="sm"
            onClick={() => setMapStyle("roadmap")}
            className={
              mapStyle === "roadmap"
                ? "bg-emerald-500 hover:bg-emerald-600 text-white border-0"
                : "border-emerald-200 hover:bg-emerald-50"
            }
          >
            <Navigation className="h-4 w-4 mr-1" />
            Road
          </Button>
          <Button
            variant={mapStyle === "terrain" ? "default" : "outline"}
            size="sm"
            onClick={() => setMapStyle("terrain")}
          >
            <Layers className="h-4 w-4 mr-1" />
            Terrain
          </Button>
          <Button
            variant={mapStyle === "satellite" ? "default" : "outline"}
            size="sm"
            onClick={() => setMapStyle("satellite")}
          >
            Satellite
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setMapZoom(Math.min(mapZoom + 1, 18))}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setMapZoom(Math.max(mapZoom - 1, 3))}>
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative">
        <Card className="overflow-hidden">
          <div
            className="relative h-96 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          >
            {/* Map Markers */}
            {locations.map((location) => {
              const isActive = activeLocation?.id === location.id
              const isSelected = selectedLocation === location.id

              return (
                <div
                  key={location.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 ${
                    isActive || isSelected ? "scale-125 z-10" : "z-5"
                  }`}
                  style={{
                    left: `${((location.lng - 60) / 20) * 100 + 50}%`,
                    top: `${(1 - (location.lat - 24) / 12) * 100}%`,
                  }}
                  onClick={() => handleLocationClick(location)}
                >
                  <div
                    className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg
                    ${getMarkerColor(location.type)}
                    ${isActive || isSelected ? "ring-4 ring-white ring-opacity-50" : ""}
                  `}
                  >
                    <span className="text-sm">{getMarkerIcon(location.type)}</span>
                  </div>

                  {(isActive || isSelected) && (
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-64 animate-fade-in">
                      <Card className="shadow-xl">
                        <CardContent className="p-3">
                          <div className="flex items-start space-x-3">
                            <img
                              src={location.image || "/placeholder.svg"}
                              alt={location.name}
                              className="w-16 h-12 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm truncate">{location.name}</h4>
                              <div className="flex items-center gap-1 mb-1">
                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                <span className="text-xs">{location.rating}</span>
                                {location.price && (
                                  <span className="text-xs text-muted-foreground ml-2">${location.price}</span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-2">{location.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              )
            })}

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4">
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardContent className="p-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
                      <span className="text-xs">Destinations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-sky-500"></div>
                      <span className="text-xs">Hotels</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <span className="text-xs">Restaurants</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <span className="text-xs">Activities</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Current Location Info */}
            {activeLocation && (
              <div className="absolute top-4 right-4">
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-emerald-500" />
                      <div>
                        <div className="font-semibold text-sm">{activeLocation.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {activeLocation.lat.toFixed(4)}, {activeLocation.lng.toFixed(4)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Location List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {locations.slice(0, 4).map((location) => (
          <Card
            key={location.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              activeLocation?.id === location.id ? "ring-2 ring-emerald-500 shadow-emerald-500/20" : ""
            }`}
            onClick={() => handleLocationClick(location)}
          >
            <CardContent className="p-3">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${getMarkerColor(location.type)}`}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{location.name}</h4>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs">{location.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <Badge variant="secondary" className="text-xs capitalize">
                      {location.type}
                    </Badge>
                    {location.price && <span className="text-xs font-medium text-emerald-600">${location.price}</span>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
