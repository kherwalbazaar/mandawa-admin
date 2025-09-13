"use client"

import { Home, Users, Wallet, TrendingUp, Mail, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  { icon: Home, label: "Dashboard", key: "dashboard" },
  { icon: Mail, label: "Mail", key: "mail" },
  { icon: Users, label: "Members", key: "members" },
  { icon: Wallet, label: "Collection", key: "collection" },
  { icon: TrendingUp, label: "Expenditure", key: "expenditure" },
]

interface AdminSidebarProps {
  onNavigate: (view: string) => void
  activeView: string
}

export function AdminSidebar({ onNavigate, activeView }: AdminSidebarProps) {
  return (
    <div className="w-64 h-screen bg-blue-700 text-white flex flex-col">
      <div className="flex items-center gap-3 p-4 border-b border-blue-600">
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
          AM
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Arjun Makwana</p>
          <p className="text-xs text-blue-200">Lead UI/UX Designer</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <h3 className="text-xs font-semibold text-blue-200 uppercase tracking-wider mb-4">Main Navigation</h3>
        {navigationItems.map((item, index) => (
          <button
            key={index}
            onClick={() => onNavigate(item.key)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
              activeView === item.key
                ? "bg-blue-600 text-white shadow-lg"
                : "hover:bg-blue-600 text-blue-100 hover:text-white",
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}

        <div className="mt-8">
          <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors w-full">
            QUICK SEND
          </button>
        </div>
      </nav>

      <div className="p-4 border-t border-blue-600">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors hover:bg-blue-600 text-blue-100 hover:text-white">
          <LogOut className="h-5 w-5" />
          <span className="font-medium">LOGOUT</span>
        </button>
      </div>
    </div>
  )
}
