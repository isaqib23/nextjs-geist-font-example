"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-[#1a365d] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">CarBooking</h1>
          <div className="space-x-4">
            <Link href="/auth/login">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-[#1a365d]">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-[#fbbf24] text-[#1a365d] hover:bg-[#f59e0b]">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-[#1a365d] to-[#2d4a77]">
        <div className="container mx-auto px-4 py-20 text-white">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">
              Book Your Perfect Ride
            </h1>
            <p className="text-xl mb-8">
              Choose from our wide range of premium vehicles for any occasion
            </p>
            <Button className="bg-[#fbbf24] text-[#1a365d] hover:bg-[#f59e0b] text-lg px-8 py-6">
              Book Now
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-[#f7fafc]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#1a365d]">
            Featured Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Economy', 'Business', 'VIP'].map((category) => (
              <Card key={category} className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">{category}</h3>
                <p className="text-gray-600 mb-4">
                  {category === 'Economy' && 'Affordable and reliable vehicles for everyday use'}
                  {category === 'Business' && 'Premium vehicles for professional occasions'}
                  {category === 'VIP' && 'Luxury vehicles for special moments'}
                </p>
                <Button variant="outline" className="w-full">
                  View Cars
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#1a365d]">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Search', description: 'Choose your pickup location and dates' },
              { title: 'Select', description: 'Pick your preferred vehicle and options' },
              { title: 'Book', description: 'Confirm your booking with secure payment' }
            ].map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="w-12 h-12 bg-[#1a365d] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a365d] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CarBooking</h3>
              <p className="text-gray-300">
                Your trusted partner for car rentals and bookings
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/cars">Our Cars</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>Car Rental</li>
                <li>Business Travel</li>
                <li>VIP Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li>Email: info@carbooking.com</li>
                <li>Phone: +1 234 567 890</li>
                <li>Address: 123 Booking Street</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
