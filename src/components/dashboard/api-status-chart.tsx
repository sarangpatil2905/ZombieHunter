import { Card } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"

// Smooth wave data for Zombie vs Active APIs
const data = [
  { name: "JAN", active: 3, zombie: 2 },
  { name: "", active: 4, zombie: 3 },
  { name: "FEB", active: 6, zombie: 4 },
  { name: "", active: 8, zombie: 5 },
  { name: "MAR", active: 5, zombie: 4 },
  { name: "", active: 4, zombie: 3 },
  { name: "APR", active: 7, zombie: 6 },
  { name: "", active: 12, zombie: 9 },
  { name: "MAY", active: 14, zombie: 10 }, // Peak
  { name: "", active: 11, zombie: 8 },
  { name: "JUN", active: 7, zombie: 5 },
  { name: "", active: 6, zombie: 4 },
  { name: "JUL", active: 9, zombie: 7 },
  { name: "", active: 12, zombie: 8 },
  { name: "AUG", active: 10, zombie: 6 },
  { name: "", active: 7, zombie: 5 },
  { name: "SEP", active: 5, zombie: 4 },
  { name: "", active: 6, zombie: 5 },
  { name: "OCT", active: 9, zombie: 7 },
  { name: "", active: 7, zombie: 5 },
  { name: "NOV", active: 5, zombie: 4 },
  { name: "", active: 4, zombie: 3 },
  { name: "DEC", active: 3, zombie: 2 },
]

const BOX_SIZE = 10; // The square dimension
const ROWS = 18;     // Vertical height of the grid

const GridMatrix = (props: any) => {
  const { x, payload } = props;
  const blocks = [];

  // To prevent vertical gaps, we use a constant multiplier
  // To prevent overflow, we anchor to the bottom of the SVG (approx 200px)
  const chartBottom = 200;

  // 1. Background Grid (Empty Boxes)
  for (let i = 0; i < ROWS; i++) {
    blocks.push(
      <rect
        key={`bg-${i}`}
        x={x}
        y={chartBottom - (i + 1) * BOX_SIZE}
        width={BOX_SIZE}
        height={BOX_SIZE}
        fill="none"
        stroke="#F1F1F4" // Very subtle outline
        strokeWidth="0.5"
      />
    )
  }

  // 2. Active APIs (Black squares)
  for (let i = 0; i < payload.active; i++) {
    blocks.push(
      <rect
        key={`active-${i}`}
        x={x}
        y={chartBottom - (i + 1) * BOX_SIZE}
        width={BOX_SIZE}
        height={BOX_SIZE}
        fill="#68686B"
      />
    )
  }

  // 3. Zombie APIs (Gray squares on top)
  for (let i = 0; i < payload.zombie; i++) {
    blocks.push(
      <rect
        key={`zombie-${i}`}
        x={x}
        y={chartBottom - (payload.active + i + 1) * BOX_SIZE}
        width={BOX_SIZE}
        height={BOX_SIZE}
        fill="#D4D4D8"
      />
    )
  }

  return <g>{blocks}</g>
}

export function ApiStatusChart() {
  return (
    <Card className="bg-white border-none rounded-md flex justify-center">
      <div className="h-[240px] w-full max-w-[570px] mx-auto">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            barCategoryGap={0}
            barGap={0}
          >
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              interval={1}
              tick={{ fontSize: 10, fill: "#A1A1AA", fontWeight: 700 }}
              dy={10}
              padding={{ left: 5, right: 5 }}
            />

            <YAxis
              domain={[0, ROWS]}
              ticks={[0, 3, 6, 9, 12, 15, 18]} // adjust density
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#A1A1AA" }}
              width={30}
            />
            <Tooltip cursor={false} content={() => null} />

            <Bar
              dataKey="active"
              shape={<GridMatrix />}
              barSize={BOX_SIZE}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}