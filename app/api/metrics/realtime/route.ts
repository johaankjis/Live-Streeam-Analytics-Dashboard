import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const streamId = searchParams.get("streamId")

    if (!streamId) {
      return NextResponse.json({ error: "streamId is required" }, { status: 400 })
    }

    // Get latest metrics for real-time updates
    const [latestViewers, latestChat, latestHealth] = await Promise.all([
      sql`
        SELECT viewer_count, timestamp 
        FROM viewers 
        WHERE stream_id = ${streamId}
        ORDER BY timestamp DESC 
        LIMIT 1
      `,
      sql`
        SELECT messages_per_minute, unique_chatters, timestamp 
        FROM chat_activity 
        WHERE stream_id = ${streamId}
        ORDER BY timestamp DESC 
        LIMIT 1
      `,
      sql`
        SELECT health_score, bitrate, fps, dropped_frames, timestamp 
        FROM stream_health 
        WHERE stream_id = ${streamId}
        ORDER BY timestamp DESC 
        LIMIT 1
      `,
    ])

    return NextResponse.json({
      viewers: latestViewers[0] || null,
      chat: latestChat[0] || null,
      health: latestHealth[0] || null,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Error fetching realtime metrics:", error)
    return NextResponse.json({ error: "Failed to fetch realtime metrics" }, { status: 500 })
  }
}
