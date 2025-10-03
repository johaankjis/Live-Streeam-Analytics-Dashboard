import { describe, it, expect, vi, beforeEach, afterEach } from "@jest/globals"
import { renderHook, waitFor } from "@testing-library/react"
import { useRealtimeMetrics } from "@/hooks/use-realtime-metrics"
import * as apiClient from "@/lib/api-client"

vi.mock("@/lib/api-client")

describe("useRealtimeMetrics Hook", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it("should fetch metrics on mount", async () => {
    const mockMetrics = {
      viewers: { viewer_count: 1000, timestamp: "2025-01-01T00:00:00Z" },
      chat: { messages_per_minute: 100, unique_chatters: 200, timestamp: "2025-01-01T00:00:00Z" },
      health: { health_score: 95, bitrate: 5000, fps: 60, dropped_frames: 0, timestamp: "2025-01-01T00:00:00Z" },
      timestamp: "2025-01-01T00:00:00Z",
    }

    vi.mocked(apiClient.fetchRealtimeMetrics).mockResolvedValue(mockMetrics)

    const { result } = renderHook(() => useRealtimeMetrics({ streamId: "stream_001" }))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.metrics).toEqual(mockMetrics)
  })

  it("should poll metrics at specified interval", async () => {
    const mockMetrics = {
      viewers: { viewer_count: 1000, timestamp: "2025-01-01T00:00:00Z" },
      chat: { messages_per_minute: 100, unique_chatters: 200, timestamp: "2025-01-01T00:00:00Z" },
      health: { health_score: 95, bitrate: 5000, fps: 60, dropped_frames: 0, timestamp: "2025-01-01T00:00:00Z" },
      timestamp: "2025-01-01T00:00:00Z",
    }

    vi.mocked(apiClient.fetchRealtimeMetrics).mockResolvedValue(mockMetrics)

    renderHook(() => useRealtimeMetrics({ streamId: "stream_001", interval: 5000 }))

    expect(apiClient.fetchRealtimeMetrics).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(5000)

    await waitFor(() => {
      expect(apiClient.fetchRealtimeMetrics).toHaveBeenCalledTimes(2)
    })
  })

  it("should not fetch when enabled is false", () => {
    renderHook(() => useRealtimeMetrics({ streamId: "stream_001", enabled: false }))

    expect(apiClient.fetchRealtimeMetrics).not.toHaveBeenCalled()
  })
})
