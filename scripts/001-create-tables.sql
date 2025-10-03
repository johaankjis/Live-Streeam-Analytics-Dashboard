-- Create streams table
CREATE TABLE IF NOT EXISTS streams (
  id SERIAL PRIMARY KEY,
  stream_id VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  streamer_name VARCHAR(255) NOT NULL,
  platform VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'offline',
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create viewers table for tracking viewer metrics
CREATE TABLE IF NOT EXISTS viewers (
  id SERIAL PRIMARY KEY,
  stream_id VARCHAR(255) NOT NULL,
  viewer_count INTEGER NOT NULL,
  peak_viewers INTEGER,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (stream_id) REFERENCES streams(stream_id) ON DELETE CASCADE
);

-- Create metrics table for aggregated analytics
CREATE TABLE IF NOT EXISTS metrics (
  id SERIAL PRIMARY KEY,
  stream_id VARCHAR(255) NOT NULL,
  metric_type VARCHAR(50) NOT NULL,
  metric_value DECIMAL(10, 2) NOT NULL,
  metadata JSONB,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (stream_id) REFERENCES streams(stream_id) ON DELETE CASCADE
);

-- Create chat_activity table for chat velocity tracking
CREATE TABLE IF NOT EXISTS chat_activity (
  id SERIAL PRIMARY KEY,
  stream_id VARCHAR(255) NOT NULL,
  messages_per_minute INTEGER NOT NULL,
  unique_chatters INTEGER,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (stream_id) REFERENCES streams(stream_id) ON DELETE CASCADE
);

-- Create stream_health table for monitoring stream quality
CREATE TABLE IF NOT EXISTS stream_health (
  id SERIAL PRIMARY KEY,
  stream_id VARCHAR(255) NOT NULL,
  bitrate INTEGER,
  fps INTEGER,
  resolution VARCHAR(20),
  dropped_frames INTEGER DEFAULT 0,
  health_score DECIMAL(5, 2),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (stream_id) REFERENCES streams(stream_id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_streams_stream_id ON streams(stream_id);
CREATE INDEX IF NOT EXISTS idx_streams_status ON streams(status);
CREATE INDEX IF NOT EXISTS idx_viewers_stream_id ON viewers(stream_id);
CREATE INDEX IF NOT EXISTS idx_viewers_timestamp ON viewers(timestamp);
CREATE INDEX IF NOT EXISTS idx_metrics_stream_id ON metrics(stream_id);
CREATE INDEX IF NOT EXISTS idx_metrics_timestamp ON metrics(timestamp);
CREATE INDEX IF NOT EXISTS idx_chat_activity_stream_id ON chat_activity(stream_id);
CREATE INDEX IF NOT EXISTS idx_stream_health_stream_id ON stream_health(stream_id);
