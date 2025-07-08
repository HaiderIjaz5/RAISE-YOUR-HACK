"use client"

import { useState } from "react"
import { Search, MapPin, Calendar, Users, Eye, Trash2, Clock, X } from "lucide-react"

// Mock trip plans data
const mockPlans = [
  {
    id: 1,
    user: "Ahmed Khan",
    title: "Northern Pakistan Adventure",
    destinations: ["Hunza Valley", "Skardu", "Fairy Meadows"],
    duration: "7 days",
    travelers: 4,
    budget: 1200,
    status: "active",
    createdDate: "2024-03-01",
    startDate: "2024-04-15",
  },
  {
    id: 2,
    user: "Sara Ali",
    title: "Cultural Heritage Tour",
    destinations: ["Lahore", "Multan", "Bahawalpur"],
    duration: "5 days",
    travelers: 2,
    budget: 800,
    status: "completed",
    createdDate: "2024-02-20",
    startDate: "2024-03-10",
  },
  {
    id: 3,
    user: "Hassan Sheikh",
    title: "Mountain Trekking Expedition",
    destinations: ["K2 Base Camp", "Concordia", "Baltoro Glacier"],
    duration: "14 days",
    travelers: 6,
    budget: 2500,
    status: "planning",
    createdDate: "2024-03-05",
    startDate: "2024-05-01",
  },
  {
    id: 4,
    user: "Fatima Malik",
    title: "Family Beach Vacation",
    destinations: ["Karachi", "Gwadar", "Ormara"],
    duration: "4 days",
    travelers: 5,
    budget: 600,
    status: "active",
    createdDate: "2024-02-28",
    startDate: "2024-04-20",
  },
  {
    id: 5,
    user: "Ali Raza",
    title: "Desert Safari Adventure",
    destinations: ["Thar Desert", "Cholistan", "Derawar Fort"],
    duration: "3 days",
    travelers: 3,
    budget: 450,
    status: "cancelled",
    createdDate: "2024-03-08",
    startDate: "2024-04-05",
  },
]

export default function PlansPage() {
  const [plans, setPlans] = useState(mockPlans)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPlan, setSelectedPlan] = useState<any>(null)

  const filteredPlans = plans.filter((plan) => {
    const matchesSearch =
      plan.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.destinations.some((dest) => dest.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || plan.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleDeletePlan = (planId: number) => {
    if (confirm("Are you sure you want to delete this plan?")) {
      setPlans(plans.filter((plan) => plan.id !== planId))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "planning":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
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
          <h2 className="text-2xl font-bold text-gray-900">Trip Plans Management</h2>
          <p className="text-gray-600 mt-1">View and manage all user-created trip plans</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            Total Plans: <span className="font-semibold text-gray-900">{plans.length}</span>
          </div>
          <div className="text-sm text-gray-500">
            Active:{" "}
            <span className="font-semibold text-emerald-600">{plans.filter((p) => p.status === "active").length}</span>
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
                placeholder="Search plans by user, title, or destination..."
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
              <option value="active">Active</option>
              <option value="planning">Planning</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">{plan.user.charAt(0)}</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{plan.user}</p>
                  <p className="text-xs text-gray-500">Plan #{plan.id}</p>
                </div>
              </div>
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(plan.status)}`}
              >
                {plan.status}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">{plan.title}</h3>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                <span className="truncate">{plan.destinations.join(", ")}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                <span>{plan.duration}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-2 text-gray-400" />
                <span>{plan.travelers} travelers</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                <span>Starts: {new Date(plan.startDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-500">Budget</p>
                <p className="text-lg font-semibold text-emerald-600">${plan.budget}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedPlan(plan)}
                  className="text-emerald-600 hover:text-emerald-900 p-2 rounded hover:bg-emerald-50"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeletePlan(plan.id)}
                  className="text-red-600 hover:text-red-900 p-2 rounded hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Plan Details Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Trip Plan Details</h3>
              <button onClick={() => setSelectedPlan(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">{selectedPlan.title}</h4>
                <p className="text-gray-600">Created by {selectedPlan.user}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Trip Details</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration:</span>
                      <span className="text-gray-900">{selectedPlan.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Travelers:</span>
                      <span className="text-gray-900">{selectedPlan.travelers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Budget:</span>
                      <span className="text-emerald-600 font-medium">${selectedPlan.budget}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Start Date:</span>
                      <span className="text-gray-900">{new Date(selectedPlan.startDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Destinations</h5>
                  <div className="space-y-2">
                    {selectedPlan.destinations.map((destination: string, index: number) => (
                      <div key={index} className="flex items-center text-sm">
                        <MapPin className="w-4 h-4 text-emerald-500 mr-2" />
                        <span className="text-gray-900">{destination}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 mb-2">Status & Timeline</h5>
                <div className="flex items-center space-x-4 text-sm">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedPlan.status)}`}
                  >
                    {selectedPlan.status}
                  </span>
                  <span className="text-gray-500">
                    Created: {new Date(selectedPlan.createdDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedPlan(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
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
