"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, MapPin, Star, Heart, Grid, Utensils, Bed, Camera, Plane } from "lucide-react"

const worldDestinations = [
  // France
  {
    id: 1,
    type: "hotel",
    name: "Hotel Plaza Athénée",
    location: "Paris",
    country: "France",
    countryFlag: "🇫🇷",
    image: "/images/paris-hotel.jpg",
    rating: 4.9,
    reviews: 2847,
    price: 850,
    amenities: ["Spa", "Michelin Restaurant", "Eiffel Tower View"],
    description: "Luxury palace hotel with iconic Eiffel Tower views",
  },
  {
    id: 2,
    type: "restaurant",
    name: "Le Jules Verne",
    location: "Paris",
    country: "France",
    countryFlag: "🇫🇷",
    image: "/images/paris-restaurant.jpg",
    rating: 4.8,
    reviews: 1256,
    price: 180,
    amenities: ["Michelin Star", "Eiffel Tower Location", "Fine Dining"],
    description: "Michelin-starred restaurant in the Eiffel Tower",
  },
  {
    id: 3,
    type: "activity",
    name: "Seine River Cruise",
    location: "Paris",
    country: "France",
    countryFlag: "🇫🇷",
    image: "/images/paris-activity.jpg",
    rating: 4.6,
    reviews: 5432,
    price: 25,
    amenities: ["Audio Guide", "Evening Option", "Monuments View"],
    description: "Scenic cruise along the Seine with monument views",
  },

  // Japan
  {
    id: 4,
    type: "hotel",
    name: "Park Hyatt Tokyo",
    location: "Tokyo",
    country: "Japan",
    countryFlag: "🇯🇵",
    image: "/images/tokyo-hotel.jpg",
    rating: 4.8,
    reviews: 3421,
    price: 650,
    amenities: ["City View", "Spa", "Club Lounge"],
    description: "Luxury hotel in Shinjuku with stunning city views",
  },
  {
    id: 5,
    type: "restaurant",
    name: "Sukiyabashi Jiro",
    location: "Tokyo",
    country: "Japan",
    countryFlag: "🇯🇵",
    image: "/images/tokyo-restaurant.jpg",
    rating: 4.9,
    reviews: 892,
    price: 300,
    amenities: ["3 Michelin Stars", "Omakase", "Master Chef"],
    description: "World-famous sushi restaurant by Jiro Ono",
  },
  {
    id: 6,
    type: "activity",
    name: "Mount Fuji Day Trip",
    location: "Tokyo",
    country: "Japan",
    countryFlag: "🇯🇵",
    image: "/images/fuji-activity.jpg",
    rating: 4.7,
    reviews: 2156,
    price: 120,
    amenities: ["Bus Transport", "English Guide", "Lake Kawaguchi"],
    description: "Full day tour to Mount Fuji and surrounding lakes",
  },

  // Pakistan
  {
    id: 7,
    type: "hotel",
    name: "Hunza Serena Inn",
    location: "Hunza",
    country: "Pakistan",
    countryFlag: "🇵🇰",
    image: "/images/hunza-hotel.jpg",
    rating: 4.7,
    reviews: 1234,
    price: 120,
    amenities: ["Mountain View", "Cultural Tours", "Garden"],
    description: "Boutique hotel in the heart of Hunza Valley",
  },
  {
    id: 8,
    type: "restaurant",
    name: "Traditional Balti House",
    location: "Skardu",
    country: "Pakistan",
    countryFlag: "🇵🇰",
    image: "/images/skardu-restaurant.jpg",
    rating: 4.6,
    reviews: 567,
    price: 25,
    amenities: ["Local Cuisine", "Mountain Views", "Traditional"],
    description: "Authentic Pakistani cuisine with mountain views",
  },
  {
    id: 9,
    type: "activity",
    name: "K2 Base Camp Trek",
    location: "Skardu",
    country: "Pakistan",
    countryFlag: "🇵🇰",
    image: "/images/k2-trek.jpg",
    rating: 4.9,
    reviews: 234,
    price: 450,
    amenities: ["Guide Included", "Equipment Provided", "14 Days"],
    description: "Epic 14-day adventure to K2 base camp",
  },

  // China
  {
    id: 10,
    type: "hotel",
    name: "The Peninsula Beijing",
    location: "Beijing",
    country: "China",
    countryFlag: "🇨🇳",
    image: "/images/beijing-hotel.jpg",
    rating: 4.8,
    reviews: 3456,
    price: 380,
    amenities: ["Luxury Spa", "Rooftop Bar", "City Center"],
    description: "Luxury hotel in the heart of Beijing",
  },
  {
    id: 11,
    type: "restaurant",
    name: "Duck de Chine",
    location: "Beijing",
    country: "China",
    countryFlag: "🇨🇳",
    image: "/images/beijing-restaurant.jpg",
    rating: 4.7,
    reviews: 2345,
    price: 85,
    amenities: ["Peking Duck", "Traditional", "Fine Dining"],
    description: "Famous Peking duck restaurant with modern twist",
  },
  {
    id: 12,
    type: "activity",
    name: "Great Wall Tour",
    location: "Beijing",
    country: "China",
    countryFlag: "🇨🇳",
    image: "/images/great-wall.jpg",
    rating: 4.8,
    reviews: 5678,
    price: 60,
    amenities: ["Cable Car", "English Guide", "Lunch Included"],
    description: "Full day tour to the magnificent Great Wall",
  },

  // South Korea
  {
    id: 13,
    type: "hotel",
    name: "Lotte Hotel Seoul",
    location: "Seoul",
    country: "South Korea",
    countryFlag: "🇰🇷",
    image: "/images/seoul-hotel.jpg",
    rating: 4.6,
    reviews: 2876,
    price: 280,
    amenities: ["City View", "Shopping Mall", "Executive Lounge"],
    description: "Premium hotel in Myeongdong shopping district",
  },
  {
    id: 14,
    type: "restaurant",
    name: "Jungsik",
    location: "Seoul",
    country: "South Korea",
    countryFlag: "🇰🇷",
    image: "/images/seoul-restaurant.jpg",
    rating: 4.9,
    reviews: 1234,
    price: 150,
    amenities: ["2 Michelin Stars", "Modern Korean", "Tasting Menu"],
    description: "Innovative Korean fine dining experience",
  },
  {
    id: 15,
    type: "activity",
    name: "Gyeongbokgung Palace Tour",
    location: "Seoul",
    country: "South Korea",
    countryFlag: "🇰🇷",
    image: "/images/seoul-palace.jpg",
    rating: 4.5,
    reviews: 3456,
    price: 35,
    amenities: ["Changing of Guard", "Traditional Costume", "Audio Guide"],
    description: "Explore the grandest of Seoul's Five Grand Palaces",
  },

  // Italy
  {
    id: 16,
    type: "hotel",
    name: "Hotel Danieli",
    location: "Venice",
    country: "Italy",
    countryFlag: "🇮🇹",
    image: "/images/venice-hotel.jpg",
    rating: 4.7,
    reviews: 2134,
    price: 750,
    amenities: ["Historic Palace", "Lagoon View", "Rooftop Terrace"],
    description: "Legendary luxury hotel in a 14th-century palace",
  },
  {
    id: 17,
    type: "restaurant",
    name: "Osteria alle Testiere",
    location: "Venice",
    country: "Italy",
    countryFlag: "🇮🇹",
    image: "/images/venice-restaurant.jpg",
    rating: 4.8,
    reviews: 1876,
    price: 85,
    amenities: ["Fresh Seafood", "Wine Selection", "Intimate Setting"],
    description: "Renowned seafood restaurant in Castello district",
  },
  {
    id: 18,
    type: "activity",
    name: "Gondola Ride",
    location: "Venice",
    country: "Italy",
    countryFlag: "🇮🇹",
    image: "/images/venice-gondola.jpg",
    rating: 4.5,
    reviews: 8765,
    price: 80,
    amenities: ["Traditional Gondola", "Serenade Option", "Canal Tour"],
    description: "Classic Venetian gondola ride through historic canals",
  },

  // Thailand
  {
    id: 19,
    type: "hotel",
    name: "The Oriental Bangkok",
    location: "Bangkok",
    country: "Thailand",
    countryFlag: "🇹🇭",
    image: "/images/bangkok-hotel.jpg",
    rating: 4.6,
    reviews: 4321,
    price: 280,
    amenities: ["River View", "Spa", "Thai Cooking School"],
    description: "Historic luxury hotel on the Chao Phraya River",
  },
  {
    id: 20,
    type: "restaurant",
    name: "Gaggan Anand",
    location: "Bangkok",
    country: "Thailand",
    countryFlag: "🇹🇭",
    image: "/images/bangkok-restaurant.jpg",
    rating: 4.9,
    reviews: 1543,
    price: 150,
    amenities: ["Progressive Indian", "Tasting Menu", "Chef's Table"],
    description: "Award-winning progressive Indian cuisine",
  },
  {
    id: 21,
    type: "activity",
    name: "Floating Market Tour",
    location: "Bangkok",
    country: "Thailand",
    countryFlag: "🇹🇭",
    image: "/images/bangkok-market.jpg",
    rating: 4.4,
    reviews: 3456,
    price: 45,
    amenities: ["Boat Tour", "Local Food", "Cultural Experience"],
    description: "Traditional floating market experience with local vendors",
  },

  // United States
  {
    id: 22,
    type: "hotel",
    name: "The Plaza Hotel",
    location: "New York",
    country: "United States",
    countryFlag: "🇺🇸",
    image: "/images/nyc-hotel.jpg",
    rating: 4.5,
    reviews: 5678,
    price: 595,
    amenities: ["Central Park View", "Luxury Shopping", "Historic Landmark"],
    description: "Iconic luxury hotel overlooking Central Park",
  },
  {
    id: 23,
    type: "restaurant",
    name: "Eleven Madison Park",
    location: "New York",
    country: "United States",
    countryFlag: "🇺🇸",
    image: "/images/nyc-restaurant.jpg",
    rating: 4.8,
    reviews: 2341,
    price: 335,
    amenities: ["3 Michelin Stars", "Plant-Based", "Tasting Menu"],
    description: "World-renowned plant-based fine dining experience",
  },
  {
    id: 24,
    type: "activity",
    name: "Statue of Liberty Tour",
    location: "New York",
    country: "United States",
    countryFlag: "🇺🇸",
    image: "/images/nyc-liberty.jpg",
    rating: 4.6,
    reviews: 12345,
    price: 35,
    amenities: ["Ferry Ride", "Audio Guide", "Ellis Island"],
    description: "Ferry tour to Statue of Liberty and Ellis Island",
  },
]

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [viewMode, setViewMode] = useState("grid")
  const [favorites, setFavorites] = useState<number[]>([])

  const countries = Array.from(new Set(worldDestinations.map((dest) => dest.country)))

  const filteredListings = worldDestinations.filter((listing) => {
    const matchesSearch =
      listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.country.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || listing.type === selectedType
    const matchesCountry = selectedCountry === "all" || listing.country === selectedCountry
    const matchesPrice = listing.price >= priceRange[0] && listing.price <= priceRange[1]

    return matchesSearch && matchesType && matchesCountry && matchesPrice
  })

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "hotel":
        return <Bed className="h-4 w-4" />
      case "restaurant":
        return <Utensils className="h-4 w-4" />
      case "activity":
        return <Camera className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "hotel":
        return "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200 border border-sky-200"
      case "restaurant":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 border border-emerald-200"
      case "activity":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 border border-amber-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const handleBookNow = (listing: any) => {
    const isAuthenticated = localStorage.getItem("userAuth")
    if (!isAuthenticated) {
      alert("Please sign in to make a booking")
      window.location.href = "/login"
      return
    }
    window.location.href = "/booking"
  }

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore World Destinations</h1>
          <p className="text-xl text-muted-foreground">
            Discover amazing hotels, restaurants, and activities from around the globe
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 space-y-6 animate-slide-up">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="mr-2 h-5 w-5" />
                Filters
              </h3>

              {/* Search */}
              <div className="space-y-2 mb-6">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search destinations, hotels..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Country Filter */}
              <div className="space-y-2 mb-6">
                <Label>Country</Label>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {worldDestinations.find((d) => d.country === country)?.countryFlag} {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Type Filter */}
              <div className="space-y-2 mb-6">
                <Label>Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="hotel">Hotels</SelectItem>
                    <SelectItem value="restaurant">Restaurants</SelectItem>
                    <SelectItem value="activity">Activities</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-4">
                <Label>
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </Label>
                <Slider value={priceRange} onValueChange={setPriceRange} max={1000} step={10} className="w-full" />
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* View Controls */}
            <div className="flex justify-between items-center mb-6 animate-fade-in">
              <div className="text-sm text-muted-foreground">{filteredListings.length} results found</div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Listings Grid */}
            <div className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
              {filteredListings.map((listing, index) => (
                <Card
                  key={listing.id}
                  className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    <img
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      onClick={() => toggleFavorite(listing.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(listing.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                        }`}
                      />
                    </Button>
                    <Badge className={`absolute top-2 left-2 ${getTypeColor(listing.type)}`}>
                      {getTypeIcon(listing.type)}
                      <span className="ml-1 capitalize">{listing.type}</span>
                    </Badge>
                    <div className="absolute bottom-2 left-2 flex items-center space-x-1 bg-black/70 text-white px-2 py-1 rounded-full text-sm">
                      <span className="text-lg">{listing.countryFlag}</span>
                      <span>{listing.country}</span>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {listing.name}
                      </h3>
                      <div className="text-right">
                        <div className="font-bold text-emerald-600">
                          ${listing.price}
                          <span className="text-sm text-muted-foreground">
                            /{listing.type === "hotel" ? "night" : listing.type === "activity" ? "person" : "meal"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {listing.location}, {listing.country}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="ml-1 text-sm font-medium">{listing.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({listing.reviews} reviews)</span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">{listing.description}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {listing.amenities.map((amenity) => (
                        <Badge key={amenity} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 transition-colors text-white border-0"
                      onClick={() => handleBookNow(listing)}
                    >
                      <Plane className="mr-2 h-4 w-4" />
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredListings.length === 0 && (
              <div className="text-center py-12 animate-fade-in">
                <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
