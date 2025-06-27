"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { AlertCircle } from "lucide-react"

type UserRole = "customer" | "b2b" | "affiliate" | "driver"

export default function RegisterPage() {
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer" as UserRole,
    companyName: "", // For B2B and Affiliate
    companyRegistration: "", // For B2B and Affiliate
    driverLicense: "", // For Driver
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return false
    }
    if ((formData.role === "b2b" || formData.role === "affiliate") && 
        (!formData.companyName || !formData.companyRegistration)) {
      setError("Company details are required")
      return false
    }
    if (formData.role === "driver" && !formData.driverLicense) {
      setError("Driver license is required")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!validateForm()) {
      setLoading(false)
      return
    }

    try {
      await register(formData)
    } catch (error) {
      setError("Registration failed. Please try again.")
      console.error("Registration failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const showCompanyFields = formData.role === "b2b" || formData.role === "affiliate"
  const showDriverFields = formData.role === "driver"

  return (
    <div className="min-h-screen bg-[#f7fafc] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#1a365d]">Create Account</h1>
          <p className="text-gray-600 mt-2">Join our car booking platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                First Name
              </label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                Last Name
              </label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium text-gray-700">
              Account Type
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
              className="w-full rounded-md border border-gray-300 p-2"
              required
            >
              <option value="customer">Customer</option>
              <option value="b2b">B2B Partner</option>
              <option value="affiliate">Affiliate</option>
              <option value="driver">Driver</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
          </div>

          {showCompanyFields && (
            <>
              <div className="space-y-2">
                <label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="companyRegistration" className="text-sm font-medium text-gray-700">
                  Company Registration Number
                </label>
                <Input
                  id="companyRegistration"
                  value={formData.companyRegistration}
                  onChange={(e) => setFormData({ ...formData, companyRegistration: e.target.value })}
                  required
                />
              </div>
            </>
          )}

          {showDriverFields && (
            <div className="space-y-2">
              <label htmlFor="driverLicense" className="text-sm font-medium text-gray-700">
                Driver License Number
              </label>
              <Input
                id="driverLicense"
                value={formData.driverLicense}
                onChange={(e) => setFormData({ ...formData, driverLicense: e.target.value })}
                required
              />
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-[#1a365d] hover:bg-[#2d4a77] text-white"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-[#1a365d] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  )
}
