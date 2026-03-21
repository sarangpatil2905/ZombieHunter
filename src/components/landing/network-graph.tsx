"use client"
import { useEffect, useRef } from "react"

interface Point {
  x: number
  y: number
  z: number
  label: string
  type: "active" | "zombie" | "warning" | "none"
}

interface Edge {
  source: number
  target: number
  vulnerable: boolean
}

export function NetworkGraph() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const W = rect.width
    const H = rect.height

    const points: Point[] = []
    const radius = 210

    let phi = 0
    for (let i = 0; i < 9; i++) {
      phi += 2 * Math.PI / 10
      let theta = 0.1
      for (let j = 0; j < 5; j++) {
        theta += Math.PI / 5

        const x = radius * Math.sin(phi) * Math.cos(theta)
        const y = radius * Math.sin(phi) * Math.sin(theta)
        const z = radius * Math.cos(phi)

        points.push({ x, y, z, label: "", type: "none" })
      }
    }

    const nodeTypes = [
      "active", "active", "warning", "active", "active",
      "zombie", "zombie",
      "warning", "active", "active", "warning", "zombie"
    ] as const

    const labels = [
      "/api/users", "/api/auth", "/api/data", "/api/products", "/api/orders",
      "/api/legacy", "/api/v1/old",
      "/api/payments", "/api/search", "/api/reports", "/api/analytics", "/api/deprecated"
    ]

    const shuffle = (arr: Point[]) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
    }

    shuffle(points)

    const NODE_COUNT = 12
    for (let i = 0; i < NODE_COUNT; i++) {
      points[i].label = labels[i]
      points[i].type = nodeTypes[i]
    }

    const edges: Edge[] = [
      { source: 0, target: 1, vulnerable: false },
      { source: 1, target: 2, vulnerable: false },
      { source: 2, target: 3, vulnerable: false },
      { source: 3, target: 4, vulnerable: false },
      { source: 0, target: 5, vulnerable: true },
      { source: 5, target: 6, vulnerable: true },
      { source: 2, target: 7, vulnerable: false },
      { source: 4, target: 8, vulnerable: false },
      { source: 8, target: 9, vulnerable: false },
      { source: 9, target: 10, vulnerable: false },
      { source: 10, target: 11, vulnerable: true },
      { source: 1, target: 8, vulnerable: false },
      { source: 3, target: 10, vulnerable: false },
    ]

    const getColor = (type: string) => {
      switch (type) {
        case "zombie": return "#EB653F"
        case "warning": return "#F5CE29"
        case "active": return "#7CA994"
        default: return "#dddddd00"
      }

    }

    let angle = 0

    function project(p: Point) {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)

      const x = p.x * cos - p.z * sin
      const z = p.x * sin + p.z * cos
      const y = p.y

      const perspective = 300 / (300 + z)

      return {
        x: x * perspective + W / 2,
        y: y * perspective + H / 2,
        size: 5 * perspective,
        depth: z
      }
    }

    function render() {
      ctx.clearRect(0, 0, W, H)
      angle += 0.0015

      const projected = points.map(project)

      for (let e of edges) {
        const a = projected[e.source]
        const b = projected[e.target]

        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = e.vulnerable
          ? "rgba(217,72,43,0.6)"
          : "rgba(0,0,0,.2)"
        ctx.lineWidth = e.vulnerable ? 1.5 : 1
        ctx.stroke()
      }

      for (let i = 0; i < points.length; i++) {
        const p = projected[i]
        const node = points[i]

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = getColor(node.type)
        ctx.fill()

        if (node.type !== "none" && p.depth < -2) {
          ctx.font = `11px sans-serif`
          ctx.fillStyle = "#111"
          ctx.fillText(node.label, p.x + 6, p.y - 6)
        }
      }

      requestAnimationFrame(render)
    }

    render()
  }, [])

  return (
    <div className="w-full h-150 rounded-xl ">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}