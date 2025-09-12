"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { KpiCard } from "@/components/kpi-card"
import { AdminHeader } from "@/components/admin-header"
import { MembersList } from "@/components/members-list"
import { ExpenditureList } from "@/components/expenditure-list"
import { FinanceList } from "@/components/finance-list"
import { Users, DollarSign, TrendingDown, UserCheck } from "lucide-react"

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState("dashboard")

  const handleSidebarClick = (view: string) => {
    setActiveView(view.toLowerCase())
  }

  const handleCardClick = (cardType: string) => {
    setActiveView(`${cardType}-details`)
  }

  const renderMainContent = () => {
    switch (activeView) {
      case "members":
        return <MembersList showEditOptions={true} />
      case "finance":
        return <FinanceList showEditOptions={true} />
      case "expenditure":
        return <ExpenditureList showEditOptions={true} />
      case "members-details":
        return <MembersList showEditOptions={false} />
      case "finance-details":
        return <FinanceList showEditOptions={false} />
      case "expenditure-details":
        return <ExpenditureList showEditOptions={false} />
      default:
        return (
          <div>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
              <p className="text-muted-foreground">Welcome back! Here's what's happening with your business today.</p>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div onClick={() => handleCardClick("members")} className="cursor-pointer">
                <KpiCard title="Total Members" value="2,847" icon={Users} trend="+12% from last month" />
              </div>
              <div onClick={() => handleCardClick("finance")} className="cursor-pointer">
                <KpiCard title="Total Collection" value="$45,230" icon={DollarSign} trend="+8% from last month" />
              </div>
              <div onClick={() => handleCardClick("expenditure")} className="cursor-pointer">
                <KpiCard title="Total Expenditure" value="$32,180" icon={TrendingDown} trend="-3% from last month" />
              </div>
              <div onClick={() => handleCardClick("members")} className="cursor-pointer">
                <KpiCard title="Running Members" value="1,924" icon={UserCheck} trend="+5% from last month" />
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AdminSidebar onNavigate={handleSidebarClick} activeView={activeView} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">{renderMainContent()}</div>
        </div>
      </div>
    </div>
  )
}
