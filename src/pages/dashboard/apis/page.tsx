import { ApiTable } from "@/components/dashboard/api-table"
import { Card, CardContent } from "@/components/ui/card"
import { Server, Skull, AlertTriangle, Shield } from "lucide-react"

const stats = [
  { label: "Total APIs", value: "1,284", icon: Server, color: "text-primary", bg: "bg-primary/10" },
  { label: "Zombie APIs", value: "47", icon: Skull, color: "text-neon-red", bg: "bg-neon-red/10" },
  { label: "At Risk", value: "23", icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { label: "Protected", value: "1,214", icon: Shield, color: "text-neon-green", bg: "bg-neon-green/10" },
]

export default function ApisPage() {
  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">API Endpoints</h1>
        <p className="text-muted-foreground">
          Manage and monitor all discovered API endpoints in your infrastructure.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="glass border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* API Table */}
      <ApiTable />
    </div>
  )
}
