"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Home, Users, Calendar, MapPin, LogOut, Menu, X } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Home },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Bookings", href: "/admin/bookings", icon: Calendar },
  { name: "Plans", href: "/admin/plans", icon: MapPin },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (pathname !== "/admin/login" && !auth) {
      router.push("/admin/login")
    } else if (auth) {
      setIsAuthenticated(true)
    }
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin/login")
  }

  if (pathname === "/admin/login") {
    return children
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">Admin</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-3 mb-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 border-r-2 border-emerald-500"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${isActive ? "text-emerald-500" : "text-gray-400"}`} />
                {item.name}
              </a>
            )
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-3">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">
              {navigation.find((item) => item.href === pathname)?.name || "Admin Dashboard"}
            </h1>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">A</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
