"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, X, User, Settings, LogOut, Plane } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Check authentication status
    const auth = localStorage.getItem("userAuth")
    const email = localStorage.getItem("userEmail")
    setIsAuthenticated(!!auth)
    setUserEmail(email || "")
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem("userAuth")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    localStorage.removeItem("userInterests")
    localStorage.removeItem("userPreferences")
    setIsAuthenticated(false)
    setUserEmail("")
    window.location.href = "/"
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Smart Planner", href: "/planner" },
    { name: "Chat Assistant", href: "/chat" },
    { name: "My Bookings", href: "/booking" },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md border-b border-gray-800 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-lg group-hover:scale-110 transition-transform duration-200">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">
              Travel and Tourism
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-emerald-500 ${
                  pathname === item.href ? "text-emerald-500" : "text-white"
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-200">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">{userEmail.charAt(0).toUpperCase()}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-black border-gray-800">
                  <div className="px-2 py-1.5 text-sm text-gray-400 border-b border-gray-800">{userEmail}</div>
                  <DropdownMenuItem asChild>
                    <Link href="/interests" className="flex items-center text-white hover:bg-gray-800">
                      <User className="mr-2 h-4 w-4" />
                      Profile & Preferences
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/booking" className="flex items-center text-white hover:bg-gray-800">
                      <Settings className="mr-2 h-4 w-4" />
                      My Bookings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:bg-gray-800">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  asChild
                  className="bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-medium px-6 py-2 rounded-lg hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 backdrop-blur-md rounded-lg mt-2 border border-gray-800">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                    pathname === item.href
                      ? "text-emerald-500 bg-emerald-900/20"
                      : "text-white hover:text-emerald-500 hover:bg-gray-800"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-800 pt-2">
                {isAuthenticated ? (
                  <>
                    <div className="px-3 py-2 text-sm text-gray-400 border-b border-gray-800 mb-2">{userEmail}</div>
                    <Link
                      href="/interests"
                      className="block px-3 py-2 text-base font-medium text-white hover:text-emerald-500 hover:bg-gray-800 rounded-md transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile & Preferences
                    </Link>
                    <Link
                      href="/booking"
                      className="block px-3 py-2 text-base font-medium text-white hover:text-emerald-500 hover:bg-gray-800 rounded-md transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      My Bookings
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsOpen(false)
                      }}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-red-400 hover:bg-gray-800 rounded-md transition-colors duration-200"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-base font-medium bg-gradient-to-r from-emerald-500 to-sky-500 text-white rounded-md hover:from-emerald-600 hover:to-sky-600 transition-all duration-200 text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
