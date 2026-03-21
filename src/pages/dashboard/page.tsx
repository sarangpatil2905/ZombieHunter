import { MetricsCards } from "@/components/dashboard/metrics-cards"
import { ApiStatusChart } from "@/components/dashboard/api-status-chart"
import { RiskScoreGauge } from "@/components/dashboard/risk-score-gauge"
import { ApiTable } from "@/components/dashboard/api-table"
import { Filter, Info, MoreHorizontal, Search } from "lucide-react"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  return (

    <div className="p-2 max-w-7xl mx-auto space-y-4">

      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        {/* Left */}
        <div>
          <h1 className="text-xl font-semibold  tracking-tight">
            Dashboard Overview
          </h1>
        </div>

        {/* Right (Actions) */}
        <div className="flex items-center gap-2">
          <button className="px-4 py-1.5 text-sm border rounded-lg hover:bg-muted transition">
            Last 7 days
          </button>
          <button className="px-4 py-1.5 text-sm bg-black text-white rounded-lg hover:opacity-90 transition">
            Export
          </button>
        </div>

      </div>

      {/* Metrics Cards */}
      <section className="">
        <MetricsCards />
      </section>

      {/* Charts Row */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#f7f7f5] rounded-lg p-1.5">
          <div className="flex justify-between items-center px-4 pb-2">
            <div className="flex items-baseline gap-2">
              <span className="text-gray-400 text-[12px] font-medium uppercase tracking-tight">Zombie APIs :</span>
              <span className="text-xl font-bold text-gray-900 tracking-tighter">47</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-gray-900 rounded-sm" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-zinc-300 rounded-sm" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Zombie</span>
              </div>
            </div>
          </div>
          <ApiStatusChart />
        </div>

        <div className="bg-[#f7f7f5] rounded-lg p-1.5">
          <div className="flex justify-between items-center px-4 pb-2">
            <div className="flex items-baseline gap-2">
              <span className="text-gray-400 text-[12px] font-medium uppercase tracking-tight">Security Breakdown :</span>
              <span className="text-xl font-bold text-gray-900 tracking-tighter">72%</span>
            </div>
          </div>
          <RiskScoreGauge />
        </div>
      </section>

      {/* API Table */}
      <section className="bg-[#f7f7f5] rounded-lg p-1.5">
        <div className="">
          <CardHeader className="">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

              <CardTitle className="text-base font-semibold text-gray-800">
                API Endpoints
              </CardTitle>

              <div className="flex items-center gap-2">

                {/* Search */}
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search APIs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-9 bg-gray-50 border-gray-200 text-sm"
                  />
                </div>

                {/* Filter */}
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Filter className="w-4 h-4 text-gray-500" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </div>
        <ApiTable />
      </section>

    </div>
  )
}