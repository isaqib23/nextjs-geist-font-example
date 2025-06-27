"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import ProtectedRoute from "@/components/auth/protected-route"
import {
  Car,
  Clock,
  MapPin,
  Star,
  Navigation,
  Phone,
  MessageSquare,
  CheckCircle,
  XCircle,
} from "lucide-react"

function DriverDashboardContent() {
  const [rideStatus, setRideStatus] = useState("In Progress")

  const stats = [
    {
      label: "Today's Rides",
      value: "3",
      icon: Car,
      trend: "2 Completed",
      color: "bg-blue-500",
    },
    {
      label: "Hours Active",
      value: "6.5",
      icon: Clock,
      trend: "Today",
      color: "bg-green-500",
    },
    {
      label: "Total Distance",
      value: "124km",
      icon: MapPin,
      trend: "Today",
      color: "bg-purple-500",
    },
    {
      label: "Rating",
      value: "4.8",
      icon: Star,
      trend: "Last 30 days",
      color: "bg-orange-500",
    },
  ]

  const currentRide = {
    id: "R001",
    customer: {
      name: "Emily Parker",
      phone: "+1 234-567-8900",
      rating: 4.9,
    },
    pickup: "123 Business Ave, Downtown",
    dropoff: "456 Corporate Blvd, Midtown",
    startTime: "14:30",
    estimatedDuration: "25 mins",
    status: rideStatus,
  }

  const upcomingRides = [
    {
      id: "R002",
      customer: "Michael Brown",
      pickup: "789 Park Road",
      dropoff: "321 Lake View",
      time: "16:00",
      status: "Scheduled",
    },
    {
      id: "R003",
      customer: "Sarah Wilson",
      pickup: "567 Hill Street",
      dropoff: "890 Valley Road",
      time: "17:30",
      status: "Scheduled",
    },
  ]

  const completedRides = [
    {
      id: "R004",
      customer: "John Smith",
      pickup: "123 Main St",
      dropoff: "456 Oak Ave",
      time: "12:30",
      status: "Completed",
      rating: 5,
    },
    {
      id: "R005",
      customer: "Lisa Johnson",
      pickup: "789 Pine St",
      dropoff: "321 Elm St",
      time: "13:45",
      status: "Completed",
      rating: 4,
    },
  ]

  const updateRideStatus = (newStatus: string) => {
    setRideStatus(newStatus)
    // In a real app, this would make an API call to update the status
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Driver Dashboard</h1>
          <p className="text-gray-500">Manage your rides and track performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm text-gray-600">{stat.trend}</span>
                </div>
                <h3 className="text-2xl font-bold mt-4">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Ride */}
          <Card className="lg:col-span-2">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Current Ride
              </h2>
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Car className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{currentRide.customer.name}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        {currentRide.customer.rating}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Pickup</p>
                      <p className="text-gray-600">{currentRide.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Drop-off</p>
                      <p className="text-gray-600">{currentRide.dropoff}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm text-gray-500">Start Time</p>
                      <p className="font-medium">{currentRide.startTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Est. Duration</p>
                      <p className="font-medium">{currentRide.estimatedDuration}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => updateRideStatus("Completed")}
                      className="text-green-600"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => updateRideStatus("Cancelled")}
                      className="text-red-600"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Upcoming Rides */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Upcoming Rides
              </h2>
              <div className="space-y-4">
                {upcomingRides.map((ride) => (
                  <div
                    key={ride.id}
                    className="p-4 border rounded-lg space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{ride.customer}</h3>
                        <p className="text-sm text-gray-500">{ride.time}</p>
                      </div>
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {ride.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {ride.pickup}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Navigation className="w-4 h-4 mr-2" />
                        {ride.dropoff}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Completed Rides */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Completed Rides
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500">
                    <th className="pb-4">ID</th>
                    <th className="pb-4">Customer</th>
                    <th className="pb-4">Pickup</th>
                    <th className="pb-4">Drop-off</th>
                    <th className="pb-4">Time</th>
                    <th className="pb-4">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {completedRides.map((ride) => (
                    <tr key={ride.id} className="border-t">
                      <td className="py-4 text-sm">{ride.id}</td>
                      <td className="py-4 text-sm">{ride.customer}</td>
                      <td className="py-4 text-sm">{ride.pickup}</td>
                      <td className="py-4 text-sm">{ride.dropoff}</td>
                      <td className="py-4 text-sm">{ride.time}</td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span>{ride.rating}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default function DriverDashboard() {
  return (
    <ProtectedRoute allowedRoles={["driver"]}>
      <DriverDashboardContent />
    </ProtectedRoute>
  )
}
