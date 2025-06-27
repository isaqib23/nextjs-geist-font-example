import { NOTIFICATION_TYPES } from "@/config/constants"

type NotificationType = (typeof NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_TYPES]

interface BaseNotificationData {
  email?: string
  phone?: string
  bookingId?: string
  driverName?: string
  vehicleInfo?: string
}

interface NotificationPayload {
  title: string
  message: string
  type: NotificationType
  recipientId: string
  data?: BaseNotificationData
}

interface EmailConfig {
  to: string | undefined
  subject: string
  template: string
  context: Record<string, any>
}

interface SMSConfig {
  to: string | undefined
  message: string
}

const isValidData = (data: BaseNotificationData | undefined): data is BaseNotificationData => {
  return data !== undefined
}

export const sendNotification = async (payload: NotificationPayload): Promise<boolean> => {
  try {
    // In a real app, this would send to a notification service
    console.log('Sending notification:', payload)

    if (!isValidData(payload.data)) {
      console.error('Invalid notification data')
      return false
    }

    // Send appropriate notifications based on type
    switch (payload.type) {
      case NOTIFICATION_TYPES.BOOKING_CONFIRMED:
        await Promise.all([
          sendEmail({
            to: payload.data.email,
            subject: "Booking Confirmed",
            template: "booking-confirmation",
            context: payload.data
          }),
          sendSMS({
            to: payload.data.phone,
            message: `Your booking #${payload.data.bookingId} has been confirmed.`
          }),
          saveInAppNotification(payload)
        ])
        break

      case NOTIFICATION_TYPES.BOOKING_UPDATED:
        await Promise.all([
          sendEmail({
            to: payload.data.email,
            subject: "Booking Updated",
            template: "booking-update",
            context: payload.data
          }),
          saveInAppNotification(payload)
        ])
        break

      case NOTIFICATION_TYPES.BOOKING_CANCELLED:
        await Promise.all([
          sendEmail({
            to: payload.data.email,
            subject: "Booking Cancelled",
            template: "booking-cancellation",
            context: payload.data
          }),
          sendSMS({
            to: payload.data.phone,
            message: `Your booking #${payload.data.bookingId} has been cancelled.`
          }),
          saveInAppNotification(payload)
        ])
        break

      case NOTIFICATION_TYPES.DRIVER_ASSIGNED:
        await Promise.all([
          sendEmail({
            to: payload.data.email,
            subject: "Driver Assigned",
            template: "driver-assigned",
            context: payload.data
          }),
          sendSMS({
            to: payload.data.phone,
            message: `Your driver ${payload.data.driverName} has been assigned to booking #${payload.data.bookingId}.`
          }),
          saveInAppNotification(payload)
        ])
        break

      case NOTIFICATION_TYPES.RIDE_STARTED:
        await Promise.all([
          sendSMS({
            to: payload.data.phone,
            message: `Your ride has started. Driver: ${payload.data.driverName}, Vehicle: ${payload.data.vehicleInfo}`
          }),
          saveInAppNotification(payload)
        ])
        break

      case NOTIFICATION_TYPES.RIDE_COMPLETED:
        await Promise.all([
          sendEmail({
            to: payload.data.email,
            subject: "Ride Completed",
            template: "ride-completion",
            context: payload.data
          }),
          saveInAppNotification(payload)
        ])
        break

      case NOTIFICATION_TYPES.PAYMENT_RECEIVED:
        await Promise.all([
          sendEmail({
            to: payload.data.email,
            subject: "Payment Received",
            template: "payment-confirmation",
            context: payload.data
          }),
          saveInAppNotification(payload)
        ])
        break

      case NOTIFICATION_TYPES.REGISTRATION_APPROVED:
        await Promise.all([
          sendEmail({
            to: payload.data.email,
            subject: "Registration Approved",
            template: "registration-approval",
            context: payload.data
          }),
          sendSMS({
            to: payload.data.phone,
            message: "Your registration has been approved. You can now log in to your account."
          }),
          saveInAppNotification(payload)
        ])
        break

      default:
        await saveInAppNotification(payload)
    }

    return true
  } catch (error) {
    console.error('Failed to send notification:', error)
    return false
  }
}

const sendEmail = async (config: EmailConfig): Promise<boolean> => {
  try {
    if (!config.to) {
      console.warn('No email address provided')
      return false
    }
    // In a real app, this would use a service like SendGrid, AWS SES, etc.
    console.log('Sending email:', config)
    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

const sendSMS = async (config: SMSConfig): Promise<boolean> => {
  try {
    if (!config.to) {
      console.warn('No phone number provided')
      return false
    }
    // In a real app, this would use a service like Twilio, AWS SNS, etc.
    console.log('Sending SMS:', config)
    return true
  } catch (error) {
    console.error('Failed to send SMS:', error)
    return false
  }
}

const saveInAppNotification = async (payload: NotificationPayload): Promise<boolean> => {
  try {
    // In a real app, this would save to a database
    console.log('Saving in-app notification:', payload)
    return true
  } catch (error) {
    console.error('Failed to save in-app notification:', error)
    return false
  }
}

export const markNotificationAsRead = async (notificationId: string): Promise<boolean> => {
  try {
    // In a real app, this would update the database
    console.log('Marking notification as read:', notificationId)
    return true
  } catch (error) {
    console.error('Failed to mark notification as read:', error)
    return false
  }
}

export const getUnreadNotificationCount = async (userId: string): Promise<number> => {
  try {
    // In a real app, this would query the database
    console.log('Getting unread notification count for user:', userId)
    return 0
  } catch (error) {
    console.error('Failed to get unread notification count:', error)
    return 0
  }
}

export const deleteNotification = async (notificationId: string): Promise<boolean> => {
  try {
    // In a real app, this would delete from the database
    console.log('Deleting notification:', notificationId)
    return true
  } catch (error) {
    console.error('Failed to delete notification:', error)
    return false
  }
}
