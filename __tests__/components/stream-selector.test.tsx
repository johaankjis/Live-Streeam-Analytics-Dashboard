import { describe, it, expect, vi } from "@jest/globals"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { StreamSelector } from "@/components/stream-selector"
import * as apiClient from "@/lib/api-client"

vi.mock("@/lib/api-client")

describe("StreamSelector Component", () => {
  const mockStreams = [
    {
      id: 1,
      stream_id: "stream_001",
      title: "Test Stream 1",
      streamer_name: "Streamer1",
      platform: "twitch",
      status: "live",
      started_at: null,
      ended_at: null,
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-01-01T00:00:00Z",
    },
    {
      id: 2,
      stream_id: "stream_002",
      title: "Test Stream 2",
      streamer_name: "Streamer2",
      platform: "youtube",
      status: "live",
      started_at: null,
      ended_at: null,
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-01-01T00:00:00Z",
    },
  ]

  it("should render loading state initially", () => {
    vi.mocked(apiClient.fetchActiveStreams).mockImplementation(() => new Promise(() => {}))

    render(<StreamSelector onSelectStream={vi.fn()} />)

    expect(screen.getByText("Loading streams...")).toBeInTheDocument()
  })

  it("should render stream buttons after loading", async () => {
    vi.mocked(apiClient.fetchActiveStreams).mockResolvedValue(mockStreams)

    render(<StreamSelector onSelectStream={vi.fn()} />)

    await waitFor(() => {
      expect(screen.getByText("Streamer1")).toBeInTheDocument()
      expect(screen.getByText("Streamer2")).toBeInTheDocument()
    })
  })

  it("should call onSelectStream when button is clicked", async () => {
    const mockOnSelect = vi.fn()
    vi.mocked(apiClient.fetchActiveStreams).mockResolvedValue(mockStreams)

    render(<StreamSelector onSelectStream={mockOnSelect} />)

    await waitFor(() => {
      expect(screen.getByText("Streamer1")).toBeInTheDocument()
    })

    await userEvent.click(screen.getByText("Streamer1"))

    expect(mockOnSelect).toHaveBeenCalledWith("stream_001")
  })
})
