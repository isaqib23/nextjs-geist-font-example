import { useState, useEffect } from "react"
import { type ColorScheme, type ThemeColors, type ThemeConfig } from "./types"

const defaultTheme: ThemeConfig = {
  colorScheme: "system",
  colors: {
    light: {
      primary: "#1a365d",
      secondary: "#f7fafc",
      accent: "#fbbf24",
      background: "#ffffff",
      surface: "#f8f9fa",
      text: {
        primary: "#1a202c",
        secondary: "#4a5568",
        disabled: "#a0aec0"
      },
      border: "#e2e8f0",
      error: "#ef4444",
      success: "#10b981",
      warning: "#f59e0b",
      info: "#3b82f6"
    },
    dark: {
      primary: "#90cdf4",
      secondary: "#2d3748",
      accent: "#fbbf24",
      background: "#1a202c",
      surface: "#2d3748",
      text: {
        primary: "#f7fafc",
        secondary: "#e2e8f0",
        disabled: "#718096"
      },
      border: "#4a5568",
      error: "#f87171",
      success: "#34d399",
      warning: "#fbbf24",
      info: "#60a5fa"
    }
  },
  borderRadius: {
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    full: "9999px"
  },
  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem"
  },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem"
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75
    }
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
  },
  transitions: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    normal: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "500ms cubic-bezier(0.4, 0, 0.2, 1)"
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px"
  }
}

function isValidColorScheme(value: unknown): value is ColorScheme {
  return typeof value === "string" && ["light", "dark", "system"].includes(value as string)
}

function assertString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Expected string value")
  }
}

class ThemeManager {
  private static instance: ThemeManager
  private config: ThemeConfig
  private listeners: Set<() => void>

  private constructor() {
    this.config = { ...defaultTheme }
    this.listeners = new Set()
    this.initColorScheme()
  }

  public static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager()
    }
    return ThemeManager.instance
  }

  public getTheme(): ThemeConfig {
    return this.config
  }

  public getCurrentColors(): ThemeColors {
    const isDark = this.isDarkMode()
    return isDark ? this.config.colors.dark : this.config.colors.light
  }

  public setColorScheme(scheme: ColorScheme): void {
    this.config.colorScheme = scheme
    this.updateTheme()
    if (typeof window !== 'undefined') {
      localStorage.setItem("color-scheme", scheme)
    }
  }

  public isDarkMode(): boolean {
    if (this.config.colorScheme === "system") {
      return this.isSystemDarkMode()
    }
    return this.config.colorScheme === "dark"
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  public getCssVariables(): Record<string, string> {
    const colors = this.getCurrentColors()
    const variables: Record<string, string> = {}

    const addVariable = (key: string, value: unknown): void => {
      try {
        assertString(value)
        variables[key] = value
      } catch (error) {
        console.warn(`Invalid value for CSS variable ${key}:`, value)
      }
    }

    Object.entries(colors).forEach(([key, value]) => {
      if (value && typeof value === "object") {
        Object.entries(value).forEach(([subKey, subValue]) => {
          addVariable(`--color-${key}-${subKey}`, subValue)
        })
      } else {
        addVariable(`--color-${key}`, value)
      }
    })

    Object.entries(this.config.typography.fontSize).forEach(([key, value]) => {
      addVariable(`--font-size-${key}`, value)
    })

    Object.entries(this.config.spacing).forEach(([key, value]) => {
      addVariable(`--spacing-${key}`, value)
    })

    Object.entries(this.config.borderRadius).forEach(([key, value]) => {
      addVariable(`--radius-${key}`, value)
    })

    return variables
  }

  private initColorScheme(): void {
    if (typeof window !== 'undefined') {
      const savedScheme = localStorage.getItem("color-scheme")
      if (savedScheme && isValidColorScheme(savedScheme)) {
        this.config.colorScheme = savedScheme
      }

      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      mediaQuery.addEventListener("change", () => this.updateTheme())
    }
  }

  private isSystemDarkMode(): boolean {
    if (typeof window === "undefined") return false
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  }

  private updateTheme(): void {
    const isDark = this.isDarkMode()
    
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", isDark)
    }

    this.notifyListeners()
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener())
  }
}

export const themeManager = ThemeManager.getInstance()

export const useTheme = () => {
  const [, forceUpdate] = useState({})

  useEffect(() => {
    return themeManager.subscribe(() => forceUpdate({}))
  }, [])

  return {
    theme: themeManager.getTheme(),
    colors: themeManager.getCurrentColors(),
    isDarkMode: themeManager.isDarkMode(),
    setColorScheme: themeManager.setColorScheme.bind(themeManager)
  }
}
