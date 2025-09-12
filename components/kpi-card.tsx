"use client"

import { Card } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface KpiCardProps {
  title: string
  value: string
  icon: LucideIcon
  trend?: string
}

export function KpiCard({ title, value, icon: Icon, trend }: KpiCardProps) {
  return (
    <Card className="kpi-gradient p-6 text-white border-0 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold mb-1">{value}</p>
          {trend && <p className="text-white/90 text-sm">{trend}</p>}
        </div>
        <div className="bg-white/20 p-3 rounded-lg">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  )
}
