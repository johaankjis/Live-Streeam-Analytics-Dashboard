import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

export const sql = neon(process.env.DATABASE_URL)

// Database query helpers
export async function getActiveStreams() {
  return await sql`
    SELECT * FROM streams 
    WHERE status = 'live' 
    ORDER BY started_at DESC
  `
}

export async function getStreamById(streamId: string) {
  const result = await sql`
    SELECT * FROM streams 
    WHERE stream_id = ${streamId}
  `
  return result[0]
}

export async function getViewerMetrics(streamId: string, limit = 20) {
  return await sql`
    SELECT viewer_count, peak_viewers, timestamp 
    FROM viewers 
    WHERE stream_id = ${streamId}
    ORDER BY timestamp DESC 
    LIMIT ${limit}
  `
}

export async function getChatActivity(streamId: string, limit = 20) {
  return await sql`
    SELECT messages_per_minute, unique_chatters, timestamp 
    FROM chat_activity 
    WHERE stream_id = ${streamId}
    ORDER BY timestamp DESC 
    LIMIT ${limit}
  `
}

export async function getStreamHealth(streamId: string) {
  const result = await sql`
    SELECT * FROM stream_health 
    WHERE stream_id = ${streamId}
    ORDER BY timestamp DESC 
    LIMIT 1
  `
  return result[0]
}

export async function getStreamMetrics(streamId: string) {
  return await sql`
    SELECT metric_type, metric_value, metadata, timestamp 
    FROM metrics 
    WHERE stream_id = ${streamId}
    ORDER BY timestamp DESC
  `
}

export async function insertViewerData(streamId: string, viewerCount: number, peakViewers: number) {
  return await sql`
    INSERT INTO viewers (stream_id, viewer_count, peak_viewers)
    VALUES (${streamId}, ${viewerCount}, ${peakViewers})
    RETURNING *
  `
}

export async function updateStreamStatus(streamId: string, status: string) {
  return await sql`
    UPDATE streams 
    SET status = ${status}, updated_at = CURRENT_TIMESTAMP
    WHERE stream_id = ${streamId}
    RETURNING *
  `
}
