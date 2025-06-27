// Theme Types
export type ColorScheme = "light" | "dark" | "system"

export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: {
    primary: string
    secondary: string
    disabled: string
  }
  border: string
  error: string
  success: string
  warning: string
  info: string
}

export interface ThemeConfig {
  colorScheme: ColorScheme
  colors: {
    light: ThemeColors
    dark: ThemeColors
  }
  borderRadius: {
    sm: string
    md: string
    lg: string
    full: string
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  typography: {
    fontFamily: string
    fontSize: {
      xs: string
      sm: string
      base: string
      lg: string
      xl: string
      "2xl": string
      "3xl": string
    }
    fontWeight: {
      light: number
      normal: number
      medium: number
      semibold: number
      bold: number
    }
    lineHeight: {
      tight: number
      normal: number
      relaxed: number
    }
  }
  shadows: {
    sm: string
    md: string
    lg: string
  }
  transitions: {
    fast: string
    normal: string
    slow: string
  }
  breakpoints: {
    sm: string
    md: string
    lg: string
    xl: string
    "2xl": string
  }
}

// API Types
export interface ApiResponse<T> {
  data: T | null
  error: string | null
  status: number
}

export interface ApiConfig {
  baseURL: string
  timeout: number
  headers: Record<string, string>
}

export interface RequestConfig {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  headers?: Record<string, string>
  params?: Record<string, string>
  body?: any
  timeout?: number
  retry?: number
  cache?: RequestCache
}

// Search Types
export interface SearchFilters {
  category?: string[]
  priceRange?: {
    min: number
    max: number
  }
  features?: string[]
  transmission?: "automatic" | "manual"
  seats?: number
  availability?: {
    startDate: Date
    endDate: Date
  }
  location?: {
    latitude: number
    longitude: number
    radius: number
  }
  rating?: number
  sortBy?: "price_asc" | "price_desc" | "rating" | "distance"
}

export interface SearchResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  filters: SearchFilters
}

// Pricing Types
export interface PriceBreakdown {
  basePrice: number
  taxes: number
  fees: number
  discounts: number
  total: number
  currency: string
}

export interface PricingRule {
  id: string
  name: string
  type: "fixed" | "percentage"
  value: number
  minAmount?: number
  maxAmount?: number
  startDate?: Date
  endDate?: Date
  conditions?: {
    minDuration?: number
    maxDuration?: number
    carCategories?: string[]
    userTypes?: string[]
    locations?: string[]
  }
}

// Statistics Types
export interface BookingStats {
  total: number
  completed: number
  cancelled: number
  revenue: number
  averageValue: number
  conversionRate: number
}

export interface UserStats {
  total: number
  active: number
  new: {
    startDate: Date
    endDate: Date
    count: number
  }
  demographics: Record<string, number>
}

export interface DriverStats {
  total: number
  active: number
  averageRating: number
  completionRate: number
  topPerformers: Array<{
    id: string
    name: string
    rides: number
    rating: number
  }>
}

export interface VehicleStats {
  total: number
  active: number
  utilization: number
  categoryBreakdown: Record<string, number>
  maintenanceNeeded: number
}

// Notification Types
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

export type NotificationType = typeof NOTIFICATION_TYPES[keyof typeof NOTIFICATION_TYPES]

// Utility Types
export type AsyncFunction<T = any> = () => Promise<T>
export type ErrorHandler = (error: Error) => void
export type LoadingHandler = (loading: boolean) => void
