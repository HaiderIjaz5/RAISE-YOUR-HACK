"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Calendar,
  MapPin,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft,
  MessageCircle,
  Download,
  Star,
  Plane,
} from "lucide-react"

const mockBookings = [
  {
    id: "TT-2024-001",
    destination: "Paris Adventure",
    location: "Paris, France",
    flag: "🇫🇷",
    dates: {
      checkIn: "2024-04-15",
      checkOut: "2024-04-22",
    },
    guests: 2,
    rooms: 1,
    totalAmount: 2450,
    paymentMethod: "Visa ending in 4532",
    status: "confirmed",
    bookingDate: "2024-03-01",
    confirmationCode: "PAR2024001",
    includes: ["Hotel Plaza Athénée", "Seine River Cruise", "Eiffel Tower Tour", "Free WiFi"],
    image: "/images/paris-booking.jpg",
  },
  {
    id: "TT-2024-002",
    destination: "Tokyo Experience",
    location: "Tokyo, Japan",
    flag: "🇯🇵",
    dates: {
      checkIn: "2024-05-10",
      checkOut: "2024-05-17",
    },
    guests: 1,
    rooms: 1,
    totalAmount: 3200,
    paymentMethod: "Mastercard ending in 8765",
    status: "pending",
    bookingDate: "2024-03-15",
    confirmationCode: "TKY2024002",
    includes: ["Park Hyatt Tokyo", "Mount Fuji Tour", "Sushi Experience", "City Transport"],
    image: "/images/tokyo-booking.jpg",
  },
  {
    id: "TT-2024-003",
    destination: "Venice Romance",
    location: "Venice, Italy",
    flag: "🇮🇹",
    dates: {
      checkIn: "2024-06-20",
      checkOut: "2024-06-27",
    },
    guests: 2,
    rooms: 1,
    totalAmount: 4100,
    paymentMethod: "Amex ending in 1234",
    status: "cancelled",
    bookingDate: "2024-02-28",
    confirmationCode: "VEN2024003",
    includes: ["Hotel Danieli", "Gondola Rides", "St. Mark's Tour", "Fine Dining"],
    image: "/images/venice-booking.jpg",
  },
]

export default function BookingPage() {
  const [bookings, setBookings] = useState(mockBookings)
  const [userName, setUserName] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem("userAuth")
    const name = localStorage.getItem("userName") || "Traveler"
    setIsAuthenticated(!!auth)
    setUserName(name.split(" ")[0])
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 pb-10 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full w-fit">
              <Plane className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
            <p className="text-muted-foreground mb-6">Please sign in to view your bookings and travel history.</p>
            <div className="space-y-4">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white border-0"
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/register">Create Account</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-10 bg-gradient-to-br from-emerald-50 via-sky-50 to-amber-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Bookings, {userName}</h1>
              <p className="text-xl text-muted-foreground">Manage and track all your travel reservations</p>
            </div>
            <Button asChild variant="outline" className="border-emerald-200 hover:bg-emerald-50 bg-transparent">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>

        {/* Bookings Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-scale-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                  <p className="text-3xl font-bold text-gray-900">{bookings.length}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-scale-in"
            style={{ animationDelay: "0.1s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Confirmed Trips</p>
                  <p className="text-3xl font-bold text-green-600">
                    {bookings.filter((b) => b.status === "confirmed").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-scale-in"
            style={{ animationDelay: "0.2s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                  <p className="text-3xl font-bold text-emerald-600">
                    ${bookings.reduce((sum, booking) => sum + booking.totalAmount, 0).toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {bookings.map((booking, index) => (
            <Card
              key={booking.id}
              className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  {/* Image Section */}
                  <div className="relative">
                    <img
                      src={booking.image || "/placeholder.svg"}
                      alt={booking.destination}
                      className="w-full h-64 lg:h-full object-cover rounded-l-lg"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={`${getStatusColor(booking.status)} border`}>
                        {getStatusIcon(booking.status)}
                        <span className="ml-2 capitalize">{booking.status}</span>
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-black/70 text-white border-0">
                        {calculateNights(booking.dates.checkIn, booking.dates.checkOut)} nights
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-black/70 text-white px-2 py-1 rounded-full text-sm flex items-center space-x-1">
                        <span className="text-lg">{booking.flag}</span>
                      </div>
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="lg:col-span-2 p-6">
                    <div className="flex flex-col h-full">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">{booking.destination}</h3>
                          <p className="text-lg text-muted-foreground">{booking.location}</p>
                          <div className="flex items-center mt-2">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="ml-2 text-sm text-muted-foreground">5.0 (Premium)</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-emerald-600">${booking.totalAmount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Total Amount</p>
                        </div>
                      </div>

                      {/* Trip Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="space-y-3">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                            <span className="font-medium">Check-in:</span>
                            <span className="ml-2">{formatDate(booking.dates.checkIn)}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                            <span className="font-medium">Check-out:</span>
                            <span className="ml-2">{formatDate(booking.dates.checkOut)}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                            <span className="font-medium">Guests:</span>
                            <span className="ml-2">
                              {booking.guests} guests, {booking.rooms} room
                            </span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center text-sm">
                            <CreditCard className="h-4 w-4 text-muted-foreground mr-2" />
                            <span className="font-medium">Payment:</span>
                            <span className="ml-2">{booking.paymentMethod}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-muted-foreground mr-2" />
                            <span className="font-medium">Booking ID:</span>
                            <span className="ml-2 font-mono">{booking.confirmationCode}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                            <span className="font-medium">Booked:</span>
                            <span className="ml-2">{formatDate(booking.bookingDate)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Includes */}
                      <div className="mb-6">
                        <p className="font-medium text-sm text-muted-foreground mb-2">Includes:</p>
                        <div className="flex flex-wrap gap-2">
                          {booking.includes.map((item, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3 mt-auto">
                        {booking.status === "confirmed" && (
                          <>
                            <Button className="bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white border-0">
                              <Download className="mr-2 h-4 w-4" />
                              Download Voucher
                            </Button>
                            <Button variant="outline" className="border-emerald-200 hover:bg-emerald-50 bg-transparent">
                              <MapPin className="mr-2 h-4 w-4" />
                              View on Map
                            </Button>
                          </>
                        )}
                        {booking.status === "pending" && (
                          <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0">
                            <Clock className="mr-2 h-4 w-4" />
                            Awaiting Confirmation
                          </Button>
                        )}
                        <Button variant="outline" asChild className="border-sky-200 hover:bg-sky-50 bg-transparent">
                          <Link href="/chat">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Chat with Agent
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {bookings.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-emerald-100 to-sky-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-12 w-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">No bookings yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Start planning your next adventure! Our AI assistant is ready to help you find the perfect destination.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white border-0"
                >
                  <Link href="/chat">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Start Planning
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-emerald-200 hover:bg-emerald-50 bg-transparent">
                  <Link href="/explore">
                    <MapPin className="mr-2 h-4 w-4" />
                    Explore Destinations
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-8 bg-gradient-to-r from-emerald-500 to-sky-500 text-white border-0 animate-fade-in">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Need Help with Your Booking?</h3>
            <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
              Our travel experts are available 24/7 to assist you with any questions or changes to your reservations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="secondary" className="bg-white text-emerald-600 hover:bg-gray-100">
                <Link href="/chat">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat with Support
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                <Link href="/explore">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Another Trip
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
