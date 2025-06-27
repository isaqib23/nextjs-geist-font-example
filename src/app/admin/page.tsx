"use client"

import { Card } from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import ProtectedRoute from "@/components/auth/protected-route"
import {
  Users,
  Car,
  CreditCard,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

// Sample data - In a real app, this would come from an API
const stats = [
  {
    label: "Total Users",
    value: "1,234",
    icon: Users,
    trend: "+12%",
    color: "bg-blue-500",
  },
  {
    label: "Active Bookings",
    value: "56",
    icon: Car,
    trend: "+5%",
    color: "bg-green-500",
  },
  {
    label: "Revenue",
    value: "$12,345",
    icon: CreditCard,
    trend: "+8%",
    color: "bg-purple-500",
  },
  {
    label: "Growth",
    value: "23%",
    icon: TrendingUp,
    trend: "+2%",
    color: "bg-orange-500",
  },
]

const recentBookings = [
  {
    id: "B001",
    customer: "John Doe",
    car: "BMW 5 Series",
    status: "Completed",
    amount: "$230",
    date: "2024-02-20",
  },
  {
    id: "B002",
    customer: "Jane Smith",
    car: "Mercedes S-Class",
    status: "Active",
    amount: "$450",
    date: "2024-02-21",
  },
  {
    id: "B003",
    customer: "Mike Johnson",
    car: "Toyota Camry",
    status: "Pending",
    amount: "$120",
    date: "2024-02-22",
  },
  {
    id: "B004",
    customer: "Sarah Williams",
    car: "Audi A6",
    status: "Cancelled",
    amount: "$300",
    date: "2024-02-23",
  },
]

const pendingApprovals = [
  {
    id: "P001",
    name: "ABC Corp",
    type: "B2B Partner",
    date: "2024-02-20",
    status: "Pending",
  },
  {
    id: "P002",
    name: "Travel Solutions Ltd",
    type: "Affiliate",
    date: "2024-02-21",
    status: "Pending",
  },
]

function AdminDashboardContent() {
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "active":
        return <Clock className="w-5 h-5 text-blue-500" />
      case "pending":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return null
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back, Admin</p>
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
          {/* Recent Bookings */}
          <Card className="lg:col-span-2">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Bookings
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500">
                      <th className="pb-4">Booking ID</th>
                      <th className="pb-4">Customer</th>
                      <th className="pb-4">Car</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4">Amount</th>
                      <th className="pb-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="border-t">
                        <td className="py-4 text-sm">{booking.id}</td>
                        <td className="py-4 text-sm">{booking.customer}</td>
                        <td className="py-4 text-sm">{booking.car}</td>
                        <td className="py-4">
                          <div className="flex items-center">
                            {getStatusIcon(booking.status)}
                            <span className="ml-2 text-sm">{booking.status}</span>
                          </div>
                        </td>
                        <td className="py-4 text-sm">{booking.amount}</td>
                        <td className="py-4 text-sm">{booking.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          {/* Pending Approvals */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Pending Approvals
              </h2>
              <div className="space-y-4">
                {pendingApprovals.map((approval) => (
                  <div
                    key={approval.id}
                    className="p-4 border rounded-lg space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{approval.name}</h3>
                        <p className="text-sm text-gray-500">{approval.type}</p>
                      </div>
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                        {approval.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Applied: {approval.date}
                      </span>
                      <div className="space-x-2">
                        <button className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600">
                          Approve
                        </button>
                        <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600">
                          Reject
                        </button>
                      </div>
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

export default function AdminDashboard() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboardContent />
    </ProtectedRoute>
  )
}
