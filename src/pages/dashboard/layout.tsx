import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import "../globals.css";
import { ChevronRight, Bell, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BreadcrumbProps {
  items: string[];
}

function BreadcrumbHeader({ items }: BreadcrumbProps) {
  return (
    <div className="flex items-center  p-2 bg-[#f7f7f5] w-full justify-between">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className={index === items.length - 1 ? "text-gray-900 font-semibold" : ""}>
              {item}
            </span>
            {index < items.length - 1 && <ChevronRight className="w-3 h-3 text-gray-400" />}
          </div>
        ))}
      </div>

      {/* Right Buttons: Alerts & Settings */}
      <div className="flex items-center gap-4 ">
        {/* Alerts */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 p-2">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-neon-red" />
                <span className="font-medium text-sm">Zombie API Detected</span>
              </div>
              <span className="text-xs text-muted-foreground pl-4">
                /api/v1/legacy-auth has been inactive for 90 days
              </span>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="font-medium text-sm">High Risk Score</span>
              </div>
              <span className="text-xs text-muted-foreground pl-4">
                /api/payments risk score increased to 85
              </span>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-medium text-sm">New API Discovered</span>
              </div>
              <span className="text-xs text-muted-foreground pl-4">
                12 new endpoints found in production
              </span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-primary justify-center">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              <Settings size={20} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>API Keys</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-60 shrink-0 bg-[#f7f7f5] border-r">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 overflow-y-scroll bg-white w-full">
        <div
          className="fixed top-0 left-60 right-0 z-50"
        >
          <BreadcrumbHeader items={["Overview", "Dashboard"]} />
        </div>
        <main className="flex-1 px-2 mt-14">

          {/* Page Content */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}