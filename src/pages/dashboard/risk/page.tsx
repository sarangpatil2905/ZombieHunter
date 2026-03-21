import { RiskScoreGauge } from "@/components/dashboard/risk-score-gauge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingDown, TrendingUp, Shield, AlertTriangle, Lock, Zap } from "lucide-react"

const riskTrends = [
  { period: "This Week", score: 72, change: -5, trend: "down" },
  { period: "Last Week", score: 77, change: +3, trend: "up" },
  { period: "This Month", score: 74, change: -8, trend: "down" },
  { period: "Last Month", score: 82, change: +12, trend: "up" },
]

const topRisks = [
  { 
    title: "Zombie API Exposure", 
    description: "47 inactive APIs still accessible",
    severity: "high",
    impact: "Critical data exposure risk"
  },
  { 
    title: "Missing Rate Limiting", 
    description: "23 endpoints without rate limits",
    severity: "medium",
    impact: "DoS vulnerability"
  },
  { 
    title: "Weak Authentication", 
    description: "8 APIs using deprecated auth",
    severity: "high",
    impact: "Unauthorized access risk"
  },
  { 
    title: "Unencrypted Data", 
    description: "5 internal APIs without TLS",
    severity: "medium",
    impact: "Data interception risk"
  },
]

export default function RiskAnalysisPage() {
  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Risk Analysis</h1>
        <p className="text-muted-foreground">
          Comprehensive security risk assessment and vulnerability tracking.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Risk Score Gauge */}
        <RiskScoreGauge />

        {/* Risk Trends */}
        <Card className="glass border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Risk Score Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskTrends.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/30"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      item.trend === "down" ? "bg-neon-green/10" : "bg-neon-red/10"
                    }`}>
                      {item.trend === "down" ? (
                        <TrendingDown className="w-4 h-4 text-neon-green" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-neon-red" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{item.period}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.trend === "down" ? "Improved" : "Worsened"} by {Math.abs(item.change)} points
                      </p>
                    </div>
                  </div>
                  <div className={`text-2xl font-bold ${
                    item.score >= 80 ? "text-neon-red" : 
                    item.score >= 60 ? "text-yellow-500" : 
                    "text-neon-green"
                  }`}>
                    {item.score}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Risks */}
      <Card className="glass border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Top Security Risks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {topRisks.map((risk, index) => (
              <div 
                key={index}
                className={`p-4 rounded-xl border ${
                  risk.severity === "high" 
                    ? "border-neon-red/30 bg-neon-red/5" 
                    : "border-yellow-500/30 bg-yellow-500/5"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    risk.severity === "high" ? "bg-neon-red/10" : "bg-yellow-500/10"
                  }`}>
                    <AlertTriangle className={`w-5 h-5 ${
                      risk.severity === "high" ? "text-neon-red" : "text-yellow-500"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{risk.title}</span>
                      <Badge className={
                        risk.severity === "high" 
                          ? "bg-neon-red/20 text-neon-red border-neon-red/30" 
                          : "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
                      }>
                        {risk.severity.charAt(0).toUpperCase() + risk.severity.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{risk.description}</p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Impact:</span> {risk.impact}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
