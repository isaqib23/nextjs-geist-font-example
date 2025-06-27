"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import ProtectedRoute from "@/components/auth/protected-route"
import {
  Car,
  Users,
  Gavel,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
} from "lucide-react"

// Sample data - In a real app, this would come from an API
const stats = [
  {
    label: "Total Fleet",
    value: "24",
    icon: Car,
    trend: "+3",
    color: "bg-blue-500",
  },
  {
    label: "Active Drivers",
    value: "12",
    icon: Users,
    trend: "+1",
    color: "bg-green-500",
  },
  {
    label: "Open Auctions",
    value: "8",
    icon: Gavel,
    trend: "New",
    color: "bg-purple-500",
  },
  {
    label: "Monthly Revenue",
    value: "$8,450",
    icon: TrendingUp,
    trend: "+12%",
    color: "bg-orange-500",
  },
]

const fleetVehicles = [
  {
    id: "V001",
    model: "BMW 5 Series",
    year: "2023",
    status: "Available",
    driver: "John Smith",
    lastService: "2024-01-15",
  },
  {
    id: "V002",
    model: "Mercedes E-Class",
    year: "2023",
    status: "On Trip",
    driver: "Mike Johnson",
    lastService: "2024-01-20",
  },
  {
    id: "V003",
    model: "Audi A6",
    year: "2022",
    status: "Maintenance",
    driver: "Unassigned",
    lastService: "2024-02-10",
  },
]

const activeAuctions = [
  {
    id: "A001",
    customer: "Corporate Events Ltd",
    requirement: "5 Luxury Sedans",
    duration: "3 Days",
    startDate: "2024-03-01",
    currentBid: "$2,500",
    status: "Open",
  },
  {
    id: "A002",
    customer: "Wedding Planners Inc",
    requirement: "2 Premium SUVs",
    duration: "1 Day",
    startDate: "2024-03-05",
    currentBid: "$800",
    status: "Open",
  },
]

function B2BDashboardContent() {
  const [selectedVehicle, setSelectedVehicle] = useState(null)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">B2B Partner Dashboard</h1>
            <p className="text-gray-500">Manage your fleet and auctions</p>
          </div>
          <Button className="bg-[#1a365d]">
            <Plus className="w-4 h-4 mr-2" />
            Add Vehicle
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
                  <span className="text-sm text-green-600">{stat.trend}</span>
                </div>
                <h3 className="text-2xl font-bold mt-4">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Fleet Management */}
          <Card className="lg:col-span-2">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Fleet Management
                </h2>
                <Button variant="outline" className="text-sm">
                  View All
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500">
                      <th className="pb-4">Vehicle ID</th>
                      <th className="pb-4">Model</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4">Driver</th>
                      <th className="pb-4">Last Service</th>
                      <th className="pb-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fleetVehicles.map((vehicle) => (
                      <tr key={vehicle.id} className="border-t">
                        <td className="py-4 text-sm">{vehicle.id}</td>
                        <td className="py-4">
                          <div>
                            <p className="font-medium">{vehicle.model}</p>
                            <p className="text-sm text-gray-500">{vehicle.year}</p>
                          </div>
                        </td>
                        <td className="py-4">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              vehicle.status === "Available"
                                ? "bg-green-100 text-green-800"
                                : vehicle.status === "On Trip"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {vehicle.status}
                          </span>
                        </td>
                        <td className="py-4 text-sm">{vehicle.driver}</td>
                        <td className="py-4 text-sm">{vehicle.lastService}</td>
                        <td className="py-4">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          {/* Active Auctions */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Active Auctions
              </h2>
              <div className="space-y-4">
                {activeAuctions.map((auction) => (
                  <div
                    key={auction.id}
                    className="p-4 border rounded-lg space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{auction.customer}</h3>
                        <p className="text-sm text-gray-500">
                          {auction.requirement}
                        </p>
                      </div>
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        {auction.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">Duration</p>
                        <p className="font-medium">{auction.duration}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Start Date</p>
                        <p className="font-medium">{auction.startDate}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <div>
                        <p className="text-sm text-gray-500">Current Bid</p>
                        <p className="font-bold text-[#1a365d]">
                          {auction.currentBid}
                        </p>
                      </div>
                      <Button className="bg-[#1a365d]">
                        Place Bid
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default function B2BDashboard() {
  return (
    <ProtectedRoute allowedRoles={["b2b"]}>
      <B2BDashboardContent />
    </ProtectedRoute>
  )
}
