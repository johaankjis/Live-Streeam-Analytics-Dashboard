import { describe, it, expect } from "@jest/globals"

describe("Streams API", () => {
  it("should fetch active streams", async () => {
    const response = await fetch("http://localhost:3000/api/streams")
    expect(response.ok).toBe(true)

    const data = await response.json()
    expect(data).toHaveProperty("streams")
    expect(Array.isArray(data.streams)).toBe(true)
  })

  it("should fetch stream details", async () => {
    const response = await fetch("http://localhost:3000/api/streams/stream_001")
    expect(response.ok).toBe(true)

    const data = await response.json()
    expect(data).toHaveProperty("stream")
    expect(data).toHaveProperty("viewerMetrics")
    expect(data).toHaveProperty("chatActivity")
  })

  it("should return 404 for non-existent stream", async () => {
    const response = await fetch("http://localhost:3000/api/streams/nonexistent")
    expect(response.status).toBe(404)
  })
})
