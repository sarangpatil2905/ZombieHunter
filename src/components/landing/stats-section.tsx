"use client"

import { useEffect, useState } from "react"

const stats = [
  { value: 2500000, suffix: "+", label: "APIs Monitored" },
  { value: 45000, suffix: "+", label: "Zombie APIs Detected" },
  { value: 94, suffix: "%", label: "Risk Reduction" },
  { value: 99.9, suffix: "%", label: "Uptime" }
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(current)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  const formatValue = (val: number) => {
    if (val >= 1000000) return (val / 1000000).toFixed(1) + "M"
    if (val >= 1000) return (val / 1000).toFixed(0) + "K"
    return val.toFixed(val % 1 === 0 ? 0 : 1)
  }

  return <span>{formatValue(displayValue)}{suffix}</span>
}

export function StatsSection() {
  return (
    <section id="stats" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Security Teams Worldwide
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Real results from enterprises who have deployed ZombieHunter.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row items-end justify-around gap-6">

          {stats.map((stat, index) => (
            <div key={index} className="relative w-55 ">

              <div className="absolute -bottom-3 left-0 w-full h-12 bg-[#d1d5db] border-[#aaa] border-2 rounded-b-2xl " />
              {/* CARD */}
              <div className="relative bg-white rounded-2xl  border-[#aaa] border-2 p-8 text-center transition-all duration-300 hover:-translate-y-2">


                {/* NUMBER */}
                <div className="text-4xl md:text-5xl font-semibold text-gray-900 mb-2">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>

                {/* LABEL */}
                <div className="text-sm text-gray-500">
                  {stat.label}
                </div>

                {/* BOTTOM CURVE */}

              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  )
}