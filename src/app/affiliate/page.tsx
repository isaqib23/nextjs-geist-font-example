"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import ProtectedRoute from "@/components/auth/protected-route"
import {
  Users,
  DollarSign,
  Share2,
  TrendingUp,
  Download,
  ExternalLink,
  Copy,
} from "lucide-react"

function AffiliateDashboardContent() {
  const [copiedLink, setCopiedLink] = useState("")

  const stats = [
    {
      label: "Total Referrals",
      value: "156",
      icon: Users,
      trend: "+12",
      color: "bg-blue-500",
    },
    {
      label: "Total Earnings",
      value: "$3,450",
      icon: DollarSign,
      trend: "+8%",
      color: "bg-green-500",
    },
    {
      label: "Active Links",
      value: "5",
      icon: Share2,
      trend: "+1",
      color: "bg-purple-500",
    },
    {
      label: "Conversion Rate",
      value: "12%",
      icon: TrendingUp,
      trend: "+2%",
      color: "bg-orange-500",
    },
  ]

  const recentReferrals = [
    {
      id: "R001",
      customer: "John Smith",
      bookingId: "B123",
      amount: "$120",
      commission: "$12",
      status: "Completed",
      date: "2024-02-20",
    },
    {
      id: "R002",
      customer: "Sarah Johnson",
      bookingId: "B124",
      amount: "$350",
      commission: "$35",
      status: "Pending",
      date: "2024-02-21",
    },
    {
      id: "R003",
      customer: "Mike Wilson",
      bookingId: "B125",
      amount: "$200",
      commission: "$20",
      status: "Processing",
      date: "2024-02-22",
    },
  ]

  const referralLinks = [
    {
      id: "L001",
      name: "Standard Car Booking",
      url: "https://carbooking.com/ref/aff123/standard",
      clicks: 245,
      conversions: 12,
    },
    {
      id: "L002",
      name: "VIP Service",
      url: "https://carbooking.com/ref/aff123/vip",
      clicks: 180,
      conversions: 8,
    },
    {
      id: "L003",
      name: "Business Travel",
      url: "https://carbooking.com/ref/aff123/business",
      clicks: 320,
      conversions: 15,
    },
  ]

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedLink(url)
    setTimeout(() => setCopiedLink(""), 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Affiliate Dashboard</h1>
            <p className="text-gray-500">Track your referrals and earnings</p>
          </div>
          <Button className="bg-[#1a365d]">
            <Download className="w-4 h-4 mr-2" />
            Download Report
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
          {/* Recent Referrals */}
          <Card className="lg:col-span-2">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Referrals
                </h2>
                <Button variant="outline" className="text-sm">
                  View All
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500">
                      <th className="pb-4">ID</th>
                      <th className="pb-4">Customer</th>
                      <th className="pb-4">Booking</th>
                      <th className="pb-4">Amount</th>
                      <th className="pb-4">Commission</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentReferrals.map((referral) => (
                      <tr key={referral.id} className="border-t">
                        <td className="py-4 text-sm">{referral.id}</td>
                        <td className="py-4 text-sm">{referral.customer}</td>
                        <td className="py-4 text-sm">
                          <div className="flex items-center">
                            {referral.bookingId}
                            <ExternalLink className="w-4 h-4 ml-1 text-gray-400" />
                          </div>
                        </td>
                        <td className="py-4 text-sm">{referral.amount}</td>
                        <td className="py-4 text-sm font-medium text-green-600">
                          {referral.commission}
                        </td>
                        <td className="py-4">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                              referral.status
                            )}`}
                          >
                            {referral.status}
                          </span>
                        </td>
                        <td className="py-4 text-sm">{referral.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          {/* Referral Links */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Your Referral Links
              </h2>
              <div className="space-y-4">
                {referralLinks.map((link) => (
                  <div
                    key={link.id}
                    className="p-4 border rounded-lg space-y-3"
                  >
                    <div>
                      <h3 className="font-medium">{link.name}</h3>
                      <p className="text-sm text-gray-500 truncate">
                        {link.url}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">Clicks</p>
                        <p className="font-medium">{link.clicks}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Conversions</p>
                        <p className="font-medium">{link.conversions}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => copyToClipboard(link.url)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        {copiedLink === link.url ? "Copied!" : "Copy Link"}
                      </Button>
                      <Button className="bg-[#1a365d]">
                        <Share2 className="w-4 h-4" />
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

export default function AffiliateDashboard() {
  return (
    <ProtectedRoute allowedRoles={["affiliate"]}>
      <AffiliateDashboardContent />
    </ProtectedRoute>
  )
}
