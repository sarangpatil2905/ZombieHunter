import { useState, useEffect } from "react"
import { Search, ShieldPlus, BarChart3, Route } from "lucide-react"
import Cuboid from "@/components/cuboid"

const features = [
  {
    icon: Search,
    title: "API Discovery",
    description:
      "Automatically map and catalog every API across your infrastructure with intelligent endpoint detection, giving you complete visibility into your entire API ecosystem in real time.",
  },
  {
    icon: ShieldPlus,
    title: "Zombie Detection",
    description:
      "Leverage machine learning to identify inactive, outdated, or vulnerable APIs that silently increase your attack surface and pose hidden security risks.",
  },
  {
    icon: BarChart3,
    title: "Risk Scoring",
    description:
      "Analyze and prioritize API vulnerabilities with dynamic risk scoring, helping your team focus on the most critical threats with clear, actionable insights.",
  },
  {
    icon: Route,
    title: "Attack Simulation",
    description:
      "Simulate real-world attack paths to understand how vulnerabilities can be chained together, enabling proactive defense before threats become breaches.",
  },
]

export function FeaturesSection() {
  const [selected, setSelected] = useState(0)
  const [paused, setPaused] = useState(false)

  const displayFeatures = features.slice(0, 4)

  useEffect(() => {
    if (paused) return

    const interval = setInterval(() => {
      setSelected((prev) => (prev + 1) % displayFeatures.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [paused, displayFeatures.length])

  return (
    <section className="py-20 px-4 mb-20">
      <div className="container mx-auto ">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Enterprise Features
          </h2>
        </div>

        {/* MAIN LAYOUT */}
        <div className="flex justify-center gap-10 items-center mt-40">

          {/* FEATURE NAMES */}
          <div className="flex flex-col gap-10 z-100">
            {displayFeatures.map((feature, i) => {
              const isActive = i === selected

              return (
                <div
                  className="flex items-center gap-2"
                  style={{ width: `${130 * 3 - i * 5}px` }}
                ><div
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`cursor-pointer transition-all ${isActive
                    ? "text-[#888] font-semibold"
                    : "text-gray-400"
                    }`}
                >
                    {feature.title}
                  </div>
                  <div
                    className={`flex-1 h-0.5 bg-[#888]  duration-500 ${isActive ? "w-full opacity-100" : "w-0 opacity-0"
                      }`}
                  /></div>
              )
            })}
          </div>
          {/* LEFT → Cuboids */}
          <div
            className="flex flex-col gap-6 relative -left-20"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {displayFeatures.map((_, i) => {
              const isActive = i === selected
              const isAbove = i < selected

              return (
                <div
                  key={i}
                  onClick={() => setSelected(i)}
                  className="h-10 relative"
                  style={{
                    zIndex: -100 * i,
                    opacity: isActive ? 1 : isAbove ? 0.6 : 0.86,
                    transform: `
                      translateY(${isActive
                        ? -20
                        : isAbove
                          ? -(selected - i) * 10
                          : 0
                      }px)
                      scale(${isActive ? 1.05 : 0.98})
                    `,
                    transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                    cursor: "pointer"
                  }}
                >
                  <Cuboid
                    length={320}
                    bradius={20}
                    height={i != 3 ? 20 : 30}
                    width={420}

                    icon={displayFeatures[i].icon}

                    topColor={isActive ? "#D5E5FE" : "#ffffff"}
                    bottomColor={isActive ? "#D5E5FE" : "#ffffff"}
                    sideColor={isActive ? "#8AAFF2" : "#d1d5db"}

                    isActive={isActive}
                  />
                </div>
              )
            })}
          </div>

          {/* RIGHT → FEATURE LIST + DETAILS */}
          <div className="flex gap-12">



            {/* DETAILS PANEL */}
            <div className="w-75 text-right flex flex-col justify-center">


              {/* DESCRIPTION */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {displayFeatures[selected].description}
              </p>

            </div>

          </div>

        </div>

      </div>
    </section >
  )
}