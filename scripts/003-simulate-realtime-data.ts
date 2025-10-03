// Simulation script to generate real-time data for testing
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

async function simulateRealtimeData() {
  const streams = await sql`SELECT stream_id FROM streams WHERE status = 'live'`

  for (const stream of streams) {
    const streamId = stream.stream_id

    // Generate random viewer count with some variance
    const baseViewers = 1000 + Math.floor(Math.random() * 500)
    const viewerCount = baseViewers + Math.floor(Math.random() * 100 - 50)

    // Generate chat activity
    const messagesPerMinute = 80 + Math.floor(Math.random() * 60)
    const uniqueChatters = Math.floor(messagesPerMinute * 2.5)

    // Generate health metrics
    const healthScore = 92 + Math.random() * 7
    const bitrate = 5000 + Math.floor(Math.random() * 1000)
    const fps = Math.random() > 0.9 ? 59 : 60
    const droppedFrames = Math.random() > 0.95 ? Math.floor(Math.random() * 10) : 0

    // Insert data
    await sql`
      INSERT INTO viewers (stream_id, viewer_count, peak_viewers)
      VALUES (${streamId}, ${viewerCount}, ${viewerCount})
    `

    await sql`
      INSERT INTO chat_activity (stream_id, messages_per_minute, unique_chatters)
      VALUES (${streamId}, ${messagesPerMinute}, ${uniqueChatters})
    `

    await sql`
      INSERT INTO stream_health (stream_id, health_score, bitrate, fps, dropped_frames)
      VALUES (${streamId}, ${healthScore}, ${bitrate}, ${fps}, ${droppedFrames})
    `

    console.log(`[v0] Generated realtime data for stream: ${streamId}`)
  }
}

// Run simulation every 5 seconds
setInterval(simulateRealtimeData, 5000)

console.log("[v0] Realtime data simulation started")
