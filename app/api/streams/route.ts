import { NextResponse } from "next/server"
import { getActiveStreams } from "@/lib/db"

export async function GET() {
  try {
    const streams = await getActiveStreams()
    return NextResponse.json({ streams })
  } catch (error) {
    console.error("[v0] Error fetching streams:", error)
    return NextResponse.json({ error: "Failed to fetch streams" }, { status: 500 })
  }
}
