"use client"

import { Home, Users, Wallet, TrendingUp, BookOpen, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  { icon: Home, label: "Dashboard", key: "dashboard" },
  { icon: Users, label: "Member", key: "members" },
  { icon: Wallet, label: "Collection", key: "collection" },
  { icon: TrendingUp, label: "Expenditure", key: "expenditure" },
  { icon: BookOpen, label: "Cash Book", key: "cashbook" },
]

interface AdminSidebarProps {
  onNavigate: (view: string) => void
  activeView: string
}

export function AdminSidebar({ onNavigate, activeView }: AdminSidebarProps) {
  return (
    <div className="w-64 h-screen bg-blue-700 text-white flex flex-col">
      <div className="p-4 border-b border-blue-600 text-center">
        <h1 className="text-lg font-bold text-white mb-2">MANDAWA</h1>
        <img
          src="https://ik.imagekit.io/kherwalbazaar/Mandawa%20Logo%20small.jpg?updatedAt=1757390794798"
          alt="Mandawa Logo"
          className="w-16 h-16 mx-auto rounded-full object-cover border-2 border-blue-500"
        />
      </div>

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
