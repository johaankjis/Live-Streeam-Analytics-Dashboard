import { describe, it, expect, beforeAll, afterAll } from "@jest/globals"
import { sql } from "@/lib/db"

describe("Database Functions", () => {
  const testStreamId = "test_stream_001"

  beforeAll(async () => {
    // Create test stream
    await sql`
      INSERT INTO streams (stream_id, title, streamer_name, platform, status)
      VALUES (${testStreamId}, 'Test Stream', 'TestStreamer', 'twitch', 'live')
      ON CONFLICT (stream_id) DO NOTHING
    `
  })

  afterAll(async () => {
    // Clean up test data
    await sql`DELETE FROM streams WHERE stream_id = ${testStreamId}`
  })

  it("should fetch active streams", async () => {
    const streams = await sql`SELECT * FROM streams WHERE status = 'live'`
    expect(streams).toBeDefined()
    expect(Array.isArray(streams)).toBe(true)
  })

  it("should fetch stream by ID", async () => {
    const result = await sql`SELECT * FROM streams WHERE stream_id = ${testStreamId}`
    expect(result).toBeDefined()
    expect(result[0]).toBeDefined()
    expect(result[0].stream_id).toBe(testStreamId)
  })

  it("should insert viewer data", async () => {
    const result = await sql`
      INSERT INTO viewers (stream_id, viewer_count, peak_viewers)
      VALUES (${testStreamId}, 1000, 1200)
      RETURNING *
    `
    expect(result).toBeDefined()
    expect(result[0].viewer_count).toBe(1000)
  })

  it("should fetch viewer metrics", async () => {
    const metrics = await sql`
      SELECT * FROM viewers 
      WHERE stream_id = ${testStreamId}
      ORDER BY timestamp DESC 
      LIMIT 10
    `
    expect(metrics).toBeDefined()
    expect(Array.isArray(metrics)).toBe(true)
  })
})
