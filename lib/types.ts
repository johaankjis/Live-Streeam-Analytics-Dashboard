export interface Stream {
  id: number
  stream_id: string
  title: string
  streamer_name: string
  platform: string
  status: string
  started_at: string | null
  ended_at: string | null
  created_at: string
  updated_at: string
}

export interface ViewerMetric {
  id: number
  stream_id: string
  viewer_count: number
  peak_viewers: number | null
  timestamp: string
}

export interface ChatActivity {
  id: number
  stream_id: string
  messages_per_minute: number
  unique_chatters: number | null
  timestamp: string
}

export interface StreamHealth {
  id: number
  stream_id: string
  bitrate: number | null
  fps: number | null
  resolution: string | null
  dropped_frames: number
  health_score: number | null
  timestamp: string
}

export interface Metric {
  id: number
  stream_id: string
  metric_type: string
  metric_value: number
  metadata: Record<string, any> | null
  timestamp: string
}

export interface RealtimeMetrics {
  viewers: {
    viewer_count: number
    timestamp: string
  } | null
  chat: {
    messages_per_minute: number
    unique_chatters: number
    timestamp: string
  } | null
  health: {
    health_score: number
    bitrate: number
    fps: number
    dropped_frames: number
    timestamp: string
  } | null
  timestamp: string
}
