"use client"

import { use } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Shield, AlertTriangle, Clock, Activity, Server, Lock } from "lucide-react"
import { UsageChart } from "@/components/dashboard/usage-chart"
import { ErrorRateChart } from "@/components/dashboard/error-rate-chart"
import { RiskBreakdown } from "@/components/dashboard/risk-breakdown"

// Mock API data
const getApiData = (id: string) => {
  const apis: Record<string, {
    id: string
    name: string
    method: string
    lastUsed: string
    createdAt: string
    version: string
    owner: string
    requestCount: string
    errorRate: string
    avgLatency: string
    riskScore: number
    status: "active" | "zombie" | "warning"
    description: string
  }> = {
    "1": {
      id: "1",
      name: "/api/v2/users",
      method: "GET, POST, PUT, DELETE",
      lastUsed: "2 mins ago",
      createdAt: "Jan 15, 2024",
      version: "v2.3.1",
      owner: "Platform Team",
      requestCount: "45.2K",
      errorRate: "0.12%",
      avgLatency: "45ms",
      riskScore: 15,
      status: "active",
      description: "User management API for CRUD operations"
    },
    "3": {
      id: "3",
      name: "/api/v1/legacy-payments",
      method: "POST",
      lastUsed: "94 days ago",
      createdAt: "Mar 2, 2021",
      version: "v1.0.0",
      owner: "Payments Team",
      requestCount: "0",
      errorRate: "N/A",
      avgLatency: "N/A",
      riskScore: 92,
      status: "zombie",
      description: "Legacy payment processing endpoint - deprecated"
    }
  }
  return apis[id] || apis["1"]
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">Active</Badge>
    case "zombie":
      return <Badge className="bg-neon-red/20 text-neon-red border-neon-red/30">Zombie</Badge>
    case "warning":
      return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Warning</Badge>
    default:
      return null
  }
}

const getRiskColor = (score: number) => {
  if (score >= 80) return "text-neon-red"
  if (score >= 50) return "text-yellow-500"
  return "text-neon-green"
}

export default function ApiDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const api = getApiData(id)

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Back Button */}
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to Dashboard</span>
      </Link>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold font-mono">{api.name}</h1>
            {getStatusBadge(api.status)}
          </div>
          <p className="text-muted-foreground">{api.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-neon-green/50 text-neon-green hover:bg-neon-green/10">
            <Shield className="w-4 h-4 mr-2" />
            Mark as Safe
          </Button>
          <Button variant="destructive" className="glow-red">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Quarantine API
          </Button>
        </div>
      </div>

      {/* Metadata Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Last Used</p>
                <p className="text-sm font-medium">{api.lastUsed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-neon-cyan/10">
                <Activity className="w-4 h-4 text-neon-cyan" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg Latency</p>
                <p className="text-sm font-medium">{api.avgLatency}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-neon-purple/10">
                <Server className="w-4 h-4 text-neon-purple" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Version</p>
                <p className="text-sm font-medium">{api.version}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <Lock className="w-4 h-4 text-yellow-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Methods</p>
                <p className="text-sm font-medium">{api.method.split(",")[0]}...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <UsageChart />
        <ErrorRateChart />
      </div>

      {/* Risk Score Breakdown */}
      <RiskBreakdown riskScore={api.riskScore} />
    </div>
  )
}
