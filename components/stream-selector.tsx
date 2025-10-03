"use client"

import { useState, useEffect } from "react"
import { fetchActiveStreams } from "@/lib/api-client"
import type { Stream } from "@/lib/types"
import { Button } from "@/components/ui/button"

interface StreamSelectorProps {
  onSelectStream: (streamId: string) => void
  selectedStreamId?: string
}

export function StreamSelector({ onSelectStream, selectedStreamId }: StreamSelectorProps) {
  const [streams, setStreams] = useState<Stream[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStreams() {
      try {
        const data = await fetchActiveStreams()
        setStreams(data)
        if (data.length > 0 && !selectedStreamId) {
          onSelectStream(data[0].stream_id)
        }
      } catch (error) {
        console.error("[v0] Failed to load streams:", error)
      } finally {
        setLoading(false)
      }
    }
    loadStreams()
  }, [onSelectStream, selectedStreamId])

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        Loading streams...
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">Stream:</span>
      <div className="flex gap-2">
        {streams.map((stream) => (
          <Button
            key={stream.stream_id}
            variant={selectedStreamId === stream.stream_id ? "default" : "outline"}
            size="sm"
            onClick={() => onSelectStream(stream.stream_id)}
            className="font-mono text-xs"
          >
            {stream.streamer_name}
            <span className="ml-2 text-muted-foreground">•</span>
            <span className="ml-2 capitalize">{stream.platform}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
