import { describe, it, expect } from "@jest/globals"

describe("Realtime Metrics API", () => {
  const testStreamId = "stream_001"

  it("should fetch realtime metrics", async () => {
    const response = await fetch(`http://localhost:3000/api/metrics/realtime?streamId=${testStreamId}`)
    expect(response.ok).toBe(true)

    const data = await response.json()
    expect(data).toHaveProperty("viewers")
    expect(data).toHaveProperty("chat")
    expect(data).toHaveProperty("health")
    expect(data).toHaveProperty("timestamp")
  })

  it("should return 400 for missing streamId", async () => {
    const response = await fetch("http://localhost:3000/api/metrics/realtime")
    expect(response.status).toBe(400)
  })
})
