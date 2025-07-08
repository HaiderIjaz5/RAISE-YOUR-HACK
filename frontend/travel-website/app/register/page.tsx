"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Plane,
  Chrome,
  Facebook,
  Apple,
  Mountain,
  Camera,
  Utensils,
  Waves,
  TreePine,
  Building,
} from "lucide-react"

const travelInterests = [
  { id: "nature", label: "Nature", icon: <TreePine className="h-4 w-4" /> },
  { id: "culture", label: "Culture", icon: <Building className="h-4 w-4" /> },
  { id: "adventure", label: "Adventure", icon: <Mountain className="h-4 w-4" /> },
  { id: "beach", label: "Beach", icon: <Waves className="h-4 w-4" /> },
  { id: "food", label: "Food", icon: <Utensils className="h-4 w-4" /> },
  { id: "photography", label: "Photography", icon: <Camera className="h-4 w-4" /> },
]

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    interests: [] as string[],
    agreeTerms: false,
    newsletter: true,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    if (!formData.agreeTerms) {
      alert("Please agree to the terms and conditions")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Store auth data
      localStorage.setItem("userAuth", "true")
      localStorage.setItem("userEmail", formData.email)
      localStorage.setItem("userName", formData.fullName)
      localStorage.setItem("userInterests", JSON.stringify(formData.interests))

      setIsLoading(false)
      router.push("/interests")
    }, 2000)
  }

  const handleSocialSignup = (provider: string) => {
    console.log(`Sign up with ${provider}`)
    // Simulate social signup
    localStorage.setItem("userAuth", "true")
    localStorage.setItem("userEmail", `user@${provider.toLowerCase()}.com`)
    localStorage.setItem("userName", `${provider} User`)
    router.push("/interests")
  }

  const toggleInterest = (interestId: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId],
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="w-full max-w-lg animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 group">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-xl group-hover:scale-110 transition-transform duration-200">
              <Plane className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">
              Travel and Tourism
            </span>
          </Link>
        </div>

        <Card className="shadow-2xl border-0 bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-white">Join Our Travel Community</CardTitle>
            <CardDescription className="text-base text-gray-300">
              Create your account and start exploring the world
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Social Signup Buttons */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full h-12 bg-gray-700 hover:bg-gray-600 border-gray-600 text-white"
                onClick={() => handleSocialSignup("Google")}
              >
                <Chrome className="mr-3 h-5 w-5 text-red-500" />
                Continue with Google
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-12 bg-gray-700 hover:bg-gray-600 border-gray-600 text-white"
                  onClick={() => handleSocialSignup("Facebook")}
                >
                  <Facebook className="h-5 w-5 text-blue-600" />
                </Button>
                <Button
                  variant="outline"
                  className="h-12 bg-gray-700 hover:bg-gray-600 border-gray-600 text-white"
                  onClick={() => handleSocialSignup("Apple")}
                >
                  <Apple className="h-5 w-5 text-white" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <Separator className="bg-gray-600" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-gray-800 px-4 text-sm text-gray-400">or create account with email</span>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-gray-300">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      className="pl-10 h-12 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      value={formData.fullName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-300">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone"
                      className="pl-10 h-12 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 h-12 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create password"
                      className="pl-10 pr-10 h-12 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      value={formData.password}
                      onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-300">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      className="pl-10 pr-10 h-12 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Travel Interests */}
              <div className="space-y-3">
                <Label className="text-gray-300">Travel Interests (Optional)</Label>
                <div className="flex flex-wrap gap-2">
                  {travelInterests.map((interest) => (
                    <Badge
                      key={interest.id}
                      variant={formData.interests.includes(interest.id) ? "default" : "outline"}
                      className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                        formData.interests.includes(interest.id)
                          ? "bg-gradient-to-r from-emerald-500 to-sky-500 text-white border-0"
                          : "hover:bg-emerald-50 hover:border-emerald-300 bg-gray-700 border-gray-600 text-gray-300"
                      }`}
                      onClick={() => toggleInterest(interest.id)}
                    >
                      {interest.icon}
                      <span className="ml-1">{interest.label}</span>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeTerms: checked as boolean }))}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed text-gray-300">
                    I agree to the{" "}
                    <Link href="/terms" className="text-emerald-400 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-emerald-400 hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={formData.newsletter}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, newsletter: checked as boolean }))}
                  />
                  <Label htmlFor="newsletter" className="text-sm text-gray-300">
                    Subscribe to our newsletter for travel tips and exclusive offers
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white border-0 text-base font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="text-center pt-4 border-t border-gray-600">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
