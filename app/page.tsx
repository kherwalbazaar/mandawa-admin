"use client"

import { AdminSidebar } from "@/components/admin-sidebar"
import { KpiCard } from "@/components/kpi-card"
import { Users, DollarSign, TrendingDown, UserCheck } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your business today.</p>
          </div>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiCard title="Total Members" value="2,847" icon={Users} trend="+12% from last month" />
            <KpiCard title="Total Collection" value="$45,230" icon={DollarSign} trend="+8% from last month" />
            <KpiCard title="Total Expenditure" value="$32,180" icon={TrendingDown} trend="-3% from last month" />
            <KpiCard title="Running Members" value="1,924" icon={UserCheck} trend="+5% from last month" />
          </div>
        </div>
      </div>
    </div>
  )
}
