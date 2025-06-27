import { 
  type SearchFilters, 
  type SearchResult,
  type ErrorHandler
} from "./types"

interface CarFeature {
  id: string
  name: string
  category: "safety" | "comfort" | "performance" | "technology"
}

const FEATURES: CarFeature[] = [
  { id: "gps", name: "GPS Navigation", category: "technology" },
  { id: "bluetooth", name: "Bluetooth", category: "technology" },
  { id: "parking_sensors", name: "Parking Sensors", category: "safety" },
  { id: "cruise_control", name: "Cruise Control", category: "comfort" },
  { id: "leather_seats", name: "Leather Seats", category: "comfort" },
  { id: "sunroof", name: "Sunroof", category: "comfort" },
  { id: "air_conditioning", name: "Air Conditioning", category: "comfort" },
  { id: "airbags", name: "Airbags", category: "safety" },
  { id: "abs", name: "ABS", category: "safety" },
  { id: "turbo", name: "Turbo Engine", category: "performance" }
]

export const searchCars = async <T>(
  query: string,
  filters: SearchFilters,
  page: number = 1,
  pageSize: number = 10,
  errorHandler?: ErrorHandler
): Promise<SearchResult<T>> => {
  try {
    // In a real app, this would call your API
    console.log('Searching cars with:', { query, filters, page, pageSize })

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))

    return {
      items: [],
      total: 0,
      page,
      pageSize,
      totalPages: 0,
      filters
    }
  } catch (error) {
    errorHandler?.(error as Error)
    return {
      items: [],
      total: 0,
      page,
      pageSize,
      totalPages: 0,
      filters
    }
  }
}

export const buildSearchQuery = (
  baseQuery: string,
  filters: SearchFilters
): string => {
  const queryParts: string[] = [baseQuery]

  if (filters.category?.length) {
    queryParts.push(`category:(${filters.category.join(" OR ")})`)
  }

  if (filters.priceRange) {
    queryParts.push(`price:[${filters.priceRange.min} TO ${filters.priceRange.max}]`)
  }

  if (filters.features?.length) {
    queryParts.push(`features:(${filters.features.join(" AND ")})`)
  }

  if (filters.transmission) {
    queryParts.push(`transmission:${filters.transmission}`)
  }

  if (filters.seats) {
    queryParts.push(`seats:${filters.seats}`)
  }

  if (filters.rating) {
    queryParts.push(`rating:>=${filters.rating}`)
  }

  return queryParts.filter(Boolean).join(" AND ")
}

export const getAvailableFeatures = (category?: string): CarFeature[] => {
  if (!category) return FEATURES
  return FEATURES.filter(feature => feature.category === category)
}

export const calculateRelevanceScore = (
  car: Record<string, unknown>,
  query: string,
  userPreferences: Record<string, number>
): number => {
  let score = 0

  // Text relevance (simplified)
  const queryTerms = query.toLowerCase().split(" ")
  const carText = `${car.make} ${car.model} ${car.category}`.toLowerCase()
  
  queryTerms.forEach(term => {
    if (carText.includes(term)) score += 1
  })

  // Feature match
  if (Array.isArray(car.features)) {
    car.features.forEach((feature: string) => {
      if (userPreferences[feature]) {
        score += userPreferences[feature]
      }
    })
  }

  // Price factor (assuming lower price is better)
  if (typeof car.price === 'number') {
    const maxPrice = 1000 // Example maximum price
    const priceFactor = 1 - (car.price / maxPrice)
    score += priceFactor
  }

  // Rating factor
  if (typeof car.rating === 'number') {
    score += car.rating / 5
  }

  return score
}

export const sortSearchResults = <T extends Record<string, unknown>>(
  results: T[],
  sortBy: SearchFilters["sortBy"],
  userLocation?: { latitude: number; longitude: number }
): T[] => {
  const sorted = [...results]

  switch (sortBy) {
    case "price_asc":
      return sorted.sort((a, b) => 
        (a.price as number || 0) - (b.price as number || 0)
      )
    
    case "price_desc":
      return sorted.sort((a, b) => 
        (b.price as number || 0) - (a.price as number || 0)
      )
    
    case "rating":
      return sorted.sort((a, b) => 
        ((b.rating as number) || 0) - ((a.rating as number) || 0)
      )
    
    case "distance":
      if (!userLocation) return sorted
      
      return sorted.sort((a, b) => {
        const locationA = a.location as { latitude: number; longitude: number } | undefined
        const locationB = b.location as { latitude: number; longitude: number } | undefined
        
        if (!locationA || !locationB) return 0
        
        const distanceA = calculateDistance(userLocation, locationA)
        const distanceB = calculateDistance(userLocation, locationB)
        return distanceA - distanceB
      })
    
    default:
      return sorted
  }
}

const calculateDistance = (
  point1: { latitude: number; longitude: number },
  point2: { latitude: number; longitude: number }
): number => {
  // Haversine formula
  const R = 6371 // Earth's radius in km
  const dLat = toRad(point2.latitude - point1.latitude)
  const dLon = toRad(point2.longitude - point1.longitude)
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(point1.latitude)) * Math.cos(toRad(point2.latitude)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

const toRad = (degrees: number): number => {
  return degrees * Math.PI / 180
}

export const generateSearchSuggestions = (
  query: string,
  recentSearches: string[] = [],
  popularLocations: string[] = []
): string[] => {
  const suggestions: string[] = []

  // Add matching recent searches
  suggestions.push(
    ...recentSearches.filter(search => 
      search.toLowerCase().includes(query.toLowerCase())
    )
  )

  // Add matching popular locations
  suggestions.push(
    ...popularLocations.filter(location =>
      location.toLowerCase().includes(query.toLowerCase())
    )
  )

  // Remove duplicates and limit results
  return Array.from(new Set(suggestions)).slice(0, 5)
}

export const validateSearchFilters = (filters: SearchFilters): string[] => {
  const errors: string[] = []

  if (filters.priceRange) {
    if (filters.priceRange.min < 0) {
      errors.push("Minimum price cannot be negative")
    }
    if (filters.priceRange.min > filters.priceRange.max) {
      errors.push("Minimum price cannot be greater than maximum price")
    }
  }

  if (filters.availability) {
    if (filters.availability.startDate > filters.availability.endDate) {
      errors.push("Start date cannot be after end date")
    }
    if (filters.availability.startDate < new Date()) {
      errors.push("Start date cannot be in the past")
    }
  }

  if (filters.location?.radius && filters.location.radius <= 0) {
    errors.push("Search radius must be positive")
  }

  if (filters.rating && (filters.rating < 1 || filters.rating > 5)) {
    errors.push("Rating must be between 1 and 5")
  }

  return errors
}
