"use client"

import { useState } from "react"
import { StreamSelector } from "@/components/stream-selector"
import { AnalyticsGrid } from "@/components/analytics-grid"

export default function DashboardPage() {
  const [selectedStreamId, setSelectedStreamId] = useState<string>("")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Live Stream Analytics</h1>
              <p className="text-sm text-muted-foreground">Real-time performance monitoring</p>
            </div>
            <div className="flex items-center gap-4">
              <StreamSelector onSelectStream={setSelectedStreamId} selectedStreamId={selectedStreamId} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {selectedStreamId ? (
          <AnalyticsGrid streamId={selectedStreamId} />
        ) : (
          <div className="flex h-96 items-center justify-center">
            <p className="text-muted-foreground">Select a stream to view analytics</p>
          </div>
        )}
      </main>
    </div>
  )
}
