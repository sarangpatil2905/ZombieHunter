import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Ticket } from "lucide-react"

const metrics = [
  {
    title: "Current Tickets",
    value: "3,484",
    change: "+7.1%",
    trend: "up",
    data: [30, 45, 42, 48, 65, 40, 55, 35, 45],
  },
  {
    title: "Zombie APIs",
    value: "47",
    change: "-8%",
    trend: "down",
    data: [30, 25, 28, 20, 22, 18, 15],
  },
  {
    title: "High Risk",
    value: "23",
    change: "+3%",
    trend: "up",
    data: [5, 8, 6, 10, 9, 12, 11],
  },
  {
    title: "Protected",
    value: "1,214",
    change: "+15%",
    trend: "up",
    data: [50, 60, 55, 70, 65, 75, 80],
  },
]

/* Refined Sparkline with Gradient Fill */
function Sparkline({ data, color, id }: { data: number[]; color: string; id: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min

  // Calculate points for the line
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100
      const y = 90 - ((d - min) / range) * 80 // Leave padding at top/bottom
      return `${x},${y}`
    })
    .join(" ")

  // Calculate points for the fill area (closes the polygon at the bottom)
  const fillPoints = `0,100 ${points} 100,100`

  return (
    <svg viewBox="0 0 100 100" className="w-24 h-12 overflow-visible" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`gradient-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        fill={`url(#gradient-${id})`}
        points={fillPoints}
      />
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  )
}

export function MetricsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6  ">
      {metrics.map((metric, index) => {
        const isPositive = metric.trend === "up"
        // Using a softer green/emerald to match the image
        const color = isPositive ? "#10b981" : "#ef4444"

        return (
          <Card
            key={index}
            className="relative overflow-hidden border-none rounded-lg bg-[#f7f7f5] py-1"
          >
            <CardContent className="px-1 py-0 flex flex-col gap-2">
              {/* Header: Title and Icon */}
              <div className="flex justify-between items-start px-2">
                <h3 className="text-[12px] font-medium text-gray-600 tracking-tight">
                  {metric.title}
                </h3>
                <Ticket className="w-4 h-4 text-gray-400 rotate-[-45deg]" />
              </div>

              {/* Body: Value and Sparkline */}
              <div className="flex items-end justify-between bg-white p-2 rounded-lg  ">
                <div className="space-y-1">
                  <p className="text-2xl font-semibold text-gray-900 tracking-tighter">
                    {metric.value}
                  </p>

                  <div className="flex items-center gap-1.5 pt-1 ">
                    <span className={`text-sm font-bold ${isPositive ? "text-emerald-500" : "text-red-500"}`}>
                      {metric.change}
                    </span>
                    <span className="text-sm font-medium text-gray-400">
                      vs last week
                    </span>
                  </div>
                </div>

                <div className="pb-1">
                  <Sparkline
                    data={metric.data}
                    color={color}
                    id={`metric-${index}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}