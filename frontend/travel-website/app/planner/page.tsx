"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import {
  CalendarIcon,
  Users,
  DollarSign,
  Clock,
  PieChart,
  BarChart3,
  Sparkles,
  Download,
  Plane,
  CreditCard,
  MapPin,
} from "lucide-react"
import { format } from "date-fns"

const worldDestinations = [
  { name: "Paris", country: "France", flag: "🇫🇷" },
  { name: "Tokyo", country: "Japan", flag: "🇯🇵" },
  { name: "Venice", country: "Italy", flag: "🇮🇹" },
  { name: "Bangkok", country: "Thailand", flag: "🇹🇭" },
  { name: "New York", country: "United States", flag: "🇺🇸" },
  { name: "London", country: "United Kingdom", flag: "🇬🇧" },
  { name: "Sydney", country: "Australia", flag: "🇦🇺" },
  { name: "Barcelona", country: "Spain", flag: "🇪🇸" },
  { name: "Dubai", country: "UAE", flag: "🇦🇪" },
  { name: "Singapore", country: "Singapore", flag: "🇸🇬" },
  { name: "Rome", country: "Italy", flag: "🇮🇹" },
  { name: "Istanbul", country: "Turkey", flag: "🇹🇷" },
  { name: "Bali", country: "Indonesia", flag: "🇮🇩" },
  { name: "Amsterdam", country: "Netherlands", flag: "🇳🇱" },
  { name: "Prague", country: "Czech Republic", flag: "🇨🇿" },
  { name: "Santorini", country: "Greece", flag: "🇬🇷" },
  { name: "Maldives", country: "Maldives", flag: "🇲🇻" },
  { name: "Cairo", country: "Egypt", flag: "🇪🇬" },
  { name: "Rio de Janeiro", country: "Brazil", flag: "🇧🇷" },
  { name: "Cape Town", country: "South Africa", flag: "🇿🇦" },
  { name: "Hunza", country: "Pakistan", flag: "🇵🇰" },
  { name: "Skardu", country: "Pakistan", flag: "🇵🇰" },
  { name: "Beijing", country: "China", flag: "🇨🇳" },
  { name: "Shanghai", country: "China", flag: "🇨🇳" },
  { name: "Seoul", country: "South Korea", flag: "🇰🇷" },
  { name: "Busan", country: "South Korea", flag: "🇰🇷" },
]

export default function PlannerPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    interests: [] as string[],
    budget: "",
    people: "",
    accommodation: "",
    transportation: "",
    selectedDestinations: [] as string[],
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })
  const [generatedItinerary, setGeneratedItinerary] = useState(false)

  const interests = [
    "Adventure Sports",
    "Photography",
    "Cultural Sites",
    "Nature & Wildlife",
    "Food & Cuisine",
    "Shopping",
    "Relaxation",
    "Hiking & Trekking",
    "Historical Places",
    "Local Experiences",
    "Museums & Art",
    "Nightlife",
    "Beach Activities",
    "Mountain Activities",
    "City Tours",
  ]

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const toggleDestination = (destination: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedDestinations: prev.selectedDestinations.includes(destination)
        ? prev.selectedDestinations.filter((d) => d !== destination)
        : [...prev.selectedDestinations, destination],
    }))
  }

  const handleGenerateItinerary = () => {
    setGeneratedItinerary(true)
    setStep(3)
  }

  const handleBookTrip = () => {
    const isAuthenticated = localStorage.getItem("userAuth")
    if (!isAuthenticated) {
      alert("Please sign in to book your trip")
      window.location.href = "/login"
      return
    }
    window.location.href = "/booking"
  }

  const sampleItinerary = [
    {
      day: 1,
      title: `Arrival in ${formData.selectedDestinations[0] || "Destination"}`,
      activities: [
        { time: "10:00 AM", activity: "Airport pickup and hotel check-in", cost: 50 },
        { time: "2:00 PM", activity: "City orientation tour", cost: 30 },
        { time: "6:00 PM", activity: "Welcome dinner at local restaurant", cost: 45 },
      ],
    },
    {
      day: 2,
      title: "Cultural Exploration",
      activities: [
        { time: "9:00 AM", activity: "Visit main cultural attractions", cost: 40 },
        { time: "1:00 PM", activity: "Traditional lunch experience", cost: 35 },
        { time: "3:00 PM", activity: "Museum and art gallery tour", cost: 25 },
        { time: "7:00 PM", activity: "Local entertainment show", cost: 60 },
      ],
    },
    {
      day: 3,
      title: "Adventure & Activities",
      activities: [
        { time: "8:00 AM", activity: "Adventure activity based on interests", cost: 80 },
        { time: "12:00 PM", activity: "Scenic lunch with views", cost: 40 },
        { time: "3:00 PM", activity: "Local market exploration", cost: 20 },
        { time: "6:00 PM", activity: "Sunset viewing experience", cost: 15 },
      ],
    },
  ]

  const budgetBreakdown = [
    { category: "Accommodation", amount: 450, percentage: 35 },
    { category: "Transportation", amount: 320, percentage: 25 },
    { category: "Food & Dining", amount: 260, percentage: 20 },
    { category: "Activities", amount: 180, percentage: 14 },
    { category: "Miscellaneous", amount: 80, percentage: 6 },
  ]

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <Sparkles className="inline-block mr-3 h-12 w-12 text-emerald-500" />
            Smart Trip Planner
          </h1>
          <p className="text-xl text-muted-foreground">Let AI create the perfect itinerary for your world adventure</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8 animate-slide-up">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    step >= stepNum ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 transition-all duration-300 ${
                      step > stepNum ? "bg-emerald-500" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Basic Information */}
        {step === 1 && (
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Tell us about your trip
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="people">Number of People</Label>
                  <Select
                    value={formData.people}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, people: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of people" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Person</SelectItem>
                      <SelectItem value="2">2 People</SelectItem>
                      <SelectItem value="3-4">3-4 People</SelectItem>
                      <SelectItem value="5+">5+ People</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.startDate ? format(formData.startDate, "PPP") : "Pick start date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.startDate}
                        onSelect={(date) => setFormData((prev) => ({ ...prev, startDate: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.endDate ? format(formData.endDate, "PPP") : "Pick end date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.endDate}
                        onSelect={(date) => setFormData((prev) => ({ ...prev, endDate: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget (USD)</Label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, budget: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                    <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
                    <SelectItem value="2000-5000">$2,000 - $5,000</SelectItem>
                    <SelectItem value="5000+">$5,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* World Destination Selection */}
              <div className="space-y-4">
                <Label>Select World Destinations (choose multiple)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
                  {worldDestinations.map((destination) => (
                    <Badge
                      key={destination.name}
                      variant={formData.selectedDestinations.includes(destination.name) ? "default" : "outline"}
                      className="cursor-pointer p-3 text-center hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white border-0 flex items-center justify-center space-x-1"
                      onClick={() => toggleDestination(destination.name)}
                    >
                      <span className="text-lg">{destination.flag}</span>
                      <span className="text-xs">{destination.name}</span>
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => setStep(2)}
                className="w-full"
                disabled={
                  !formData.name ||
                  !formData.startDate ||
                  !formData.endDate ||
                  !formData.budget ||
                  !formData.people ||
                  formData.selectedDestinations.length === 0
                }
              >
                Next: Choose Preferences
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Preferences & Payment */}
        {step === 2 && (
          <div className="space-y-6">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  What interests you?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Select your interests (choose multiple)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
                    {interests.map((interest) => (
                      <Badge
                        key={interest}
                        variant={formData.interests.includes(interest) ? "default" : "outline"}
                        className="cursor-pointer p-3 text-center hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white border-0"
                        onClick={() => toggleInterest(interest)}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="accommodation">Accommodation Preference</Label>
                    <Select
                      value={formData.accommodation}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, accommodation: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select accommodation type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget">Budget Hotels</SelectItem>
                        <SelectItem value="mid-range">Mid-range Hotels</SelectItem>
                        <SelectItem value="luxury">Luxury Hotels</SelectItem>
                        <SelectItem value="mixed">Mixed Options</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transportation">Transportation Preference</Label>
                    <Select
                      value={formData.transportation}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, transportation: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select transportation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="private">Private Car</SelectItem>
                        <SelectItem value="public">Public Transport</SelectItem>
                        <SelectItem value="mixed">Mixed Transport</SelectItem>
                        <SelectItem value="flights">Include Flights</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Card */}
            <Card className="animate-scale-in" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentMethod: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visa">Visa</SelectItem>
                      <SelectItem value="mastercard">Mastercard</SelectItem>
                      <SelectItem value="amex">American Express</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.paymentMethod && formData.paymentMethod !== "paypal" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        placeholder="Enter cardholder name"
                        value={formData.cardholderName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, cardholderName: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData((prev) => ({ ...prev, cardNumber: e.target.value }))}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={(e) => setFormData((prev) => ({ ...prev, expiryDate: e.target.value }))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => setFormData((prev) => ({ ...prev, cvv: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button
                    onClick={handleGenerateItinerary}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white border-0"
                    disabled={
                      formData.interests.length === 0 ||
                      !formData.accommodation ||
                      !formData.transportation ||
                      !formData.paymentMethod
                    }
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Itinerary
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Generated Itinerary */}
        {step === 3 && generatedItinerary && (
          <div className="space-y-8 animate-fade-in">
            {/* Itinerary Header */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Sparkles className="mr-2 h-5 w-5 text-primary" />
                    Your Personalized Itinerary
                  </span>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">3</div>
                    <div className="text-sm text-muted-foreground">Days</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-sky-600">{formData.people}</div>
                    <div className="text-sm text-muted-foreground">People</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-amber-600">$1,290</div>
                    <div className="text-sm text-muted-foreground">Total Cost</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">{formData.selectedDestinations.length}</div>
                    <div className="text-sm text-muted-foreground">Destinations</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Itinerary */}
            <div className="space-y-6">
              {sampleItinerary.map((day, index) => (
                <Card key={day.day} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        {day.day}
                      </div>
                      {day.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {day.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="mr-1 h-4 w-4" />
                              {activity.time}
                            </div>
                            <div className="font-medium">{activity.activity}</div>
                          </div>
                          <div className="flex items-center text-emerald-600 font-semibold">
                            <DollarSign className="h-4 w-4" />
                            {activity.cost}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Budget Analysis */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Budget Breakdown */}
              <Card className="animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="mr-2 h-5 w-5" />
                    Budget Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {budgetBreakdown.map((item, index) => (
                      <div key={item.category} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{
                              backgroundColor: `hsl(${index === 0 ? "158 64% 52%" : index === 1 ? "217 91% 60%" : index === 2 ? "43 96% 56%" : index === 3 ? "220 14% 96%" : "340 75% 55%"})`,
                            }}
                          />
                          <span className="font-medium">{item.category}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${item.amount}</div>
                          <div className="text-sm text-muted-foreground">{item.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Time Allocation */}
              <Card className="animate-scale-in" style={{ animationDelay: "0.1s" }}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Time Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { activity: "Sightseeing", hours: 18, percentage: 50 },
                      { activity: "Travel", hours: 8, percentage: 22 },
                      { activity: "Dining", hours: 6, percentage: 17 },
                      { activity: "Rest", hours: 4, percentage: 11 },
                    ].map((item, index) => (
                      <div key={item.activity} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{item.activity}</span>
                          <span className="text-muted-foreground">
                            {item.hours}h ({item.percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-sky-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setStep(1)} variant="outline" size="lg">
                Create New Itinerary
              </Button>
              <Button
                onClick={handleBookTrip}
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white border-0"
              >
                <Plane className="mr-2 h-4 w-4" />
                Book This Trip
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
