import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const streamId = searchParams.get("streamId")

    if (!streamId) {
      return NextResponse.json({ error: "streamId is required" }, { status: 400 })
    }

    // Get comprehensive analytics summary
    const [stream, viewerStats, chatStats, healthStats, engagementMetrics] = await Promise.all([
      sql`SELECT * FROM streams WHERE stream_id = ${streamId}`,
      sql`
        SELECT 
          AVG(viewer_count)::INTEGER as avg_viewers,
          MAX(peak_viewers) as peak_viewers,
          MIN(viewer_count) as min_viewers,
          COUNT(*) as data_points
        FROM viewers 
        WHERE stream_id = ${streamId}
      `,
      sql`
        SELECT 
          AVG(messages_per_minute)::INTEGER as avg_messages_per_minute,
          MAX(messages_per_minute) as peak_messages_per_minute,
          AVG(unique_chatters)::INTEGER as avg_unique_chatters
        FROM chat_activity 
        WHERE stream_id = ${streamId}
      `,
      sql`
        SELECT 
          AVG(health_score)::DECIMAL(5,2) as avg_health_score,
          AVG(bitrate)::INTEGER as avg_bitrate,
          AVG(fps)::INTEGER as avg_fps,
          SUM(dropped_frames) as total_dropped_frames
        FROM stream_health 
        WHERE stream_id = ${streamId}
      `,
      sql`
        SELECT metric_type, metric_value, metadata
        FROM metrics 
        WHERE stream_id = ${streamId}
        ORDER BY timestamp DESC
      `,
    ])

    if (!stream[0]) {
      return NextResponse.json({ error: "Stream not found" }, { status: 404 })
    }

    return NextResponse.json({
      stream: stream[0],
      viewerStats: viewerStats[0],
      chatStats: chatStats[0],
      healthStats: healthStats[0],
      engagementMetrics,
    })
  } catch (error) {
    console.error("[v0] Error fetching analytics summary:", error)
    return NextResponse.json({ error: "Failed to fetch analytics summary" }, { status: 500 })
  }
}
