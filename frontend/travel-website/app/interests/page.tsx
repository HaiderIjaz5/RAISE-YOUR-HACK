"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  MapPin,
  DollarSign,
  Calendar,
  Users,
  Mountain,
  Camera,
  Utensils,
  Waves,
  TreePine,
  Building,
  Plane,
  Heart,
  Star,
  Coffee,
  Music,
  ShoppingBag,
  Gamepad2,
  ArrowRight,
} from "lucide-react"

const destinations = [
  "Northern Pakistan (Hunza, Skardu, Gilgit)",
  "Punjab (Lahore, Islamabad, Murree)",
  "Sindh (Karachi, Hyderabad, Thatta)",
  "Khyber Pakhtunkhwa (Peshawar, Swat, Chitral)",
  "Balochistan (Quetta, Gwadar, Ziarat)",
  "Kashmir (Muzaffarabad, Neelum Valley)",
  "International Destinations",
]

const travelStyles = [
  {
    id: "solo",
    label: "Solo Adventure",
    icon: <Mountain className="h-5 w-5" />,
    description: "Independent exploration",
  },
  { id: "couple", label: "Romantic Getaway", icon: <Heart className="h-5 w-5" />, description: "Perfect for couples" },
  { id: "family", label: "Family Fun", icon: <Users className="h-5 w-5" />, description: "Kid-friendly activities" },
  { id: "group", label: "Group Travel", icon: <Users className="h-5 w-5" />, description: "Friends and groups" },
  { id: "luxury", label: "Luxury Experience", icon: <Star className="h-5 w-5" />, description: "Premium comfort" },
  {
    id: "budget",
    label: "Budget Backpacking",
    icon: <Coffee className="h-5 w-5" />,
    description: "Affordable adventures",
  },
]

const activityInterests = [
  { id: "nature", label: "Nature & Wildlife", icon: <TreePine className="h-4 w-4" /> },
  { id: "culture", label: "Culture & History", icon: <Building className="h-4 w-4" /> },
  { id: "adventure", label: "Adventure Sports", icon: <Mountain className="h-4 w-4" /> },
  { id: "beach", label: "Beach & Water", icon: <Waves className="h-4 w-4" /> },
  { id: "food", label: "Food & Cuisine", icon: <Utensils className="h-4 w-4" /> },
  { id: "photography", label: "Photography", icon: <Camera className="h-4 w-4" /> },
  { id: "nightlife", label: "Nightlife & Entertainment", icon: <Music className="h-4 w-4" /> },
  { id: "shopping", label: "Shopping", icon: <ShoppingBag className="h-4 w-4" /> },
  { id: "wellness", label: "Wellness & Spa", icon: <Heart className="h-4 w-4" /> },
  { id: "gaming", label: "Gaming & Tech", icon: <Gamepad2 className="h-4 w-4" /> },
]

export default function InterestsPage() {
  const [userName, setUserName] = useState("")
  const [preferences, setPreferences] = useState({
    destinations: [] as string[],
    budget: [1000],
    duration: "7-10",
    travelStyle: "",
    accommodation: "",
    activities: [] as string[],
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const name = localStorage.getItem("userName") || "Traveler"
    const existingInterests = localStorage.getItem("userInterests")
    const existingPreferences = localStorage.getItem("userPreferences")

    setUserName(name)

    if (existingPreferences) {
      setPreferences(JSON.parse(existingPreferences))
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Save preferences
    localStorage.setItem("userPreferences", JSON.stringify(preferences))

    setTimeout(() => {
      setIsLoading(false)
      router.push("/")
    }, 1500)
  }

  const toggleDestination = (destination: string) => {
    setPreferences((prev) => ({
      ...prev,
      destinations: prev.destinations.includes(destination)
        ? prev.destinations.filter((d) => d !== destination)
        : [...prev.destinations, destination],
    }))
  }

  const toggleActivity = (activityId: string) => {
    setPreferences((prev) => ({
      ...prev,
      activities: prev.activities.includes(activityId)
        ? prev.activities.filter((id) => id !== activityId)
        : [...prev.activities, activityId],
    }))
  }

  return (
    <div className="min-h-screen pt-20 pb-10 bg-gradient-to-br from-emerald-50 via-sky-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-xl">
              <Plane className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome,{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">
              {userName}!
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let's personalize your travel experience. Tell us about your preferences so we can recommend the perfect
            destinations and activities for you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Preferred Destinations */}
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-emerald-500" />
                Preferred Destinations
              </CardTitle>
              <CardDescription>Select the places you'd love to explore (you can choose multiple)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {destinations.map((destination) => (
                  <Badge
                    key={destination}
                    variant={preferences.destinations.includes(destination) ? "default" : "outline"}
                    className={`cursor-pointer p-3 text-sm transition-all duration-200 hover:scale-105 justify-start ${
                      preferences.destinations.includes(destination)
                        ? "bg-gradient-to-r from-emerald-500 to-sky-500 text-white border-0"
                        : "hover:bg-emerald-50 hover:border-emerald-300"
                    }`}
                    onClick={() => toggleDestination(destination)}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    {destination}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Budget Range */}
          <Card className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-emerald-500" />
                Budget Range
              </CardTitle>
              <CardDescription>What's your approximate budget for a trip? (USD)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="px-4">
                <Slider
                  value={preferences.budget}
                  onValueChange={(value) => setPreferences((prev) => ({ ...prev, budget: value }))}
                  max={10000}
                  min={200}
                  step={100}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>$200</span>
                <span className="font-semibold text-lg text-emerald-600">
                  ${preferences.budget[0].toLocaleString()}
                </span>
                <span>$10,000+</span>
              </div>
            </CardContent>
          </Card>

          {/* Travel Duration */}
          <Card className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-emerald-500" />
                Preferred Trip Duration
              </CardTitle>
              <CardDescription>How long do you usually like to travel?</CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                value={preferences.duration}
                onValueChange={(value) => setPreferences((prev) => ({ ...prev, duration: value }))}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-3">1-3 days (Weekend getaway)</SelectItem>
                  <SelectItem value="4-6">4-6 days (Short vacation)</SelectItem>
                  <SelectItem value="7-10">7-10 days (Standard trip)</SelectItem>
                  <SelectItem value="11-14">11-14 days (Extended vacation)</SelectItem>
                  <SelectItem value="15+">15+ days (Long adventure)</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Travel Style */}
          <Card className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-emerald-500" />
                Travel Style
              </CardTitle>
              <CardDescription>What type of travel experience do you prefer?</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={preferences.travelStyle}
                onValueChange={(value) => setPreferences((prev) => ({ ...prev, travelStyle: value }))}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {travelStyles.map((style) => (
                  <div key={style.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={style.id} id={style.id} />
                    <Label
                      htmlFor={style.id}
                      className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-emerald-50 transition-colors duration-200 flex-1"
                    >
                      <div className="text-emerald-500">{style.icon}</div>
                      <div>
                        <div className="font-medium">{style.label}</div>
                        <div className="text-sm text-muted-foreground">{style.description}</div>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Accommodation Preference */}
          <Card className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5 text-emerald-500" />
                Accommodation Preference
              </CardTitle>
              <CardDescription>What type of accommodation do you prefer?</CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                value={preferences.accommodation}
                onValueChange={(value) => setPreferences((prev) => ({ ...prev, accommodation: value }))}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select accommodation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="luxury">Luxury Hotels & Resorts</SelectItem>
                  <SelectItem value="boutique">Boutique Hotels</SelectItem>
                  <SelectItem value="standard">Standard Hotels</SelectItem>
                  <SelectItem value="guesthouse">Guesthouses & B&Bs</SelectItem>
                  <SelectItem value="hostel">Hostels & Budget Options</SelectItem>
                  <SelectItem value="apartment">Vacation Rentals</SelectItem>
                  <SelectItem value="camping">Camping & Glamping</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Activity Interests */}
          <Card className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mountain className="mr-2 h-5 w-5 text-emerald-500" />
                Activity Interests
              </CardTitle>
              <CardDescription>What activities and experiences interest you most?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {activityInterests.map((activity) => (
                  <Badge
                    key={activity.id}
                    variant={preferences.activities.includes(activity.id) ? "default" : "outline"}
                    className={`cursor-pointer p-3 text-sm transition-all duration-200 hover:scale-105 justify-center ${
                      preferences.activities.includes(activity.id)
                        ? "bg-gradient-to-r from-emerald-500 to-sky-500 text-white border-0"
                        : "hover:bg-emerald-50 hover:border-emerald-300"
                    }`}
                    onClick={() => toggleActivity(activity.id)}
                  >
                    {activity.icon}
                    <span className="ml-1 text-xs">{activity.label}</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="text-center animate-fade-in">
            <Button
              type="submit"
              size="lg"
              className="px-12 py-6 text-lg bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white border-0 hover:scale-105 transition-transform duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving preferences...</span>
                </div>
              ) : (
                <>
                  Save Preferences & Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              You can always update these preferences later in your profile
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
