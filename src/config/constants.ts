export const APP_NAME = "CarBooking"
export const APP_DESCRIPTION = "A full-stack car booking platform for customers, B2B partners, affiliates, and drivers"

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

export const ROLES = {
  ADMIN: "admin",
  CUSTOMER: "customer",
  B2B: "b2b",
  AFFILIATE: "affiliate",
  DRIVER: "driver",
} as const

export const CAR_CATEGORIES = {
  ECONOMY: "Economy",
  BUSINESS: "Business",
  VIP: "VIP",
} as const

export const BOOKING_STATUS = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
} as const

export const PAYMENT_METHODS = {
  CREDIT_CARD: "Credit Card",
  DEBIT_CARD: "Debit Card",
  CASH: "Cash",
} as const

export const NOTIFICATION_TYPES = {
  BOOKING_CONFIRMED: "booking_confirmed",
  BOOKING_UPDATED: "booking_updated",
  BOOKING_CANCELLED: "booking_cancelled",
  DRIVER_ASSIGNED: "driver_assigned",
  RIDE_STARTED: "ride_started",
  RIDE_COMPLETED: "ride_completed",
  PAYMENT_RECEIVED: "payment_received",
  REGISTRATION_APPROVED: "registration_approved",
} as const

export const ROUTES = {
  HOME: "/",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  ADMIN: {
    DASHBOARD: "/admin",
    BOOKINGS: "/admin/bookings",
    USERS: "/admin/users",
    CMS: "/admin/cms",
    SETTINGS: "/admin/settings",
  },
  CUSTOMER: {
    DASHBOARD: "/customer",
    BOOKINGS: "/customer/bookings",
    PAYMENTS: "/customer/payments",
    SETTINGS: "/customer/settings",
  },
  B2B: {
    DASHBOARD: "/b2b",
    FLEET: "/b2b/fleet",
    DRIVERS: "/b2b/drivers",
    AUCTIONS: "/b2b/auctions",
    SETTINGS: "/b2b/settings",
  },
  AFFILIATE: {
    DASHBOARD: "/affiliate",
    REFERRALS: "/affiliate/referrals",
    COMMISSIONS: "/affiliate/commissions",
    SETTINGS: "/affiliate/settings",
  },
  DRIVER: {
    DASHBOARD: "/driver",
    RIDES: "/driver/rides",
    RATINGS: "/driver/ratings",
    SETTINGS: "/driver/settings",
  },
  BOOKING: {
    NEW: "/booking",
    CONFIRMATION: "/booking/confirmation",
  },
} as const

export const THEME = {
  colors: {
    primary: "#1a365d",
    secondary: "#f7fafc",
    accent: "#fbbf24",
    success: "#10B981",
    error: "#EF4444",
    warning: "#F59E0B",
    info: "#3B82F6",
  },
  fonts: {
    body: "Inter, system-ui, sans-serif",
    heading: "Inter, system-ui, sans-serif",
  },
} as const

export const VALIDATION = {
  password: {
    minLength: 6,
    maxLength: 50,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecialChar: true,
  },
  phone: {
    minLength: 10,
    maxLength: 15,
    pattern: /^\+?[1-9]\d{1,14}$/,
  },
  email: {
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  },
  booking: {
    minAdvanceHours: 2,
    maxAdvanceDays: 30,
    minDurationHours: 4,
    maxDurationDays: 30,
  },
} as const

export const PAGINATION = {
  defaultPageSize: 10,
  maxPageSize: 100,
} as const

export const DATE_FORMATS = {
  display: "MMM DD, YYYY",
  input: "YYYY-MM-DD",
  time: "HH:mm",
  datetime: "YYYY-MM-DD HH:mm:ss",
} as const

export const FILE_UPLOAD = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ["image/jpeg", "image/png", "image/webp", "application/pdf"],
  imageTypes: ["image/jpeg", "image/png", "image/webp"],
  documentTypes: ["application/pdf"],
} as const

export const CONTACT = {
  email: "support@carbooking.com",
  phone: "+1 234-567-8900",
  address: "123 Booking Street, City, Country",
  socialMedia: {
    facebook: "https://facebook.com/carbooking",
    twitter: "https://twitter.com/carbooking",
    instagram: "https://instagram.com/carbooking",
  },
} as const
