-- Insert sample streams
INSERT INTO streams (stream_id, title, streamer_name, platform, status, started_at) VALUES
('stream_001', 'Epic Gaming Marathon - Day 3', 'ProGamer123', 'twitch', 'live', NOW() - INTERVAL '2 hours'),
('stream_002', 'Coding Live: Building a React App', 'DevMaster', 'youtube', 'live', NOW() - INTERVAL '45 minutes'),
('stream_003', 'Music Production Session', 'BeatMaker99', 'twitch', 'live', NOW() - INTERVAL '1 hour'),
('stream_004', 'Art Stream: Digital Painting', 'ArtistPro', 'youtube', 'offline', NOW() - INTERVAL '5 hours')
ON CONFLICT (stream_id) DO NOTHING;

-- Insert sample viewer data
INSERT INTO viewers (stream_id, viewer_count, peak_viewers, timestamp) VALUES
('stream_001', 1250, 1500, NOW() - INTERVAL '10 minutes'),
('stream_001', 1320, 1500, NOW() - INTERVAL '5 minutes'),
('stream_001', 1450, 1500, NOW()),
('stream_002', 850, 920, NOW() - INTERVAL '10 minutes'),
('stream_002', 890, 920, NOW() - INTERVAL '5 minutes'),
('stream_002', 920, 920, NOW()),
('stream_003', 650, 780, NOW() - INTERVAL '10 minutes'),
('stream_003', 720, 780, NOW() - INTERVAL '5 minutes'),
('stream_003', 780, 780, NOW());

-- Insert sample metrics
INSERT INTO metrics (stream_id, metric_type, metric_value, metadata, timestamp) VALUES
('stream_001', 'engagement_rate', 78.5, '{"likes": 450, "shares": 120}', NOW()),
('stream_001', 'avg_watch_time', 45.2, '{"unit": "minutes"}', NOW()),
('stream_002', 'engagement_rate', 82.3, '{"likes": 320, "shares": 85}', NOW()),
('stream_002', 'avg_watch_time', 38.7, '{"unit": "minutes"}', NOW()),
('stream_003', 'engagement_rate', 71.8, '{"likes": 280, "shares": 65}', NOW()),
('stream_003', 'avg_watch_time', 52.1, '{"unit": "minutes"}', NOW());

-- Insert sample chat activity
INSERT INTO chat_activity (stream_id, messages_per_minute, unique_chatters, timestamp) VALUES
('stream_001', 145, 320, NOW() - INTERVAL '10 minutes'),
('stream_001', 168, 345, NOW() - INTERVAL '5 minutes'),
('stream_001', 192, 380, NOW()),
('stream_002', 95, 210, NOW() - INTERVAL '10 minutes'),
('stream_002', 112, 235, NOW() - INTERVAL '5 minutes'),
('stream_002', 128, 260, NOW()),
('stream_003', 78, 180, NOW() - INTERVAL '10 minutes'),
('stream_003', 85, 195, NOW() - INTERVAL '5 minutes'),
('stream_003', 92, 210, NOW());

-- Insert sample stream health data
INSERT INTO stream_health (stream_id, bitrate, fps, resolution, dropped_frames, health_score, timestamp) VALUES
('stream_001', 6000, 60, '1920x1080', 12, 95.5, NOW()),
('stream_002', 4500, 30, '1920x1080', 8, 97.2, NOW()),
('stream_003', 5000, 60, '1280x720', 15, 93.8, NOW());
