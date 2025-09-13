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
        return "bg-emerald-600 text-white"
      case "purple":
        return "bg-purple-600 text-white"
      case "blue":
        return "bg-blue-600 text-white"
      case "orange":
        return "bg-orange-600 text-white"
      default:
        return "bg-emerald-600 text-white"
    }
  }

  return (
    <div
      className={`${getCardClasses(colorClass)} rounded-xl shadow-lg p-6 border-0 transition-transform hover:scale-105`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-4xl font-bold mb-2 text-white">{value}</h3>
          <p className="font-medium text-sm text-white">{title}</p>
          {trend && <p className="text-xs mt-1 text-white/90">{trend}</p>}
        </div>
        <div className="p-2 rounded-lg bg-white/20">{Icon && <Icon className="h-6 w-6 text-white" />}</div>
      </div>
    </div>
  )
}
