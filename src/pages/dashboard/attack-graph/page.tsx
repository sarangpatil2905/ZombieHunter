import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AttackGraphVisualization } from "@/components/dashboard/attack-graph-visualization"
import { AlertTriangle, Shield, Route, Zap, ChevronRight, Info, MoreHorizontal } from "lucide-react"

const attackPaths = [
  {
    id: 1,
    name: "Auth Bypass Path",
    severity: "high",
    nodes: 4,
    description: "Potential authentication bypass through deprecated v1 auth endpoint"
  },
  {
    id: 2,
    name: "Data Exfil Path",
    severity: "medium",
    nodes: 3,
    description: "Unprotected internal API could leak sensitive user data"
  },
  {
    id: 3,
    name: "Privilege Escalation",
    severity: "high",
    nodes: 5,
    description: "Zombie admin API allows unauthorized privilege escalation"
  }
]

const getSeverityBadge = (severity: string) => {
  switch (severity) {
    case "high":
      return <Badge className="bg-neon-red/20 text-neon-red border-neon-red/30">High</Badge>
    case "medium":
      return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Medium</Badge>
    case "low":
      return <Badge className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30">Low</Badge>
    default:
      return null
  }
}

export default function AttackGraphPage() {
  return (
    <div className="space-y-6 pb-20 lg:pb-6 p-2">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h1 className="text-xl font-semibold  tracking-tight">
          Attack Graph
        </h1>
      </div>



      <Card className="bg-[#f7f7f5] rounded-lg p-1.5 border-0 shadow-none">
        {/* Header */}
        <div className="flex justify-between items-center px-4 pb-0">
          <div className="flex items-baseline gap-2 py-1">
            <span className="text-gray-400 text-[12px] font-medium uppercase tracking-tight">
              Network Topology
            </span>
          </div>

          {/* Optional Legend (important for consistency) */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-[#7CA994] rounded-sm" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Active
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-[#EB653F] rounded-sm" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Zombie
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-[#F5CE29] rounded-sm" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Warning
              </span>
            </div>
          </div>
        </div>

        {/* Graph */}
        <CardContent className="p-0">
          <div className=" w-full bg-white">
            <AttackGraphVisualization />
          </div>
        </CardContent>
      </Card>

      {/* Attack Paths List */}
      <Card className="bg-[#f7f7f5] rounded-lg p-1.5 border-0 shadow-none flex gap-0">
        {/* Header following Image 5 Style */}
        <div className="flex justify-between items-start ">
          <div className="flex justify-between items-center px-4 pb-0">
            <div className="flex items-baseline gap-2 py-1">
              <span className="text-gray-400 text-[12px] font-medium uppercase tracking-tight">
                Threat Intellegence
              </span>
            </div>

          </div>
          <button className="p-2 text-gray-300 hover:text-gray-600 transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
        <div className=" flex items-center gap-3 bg-white rounded-md p-3 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
          <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm ">
            <span className="text-xs">⚡</span>
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-bold text-gray-700 leading-none mb-1">Remediation Script Ready</p>
            <p className="text-[10px] text-gray-400 font-medium tracking-tight">Generate Terraform fix for these paths</p>
          </div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">
            Run →
          </div>
        </div>

        {/* Path List */}
        <div className="space-y-4 mt-2 bg-white rounded-md">
          <div className="flex items-baseline gap-2 px-4">
            <span className="text-gray-400 text-xs font-medium">Attack Paths :</span>
            <h2 className="text-xl font-bold text-gray-900 tracking-tighter">
              {attackPaths.length} Active
            </h2>
          </div>
          {attackPaths.map((path) => (
            <div
              key={path.id}
              className="group relative flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-50 hover:border-gray-100 hover:bg-gray-50/50 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                {/* Severity Dot Inspired by Image 6 Status */}
                <div className={`w-2 h-2 rounded-full ${path.severity === "high" ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]" : "bg-amber-400"
                  }`} />

                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-gray-800 tracking-tight leading-none mb-1">
                    {path.name}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium truncate max-w-[200px]">
                    {path.description}
                  </span>
                </div>
              </div>

              {/* Matrix Data Style */}
              <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                    Nodes
                  </p>
                  <p className="text-sm font-bold text-gray-900 font-mono tracking-tighter">
                    0{path.nodes}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center bg-white group-hover:bg-gray-900 group-hover:border-gray-900 transition-all">
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Suggestion Footer (Image 4 Style) */}

      </Card>
    </div>
  )
}
