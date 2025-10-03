"use client"

import { useEffect, useState } from "react"
import { MetricCard } from "./metric-card"
import { ViewerChart } from "./viewer-chart"
import { RealtimeMetricsPanel } from "./realtime-metrics-panel"
import { fetchAnalyticsSummary, fetchTimeseriesData } from "@/lib/api-client"

interface AnalyticsGridProps {
  streamId: string
}

export function AnalyticsGrid({ streamId }: AnalyticsGridProps) {
  const [summary, setSummary] = useState<any>(null)
  const [viewerData, setViewerData] = useState<any[]>([])
  const [chatData, setChatData] = useState<any[]>([])
  const [healthData, setHealthData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [summaryData, viewers, chat, health] = await Promise.all([
          fetchAnalyticsSummary(streamId),
          fetchTimeseriesData(streamId, "viewers", 50),
          fetchTimeseriesData(streamId, "chat", 50),
          fetchTimeseriesData(streamId, "health", 50),
        ])

        setSummary(summaryData)
        setViewerData(viewers.data)
        setChatData(chat.data)
        setHealthData(health.data)
      } catch (error) {
        console.error("[v0] Failed to load analytics:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [streamId])

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span>Loading analytics...</span>
        </div>
      </div>
    )
  }

  if (!summary) return null

  const { viewerStats, chatStats, healthStats, stream } = summary

  return (
    <div className="space-y-6">
      {/* Stream Info */}
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-semibold tracking-tight">{stream.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {stream.streamer_name} • {stream.platform} • <span className="capitalize text-primary">{stream.status}</span>
        </p>
      </div>

      {/* Real-time Metrics Panel */}
      <RealtimeMetricsPanel streamId={streamId} />

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Current Viewers"
          value={viewerData[viewerData.length - 1]?.value?.toLocaleString() || "0"}
          subtitle={`Peak: ${viewerStats.peak_viewers?.toLocaleString() || "0"}`}
          trend="up"
        />
        <MetricCard
          title="Average Viewers"
          value={viewerStats.avg_viewers?.toLocaleString() || "0"}
          subtitle={`${viewerStats.data_points || 0} data points`}
        />
        <MetricCard
          title="Chat Activity"
          value={`${chatData[chatData.length - 1]?.value || 0}`}
          subtitle="messages per minute"
          trend="neutral"
        />
        <MetricCard
          title="Stream Health"
          value={`${healthData[healthData.length - 1]?.value?.toFixed(1) || "0"}%`}
          subtitle={`${healthStats.avg_bitrate?.toLocaleString() || "0"} kbps avg`}
          trend={healthData[healthData.length - 1]?.value > 90 ? "up" : "neutral"}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <MetricCard title="Viewer Count" value="" className="col-span-1">
          <ViewerChart data={viewerData} height={180} />
        </MetricCard>

        <MetricCard title="Chat Velocity" value="" className="col-span-1">
          <ViewerChart data={chatData} height={180} />
        </MetricCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <MetricCard title="Stream Health Score" value="" className="col-span-1">
          <ViewerChart data={healthData} height={180} />
        </MetricCard>

        <MetricCard title="Engagement Metrics" value="" className="col-span-1">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Peak Messages/Min</span>
              <span className="font-mono text-sm font-semibold">{chatStats.peak_messages_per_minute || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Avg Unique Chatters</span>
              <span className="font-mono text-sm font-semibold">{chatStats.avg_unique_chatters || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Avg Bitrate</span>
              <span className="font-mono text-sm font-semibold">
                {healthStats.avg_bitrate?.toLocaleString() || 0} kbps
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Avg FPS</span>
              <span className="font-mono text-sm font-semibold">{healthStats.avg_fps || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Dropped Frames</span>
              <span className="font-mono text-sm font-semibold text-destructive">
                {healthStats.total_dropped_frames || 0}
              </span>
            </div>
          </div>
        </MetricCard>
      </div>
    </div>
  )
}
