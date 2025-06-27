interface PageView {
  path: string
  timestamp: Date
  userId?: string
  sessionId: string
  referrer?: string
  deviceType: string
}

interface Event {
  name: string
  timestamp: Date
  userId?: string
  sessionId: string
  properties: Record<string, any>
}

interface UserSession {
  sessionId: string
  userId?: string
  startTime: Date
  lastActive: Date
  deviceInfo: {
    type: string
    browser: string
    os: string
  }
}

type EventName = 
  | "booking_started"
  | "booking_completed"
  | "booking_abandoned"
  | "booking_step"
  | "search_performed"
  | "filter_applied"
  | "car_viewed"
  | "payment_initiated"
  | "payment_completed"
  | "payment_failed"
  | "error_occurred"
  | "feature_used"
  | "user_identified"
  | "performance_measure"

class Analytics {
  private static instance: Analytics
  private sessionId: string
  private initialized: boolean = false

  private constructor() {
    this.sessionId = this.generateSessionId()
  }

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics()
    }
    return Analytics.instance
  }

  public init(): void {
    if (this.initialized) return
    
    // Initialize session tracking
    this.trackSession()
    
    // Track page views
    if (typeof window !== 'undefined') {
      this.trackPageView(window.location.pathname)
    }
    
    this.initialized = true
  }

  public trackPageView(path: string): void {
    const pageView: PageView = {
      path,
      timestamp: new Date(),
      sessionId: this.sessionId,
      deviceType: this.getDeviceType(),
      referrer: typeof document !== 'undefined' ? document.referrer : undefined
    }

    // In a real app, this would send to an analytics service
    console.log('Page View:', pageView)
  }

  public trackEvent(name: EventName, properties: Record<string, any> = {}): void {
    const event: Event = {
      name,
      timestamp: new Date(),
      sessionId: this.sessionId,
      properties: {
        ...properties,
        deviceType: this.getDeviceType()
      }
    }

    // In a real app, this would send to an analytics service
    console.log('Event:', event)
  }

  public setUserId(userId: string): void {
    this.trackEvent('user_identified', { userId })
  }

  public trackError(error: Error, context: Record<string, any> = {}): void {
    this.trackEvent('error_occurred', {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack
      },
      ...context
    })
  }

  public trackFeatureUsage(featureName: string, properties: Record<string, any> = {}): void {
    this.trackEvent('feature_used', {
      feature: featureName,
      ...properties
    })
  }

  public trackBookingFlow(step: string, properties: Record<string, any> = {}): void {
    this.trackEvent('booking_step', {
      step,
      ...properties
    })
  }

  public trackSearch(
    query: string,
    filters: Record<string, any>,
    resultCount: number
  ): void {
    this.trackEvent('search_performed', {
      query,
      filters,
      resultCount
    })
  }

  public trackPayment(
    amount: number,
    currency: string,
    status: 'initiated' | 'completed' | 'failed',
    properties: Record<string, any> = {}
  ): void {
    const eventName = `payment_${status}` as EventName
    this.trackEvent(eventName, {
      amount,
      currency,
      ...properties
    })
  }

  private trackSession(): void {
    const session: UserSession = {
      sessionId: this.sessionId,
      startTime: new Date(),
      lastActive: new Date(),
      deviceInfo: {
        type: this.getDeviceType(),
        browser: this.getBrowserInfo(),
        os: this.getOSInfo()
      }
    }

    // In a real app, this would send to an analytics service
    console.log('Session Started:', session)

    // Update last active timestamp periodically
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        session.lastActive = new Date()
        console.log('Session Updated:', session)
      })
    }
  }

  private generateSessionId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  private getDeviceType(): string {
    if (typeof window === 'undefined') return 'unknown'
    
    const ua = navigator.userAgent
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet'
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return 'mobile'
    }
    return 'desktop'
  }

  private getBrowserInfo(): string {
    if (typeof window === 'undefined') return 'unknown'
    
    const ua = navigator.userAgent
    const browsers = {
      chrome: /chrome/i,
      safari: /safari/i,
      firefox: /firefox/i,
      ie: /internet explorer/i,
      edge: /edge/i,
      opera: /opera/i,
    }

    for (const [browser, regex] of Object.entries(browsers)) {
      if (regex.test(ua)) return browser
    }
    
    return 'unknown'
  }

  private getOSInfo(): string {
    if (typeof window === 'undefined') return 'unknown'
    
    const ua = navigator.userAgent
    if (/(Mac|iPhone|iPod|iPad)/i.test(ua)) return 'ios'
    if (/Win/.test(ua)) return 'windows'
    if (/Android/.test(ua)) return 'android'
    if (/Linux/.test(ua)) return 'linux'
    
    return 'unknown'
  }
}

// Export a singleton instance
export const analytics = Analytics.getInstance()

// Helper function to track errors in async functions
export const trackAsyncError = async <T>(
  promise: Promise<T>,
  context: Record<string, any> = {}
): Promise<T> => {
  try {
    return await promise
  } catch (error) {
    analytics.trackError(error as Error, context)
    throw error
  }
}

// Helper function to measure performance
export const measurePerformance = async <T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> => {
  const startTime = performance.now()
  try {
    const result = await fn()
    const duration = performance.now() - startTime
    analytics.trackEvent('performance_measure', {
      name,
      duration,
      success: true
    })
    return result
  } catch (error) {
    const duration = performance.now() - startTime
    analytics.trackEvent('performance_measure', {
      name,
      duration,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    throw error
  }
}
