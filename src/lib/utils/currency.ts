type CurrencyCode = "USD" | "EUR" | "GBP"

interface CurrencyFormat {
  symbol: string
  position: "before" | "after"
  decimalPlaces: number
  thousandsSeparator: string
  decimalSeparator: string
}

const CURRENCY_FORMATS: Record<CurrencyCode, CurrencyFormat> = {
  USD: {
    symbol: "$",
    position: "before",
    decimalPlaces: 2,
    thousandsSeparator: ",",
    decimalSeparator: "."
  },
  EUR: {
    symbol: "€",
    position: "after",
    decimalPlaces: 2,
    thousandsSeparator: ".",
    decimalSeparator: ","
  },
  GBP: {
    symbol: "£",
    position: "before",
    decimalPlaces: 2,
    thousandsSeparator: ",",
    decimalSeparator: "."
  }
}

export const formatCurrency = (
  amount: number,
  currencyCode: CurrencyCode = "USD",
  options: Partial<CurrencyFormat> = {}
): string => {
  const format = { ...CURRENCY_FORMATS[currencyCode], ...options }
  
  const parts = amount.toFixed(format.decimalPlaces).split(".")
  
  // Format the whole number part with thousands separator
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, format.thousandsSeparator)
  
  // Join whole and decimal parts with decimal separator
  const value = parts.join(format.decimalSeparator)
  
  // Add currency symbol in correct position
  return format.position === "before" 
    ? `${format.symbol}${value}`
    : `${value}${format.symbol}`
}

export const convertCurrency = async (
  amount: number,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode
): Promise<number> => {
  // In a real app, this would call an exchange rate API
  // For now, using static conversion rates
  const rates: Record<CurrencyCode, Record<CurrencyCode, number>> = {
    USD: { EUR: 0.85, GBP: 0.73, USD: 1 },
    EUR: { USD: 1.18, GBP: 0.86, EUR: 1 },
    GBP: { USD: 1.37, EUR: 1.16, GBP: 1 }
  }

  return amount * rates[fromCurrency][toCurrency]
}

export const calculateTotal = (
  basePrice: number,
  taxRate: number = 0,
  discountAmount: number = 0,
  fees: number = 0
): number => {
  const subtotal = basePrice * (1 + taxRate)
  return Math.max(0, subtotal + fees - discountAmount)
}

export const formatPriceRange = (
  minPrice: number,
  maxPrice: number,
  currencyCode: CurrencyCode = "USD"
): string => {
  return `${formatCurrency(minPrice, currencyCode)} - ${formatCurrency(maxPrice, currencyCode)}`
}

export const calculateDiscountedPrice = (
  originalPrice: number,
  discountPercentage: number
): number => {
  const discount = originalPrice * (discountPercentage / 100)
  return Math.max(0, originalPrice - discount)
}

export const formatDiscount = (discountPercentage: number): string => {
  return `${discountPercentage}% OFF`
}

export const calculateMonthlyPayment = (
  totalAmount: number,
  annualInterestRate: number,
  numberOfMonths: number
): number => {
  const monthlyInterestRate = annualInterestRate / 12 / 100
  
  if (monthlyInterestRate === 0) {
    return totalAmount / numberOfMonths
  }
  
  const numerator = totalAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)
  const denominator = Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1
  
  return numerator / denominator
}

export const formatTaxAmount = (
  amount: number,
  taxRate: number,
  currencyCode: CurrencyCode = "USD"
): string => {
  const taxAmount = amount * taxRate
  return formatCurrency(taxAmount, currencyCode)
}

export const calculateServiceFee = (
  basePrice: number,
  feePercentage: number,
  minFee: number,
  maxFee: number
): number => {
  const fee = basePrice * (feePercentage / 100)
  return Math.min(Math.max(fee, minFee), maxFee)
}
