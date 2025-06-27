interface PriceBreakdown {
  basePrice: number
  taxes: number
  fees: number
  discounts: number
  total: number
  currency: string
}

interface PricingRule {
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

interface ServiceFee {
  name: string
  type: "fixed" | "percentage"
  value: number
  minAmount?: number
  maxAmount?: number
}

const DEFAULT_TAX_RATE = 0.20 // 20% tax
const DEFAULT_SERVICE_FEES: ServiceFee[] = [
  {
    name: "Platform Fee",
    type: "percentage",
    value: 0.10, // 10%
    minAmount: 5,
    maxAmount: 50
  },
  {
    name: "Insurance Fee",
    type: "fixed",
    value: 10
  }
]

export const calculateBasePrice = (
  baseRate: number,
  duration: number,
  distance: number,
  carCategory: string
): number => {
  // Base calculation using time and distance
  const timeBasedPrice = baseRate * duration
  const distanceBasedPrice = calculateDistancePrice(distance, carCategory)
  
  return timeBasedPrice + distanceBasedPrice
}

export const calculatePriceBreakdown = (
  basePrice: number,
  duration: number,
  options: {
    currency?: string
    taxRate?: number
    serviceFees?: ServiceFee[]
    discountRules?: PricingRule[]
    userType?: string
    carCategory?: string
    location?: string
  } = {}
): PriceBreakdown => {
  const {
    currency = "USD",
    taxRate = DEFAULT_TAX_RATE,
    serviceFees = DEFAULT_SERVICE_FEES,
    discountRules = [],
    userType,
    carCategory,
    location
  } = options

  // Calculate fees
  const fees = calculateServiceFees(basePrice, serviceFees)

  // Calculate applicable discounts
  const discounts = calculateDiscounts(
    basePrice,
    discountRules,
    {
      duration,
      userType,
      carCategory,
      location
    }
  )

  // Calculate tax on (base price + fees - discounts)
  const taxableAmount = basePrice + fees - discounts
  const taxes = taxableAmount * taxRate

  // Calculate total
  const total = taxableAmount + taxes

  return {
    basePrice,
    taxes,
    fees,
    discounts,
    total,
    currency
  }
}

export const calculateServiceFees = (
  basePrice: number,
  fees: ServiceFee[]
): number => {
  return fees.reduce((total, fee) => {
    let feeAmount = 0

    if (fee.type === "fixed") {
      feeAmount = fee.value
    } else {
      // Percentage fee
      feeAmount = basePrice * fee.value
    }

    // Apply min/max limits if specified
    if (fee.minAmount !== undefined) {
      feeAmount = Math.max(feeAmount, fee.minAmount)
    }
    if (fee.maxAmount !== undefined) {
      feeAmount = Math.min(feeAmount, fee.maxAmount)
    }

    return total + feeAmount
  }, 0)
}

export const calculateDiscounts = (
  basePrice: number,
  rules: PricingRule[],
  context: {
    duration: number
    userType?: string
    carCategory?: string
    location?: string
  }
): number => {
  const now = new Date()
  
  return rules.reduce((totalDiscount, rule) => {
    // Check if rule is currently active
    if (rule.startDate && rule.startDate > now) return totalDiscount
    if (rule.endDate && rule.endDate < now) return totalDiscount

    // Check conditions
    if (rule.conditions) {
      if (rule.conditions.minDuration && context.duration < rule.conditions.minDuration) {
        return totalDiscount
      }
      if (rule.conditions.maxDuration && context.duration > rule.conditions.maxDuration) {
        return totalDiscount
      }
      if (rule.conditions.carCategories && context.carCategory &&
          !rule.conditions.carCategories.includes(context.carCategory)) {
        return totalDiscount
      }
      if (rule.conditions.userTypes && context.userType &&
          !rule.conditions.userTypes.includes(context.userType)) {
        return totalDiscount
      }
      if (rule.conditions.locations && context.location &&
          !rule.conditions.locations.includes(context.location)) {
        return totalDiscount
      }
    }

    // Calculate discount amount
    let discountAmount = 0
    if (rule.type === "fixed") {
      discountAmount = rule.value
    } else {
      // Percentage discount
      discountAmount = basePrice * (rule.value / 100)
    }

    // Apply min/max limits if specified
    if (rule.minAmount !== undefined) {
      discountAmount = Math.max(discountAmount, rule.minAmount)
    }
    if (rule.maxAmount !== undefined) {
      discountAmount = Math.min(discountAmount, rule.maxAmount)
    }

    return totalDiscount + discountAmount
  }, 0)
}

export const calculateDistancePrice = (
  distance: number, // in kilometers
  carCategory: string
): number => {
  // Different rates per kilometer based on car category
  const ratePerKm = {
    economy: 0.5,
    business: 0.8,
    vip: 1.2
  }[carCategory.toLowerCase()] || 0.5

  return distance * ratePerKm
}

export const calculateCancellationFee = (
  bookingTotal: number,
  hoursBeforePickup: number
): number => {
  if (hoursBeforePickup >= 48) {
    return 0 // No fee
  } else if (hoursBeforePickup >= 24) {
    return bookingTotal * 0.25 // 25% fee
  } else if (hoursBeforePickup >= 12) {
    return bookingTotal * 0.50 // 50% fee
  } else {
    return bookingTotal * 0.75 // 75% fee
  }
}

export const calculateAffiliateCommission = (
  bookingTotal: number,
  affiliateLevel: "basic" | "silver" | "gold" | "platinum"
): number => {
  const commissionRates = {
    basic: 0.05, // 5%
    silver: 0.08, // 8%
    gold: 0.12, // 12%
    platinum: 0.15 // 15%
  }

  return bookingTotal * commissionRates[affiliateLevel]
}

export const roundToDecimalPlaces = (
  number: number,
  decimalPlaces: number = 2
): number => {
  const factor = Math.pow(10, decimalPlaces)
  return Math.round(number * factor) / factor
}

export const formatPriceRange = (
  min: number,
  max: number,
  currency: string = "USD"
): string => {
  return `${currency} ${roundToDecimalPlaces(min)} - ${roundToDecimalPlaces(max)}`
}
