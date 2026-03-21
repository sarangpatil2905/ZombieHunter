import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Shield,
  Search,
  Power,
  MessageSquareText,
  SquarePen,
  LayoutDashboard,
  Server,
  BarChart3,
  GitBranch,
  Bell,
  Settings,
} from "lucide-react";

interface User {
  picture: string;
  name?: string;
  email?: string;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const dashboardNavItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "APIs", href: "/dashboard/apis", icon: Server },
  { title: "Risk Analysis", href: "/dashboard/risk", icon: BarChart3 },
  { title: "Attack Graph", href: "/dashboard/attack-graph", icon: GitBranch },
  { title: "Alerts", href: "/dashboard/alerts", icon: Bell },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
  const [user] = useState<User>({
    picture: "https://i.pravatar.cc/40", // placeholder image
    name: "John Doe",
    email: "john.doe@example.com",
  });
  const [openSearch, setOpenSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { pathname } = useLocation();

  // Focus search input
  useEffect(() => {
    if (openSearch) inputRef.current?.focus();
  }, [openSearch]);

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setOpenSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    window.location.href = "/";
  };



  return (
    <div className="w-full h-screen p-2 relative flex flex-col gap-2">

      {/* Logo */}
      <div className=" flex items-center p-2 border-b border-gray-200 mb-2">
        <Link to="/" className="flex items-center gap-3">
          <div className="p-1 rounded-sm bg-primary/20 shrink-0">
            <Shield className="w-4 h-4 text-primary" />
          </div>
          <span className="font-bold text-md text-gray-900">ZombieHunter</span>
        </Link>
      </div>

      {/* Views Section with Dashboard links */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex flex-col gap-px mt-1.5">
          <div className="text-gray-600 pb-3.75 text-[14px] font-semibold flex flex-col gap-4">
            {dashboardNavItems.map(item => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center h-7.5 p-2 gap-2 w-full rounded-md ${isActive
                    ? "bg-[#EBE9E9] text-gray-900"
                    : "text-gray-600 hover:bg-[#EDEDEB]"
                  }`
                }
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span>{item.title}</span>
                {pathname === item.href && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gray-900" />
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Support & Feedback */}
        <div className=" flex items-center p-2 gap-2 w-full rounded-md text-gray-600 text-[14px] font-semibold hover:bg-[#EDEDEB]">
          <MessageSquareText className="w-5 h-4 text-gray-500" />
          <span>Support & feedback</span>
        </div>
      </div>

      {/* Logout */}
      <div className="absolute bottom-0 right-0 p-2">
        <button onClick={logout}>
          <Power className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
}