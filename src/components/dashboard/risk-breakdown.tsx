"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Shield, Clock, Bug, Lock, Zap } from "lucide-react"

interface RiskFactor {
  label: string
  score: number
  description: string
  icon: React.ElementType
}

const getRiskFactors = (overallScore: number): RiskFactor[] => {
  if (overallScore >= 80) {
    return [
      { label: "Inactivity", score: 35, description: "No traffic for 90+ days", icon: Clock },
      { label: "No Auth", score: 25, description: "Missing authentication layer", icon: Lock },
      { label: "Vulnerabilities", score: 20, description: "Known CVEs detected", icon: Bug },
      { label: "No Rate Limit", score: 12, description: "Rate limiting not configured", icon: Zap }
    ]
  }
  return [
    { label: "Minor Issues", score: 8, description: "Small configuration gaps", icon: AlertTriangle },
    { label: "Auth OK", score: 0, description: "Authentication properly configured", icon: Lock },
    { label: "No Vulns", score: 0, description: "No known vulnerabilities", icon: Shield },
    { label: "Rate Limited", score: 7, description: "Could be more restrictive", icon: Zap }
  ]
}

const getRiskColor = (score: number) => {
  if (score >= 25) return "text-neon-red bg-neon-red/10"
  if (score >= 10) return "text-yellow-500 bg-yellow-500/10"
  if (score > 0) return "text-neon-cyan bg-neon-cyan/10"
  return "text-neon-green bg-neon-green/10"
}

export function RiskBreakdown({ riskScore }: { riskScore: number }) {
  const factors = getRiskFactors(riskScore)

  return (
    <Card className="glass border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Risk Score Breakdown</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">Overall:</span>
            <span className={`text-2xl font-bold ${riskScore >= 80 ? "text-neon-red" : riskScore >= 50 ? "text-yellow-500" : "text-neon-green"}`}>
              {riskScore}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {factors.map((factor, index) => (
            <div 
              key={index}
              className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-border/50"
            >
              <div className={`p-2.5 rounded-lg ${getRiskColor(factor.score)}`}>
                <factor.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{factor.label}</span>
                  <span className={`text-sm font-bold ${
                    factor.score >= 25 ? "text-neon-red" : 
                    factor.score >= 10 ? "text-yellow-500" : 
                    factor.score > 0 ? "text-neon-cyan" : 
                    "text-neon-green"
                  }`}>
                    +{factor.score}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{factor.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Risk Summary */}
        <div className="mt-6 p-4 rounded-xl border border-border/50 bg-secondary/20">
          <div className="flex items-start gap-3">
            {riskScore >= 80 ? (
              <>
                <AlertTriangle className="w-5 h-5 text-neon-red flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-neon-red">High Risk - Immediate Action Required</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    This API has critical security issues and should be quarantined or remediated immediately.
                  </p>
                </div>
              </>
            ) : (
              <>
                <Shield className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-neon-green">Low Risk - Healthy</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    This API is well-configured with minimal security concerns. Continue monitoring.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
