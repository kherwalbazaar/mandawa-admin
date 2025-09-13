"use client"

import { Home, Users, Wallet, TrendingUp, BookOpen } from "lucide-react"
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
      <div className="p-6 border-b border-blue-600 text-center">
        <img
          src="https://ik.imagekit.io/kherwalbazaar/Mandawa%20Logo%20small.jpg?updatedAt=1757390794798"
          alt="Mandawa Logo"
          className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-blue-500 mb-3"
        />
        <h1 className="text-xl font-bold text-white">MANDAWA</h1>
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
    </div>
  )
}
