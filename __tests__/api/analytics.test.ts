import { describe, it, expect } from "@jest/globals"

describe("Analytics API", () => {
  const testStreamId = "stream_001"

  it("should fetch analytics summary", async () => {
    const response = await fetch(`http://localhost:3000/api/analytics/summary?streamId=${testStreamId}`)
    expect(response.ok).toBe(true)

    const data = await response.json()
    expect(data).toHaveProperty("stream")
    expect(data).toHaveProperty("viewerStats")
    expect(data).toHaveProperty("chatStats")
    expect(data).toHaveProperty("healthStats")
  })

  it("should fetch timeseries data", async () => {
    const response = await fetch(
      `http://localhost:3000/api/analytics/timeseries?streamId=${testStreamId}&metric=viewers`,
    )
    expect(response.ok).toBe(true)

    const data = await response.json()
    expect(data).toHaveProperty("metric")
    expect(data).toHaveProperty("data")
    expect(Array.isArray(data.data)).toBe(true)
  })

  it("should return 400 for missing streamId", async () => {
    const response = await fetch("http://localhost:3000/api/analytics/summary")
    expect(response.status).toBe(400)
  })

  it("should return 400 for invalid metric type", async () => {
    const response = await fetch(
      `http://localhost:3000/api/analytics/timeseries?streamId=${testStreamId}&metric=invalid`,
    )
    expect(response.status).toBe(400)
  })
})
