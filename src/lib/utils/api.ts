import { analytics } from "./analytics"
import { 
  type ApiResponse,
  type ApiConfig,
  type RequestConfig,
  type ErrorHandler
} from "./types"

const DEFAULT_CONFIG: ApiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
}

class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: unknown
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export class Api {
  private static instance: Api
  private config: ApiConfig
  private authToken?: string

  private constructor(config: ApiConfig = DEFAULT_CONFIG) {
    this.config = config
  }

  public static getInstance(config?: ApiConfig): Api {
    if (!Api.instance) {
      Api.instance = new Api(config)
    }
    return Api.instance
  }

  public setAuthToken(token: string): void {
    this.authToken = token
  }

  public clearAuthToken(): void {
    this.authToken = undefined
  }

  public async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const startTime = performance.now()

    try {
      const url = this.buildUrl(endpoint, config.params)
      const response = await this.fetchWithRetry(url, config)
      const data = await this.parseResponse<T>(response)

      this.logApiCall(endpoint, config, response.status, startTime)

      return {
        data,
        error: null,
        status: response.status
      }
    } catch (error) {
      const apiError = this.handleError(error)
      
      this.logApiError(endpoint, config, apiError, startTime)

      return {
        data: null,
        error: apiError.message,
        status: apiError.status
      }
    }
  }

  // Auth endpoints
  public async login(email: string, password: string) {
    return this.request("/auth/login", {
      method: "POST",
      body: { email, password }
    })
  }

  public async register(userData: any) {
    return this.request("/auth/register", {
      method: "POST",
      body: userData
    })
  }

  public async logout() {
    return this.request("/auth/logout", {
      method: "POST"
    })
  }

  // Booking endpoints
  public async createBooking(bookingData: any) {
    return this.request("/bookings", {
      method: "POST",
      body: bookingData
    })
  }

  public async getBooking(id: string) {
    return this.request(`/bookings/${id}`)
  }

  public async updateBooking(id: string, data: any) {
    return this.request(`/bookings/${id}`, {
      method: "PUT",
      body: data
    })
  }

  public async cancelBooking(id: string) {
    return this.request(`/bookings/${id}/cancel`, {
      method: "POST"
    })
  }

  // Vehicle endpoints
  public async searchVehicles(params: any) {
    return this.request("/vehicles/search", {
      params
    })
  }

  public async getVehicle(id: string) {
    return this.request(`/vehicles/${id}`)
  }

  public async updateVehicle(id: string, data: any) {
    return this.request(`/vehicles/${id}`, {
      method: "PUT",
      body: data
    })
  }

  // User endpoints
  public async getUser(id: string) {
    return this.request(`/users/${id}`)
  }

  public async updateUser(id: string, data: any) {
    return this.request(`/users/${id}`, {
      method: "PUT",
      body: data
    })
  }

  // Payment endpoints
  public async createPayment(paymentData: any) {
    return this.request("/payments", {
      method: "POST",
      body: paymentData
    })
  }

  public async getPayment(id: string) {
    return this.request(`/payments/${id}`)
  }

  // Private helper methods
  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    const url = new URL(endpoint, this.config.baseURL)
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value)
      })
    }
    
    return url.toString()
  }

  private async fetchWithRetry(
    url: string,
    config: RequestConfig,
    attempt: number = 1
  ): Promise<Response> {
    const maxRetries = config.retry || 3
    const timeout = config.timeout || this.config.timeout

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      const response = await fetch(url, {
        method: config.method || "GET",
        headers: this.buildHeaders(config.headers),
        body: config.body ? JSON.stringify(config.body) : undefined,
        signal: controller.signal,
        cache: config.cache || "no-cache",
        credentials: "include"
      })

      clearTimeout(timeoutId)

      if (!response.ok && attempt < maxRetries) {
        const backoff = Math.min(1000 * Math.pow(2, attempt - 1), 10000)
        await new Promise(resolve => setTimeout(resolve, backoff))
        return this.fetchWithRetry(url, config, attempt + 1)
      }

      return response
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new ApiError(408, "Request timeout")
      }
      throw error
    }
  }

  private async parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get("content-type")
    
    if (contentType?.includes("application/json")) {
      const json = await response.json()
      
      if (!response.ok) {
        throw new ApiError(
          response.status,
          json.message || "An error occurred",
          json
        )
      }
      
      return json
    }
    
    throw new ApiError(
      response.status,
      "Invalid response format"
    )
  }

  private buildHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    const headers = { ...this.config.headers }

    if (this.authToken) {
      headers["Authorization"] = `Bearer ${this.authToken}`
    }

    if (customHeaders) {
      Object.assign(headers, customHeaders)
    }

    return headers
  }

  private handleError(error: unknown): ApiError {
    if (error instanceof ApiError) {
      return error
    }

    if (error instanceof Error) {
      return new ApiError(500, error.message)
    }

    return new ApiError(500, "An unknown error occurred")
  }

  private logApiCall(
    endpoint: string,
    config: RequestConfig,
    status: number,
    startTime: number
  ): void {
    const duration = performance.now() - startTime
    
    analytics.trackEvent("feature_used", {
      feature: "api_request",
      endpoint,
      method: config.method || "GET",
      status,
      duration,
      success: true
    })
  }

  private logApiError(
    endpoint: string,
    config: RequestConfig,
    error: ApiError,
    startTime: number,
    errorHandler?: ErrorHandler
  ): void {
    const duration = performance.now() - startTime
    
    analytics.trackEvent("error_occurred", {
      type: "api_error",
      endpoint,
      method: config.method || "GET",
      status: error.status,
      error: error.message,
      duration,
      success: false
    })
  }
}

// Export singleton instance
export const api = Api.getInstance()
