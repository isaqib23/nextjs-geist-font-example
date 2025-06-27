import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Car } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f7fafc] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-24 h-24 bg-[#1a365d] rounded-full flex items-center justify-center mx-auto mb-6">
          <Car className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="space-x-4">
          <Link href="/">
            <Button className="bg-[#1a365d]">
              Return Home
            </Button>
          </Link>
          <Link href="/booking">
            <Button variant="outline">
              Book a Car
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
