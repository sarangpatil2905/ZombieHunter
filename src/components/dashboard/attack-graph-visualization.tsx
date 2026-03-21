"use client"

import { useEffect, useRef, useState } from "react"

interface GraphNode {
  id: string
  x: number
  y: number
  z: number
  radius: number
  type: "active" | "zombie" | "warning" | "gateway"
  label: string
}

interface GraphEdge {
  source: number
  target: number
  vulnerable: boolean
}

export function AttackGraphVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<GraphNode[]>([])
  const edgesRef = useRef<GraphEdge[]>([])
  const animationRef = useRef<number>(0)

  const [hoveredNode, setHoveredNode] = useState<any>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect()
      setDimensions({ width: rect.width, height: 400 })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!

    const dpr = window.devicePixelRatio || 1
    canvas.width = dimensions.width * dpr
    canvas.height = dimensions.height * dpr
    ctx.scale(dpr, dpr)

    const W = dimensions.width
    const H = dimensions.height

    /* ---------------- NODE DATA ---------------- */

    const nodeData = [
      { type: "gateway", label: "API Gateway" },
      { type: "active", label: "/users" },
      { type: "active", label: "/auth" },
      { type: "zombie", label: "/v1/legacy" },
      { type: "active", label: "/products" },
      { type: "warning", label: "/payments" },
      { type: "active", label: "/orders" },
      { type: "zombie", label: "/deprecated" },
      { type: "active", label: "/search" },
      { type: "active", label: "/analytics" },
      { type: "warning", label: "/admin" },
      { type: "zombie", label: "/old-auth" },
      { type: "active", label: "/notifications" },
      { type: "active", label: "/settings" },
    ] as const

    /* ---------------- NODES ---------------- */

    const radius = Math.min(W, H) * 0.52
    const nodes: GraphNode[] = []

    // Gateway at center
    nodes.push({
      id: "node-0",
      x: 0,
      y: 0,
      z: 0,
      radius: 18,
      type: "gateway",
      label: "API Gateway",
    })

    let phi = 0

    for (let i = 1; i < nodeData.length; i++) {
      phi += (Math.PI * 2) / (nodeData.length - 1)

      const theta = Math.PI / 3 + (i % 5) * (Math.PI / 6)

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      nodes.push({
        id: `node-${i}`,
        x,
        y,
        z,
        radius:
          nodeData[i].type === "zombie"
            ? 12
            : nodeData[i].type === "warning"
              ? 11
              : 10,
        type: nodeData[i].type,
        label: nodeData[i].label,
      })
    }

    nodesRef.current = nodes

    /* ---------------- EDGES ---------------- */

    edgesRef.current = [
      { source: 0, target: 1, vulnerable: false },
      { source: 0, target: 2, vulnerable: false },
      { source: 0, target: 3, vulnerable: true },
      { source: 0, target: 4, vulnerable: false },
      { source: 0, target: 5, vulnerable: false },
      { source: 2, target: 3, vulnerable: true },
      { source: 3, target: 7, vulnerable: true },
      { source: 5, target: 10, vulnerable: true },
      { source: 10, target: 11, vulnerable: true },
      { source: 1, target: 8, vulnerable: false },
      { source: 8, target: 9, vulnerable: false },
    ]

    /* ---------------- COLOR ---------------- */

    const getColor = (type: string) => {
      switch (type) {
        case "gateway":
          return "#6366f1"
        case "zombie":
          return "#EB653F"
        case "warning":
          return "#F5CE29"
        default:
          return "#7CA994"
      }
    }

    /* ---------------- PROJECTION ---------------- */

    let angle = 0

    function project(p: GraphNode) {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)

      const x = p.x * cos - p.z * sin
      const z = p.x * sin + p.z * cos
      const y = p.y * 0.85 // fix vertical stretch

      const perspective = 260 / (260 + z)

      return {
        x: x * perspective + W / 2,
        y: y * perspective + H / 2,
        size: p.radius * perspective,
        depth: z,
      }
    }

    /* ---------------- RENDER ---------------- */

    function render() {
      ctx.clearRect(0, 0, W, H)
      angle += 0.002

      const projected = nodesRef.current.map(project)

      // edges
      edgesRef.current.forEach((e) => {
        const a = projected[e.source]
        const b = projected[e.target]

        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)

        ctx.strokeStyle = e.vulnerable
          ? "rgba(217,72,43,0.6)"
          : "rgba(0,0,0,0.15)"

        ctx.lineWidth = e.vulnerable ? 1.8 : 1
        ctx.stroke()
      })

      // nodes
      projected.forEach((p, i) => {
        const node = nodesRef.current[i]

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = getColor(node.type)
        ctx.fill()

        // always show gateway label
        if (node.type === "gateway") {
          ctx.font = "12px system-ui"
          ctx.fillStyle = "#111"
          ctx.fillText(node.label, p.x + 8, p.y - 8)
        }

        // front nodes only
        if (node.type !== "gateway" && p.depth < -20) {
          ctx.font = "11px system-ui"
          ctx.fillStyle = "#111"
          ctx.fillText(node.label, p.x + 6, p.y - 6)
        }
      })

      animationRef.current = requestAnimationFrame(render)
    }

    render()

    /* ---------------- HOVER ---------------- */

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      let found = null
      const projected = nodesRef.current.map(project)

      for (let i = 0; i < projected.length; i++) {
        const p = projected[i]
        const dist = Math.hypot(x - p.x, y - p.y)

        if (dist < p.size + 4) {
          found = { ...nodesRef.current[i], px: p.x, py: p.y }
          break
        }
      }

      setHoveredNode(found)
      canvas.style.cursor = found ? "pointer" : "default"
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    return () => {
      cancelAnimationFrame(animationRef.current)
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [dimensions])

  return (
    <div ref={containerRef} className="relative ">
      <canvas
        ref={canvasRef}
        style={{ width: dimensions.width, height: dimensions.height }}
        className="rounded-xl"
      />

      {hoveredNode && (
        <div
          className="absolute pointer-events-none px-3 py-2 rounded-lg glass border text-sm"
          style={{
            left: hoveredNode.px + 20,
            top: hoveredNode.py - 20,
          }}
        >
          <div className="font-medium">{hoveredNode.label}</div>
          <div className="text-xs capitalize">{hoveredNode.type}</div>
        </div>
      )}
    </div>
  )
}