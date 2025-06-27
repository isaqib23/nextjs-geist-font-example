import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Paths that don't require authentication
const publicPaths = ["/", "/auth/login", "/auth/register"]

// Role-based route access
const roleRoutes = {
  admin: ["/admin"],
  customer: ["/customer", "/booking"],
  b2b: ["/b2b"],
  affiliate: ["/affiliate"],
  driver: ["/driver"],
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public paths
  if (publicPaths.includes(pathname)) {
    return NextResponse.next()
  }

  // Check for auth token
  const token = request.cookies.get("auth-token")?.value

  if (!token) {
    // Redirect to login if no token is present
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  try {
    // In a real application, you would verify the JWT token here
    // This is a simplified example
    const user = JSON.parse(atob(token.split(".")[1]))
    const role = user.role

    // Check if user has access to the requested route
    const hasAccess = roleRoutes[role as keyof typeof roleRoutes]?.some(
      (route) => pathname.startsWith(route)
    )

    if (!hasAccess) {
      // Redirect to appropriate dashboard based on role
      return NextResponse.redirect(new URL(`/${role}`, request.url))
    }

    return NextResponse.next()
  } catch (error) {
    // If token is invalid, redirect to login
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
