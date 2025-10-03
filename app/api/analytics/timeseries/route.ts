import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const streamId = searchParams.get("streamId")
    const metric = searchParams.get("metric") || "viewers"
    const limit = Number.parseInt(searchParams.get("limit") || "50")

    if (!streamId) {
      return NextResponse.json({ error: "streamId is required" }, { status: 400 })
    }

    let data
    switch (metric) {
      case "viewers":
        data = await sql`
          SELECT viewer_count as value, timestamp 
          FROM viewers 
          WHERE stream_id = ${streamId}
          ORDER BY timestamp ASC 
          LIMIT ${limit}
        `
        break
      case "chat":
        data = await sql`
          SELECT messages_per_minute as value, timestamp 
          FROM chat_activity 
          WHERE stream_id = ${streamId}
          ORDER BY timestamp ASC 
          LIMIT ${limit}
        `
        break
      case "health":
        data = await sql`
          SELECT health_score as value, timestamp 
          FROM stream_health 
          WHERE stream_id = ${streamId}
          ORDER BY timestamp ASC 
          LIMIT ${limit}
        `
        break
      default:
        return NextResponse.json({ error: "Invalid metric type" }, { status: 400 })
    }

    return NextResponse.json({ metric, data })
  } catch (error) {
    console.error("[v0] Error fetching timeseries data:", error)
    return NextResponse.json({ error: "Failed to fetch timeseries data" }, { status: 500 })
  }
}
