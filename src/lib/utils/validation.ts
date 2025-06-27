import { VALIDATION, FILE_UPLOAD } from "@/config/constants"

export const validatePassword = (password: string): { isValid: boolean; error?: string } => {
  if (password.length < VALIDATION.password.minLength) {
    return {
      isValid: false,
      error: `Password must be at least ${VALIDATION.password.minLength} characters long`,
    }
  }

  if (password.length > VALIDATION.password.maxLength) {
    return {
      isValid: false,
      error: `Password must not exceed ${VALIDATION.password.maxLength} characters`,
    }
  }

  if (VALIDATION.password.requireUppercase && !/[A-Z]/.test(password)) {
    return {
      isValid: false,
      error: "Password must contain at least one uppercase letter",
    }
  }

  if (VALIDATION.password.requireLowercase && !/[a-z]/.test(password)) {
    return {
      isValid: false,
      error: "Password must contain at least one lowercase letter",
    }
  }

  if (VALIDATION.password.requireNumber && !/\d/.test(password)) {
    return {
      isValid: false,
      error: "Password must contain at least one number",
    }
  }

  if (VALIDATION.password.requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      isValid: false,
      error: "Password must contain at least one special character",
    }
  }

  return { isValid: true }
}

export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  if (!VALIDATION.email.pattern.test(email)) {
    return {
      isValid: false,
      error: "Please enter a valid email address",
    }
  }

  return { isValid: true }
}

export const validatePhone = (phone: string): { isValid: boolean; error?: string } => {
  if (phone.length < VALIDATION.phone.minLength) {
    return {
      isValid: false,
      error: `Phone number must be at least ${VALIDATION.phone.minLength} digits`,
    }
  }

  if (phone.length > VALIDATION.phone.maxLength) {
    return {
      isValid: false,
      error: `Phone number must not exceed ${VALIDATION.phone.maxLength} digits`,
    }
  }

  if (!VALIDATION.phone.pattern.test(phone)) {
    return {
      isValid: false,
      error: "Please enter a valid phone number",
    }
  }

  return { isValid: true }
}

export const validateBookingDates = (
  pickupDate: Date,
  returnDate: Date
): { isValid: boolean; error?: string } => {
  const now = new Date()
  const minDate = new Date(now.getTime() + VALIDATION.booking.minAdvanceHours * 60 * 60 * 1000)
  const maxDate = new Date(now.getTime() + VALIDATION.booking.maxAdvanceDays * 24 * 60 * 60 * 1000)

  if (pickupDate < minDate) {
    return {
      isValid: false,
      error: `Pickup must be at least ${VALIDATION.booking.minAdvanceHours} hours in advance`,
    }
  }

  if (pickupDate > maxDate) {
    return {
      isValid: false,
      error: `Pickup cannot be more than ${VALIDATION.booking.maxAdvanceDays} days in advance`,
    }
  }

  const durationHours = (returnDate.getTime() - pickupDate.getTime()) / (60 * 60 * 1000)
  
  if (durationHours < VALIDATION.booking.minDurationHours) {
    return {
      isValid: false,
      error: `Booking duration must be at least ${VALIDATION.booking.minDurationHours} hours`,
    }
  }

  if (durationHours > VALIDATION.booking.maxDurationDays * 24) {
    return {
      isValid: false,
      error: `Booking duration cannot exceed ${VALIDATION.booking.maxDurationDays} days`,
    }
  }

  return { isValid: true }
}

type AllowedFileType = typeof FILE_UPLOAD.allowedTypes[number]

export const validateFileUpload = (
  file: File
): { isValid: boolean; error?: string } => {
  if (file.size > FILE_UPLOAD.maxSize) {
    return {
      isValid: false,
      error: `File size must not exceed ${FILE_UPLOAD.maxSize / (1024 * 1024)}MB`,
    }
  }

  if (!FILE_UPLOAD.allowedTypes.includes(file.type as AllowedFileType)) {
    return {
      isValid: false,
      error: "File type not supported",
    }
  }

  return { isValid: true }
}
