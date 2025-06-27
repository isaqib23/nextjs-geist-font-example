import { Loader2 } from "lucide-react"

interface LoadingProps {
  size?: "small" | "medium" | "large"
  text?: string
  fullScreen?: boolean
}

export function Loading({ size = "medium", text, fullScreen = false }: LoadingProps) {
  const sizeMap = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  }

  const Spinner = () => (
    <div className="flex flex-col items-center justify-center space-y-3">
      <Loader2 className={`${sizeMap[size]} animate-spin text-[#1a365d]`} />
      {text && <p className="text-sm text-gray-500">{text}</p>}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <Spinner />
      </div>
    )
  }

  return <Spinner />
}

export function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loading size="large" text="Loading..." />
    </div>
  )
}

export function LoadingOverlay({ text }: { text?: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <Loading size="large" text={text} />
    </div>
  )
}
