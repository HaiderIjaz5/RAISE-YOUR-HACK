"use client"

import { useState } from "react"
import { Users, Calendar, CheckCircle, XCircle, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

// Mock data
const mockStats = {
  totalUsers: 1247,
  totalBookings: 856,
  activeBookings: 234,
  canceledBookings: 89,
  userGrowth: 12.5,
  bookingGrowth: 8.3,
  activeGrowth: 15.2,
  canceledGrowth: -5.1,
}

const mockChartData = [
  { month: "Jan", bookings: 65 },
  { month: "Feb", bookings: 78 },
  { month: "Mar", bookings: 90 },
  { month: "Apr", bookings: 81 },
  { month: "May", bookings: 95 },
  { month: "Jun", bookings: 110 },
  { month: "Jul", bookings: 125 },
  { month: "Aug", bookings: 140 },
  { month: "Sep", bookings: 135 },
  { month: "Oct", bookings: 150 },
  { month: "Nov", bookings: 165 },
  { month: "Dec", bookings: 180 },
]

const recentBookings = [
  { id: 1, user: "Ahmed Khan", destination: "Hunza Valley", status: "confirmed", amount: "$450" },
  { id: 2, user: "Sara Ali", destination: "Skardu", status: "pending", amount: "$320" },
  { id: 3, user: "Hassan Sheikh", destination: "Murree", status: "confirmed", amount: "$180" },
  { id: 4, user: "Fatima Malik", destination: "Swat", status: "cancelled", amount: "$280" },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState(mockStats)
  const [chartData, setChartData] = useState(mockChartData)

  const StatCard = ({ title, value, icon: Icon, growth, color }: any) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value.toLocaleString()}</p>
          <div className="flex items-center mt-2">
            {growth > 0 ? (
              <ArrowUpRight className="w-4 h-4 text-green-500" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ml-1 ${growth > 0 ? "text-green-600" : "text-red-600"}`}>
              {Math.abs(growth)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          growth={stats.userGrowth}
          color="bg-gradient-to-r from-emerald-500 to-emerald-600"
        />
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={Calendar}
          growth={stats.bookingGrowth}
          color="bg-gradient-to-r from-sky-500 to-sky-600"
        />
        <StatCard
          title="Active Bookings"
          value={stats.activeBookings}
          icon={CheckCircle}
          growth={stats.activeGrowth}
          color="bg-gradient-to-r from-amber-500 to-amber-600"
        />
        <StatCard
          title="Canceled Bookings"
          value={stats.canceledBookings}
          icon={XCircle}
          growth={stats.canceledGrowth}
          color="bg-gradient-to-r from-red-500 to-red-600"
        />
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Trends Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Booking Trends</h3>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="h-64">
            <div className="flex items-end justify-between h-full space-x-2">
              {chartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-gradient-to-t from-emerald-500 to-sky-500 rounded-t-sm transition-all duration-300 hover:from-emerald-600 hover:to-sky-600"
                    style={{ height: `${(data.bookings / 180) * 100}%` }}
                  />
                  <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Bookings</h3>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-900">{booking.user}</p>
                  <p className="text-sm text-gray-600">{booking.destination}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{booking.amount}</p>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
