"use client"

import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, Download, Calendar, MapPin } from "lucide-react"
import ProtectedRoute from "@/components/auth/protected-route"

function BookingConfirmationContent() {
  // In a real app, this would come from API or URL params
  const bookingDetails = {
    id: "B" + Math.random().toString().slice(2, 8),
    car: "BMW 5 Series",
    pickup: "123 Business Ave, Downtown",
    dropoff: "456 Corporate Blvd, Midtown",
    pickupDate: new Date().toLocaleDateString(),
    dropoffDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    amount: "$350",
    extras: ["Insurance Coverage", "GPS Navigation"],
  }

  useEffect(() => {
    // In a real app, this would trigger email/SMS notifications
    console.log("Sending booking confirmation notifications...")
  }, [])

  return (
    <div className="min-h-screen bg-[#f7fafc] py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h1>
            <p className="text-gray-500 mt-2">
              Your booking has been successfully confirmed. We've sent the details to your email.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Booking Details</h2>
                <p className="text-sm text-gray-500">ID: {bookingDetails.id}</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <p className="font-medium">{bookingDetails.car}</p>
                    <p className="text-sm text-gray-500">Vehicle</p>
                  </div>
                  <p className="text-lg font-bold">{bookingDetails.amount}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm font-medium">Pickup Date</p>
                      <p className="text-sm text-gray-600">{bookingDetails.pickupDate}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm font-medium">Return Date</p>
                      <p className="text-sm text-gray-600">{bookingDetails.dropoffDate}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm font-medium">Pickup Location</p>
                      <p className="text-sm text-gray-600">{bookingDetails.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm font-medium">Drop-off Location</p>
                      <p className="text-sm text-gray-600">{bookingDetails.dropoff}</p>
                    </div>
                  </div>
                </div>

                {bookingDetails.extras.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Extras Included</p>
                    <div className="space-y-1">
                      {bookingDetails.extras.map((extra) => (
                        <p key={extra} className="text-sm text-gray-600">
                          • {extra}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 bg-[#1a365d]">
                <Download className="w-4 h-4 mr-2" />
                Download Invoice
              </Button>
              <Link href="/customer" className="flex-1">
                <Button variant="outline" className="w-full">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default function BookingConfirmation() {
  return (
    <ProtectedRoute allowedRoles={["customer", "b2b", "affiliate"]}>
      <BookingConfirmationContent />
    </ProtectedRoute>
  )
}
