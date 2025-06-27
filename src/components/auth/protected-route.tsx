"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { LoadingPage } from "@/components/ui/loading"

type UserRole = "admin" | "customer" | "b2b" | "affiliate" | "driver"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
}

export default function ProtectedRoute({ 
  children, 
  allowedRoles 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/login")
      } else if (allowedRoles && !allowedRoles.includes(user.role as UserRole)) {
        // Redirect to appropriate dashboard if user doesn't have required role
        router.push(`/${user.role}`)
      }
    }
  }, [loading, user, router, allowedRoles])

  // Show loading state while checking authentication
  if (loading) {
    return <LoadingPage />
  }

  // If there's no user, don't render anything (will redirect)
  if (!user) {
    return null
  }

  // If roles are specified and user's role isn't included, don't render
  if (allowedRoles && !allowedRoles.includes(user.role as UserRole)) {
    return null
  }

  // If we get here, user is authenticated and authorized
  return <>{children}</>
}
