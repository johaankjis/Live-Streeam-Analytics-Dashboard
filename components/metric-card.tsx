import type React from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  className?: string
  children?: React.ReactNode
}

export function MetricCard({ title, value, subtitle, trend, trendValue, className, children }: MetricCardProps) {
  return (
    <Card className={cn("border-border bg-card p-6", className)}>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight">{value}</span>
            {trendValue && (
              <span
                className={cn("text-sm font-medium", {
                  "text-green-500": trend === "up",
                  "text-red-500": trend === "down",
                  "text-muted-foreground": trend === "neutral",
                })}
              >
                {trendValue}
              </span>
            )}
          </div>
          {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {children}
    </Card>
  )
}
