"use client"

import { Home, Users, DollarSign, TrendingUp, Settings, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  { icon: Home, label: "Dashboard", key: "dashboard" },
  { icon: Users, label: "Members", key: "members" },
  { icon: DollarSign, label: "Finance", key: "finance" },
  { icon: TrendingUp, label: "Expenditure", key: "expenditure" },
  { icon: BarChart3, label: "Reports", key: "reports" },
  { icon: Settings, label: "Settings", key: "settings" },
]

interface AdminSidebarProps {
  onNavigate: (view: string) => void
  activeView: string
}

export function AdminSidebar({ onNavigate, activeView }: AdminSidebarProps) {
  return (
    <div className="w-64 h-screen bg-primary text-primary-foreground flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-sidebar-border/20">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => onNavigate(item.key)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                  activeView === item.key
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-primary-foreground/10",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sidebar-accent rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold">A</span>
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs opacity-70">admin@company.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
