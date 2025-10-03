"use client"

import { useRealtimeMetrics } from "@/hooks/use-realtime-metrics"
import { RealtimeIndicator } from "./realtime-indicator"
import { Card } from "@/components/ui/card"

interface RealtimeMetricsPanelProps {
  streamId: string
}

export function RealtimeMetricsPanel({ streamId }: RealtimeMetricsPanelProps) {
  const { metrics, loading } = useRealtimeMetrics({ streamId, interval: 5000 })

  if (loading && !metrics) {
    return (
      <Card className="border-border bg-card p-6">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          Connecting to live metrics...
        </div>
      </Card>
    )
  }

  return (
    <Card className="border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium">Real-Time Metrics</h3>
        <RealtimeIndicator lastUpdate={metrics?.timestamp} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Current Viewers</p>
          <p className="text-2xl font-semibold tabular-nums">
            {metrics?.viewers?.viewer_count?.toLocaleString() || "—"}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Chat Messages/Min</p>
          <p className="text-2xl font-semibold tabular-nums">
            {metrics?.chat?.messages_per_minute?.toLocaleString() || "—"}
          </p>
          <p className="text-xs text-muted-foreground">
            {metrics?.chat?.unique_chatters?.toLocaleString() || "0"} unique chatters
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Health Score</p>
          <p className="text-2xl font-semibold tabular-nums">
            {metrics?.health?.health_score ? `${metrics.health.health_score.toFixed(1)}%` : "—"}
          </p>
          <p className="text-xs text-muted-foreground">
            {metrics?.health?.bitrate?.toLocaleString() || "0"} kbps • {metrics?.health?.fps || 0} fps
          </p>
        </div>
      </div>

      {metrics?.health && metrics.health.dropped_frames > 0 && (
        <div className="mt-4 rounded-md border border-destructive/50 bg-destructive/10 p-3">
          <p className="text-xs text-destructive">
            Warning: {metrics.health.dropped_frames} frames dropped in the last update
          </p>
        </div>
      )}
    </Card>
  )
}
