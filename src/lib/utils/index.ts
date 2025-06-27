import {
  type ColorScheme,
  type ThemeColors,
  type ThemeConfig,
  type ApiResponse,
  type ApiConfig,
  type RequestConfig,
  type SearchFilters,
  type SearchResult,
  type PriceBreakdown,
  type PricingRule,
  type BookingStats,
  type UserStats,
  type DriverStats,
  type VehicleStats,
  type NotificationType,
  type AsyncFunction,
  type ErrorHandler,
  type LoadingHandler,
  NOTIFICATION_TYPES
} from './types'

// Analytics
export { analytics, trackAsyncError, measurePerformance } from './analytics'

// Re-export types
export type {
  ColorScheme,
  ThemeColors,
  ThemeConfig,
  ApiResponse,
  ApiConfig,
  RequestConfig,
  SearchFilters,
  SearchResult,
  PriceBreakdown,
  PricingRule,
  BookingStats,
  UserStats,
  DriverStats,
  VehicleStats,
  NotificationType,
  AsyncFunction,
  ErrorHandler,
  LoadingHandler
}

// Export constants
export { NOTIFICATION_TYPES }

// API
export { api } from './api'

// Currency
export { 
  formatCurrency,
  convertCurrency,
  calculateTotal,
  formatPriceRange,
  calculateDiscountedPrice,
  formatDiscount,
  calculateMonthlyPayment,
  formatTaxAmount,
  calculateServiceFee
} from './currency'

// Date
export {
  formatDate,
  getDateDifference,
  addDays,
  addHours,
  isWithinRange,
  getRelativeTimeString
} from './date'

// Geocoding
export {
  geocodeAddress,
  reverseGeocode,
  calculateRoute,
  calculateDistance,
  formatDistance,
  formatDuration,
  isWithinRadius,
  optimizeRoute,
  getLocationSuggestions,
  validateCoordinates,
  encodePolyline
} from './geocoding'

// Notification
export {
  sendNotification,
  markNotificationAsRead,
  getUnreadNotificationCount,
  deleteNotification
} from './notification'

// Pricing
export {
  calculateBasePrice,
  calculatePriceBreakdown,
  calculateServiceFees,
  calculateDiscounts,
  calculateDistancePrice,
  calculateCancellationFee,
  calculateAffiliateCommission,
  roundToDecimalPlaces
} from './pricing'

// Search
export {
  searchCars,
  buildSearchQuery,
  getAvailableFeatures,
  calculateRelevanceScore,
  sortSearchResults,
  generateSearchSuggestions,
  validateSearchFilters
} from './search'

// Statistics
export {
  calculateBookingStats,
  calculateUserStats,
  calculateDriverStats,
  calculateVehicleStats,
  calculateRevenueBreakdown,
  calculatePerformanceMetrics,
  generateTimeSeriesData,
  calculateGrowthRate,
  calculateUtilizationRate,
  calculateRetentionRate,
  generateReport
} from './statistics'

// Storage
export {
  uploadFile,
  deleteFile,
  getFileMetadata,
  generatePresignedUrl,
  isImageFile,
  isDocumentFile,
  formatFileSize,
  validateImageDimensions,
  compressImage
} from './storage'

// Theme
export { themeManager, useTheme } from './theme'

// Validation
export {
  validatePassword,
  validateEmail,
  validatePhone,
  validateBookingDates,
  validateFileUpload
} from './validation'

// Helper function to handle async operations with loading state
export const withLoading = async <T>(
  operation: AsyncFunction<T>,
  setLoading?: LoadingHandler
): Promise<T> => {
  try {
    setLoading?.(true)
    return await operation()
  } finally {
    setLoading?.(false)
  }
}

// Helper function to retry failed operations
export const withRetry = async <T>(
  operation: AsyncFunction<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> => {
  let lastError: Error | undefined
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delayMs * attempt))
      }
    }
  }
  
  throw lastError
}

// Helper function to handle errors with fallback
export const withFallback = async <T>(
  operation: AsyncFunction<T>,
  fallback: T,
  errorHandler?: ErrorHandler
): Promise<T> => {
  try {
    return await operation()
  } catch (error) {
    errorHandler?.(error as Error)
    return fallback
  }
}
