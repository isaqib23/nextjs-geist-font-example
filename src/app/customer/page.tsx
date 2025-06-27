"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import ProtectedRoute from "@/components/auth/protected-route"
import {
  Car,
  Clock,
  CreditCard,
  User,
  Calendar,
  MapPin,
  Star,
  Download,
  Edit,
} from "lucide-react"

// Sample data - In a real app, this would come from an API
const stats = [
  {
    label: "Total Bookings",
    value: "12",
    icon: Car,
    trend: "This Year",
    color: "bg-blue-500",
  },
  {
    label: "Active Bookings",
    value: "1",
    icon: Clock,
    trend: "Current",
    color: "bg-green-500",
  },
  {
    label: "Total Spent",
    value: "$2,450",
    icon: CreditCard,
    trend: "This Year",
    color: "bg-purple-500",
  },
  {
    label: "Reward Points",
    value: "450",
    icon: Star,
    trend: "Available",
    color: "bg-orange-500",
  },
]

const activeBooking = {
  id: "B001",
  car: "BMW 5 Series",
  driver: "John Smith",
  pickup: "123 Business Ave, Downtown",
  dropoff: "456 Corporate Blvd, Midtown",
  date: "2024-02-25",
  time: "14:30",
  status: "Confirmed",
  amount: "$180",
}

const bookingHistory = [
  {
    id: "B002",
    car: "Mercedes E-Class",
    date: "2024-02-20",
    amount: "$220",
    status: "Completed",
    rating: 5,
  },
  {
    id: "B003",
    car: "Audi A6",
    date: "2024-02-15",
    amount: "$190",
    status: "Completed",
    rating: 4,
  },
  {
    id: "B004",
    car: "Toyota Camry",
    date: "2024-02-10",
    amount: "$120",
    status: "Cancelled",
    rating: null,
  },
]

const userProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 234-567-8900",
  address: "789 Residential St, Suburb City",
  preferredPayment: "**** **** **** 4567",
}

function CustomerDashboardContent() {
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profile, setProfile] = useState(userProfile)

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditingProfile(false)
    // In a real app, this would make an API call to update the profile
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
            <p className="text-gray-500">Welcome back, {profile.name}</p>
          </div>
          <Button className="bg-[#1a365d]">
            <Car className="w-4 h-4 mr-2" />
            New Booking
          </Button>
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
          {/* Active Booking */}
          <Card className="lg:col-span-2">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Active Booking
              </h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{activeBooking.car}</h3>
                    <p className="text-sm text-gray-500">
                      Booking ID: {activeBooking.id}
                    </p>
                  </div>
                  <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                    {activeBooking.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {activeBooking.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {activeBooking.time}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-4 h-4 mr-2" />
                      {activeBooking.driver}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CreditCard className="w-4 h-4 mr-2" />
                      {activeBooking.amount}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 mt-1 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Pickup Location</p>
                      <p className="text-sm text-gray-600">
                        {activeBooking.pickup}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 mt-1 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Drop-off Location</p>
                      <p className="text-sm text-gray-600">
                        {activeBooking.dropoff}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Profile Card */}
          <Card>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Profile Details
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>

              {isEditingProfile ? (
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Name</label>
                    <Input
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <Input
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Phone</label>
                    <Input
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Address</label>
                    <Input
                      value={profile.address}
                      onChange={(e) =>
                        setProfile({ ...profile, address: e.target.value })
                      }
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#1a365d]">
                    Save Changes
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{profile.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{profile.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{profile.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="font-medium">{profile.preferredPayment}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Booking History */}
        <Card>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Booking History
              </h2>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500">
                    <th className="pb-4">Booking ID</th>
                    <th className="pb-4">Car</th>
                    <th className="pb-4">Date</th>
                    <th className="pb-4">Amount</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingHistory.map((booking) => (
                    <tr key={booking.id} className="border-t">
                      <td className="py-4 text-sm">{booking.id}</td>
                      <td className="py-4 text-sm">{booking.car}</td>
                      <td className="py-4 text-sm">{booking.date}</td>
                      <td className="py-4 text-sm">{booking.amount}</td>
                      <td className="py-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            booking.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-4">
                        {booking.rating ? (
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span>{booking.rating}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">N/A</span>
                        )}
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

export default function CustomerDashboard() {
  return (
    <ProtectedRoute allowedRoles={["customer"]}>
      <CustomerDashboardContent />
    </ProtectedRoute>
  )
}
