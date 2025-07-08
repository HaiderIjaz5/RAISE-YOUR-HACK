"use client"

import { useState } from "react"
import { Search, Eye, X, Check, Calendar, MapPin, User, DollarSign } from "lucide-react"

// Mock booking data
const mockBookings = [
  {
    id: 1,
    user: "Ahmed Khan",
    destination: "Hunza Valley",
    checkIn: "2024-04-15",
    checkOut: "2024-04-20",
    guests: 2,
    amount: 450,
    status: "confirmed",
    bookingDate: "2024-03-01",
  },
  {
    id: 2,
    user: "Sara Ali",
    destination: "Skardu",
    checkIn: "2024-04-10",
    checkOut: "2024-04-15",
    guests: 4,
    amount: 320,
    status: "pending",
    bookingDate: "2024-03-05",
  },
  {
    id: 3,
    user: "Hassan Sheikh",
    destination: "Murree",
    checkIn: "2024-03-25",
    checkOut: "2024-03-28",
    guests: 2,
    amount: 180,
    status: "confirmed",
    bookingDate: "2024-02-20",
  },
  {
    id: 4,
    user: "Fatima Malik",
    destination: "Swat",
    checkIn: "2024-04-05",
    checkOut: "2024-04-08",
    guests: 3,
    amount: 280,
    status: "cancelled",
    bookingDate: "2024-02-28",
  },
  {
    id: 5,
    user: "Ali Raza",
    destination: "Kaghan Valley",
    checkIn: "2024-05-01",
    checkOut: "2024-05-05",
    guests: 6,
    amount: 520,
    status: "confirmed",
    bookingDate: "2024-03-10",
  },
]

export default function BookingsPage() {
  const [bookings, setBookings] = useState(mockBookings)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState<any>(null)

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.destination.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (bookingId: number, newStatus: string) => {
    setBookings(bookings.map((booking) => (booking.id === bookingId ? { ...booking, status: newStatus } : booking)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Bookings Management</h2>
          <p className="text-gray-600 mt-1">Manage all user bookings</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            Total: <span className="font-semibold text-gray-900">{bookings.length}</span>
          </div>
          <div className="text-sm text-gray-500">
            Revenue:{" "}
            <span className="font-semibold text-emerald-600">
              ${bookings.reduce((sum, booking) => sum + booking.amount, 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search bookings by user or destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destination
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{booking.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-xs">{booking.user.charAt(0)}</span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{booking.user}</div>
                        <div className="text-sm text-gray-500">{booking.guests} guests</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.destination}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                      {new Date(booking.checkOut).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${booking.amount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="text-emerald-600 hover:text-emerald-900 p-1 rounded hover:bg-emerald-50"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {booking.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleStatusChange(booking.id, "confirmed")}
                            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(booking.id, "cancelled")}
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Booking Details</h3>
              <button onClick={() => setSelectedBooking(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium text-gray-900">{selectedBooking.user}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Destination</p>
                  <p className="font-medium text-gray-900">{selectedBooking.destination}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Check-in / Check-out</p>
                  <p className="font-medium text-gray-900">
                    {new Date(selectedBooking.checkIn).toLocaleDateString()} -{" "}
                    {new Date(selectedBooking.checkOut).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-medium text-gray-900">${selectedBooking.amount}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setSelectedBooking(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
