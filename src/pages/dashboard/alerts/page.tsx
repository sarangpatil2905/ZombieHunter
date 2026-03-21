"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertTriangle,
  Skull,
  Activity,
  Shield,
  Search,
  Bell,
  BellOff,
  CheckCircle2,
  Clock,
  Filter
} from "lucide-react"

interface Alert {
  id: string
  type: "zombie" | "high-risk" | "suspicious" | "new-api"
  title: string
  description: string
  severity: "low" | "medium" | "high"
  timestamp: string
  status: "new" | "acknowledged" | "resolved"
  api?: string
}

const alerts: Alert[] = [
  {
    id: "1",
    type: "zombie",
    title: "Zombie API Detected",
    description: "/api/v1/legacy-auth has been inactive for 94 days and poses a security risk.",
    severity: "high",
    timestamp: "2 hours ago",
    status: "new",
    api: "/api/v1/legacy-auth"
  },
  {
    id: "2",
    type: "high-risk",
    title: "High Risk Score Alert",
    description: "/api/payments risk score increased to 85 due to missing rate limiting.",
    severity: "high",
    timestamp: "4 hours ago",
    status: "acknowledged",
    api: "/api/payments"
  },
  {
    id: "3",
    type: "suspicious",
    title: "Suspicious Activity Detected",
    description: "Unusual traffic pattern detected on /api/users - 500% increase in requests.",
    severity: "medium",
    timestamp: "6 hours ago",
    status: "new",
    api: "/api/users"
  },
  {
    id: "4",
    type: "zombie",
    title: "Zombie API Detected",
    description: "/api/v1/old-search has not received traffic in 78 days.",
    severity: "high",
    timestamp: "8 hours ago",
    status: "new",
    api: "/api/v1/old-search"
  },
  {
    id: "5",
    type: "new-api",
    title: "New API Discovered",
    description: "12 new endpoints detected in production environment.",
    severity: "low",
    timestamp: "12 hours ago",
    status: "acknowledged"
  },
  {
    id: "6",
    type: "high-risk",
    title: "Authentication Vulnerability",
    description: "/api/admin endpoint missing proper authentication checks.",
    severity: "high",
    timestamp: "1 day ago",
    status: "resolved",
    api: "/api/admin"
  },
  {
    id: "7",
    type: "suspicious",
    title: "Error Rate Spike",
    description: "/api/orders experiencing 15% error rate, up from 0.2% baseline.",
    severity: "medium",
    timestamp: "1 day ago",
    status: "resolved",
    api: "/api/orders"
  }
]

const getAlertIcon = (type: string) => {
  switch (type) {
    case "zombie": return Skull
    case "high-risk": return AlertTriangle
    case "suspicious": return Activity
    case "new-api": return Shield
    default: return Bell
  }
}

const getSeverityStyles = (severity: string) => {
  switch (severity) {
    case "high":
      return {
        badge: "bg-neon-red/20 text-neon-red border-neon-red/30",
        icon: "bg-neon-red/10 text-neon-red",
        border: "border-neon-red/30"
      }
    case "medium":
      return {
        badge: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
        icon: "bg-yellow-500/10 text-yellow-500",
        border: "border-yellow-500/30"
      }
    case "low":
      return {
        badge: "bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30",
        icon: "bg-neon-cyan/10 text-neon-cyan",
        border: "border-neon-cyan/30"
      }
    default:
      return {
        badge: "bg-muted text-muted-foreground",
        icon: "bg-muted/50 text-muted-foreground",
        border: "border-border"
      }
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "new": return <div className="w-2 h-2 rounded-full bg-neon-red pulse-glow" />
    case "acknowledged": return <Clock className="w-4 h-4 text-yellow-500" />
    case "resolved": return <CheckCircle2 className="w-4 h-4 text-neon-green" />
    default: return null
  }
}

export default function AlertsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (alert.api && alert.api.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter

    return matchesSearch && matchesSeverity && matchesStatus
  })

  const alertCounts = {
    total: alerts.length,
    high: alerts.filter(a => a.severity === "high").length,
    new: alerts.filter(a => a.status === "new").length
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Security Alerts</h1>
          <p className="text-muted-foreground">
            Monitor and respond to security threats in real-time.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <BellOff className="w-4 h-4 mr-2" />
            Mute All
          </Button>
          <Button size="sm" className="glow-blue">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="glass border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Bell className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Alerts</p>
                <p className="text-xl font-bold">{alertCounts.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-neon-red/10">
                <AlertTriangle className="w-4 h-4 text-neon-red" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">High Severity</p>
                <p className="text-xl font-bold text-neon-red">{alertCounts.high}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <Clock className="w-4 h-4 text-yellow-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Unread</p>
                <p className="text-xl font-bold text-yellow-500">{alertCounts.new}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="glass border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary/50"
              />
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-full md:w-40 bg-secondary/50">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40 bg-secondary/50">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="acknowledged">Acknowledged</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <Card className="glass border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">
            Alerts ({filteredAlerts.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No alerts match your filters.</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => {
              const Icon = getAlertIcon(alert.type)
              const styles = getSeverityStyles(alert.severity)

              return (
                <div
                  key={alert.id}
                  className={`flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border ${alert.status === "new" ? styles.border : "border-border/50"
                    } hover:bg-secondary/50 transition-colors cursor-pointer`}
                >
                  <div className={`p-2.5 rounded-lg ${styles.icon}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium">{alert.title}</span>
                        <Badge className={styles.badge}>
                          {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {getStatusIcon(alert.status)}
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {alert.timestamp}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                    {alert.api && (
                      <code className="text-xs bg-secondary/50 px-2 py-1 rounded font-mono">
                        {alert.api}
                      </code>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </CardContent>
      </Card>
    </div>
  )
}
