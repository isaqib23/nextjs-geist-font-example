"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type UserRole = "admin" | "customer" | "b2b" | "affiliate" | "driver"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (data: RegisterData) => Promise<void>
  approvalPending: boolean
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  role: UserRole
  companyName?: string
  companyRegistration?: string
  driverLicense?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [approvalPending, setApprovalPending] = useState(false)

  // Check for existing session on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      // TODO: Implement actual session check with your backend
      const session = localStorage.getItem("user")
      if (session) {
        setUser(JSON.parse(session))
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      // TODO: Implement actual login with your backend
      // This is just a mock implementation
      const mockUser = {
        id: "123",
        name: "John Doe",
        email: email,
        role: "customer" as UserRole,
      }
      
      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      
      // Redirect based on role
      switch (mockUser.role) {
        case "admin":
          router.push("/admin")
          break
        case "b2b":
          router.push("/b2b")
          break
        case "affiliate":
          router.push("/affiliate")
          break
        case "driver":
          router.push("/driver")
          break
        default:
          router.push("/customer")
      }
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      // TODO: Implement actual logout with your backend
      localStorage.removeItem("user")
      setUser(null)
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (data: RegisterData) => {
    try {
      setLoading(true)
      // TODO: Implement actual registration with your backend
      // This is just a mock implementation
      const mockUser = {
        id: "123",
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        role: data.role,
      }

      if (data.role === "b2b" || data.role === "affiliate") {
        // Show approval pending message
        setApprovalPending(true)
        alert("Your registration is pending approval. We'll notify you via email once approved.")
        router.push("/auth/login")
      } else {
        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))
        router.push(`/${data.role}`)
      }
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, approvalPending }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Higher-order component for protected routes
export function withAuth(Component: React.ComponentType, allowedRoles?: UserRole[]) {
  return function ProtectedRoute(props: any) {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!loading && !user) {
        router.push("/auth/login")
      } else if (
        !loading &&
        user &&
        allowedRoles &&
        !allowedRoles.includes(user.role)
      ) {
        // Redirect to appropriate dashboard if user doesn't have required role
        router.push(`/${user.role}`)
      }
    }, [loading, user, router])

    if (loading) {
      return <div>Loading...</div>
    }

    if (!user) {
      return null
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return null
    }

    return <Component {...props} />
  }
}
