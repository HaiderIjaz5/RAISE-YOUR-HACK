"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, Plane, Shield, Clock, Users, ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/images/team-1.jpg",
    rating: 5,
    location: "New York, USA",
    text: "Travel and Tourism made planning my Pakistan trip effortless. The AI recommendations were spot-on, and I discovered hidden gems I never would have found otherwise!",
    trip: "15-day Northern Pakistan Adventure",
  },
  {
    id: 2,
    name: "Ahmed Hassan",
    avatar: "/images/team-2.jpg",
    rating: 5,
    location: "London, UK",
    text: "The personalized itinerary was perfect for my family. Every detail was taken care of, from accommodations to local experiences. Highly recommended!",
    trip: "Family Cultural Tour",
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    avatar: "/images/team-3.jpg",
    rating: 5,
    location: "Barcelona, Spain",
    text: "As a solo female traveler, I felt completely safe and supported. The local guides were knowledgeable and the experiences were authentic and memorable.",
    trip: "Solo Photography Expedition",
  },
]

const features = [
  {
    icon: <Plane className="h-8 w-8" />,
    title: "AI-Powered Planning",
    description:
      "Our intelligent system creates personalized itineraries based on your preferences, budget, and travel style.",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Safe & Secure",
    description:
      "Travel with confidence knowing we prioritize your safety with verified accommodations and trusted local partners.",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Local Expertise",
    description:
      "Connect with experienced local guides who share insider knowledge and authentic cultural experiences.",
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "24/7 Support",
    description: "Our dedicated support team is available around the clock to assist you throughout your journey.",
  },
]

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/hero-bg.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Explore the World
            <span className="block bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
              with Us
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Discover breathtaking destinations, create unforgettable memories, and let our AI-powered platform plan your
            perfect adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white border-0 hover:scale-105 transition-transform duration-200"
            >
              <Link href="/register">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-white text-white hover:bg-white/10 hover:text-white bg-transparent backdrop-blur-sm"
            >
              <Link href="/explore">Explore Destinations</Link>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Travel and Tourism?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of travel planning with our innovative features designed for modern explorers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-100 to-sky-100 rounded-full mb-6 text-emerald-600">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What Our Travelers Say</h2>
            <p className="text-xl text-muted-foreground">
              Real experiences from real travelers who trusted us with their adventures.
            </p>
          </div>

          <div className="relative">
            <Card className="p-8 md:p-12 shadow-xl animate-fade-in">
              <CardContent className="text-center">
                <Quote className="h-12 w-12 text-emerald-500 mx-auto mb-6" />

                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <blockquote className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed italic">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={testimonials[currentTestimonial].avatar || "/placeholder.svg"} />
                    <AvatarFallback>{testimonials[currentTestimonial].name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="font-semibold">{testimonials[currentTestimonial].name}</div>
                    <div className="text-sm text-muted-foreground">{testimonials[currentTestimonial].location}</div>
                    <div className="text-sm text-emerald-600">{testimonials[currentTestimonial].trip}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Dots indicator */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentTestimonial ? "bg-emerald-500" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 to-sky-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready for Your Next Adventure?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Join thousands of travelers who have discovered amazing destinations with our AI-powered travel planning
            platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 bg-white text-emerald-600 hover:bg-gray-100 hover:scale-105 transition-transform duration-200"
            >
              <Link href="/register">Start Planning Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-white text-white hover:bg-white/10 hover:text-white bg-transparent backdrop-blur-sm hover:scale-105 transition-transform duration-200"
            >
              <Link href="/chat">Chat with AI Assistant</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
