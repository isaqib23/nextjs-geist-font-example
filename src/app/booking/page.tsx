"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { useRouter } from "next/navigation"
import ProtectedRoute from "@/components/auth/protected-route"

type BookingStep = "location" | "dates" | "car" | "extras" | "payment"

interface CarOption {
  id: string
  name: string
  category: string
  price: number
  image: string
}

const SAMPLE_CARS: CarOption[] = [
  {
    id: "1",
    name: "Toyota Camry",
    category: "Economy",
    price: 50,
    image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "2",
    name: "BMW 5 Series",
    category: "Business",
    price: 120,
    image: "https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "3",
    name: "Mercedes S-Class",
    category: "VIP",
    price: 200,
    image: "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
]

function BookingPageContent() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<BookingStep>("location")
  const [formData, setFormData] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: new Date(),
    dropoffDate: new Date(),
    selectedCar: null as CarOption | null,
    extras: {
      insurance: false,
      gps: false,
      childSeat: false,
    },
  })

  const steps: BookingStep[] = ["location", "dates", "car", "extras", "payment"]
  const currentStepIndex = steps.indexOf(currentStep)

  const handleNext = () => {
    const nextStep = steps[currentStepIndex + 1]
    if (nextStep) {
      setCurrentStep(nextStep)
    }
  }

  const handleBack = () => {
    const prevStep = steps[currentStepIndex - 1]
    if (prevStep) {
      setCurrentStep(prevStep)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement booking submission
    console.log("Booking submitted:", formData)
    router.push("/booking/confirmation")
  }

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index <= currentStepIndex ? "bg-[#1a365d] text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-12 h-1 ${
                index < currentStepIndex ? "bg-[#1a365d]" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )

  const renderLocationStep = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="pickup" className="text-sm font-medium text-gray-700">
          Pickup Location
        </label>
        <Input
          id="pickup"
          value={formData.pickupLocation}
          onChange={(e) =>
            setFormData({ ...formData, pickupLocation: e.target.value })
          }
          placeholder="Enter pickup location"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="dropoff" className="text-sm font-medium text-gray-700">
          Drop-off Location
        </label>
        <Input
          id="dropoff"
          value={formData.dropoffLocation}
          onChange={(e) =>
            setFormData({ ...formData, dropoffLocation: e.target.value })
          }
          placeholder="Enter drop-off location"
          required
        />
      </div>
    </div>
  )

  const renderDatesStep = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Pickup Date</label>
        <Calendar
          mode="single"
          selected={formData.pickupDate}
          onSelect={(date) => date && setFormData({ ...formData, pickupDate: date })}
          className="rounded-md border"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Drop-off Date</label>
        <Calendar
          mode="single"
          selected={formData.dropoffDate}
          onSelect={(date) => date && setFormData({ ...formData, dropoffDate: date })}
          className="rounded-md border"
        />
      </div>
    </div>
  )

  const renderCarSelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {SAMPLE_CARS.map((car) => (
        <Card
          key={car.id}
          className={`p-4 cursor-pointer transition-all ${
            formData.selectedCar?.id === car.id
              ? "ring-2 ring-[#1a365d]"
              : "hover:shadow-lg"
          }`}
          onClick={() => setFormData({ ...formData, selectedCar: car })}
        >
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="font-semibold text-lg">{car.name}</h3>
          <p className="text-gray-600">{car.category}</p>
          <p className="text-[#1a365d] font-bold mt-2">${car.price}/day</p>
        </Card>
      ))}
    </div>
  )

  const renderExtras = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 border rounded-md">
        <div>
          <h3 className="font-semibold">Insurance Coverage</h3>
          <p className="text-gray-600">Full coverage insurance for your trip</p>
        </div>
        <input
          type="checkbox"
          checked={formData.extras.insurance}
          onChange={(e) =>
            setFormData({
              ...formData,
              extras: { ...formData.extras, insurance: e.target.checked },
            })
          }
          className="h-5 w-5 text-[#1a365d]"
        />
      </div>
      <div className="flex items-center justify-between p-4 border rounded-md">
        <div>
          <h3 className="font-semibold">GPS Navigation</h3>
          <p className="text-gray-600">Built-in GPS system</p>
        </div>
        <input
          type="checkbox"
          checked={formData.extras.gps}
          onChange={(e) =>
            setFormData({
              ...formData,
              extras: { ...formData.extras, gps: e.target.checked },
            })
          }
          className="h-5 w-5 text-[#1a365d]"
        />
      </div>
      <div className="flex items-center justify-between p-4 border rounded-md">
        <div>
          <h3 className="font-semibold">Child Seat</h3>
          <p className="text-gray-600">Safety-certified child seat</p>
        </div>
        <input
          type="checkbox"
          checked={formData.extras.childSeat}
          onChange={(e) =>
            setFormData({
              ...formData,
              extras: { ...formData.extras, childSeat: e.target.checked },
            })
          }
          className="h-5 w-5 text-[#1a365d]"
        />
      </div>
    </div>
  )

  const renderPayment = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="font-semibold text-lg mb-4">Booking Summary</h3>
        <div className="space-y-2">
          <p>
            <span className="text-gray-600">Car:</span>{" "}
            {formData.selectedCar?.name}
          </p>
          <p>
            <span className="text-gray-600">Pickup:</span>{" "}
            {formData.pickupLocation}
          </p>
          <p>
            <span className="text-gray-600">Drop-off:</span>{" "}
            {formData.dropoffLocation}
          </p>
          <p>
            <span className="text-gray-600">Dates:</span>{" "}
            {formData.pickupDate.toLocaleDateString()} -{" "}
            {formData.dropoffDate.toLocaleDateString()}
          </p>
        </div>
      </div>
      
      {/* Payment form would go here - integrate with Stripe */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Card Number
          </label>
          <Input placeholder="1234 5678 9012 3456" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <Input placeholder="MM/YY" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              CVC
            </label>
            <Input placeholder="123" />
          </div>
        </div>
      </div>
    </div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "location":
        return renderLocationStep()
      case "dates":
        return renderDatesStep()
      case "car":
        return renderCarSelection()
      case "extras":
        return renderExtras()
      case "payment":
        return renderPayment()
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#f7fafc] py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="p-8">
          <h1 className="text-2xl font-bold text-center text-[#1a365d] mb-6">
            Book Your Car
          </h1>
          {renderStepIndicator()}
          <form onSubmit={handleSubmit}>
            {renderCurrentStep()}
            <div className="flex justify-between mt-8">
              {currentStepIndex > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                >
                  Back
                </Button>
              )}
              {currentStepIndex < steps.length - 1 ? (
                <Button
                  type="button"
                  className="ml-auto bg-[#1a365d]"
                  onClick={handleNext}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="ml-auto bg-[#1a365d]"
                >
                  Complete Booking
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <ProtectedRoute allowedRoles={["customer", "b2b", "affiliate"]}>
      <BookingPageContent />
    </ProtectedRoute>
  )
}
