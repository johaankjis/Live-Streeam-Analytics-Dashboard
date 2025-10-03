import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function POST(request: Request, { params }: { params: { streamId: string } }) {
  try {
    const streamId = params.streamId
    const body = await request.json()

    const { viewerCount, peakViewers, messagesPerMinute, uniqueChatters, healthScore, bitrate, fps, droppedFrames } =
      body

    // Insert viewer data if provided
    if (viewerCount !== undefined) {
      await sql`
        INSERT INTO viewers (stream_id, viewer_count, peak_viewers)
        VALUES (${streamId}, ${viewerCount}, ${peakViewers || viewerCount})
      `
    }

    // Insert chat activity if provided
    if (messagesPerMinute !== undefined) {
      await sql`
        INSERT INTO chat_activity (stream_id, messages_per_minute, unique_chatters)
        VALUES (${streamId}, ${messagesPerMinute}, ${uniqueChatters || 0})
      `
    }

    // Insert stream health if provided
    if (healthScore !== undefined) {
      await sql`
        INSERT INTO stream_health (stream_id, health_score, bitrate, fps, dropped_frames)
        VALUES (${streamId}, ${healthScore}, ${bitrate || null}, ${fps || null}, ${droppedFrames || 0})
      `
    }

    return NextResponse.json({ success: true, message: "Metrics updated successfully" })
  } catch (error) {
    console.error("[v0] Error updating stream metrics:", error)
    return NextResponse.json({ error: "Failed to update metrics" }, { status: 500 })
  }
}
