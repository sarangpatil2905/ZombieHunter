
import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, Filter, ExternalLink, ArrowUpDown } from "lucide-react"

export interface ApiEndpoint {
  id: string
  name: string
  lastUsed: string
  requestCount: string
  errorRate: string
  riskScore: number
  status: "active" | "zombie" | "warning"
}
// Updated Mock Data to match the "Transaction" style values
const mockApis: ApiEndpoint[] = [
  { id: "1", name: "/api/v2/users", lastUsed: "2 mins ago", requestCount: "45,200", errorRate: "0.12%", riskScore: 15, status: "active" },
  { id: "3", name: "/api/v1/legacy-payments", lastUsed: "94 days ago", requestCount: "0", errorRate: "N/A", riskScore: 92, status: "zombie" },
  { id: "5", name: "/api/v1/deprecated-auth", lastUsed: "120 days ago", requestCount: "12", errorRate: "58.3%", riskScore: 98, status: "zombie" },
  { id: "7", name: "/api/v2/analytics", lastUsed: "15 days ago", requestCount: "2,100", errorRate: "2.4%", riskScore: 65, status: "warning" },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return (
        <span className="px-2 py-1 text-xs rounded-full bg-green-50 text-green-600 font-medium">
          Active
        </span>
      )
    case "zombie":
      return (
        <span className="px-2 py-1 text-xs rounded-full bg-red-50 text-red-600 font-medium">
          Zombie
        </span>
      )
    case "warning":
      return (
        <span className="px-2 py-1 text-xs rounded-full bg-yellow-50 text-yellow-600 font-medium">
          Warning
        </span>
      )
  }
}

export function ApiTable() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <Card className="bg-white border border-gray-200 rounded-md shadow-sm">

      {/* Header */}
      <CardContent>
        <div className="overflow-x-auto">
          <Table>

            {/* Header */}
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="text-xs text-gray-500 font-medium">API</TableHead>
                <TableHead className="text-xs text-gray-500">Last Used</TableHead>
                <TableHead className="text-xs text-gray-500">Requests</TableHead>
                <TableHead className="text-xs text-gray-500">Error</TableHead>
                <TableHead className="text-xs text-gray-500">Risk</TableHead>
                <TableHead className="text-xs text-gray-500">Status</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>

            {/* Body */}
            <TableBody>
              {mockApis
                .filter(api =>
                  api.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((api) => (
                  <TableRow
                    key={api.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >

                    {/* API */}
                    <TableCell className="font-medium text-gray-800">
                      {api.name}
                    </TableCell>

                    {/* Last Used */}
                    <TableCell className="text-sm text-gray-500">
                      {api.lastUsed}
                    </TableCell>

                    {/* Requests */}
                    <TableCell className="text-sm text-gray-700">
                      {api.requestCount}
                    </TableCell>

                    {/* Error */}
                    <TableCell className="text-sm text-gray-700">
                      {api.errorRate}
                    </TableCell>

                    {/* Risk */}
                    <TableCell>
                      <span className="text-sm font-semibold text-gray-800">
                        {api.riskScore}
                      </span>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      {getStatusBadge(api.status)}
                    </TableCell>

                    {/* Action */}
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="h-8 w-8"
                      >
                        <Link to={`/dashboard/apis/${api.id}`}>
                          <ExternalLink className="w-4 h-4 text-gray-500" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>

          </Table>
        </div>
      </CardContent>
    </Card>
  )
}