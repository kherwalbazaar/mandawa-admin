"use client"

import type { LucideIcon } from "lucide-react"

interface KpiCardProps {
  title: string
  value: string
  icon: LucideIcon
  trend?: string
  colorClass: "green" | "purple" | "blue" | "orange"
}

export function KpiCard({ title, value, icon: Icon, trend, colorClass }: KpiCardProps) {
  const getCardClasses = (color: string) => {
    switch (color) {
      case "green":
        return "bg-gradient-to-br from-emerald-500 to-emerald-400"
      case "purple":
        return "bg-gradient-to-br from-purple-500 to-purple-400"
      case "blue":
        return "bg-gradient-to-br from-blue-500 to-blue-400"
      case "orange":
        return "bg-gradient-to-br from-orange-500 to-orange-400"
      default:
        return "bg-gradient-to-br from-emerald-500 to-emerald-400"
    }
  }

  return (
    <div
      className={`${getCardClasses(colorClass)} rounded-xl shadow-lg p-6 border-0 transition-transform hover:scale-105 text-white`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-4xl font-bold text-white mb-2">{value}</h3>
          <p className="text-white font-medium text-sm">{title}</p>
          {trend && <p className="text-white/90 text-xs mt-1">{trend}</p>}
        </div>
        <div className="p-2 rounded-lg bg-white/20">
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  )
}
