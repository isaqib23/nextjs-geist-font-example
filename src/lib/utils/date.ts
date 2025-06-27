import { DATE_FORMATS } from "@/config/constants"

type DateFormat = keyof typeof DATE_FORMATS

export const formatDate = (date: Date | string, format: DateFormat = "display"): string => {
  const d = new Date(date)
  
  // Handle invalid dates
  if (isNaN(d.getTime())) {
    return "Invalid Date"
  }

  const year = d.getFullYear()
  const month = d.getMonth()
  const day = d.getDate()
  const hours = d.getHours()
  const minutes = d.getMinutes()
  const seconds = d.getSeconds()

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  
  const monthShort = monthNames[month].slice(0, 3)

  const pad = (num: number): string => num.toString().padStart(2, "0")

  switch (format) {
    case "input":
      return `${year}-${pad(month + 1)}-${pad(day)}`
    
    case "time":
      return `${pad(hours)}:${pad(minutes)}`
    
    case "datetime":
      return `${year}-${pad(month + 1)}-${pad(day)} ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    
    case "display":
    default:
      return `${monthShort} ${pad(day)}, ${year}`
  }
}

export const getDateDifference = (
  startDate: Date,
  endDate: Date
): { days: number; hours: number; minutes: number } => {
  const diff = endDate.getTime() - startDate.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  return { days, hours, minutes }
}

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export const addHours = (date: Date, hours: number): Date => {
  const result = new Date(date)
  result.setHours(result.getHours() + hours)
  return result
}

export const isWithinRange = (date: Date, startDate: Date, endDate: Date): boolean => {
  return date >= startDate && date <= endDate
}

export const getRelativeTimeString = (date: Date): string => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `${days} day${days === 1 ? "" : "s"} ago`
  }
  if (hours > 0) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`
  }
  if (minutes > 0) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`
  }
  return "Just now"
}
