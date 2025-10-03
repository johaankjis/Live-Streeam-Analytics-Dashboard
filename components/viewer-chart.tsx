"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface DataPoint {
  timestamp: string
  value: number
}

interface ViewerChartProps {
  data: DataPoint[]
  height?: number
}

export function ViewerChart({ data, height = 200 }: ViewerChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return

    const svg = d3.select(svgRef.current)
    const container = svgRef.current.parentElement
    if (!container) return

    const width = container.clientWidth
    const margin = { top: 10, right: 10, bottom: 30, left: 50 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    svg.selectAll("*").remove()

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    // Parse timestamps and create scales
    const parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S")
    const dataWithDates = data.map((d) => ({
      date: parseTime(d.timestamp.split(".")[0]) || new Date(),
      value: d.value,
    }))

    const x = d3
      .scaleTime()
      .domain(d3.extent(dataWithDates, (d) => d.date) as [Date, Date])
      .range([0, innerWidth])

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(dataWithDates, (d) => d.value) || 0])
      .nice()
      .range([innerHeight, 0])

    // Create area
    const area = d3
      .area<{ date: Date; value: number }>()
      .x((d) => x(d.date))
      .y0(innerHeight)
      .y1((d) => y(d.value))
      .curve(d3.curveMonotoneX)

    // Create line
    const line = d3
      .line<{ date: Date; value: number }>()
      .x((d) => x(d.date))
      .y((d) => y(d.value))
      .curve(d3.curveMonotoneX)

    // Add gradient
    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "area-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%")

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#3b82f6").attr("stop-opacity", 0.3)

    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#3b82f6").attr("stop-opacity", 0)

    // Draw area
    g.append("path").datum(dataWithDates).attr("fill", "url(#area-gradient)").attr("d", area)

    // Draw line
    g.append("path")
      .datum(dataWithDates)
      .attr("fill", "none")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 2)
      .attr("d", line)

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(5)
          .tickFormat((d) => d3.timeFormat("%H:%M")(d as Date)),
      )
      .attr("color", "#737373")
      .selectAll("text")
      .style("font-size", "10px")

    g.append("g")
      .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format(".2s")))
      .attr("color", "#737373")
      .selectAll("text")
      .style("font-size", "10px")
  }, [data, height])

  return (
    <div className="w-full">
      <svg ref={svgRef} width="100%" height={height} />
    </div>
  )
}
