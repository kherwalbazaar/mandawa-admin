"use client"

import type { LucideIcon } from "lucide-react"

interface KpiCardProps {
  title: string
  value: string
  icon: LucideIcon
  trend?: string
}

export function KpiCard({ title, value, icon: Icon, trend }: KpiCardProps) {
  return (
    <div
      className="rounded-lg shadow-lg p-6 border-0"
      style={{
        background: "linear-gradient(135deg, #10b981 0%, #facc15 100%)",
        color: "#1f2937",
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium mb-2" style={{ color: "#374151" }}>
            {title}
          </p>
          <p className="text-3xl font-bold mb-1" style={{ color: "#111827" }}>
            {value}
          </p>
          {trend && (
            <p className="text-sm" style={{ color: "#4b5563" }}>
              {trend}
            </p>
          )}
        </div>
        <div className="p-3 rounded-lg" style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}>
          <Icon className="h-6 w-6" style={{ color: "#1f2937" }} />
        </div>
      </div>
    </div>
  )
}
