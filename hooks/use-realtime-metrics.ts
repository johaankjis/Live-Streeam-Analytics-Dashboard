"use client"

import { useState, useEffect, useCallback } from "react"
import { fetchRealtimeMetrics } from "@/lib/api-client"
import type { RealtimeMetrics } from "@/lib/types"

interface UseRealtimeMetricsOptions {
  streamId: string
  interval?: number
  enabled?: boolean
}

export function useRealtimeMetrics({ streamId, interval = 5000, enabled = true }: UseRealtimeMetricsOptions) {
  const [metrics, setMetrics] = useState<RealtimeMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchMetrics = useCallback(async () => {
    if (!streamId || !enabled) return

    try {
      const data = await fetchRealtimeMetrics(streamId)
      setMetrics(data)
      setError(null)
    } catch (err) {
      console.error("[v0] Error fetching realtime metrics:", err)
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [streamId, enabled])

  useEffect(() => {
    fetchMetrics()

    if (!enabled) return

    const intervalId = setInterval(fetchMetrics, interval)

    return () => clearInterval(intervalId)
  }, [fetchMetrics, interval, enabled])

  return { metrics, loading, error, refetch: fetchMetrics }
}
