"use client"

import { useState } from "react"
import { Inter } from "next/font/google"
import { AuthProvider } from "@/contexts/AuthContext"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Car Booking Application",
  description: "A full-stack car booking platform for customers, B2B partners, affiliates, and drivers",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [language, setLanguage] = useState("en")
  const [currency, setCurrency] = useState("USD")

  return (
    <html lang={language}>
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-white text-black flex flex-col">
            <header className="flex justify-between items-center p-4 border-b border-gray-300">
              <div className="text-2xl font-bold">Car Booking</div>
              <nav className="flex items-center space-x-6">
                <a href="/" className="hover:underline">Home</a>
                <a href="/booking" className="hover:underline">Booking</a>
                <a href="/about" className="hover:underline">About Us</a>
                <select
                  aria-label="Select Language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="border border-gray-400 rounded px-2 py-1"
                >
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="es">Spanish</option>
                </select>
                <select
                  aria-label="Select Currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="border border-gray-400 rounded px-2 py-1"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </nav>
            </header>
            <main className="flex-grow">{children}</main>
            <footer className="p-4 border-t border-gray-300 text-center text-sm text-gray-600">
              &copy; {new Date().getFullYear()} Car Booking Application. All rights reserved.
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
