"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import {
  Bell,
  Home,
  Car,
  Users,
  FileText,
  Settings,
  Menu,
  X,
  LogOut,
  CreditCard,
  Star,
  Share2,
  MapPin
} from "lucide-react"

interface SidebarLink {
  icon: React.ReactNode
  label: string
  href: string
}

type RoleLinks = {
  [key: string]: SidebarLink[]
}

const roleLinks: RoleLinks = {
  admin: [
    { icon: <Home size={20} />, label: "Dashboard", href: "/admin" },
    { icon: <Car size={20} />, label: "Bookings", href: "/admin/bookings" },
    { icon: <Users size={20} />, label: "Users", href: "/admin/users" },
    { icon: <FileText size={20} />, label: "CMS Pages", href: "/admin/cms" },
    { icon: <Settings size={20} />, label: "Settings", href: "/admin/settings" },
  ],
  customer: [
    { icon: <Home size={20} />, label: "Dashboard", href: "/customer" },
    { icon: <Car size={20} />, label: "Book a Car", href: "/booking" },
    { icon: <FileText size={20} />, label: "My Bookings", href: "/customer/bookings" },
    { icon: <CreditCard size={20} />, label: "Payments", href: "/customer/payments" },
    { icon: <Settings size={20} />, label: "Settings", href: "/customer/settings" },
  ],
  b2b: [
    { icon: <Home size={20} />, label: "Dashboard", href: "/b2b" },
    { icon: <Car size={20} />, label: "Fleet", href: "/b2b/fleet" },
    { icon: <Users size={20} />, label: "Drivers", href: "/b2b/drivers" },
    { icon: <Star size={20} />, label: "Auctions", href: "/b2b/auctions" },
    { icon: <Settings size={20} />, label: "Settings", href: "/b2b/settings" },
  ],
  affiliate: [
    { icon: <Home size={20} />, label: "Dashboard", href: "/affiliate" },
    { icon: <Share2 size={20} />, label: "Referrals", href: "/affiliate/referrals" },
    { icon: <CreditCard size={20} />, label: "Commissions", href: "/affiliate/commissions" },
    { icon: <Settings size={20} />, label: "Settings", href: "/affiliate/settings" },
  ],
  driver: [
    { icon: <Home size={20} />, label: "Dashboard", href: "/driver" },
    { icon: <MapPin size={20} />, label: "My Rides", href: "/driver/rides" },
    { icon: <Star size={20} />, label: "Ratings", href: "/driver/ratings" },
    { icon: <Settings size={20} />, label: "Settings", href: "/driver/settings" },
  ],
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const navigationLinks = user && user.role ? roleLinks[user.role] : []

  return (
    <div className="min-h-screen bg-[#f7fafc]">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
        <h1 className="text-xl font-bold text-[#1a365d]">CarBooking</h1>
        <Button variant="ghost" size="icon">
          <Bell size={20} />
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-30 w-64 bg-white border-r transition-transform duration-200 ease-in-out`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-[#1a365d]">CarBooking</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1">
            {navigationLinks.map((link: SidebarLink) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-[#1a365d] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-[#1a365d] text-white flex items-center justify-center">
                {user?.name?.[0] || "U"}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{user?.name || "User"}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full mt-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`${
          isSidebarOpen ? "lg:pl-64" : ""
        } min-h-screen transition-all duration-200`}
      >
        <main className="p-6">{children}</main>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}
