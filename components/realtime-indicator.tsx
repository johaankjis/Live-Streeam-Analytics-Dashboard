"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface RealtimeIndicatorProps {
  lastUpdate?: string
  className?: string
}

export function RealtimeIndicator({ lastUpdate, className }: RealtimeIndicatorProps) {
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    if (lastUpdate) {
      setPulse(true)
      const timeout = setTimeout(() => setPulse(false), 500)
      return () => clearTimeout(timeout)
    }
  }, [lastUpdate])

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex h-2 w-2">
        <span
          className={cn(
            "absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75",
            pulse && "animate-ping",
          )}
        />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
      </div>
      <span className="text-xs text-muted-foreground">Live</span>
    </div>
  )
}
