import type { Stream, RealtimeMetrics } from "./types"

const API_BASE = "/api"

export async function fetchActiveStreams(): Promise<Stream[]> {
  const response = await fetch(`${API_BASE}/streams`)
  if (!response.ok) throw new Error("Failed to fetch streams")
  const data = await response.json()
  return data.streams
}

export async function fetchStreamDetails(streamId: string) {
  const response = await fetch(`${API_BASE}/streams/${streamId}`)
  if (!response.ok) throw new Error("Failed to fetch stream details")
  return response.json()
}

export async function fetchRealtimeMetrics(streamId: string): Promise<RealtimeMetrics> {
  const response = await fetch(`${API_BASE}/metrics/realtime?streamId=${streamId}`)
  if (!response.ok) throw new Error("Failed to fetch realtime metrics")
  return response.json()
}

export async function fetchAnalyticsSummary(streamId: string) {
  const response = await fetch(`${API_BASE}/analytics/summary?streamId=${streamId}`)
  if (!response.ok) throw new Error("Failed to fetch analytics summary")
  return response.json()
}

export async function fetchTimeseriesData(streamId: string, metric: string, limit = 50) {
  const response = await fetch(`${API_BASE}/analytics/timeseries?streamId=${streamId}&metric=${metric}&limit=${limit}`)
  if (!response.ok) throw new Error("Failed to fetch timeseries data")
  return response.json()
}

export async function updateStreamMetrics(streamId: string, metrics: Record<string, any>) {
  const response = await fetch(`${API_BASE}/streams/${streamId}/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(metrics),
  })
  if (!response.ok) throw new Error("Failed to update metrics")
  return response.json()
}
