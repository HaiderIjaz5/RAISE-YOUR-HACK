"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Award, Globe, Heart, Mountain, Camera, Compass, Star, MapPin, Clock } from "lucide-react"

const teamMembers = [
  {
    name: "Ahmed Khan",
    role: "Founder & CEO",
    image: "/images/team-1.jpg",
    bio: "Passionate traveler with 15+ years exploring Pakistan",
  },
  {
    name: "Fatima Ali",
    role: "Head of Operations",
    image: "/images/team-2.jpg",
    bio: "Expert in sustainable tourism and local partnerships",
  },
  {
    name: "Hassan Shah",
    role: "Lead Developer",
    image: "/images/team-3.jpg",
    bio: "Tech enthusiast building the future of travel planning",
  },
  {
    name: "Ayesha Malik",
    role: "Travel Curator",
    image: "/images/team-4.jpg",
    bio: "Local expert specializing in northern Pakistan adventures",
  },
]

const achievements = [
  { icon: <Users className="h-8 w-8" />, number: "10,000+", label: "Happy Travelers" },
  { icon: <MapPin className="h-8 w-8" />, number: "50+", label: "Destinations" },
  { icon: <Star className="h-8 w-8" />, number: "4.9", label: "Average Rating" },
  { icon: <Clock className="h-8 w-8" />, number: "5", label: "Years Experience" },
]

const values = [
  {
    icon: <Heart className="h-12 w-12" />,
    title: "Authentic Experiences",
    description:
      "We connect you with genuine local experiences and hidden gems that showcase the true beauty of Pakistan.",
  },
  {
    icon: <Globe className="h-12 w-12" />,
    title: "Sustainable Tourism",
    description:
      "We promote responsible travel that benefits local communities and preserves Pakistan's natural heritage.",
  },
  {
    icon: <Award className="h-12 w-12" />,
    title: "Excellence in Service",
    description:
      "Our commitment to quality ensures every journey exceeds expectations with personalized attention to detail.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 pb-10">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('/images/hero-bg.jpg')`,
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About PakTravel</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            We're passionate about showcasing the incredible beauty, rich culture, and warm hospitality of Pakistan to
            travelers from around the world.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm bg-emerald-100 text-emerald-700 border border-emerald-200"
            >
              <Mountain className="mr-2 h-4 w-4" />
              Adventure Tourism
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm bg-sky-100 text-sky-700 border border-sky-200">
              <Camera className="mr-2 h-4 w-4" />
              Cultural Experiences
            </Badge>
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm bg-amber-100 text-amber-700 border border-amber-200"
            >
              <Compass className="mr-2 h-4 w-4" />
              Expert Guidance
            </Badge>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-100 to-sky-100 rounded-full mb-4 text-emerald-600">
                  {achievement.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{achievement.number}</div>
                <div className="text-muted-foreground">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p className="mb-6">
                PakTravel was born from a simple belief: Pakistan is one of the world's most beautiful and underexplored
                destinations. Founded in 2019 by a group of passionate travelers and local experts, we set out to change
                how people experience this incredible country.
              </p>
              <p className="mb-6">
                From the towering peaks of the Karakoram to the ancient cities of Punjab, from the pristine beaches of
                Balochistan to the lush valleys of Khyber Pakhtunkhwa, Pakistan offers experiences that few places on
                Earth can match.
              </p>
              <p>
                Today, we're proud to be Pakistan's leading travel technology platform, combining cutting-edge AI with
                deep local knowledge to create unforgettable journeys for thousands of travelers each year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do and shape every experience we create.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-100 to-sky-100 rounded-full mb-6 text-emerald-600">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind PakTravel, dedicated to making your journey extraordinary.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="text-center overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 to-sky-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Explore Pakistan?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of travelers who have discovered the magic of Pakistan with PakTravel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 bg-white text-emerald-600 hover:bg-gray-100"
            >
              Start Planning Your Trip
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-white text-white hover:bg-white/10 hover:text-white bg-transparent backdrop-blur-sm"
            >
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
