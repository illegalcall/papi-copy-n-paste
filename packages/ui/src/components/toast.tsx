import * as React from "react"
import { cn } from "../lib/utils"

interface ToastProps {
  message: string
  show: boolean
  onHide?: () => void
  className?: string
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ message, show, onHide, className, ...props }, ref) => {
    React.useEffect(() => {
      if (show && onHide) {
        const timer = setTimeout(onHide, 3000) // Auto-hide after 3 seconds
        return () => clearTimeout(timer)
      }
    }, [show, onHide])

    if (!show) return null

    return (
      <div
        ref={ref}
        className={cn(
          "fixed bottom-4 right-4 z-50",
          "bg-primary text-primary-foreground",
          "px-4 py-3 rounded-lg shadow-lg",
          "animate-in fade-in-0 slide-in-from-bottom-4 duration-300",
          "border border-border",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          <svg 
            className="w-4 h-4 text-green-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <span className="text-sm font-medium">{message}</span>
        </div>
      </div>
    )
  }
)
Toast.displayName = "Toast"

export { Toast }