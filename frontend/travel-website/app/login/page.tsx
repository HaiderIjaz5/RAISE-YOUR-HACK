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
import { Eye, EyeOff, Mail, Lock, Plane, Chrome, Facebook, Apple } from "lucide-react"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Store auth data
      localStorage.setItem("userAuth", "true")
      localStorage.setItem("userEmail", formData.email)

      setIsLoading(false)
      router.push("/")
    }, 1500)
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`)
    // Simulate social login
    localStorage.setItem("userAuth", "true")
    localStorage.setItem("userEmail", `user@${provider.toLowerCase()}.com`)
    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="w-full max-w-md animate-fade-in">
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
            <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
            <CardDescription className="text-base text-gray-300">
              Sign in to continue your travel journey
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full h-12 bg-gray-700 hover:bg-gray-600 border-gray-600 text-white"
                onClick={() => handleSocialLogin("Google")}
              >
                <Chrome className="mr-3 h-5 w-5 text-red-500" />
                Continue with Google
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-12 bg-gray-700 hover:bg-gray-600 border-gray-600 text-white"
                  onClick={() => handleSocialLogin("Facebook")}
                >
                  <Facebook className="h-5 w-5 text-blue-600" />
                </Button>
                <Button
                  variant="outline"
                  className="h-12 bg-gray-700 hover:bg-gray-600 border-gray-600 text-white"
                  onClick={() => handleSocialLogin("Apple")}
                >
                  <Apple className="h-5 w-5 text-white" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <Separator className="bg-gray-600" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-gray-800 px-4 text-sm text-gray-400">or continue with email</span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))}
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-300">
                    Remember me
                  </Label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-emerald-400 hover:text-emerald-300 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white border-0 text-base font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="text-center pt-4 border-t border-gray-600">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <Link href="/register" className="text-emerald-400 hover:text-emerald-300 font-medium hover:underline">
                  Sign up for free
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-400">
          <p>
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-emerald-400 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-emerald-400 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
