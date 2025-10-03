import { describe, it, expect } from "@jest/globals"
import { render, screen } from "@testing-library/react"
import { MetricCard } from "@/components/metric-card"

describe("MetricCard Component", () => {
  it("should render title and value", () => {
    render(<MetricCard title="Test Metric" value="1,234" />)

    expect(screen.getByText("Test Metric")).toBeInTheDocument()
    expect(screen.getByText("1,234")).toBeInTheDocument()
  })

  it("should render subtitle when provided", () => {
    render(<MetricCard title="Test Metric" value="1,234" subtitle="Test subtitle" />)

    expect(screen.getByText("Test subtitle")).toBeInTheDocument()
  })

  it("should render trend value when provided", () => {
    render(<MetricCard title="Test Metric" value="1,234" trend="up" trendValue="+5%" />)

    expect(screen.getByText("+5%")).toBeInTheDocument()
  })

  it("should apply correct trend color classes", () => {
    const { rerender } = render(<MetricCard title="Test" value="100" trend="up" trendValue="+5%" />)
    expect(screen.getByText("+5%")).toHaveClass("text-green-500")

    rerender(<MetricCard title="Test" value="100" trend="down" trendValue="-5%" />)
    expect(screen.getByText("-5%")).toHaveClass("text-red-500")

    rerender(<MetricCard title="Test" value="100" trend="neutral" trendValue="0%" />)
    expect(screen.getByText("0%")).toHaveClass("text-muted-foreground")
  })
})
