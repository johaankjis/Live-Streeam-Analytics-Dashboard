import { NextResponse } from "next/server"
import { getStreamById, getViewerMetrics, getChatActivity, getStreamHealth, getStreamMetrics } from "@/lib/db"

export async function GET(request: Request, { params }: { params: { streamId: string } }) {
  try {
    const streamId = params.streamId

    const [stream, viewerMetrics, chatActivity, streamHealth, metrics] = await Promise.all([
      getStreamById(streamId),
      getViewerMetrics(streamId),
      getChatActivity(streamId),
      getStreamHealth(streamId),
      getStreamMetrics(streamId),
    ])

    if (!stream) {
      return NextResponse.json({ error: "Stream not found" }, { status: 404 })
    }

    return NextResponse.json({
      stream,
      viewerMetrics,
      chatActivity,
      streamHealth,
      metrics,
    })
  } catch (error) {
    console.error("[v0] Error fetching stream data:", error)
    return NextResponse.json({ error: "Failed to fetch stream data" }, { status: 500 })
  }
}
