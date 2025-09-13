"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { KpiCard } from "@/components/kpi-card"
import { AdminHeader } from "@/components/admin-header"
import { MembersList } from "@/components/members-list"
import { ExpenditureList } from "@/components/expenditure-list"
import { FinanceList } from "@/components/finance-list"
import { Users, Wallet, TrendingUp, BookOpen } from "lucide-react"

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
      case "collection":
        return <FinanceList showEditOptions={true} />
      case "expenditure":
        return <ExpenditureList showEditOptions={true} />
      case "cashbook":
        return <FinanceList showEditOptions={true} />
      case "members-details":
        return <MembersList showEditOptions={false} />
      case "collection-details":
        return <FinanceList showEditOptions={false} />
      case "expenditure-details":
        return <ExpenditureList showEditOptions={false} />
      case "cashbook-details":
        return <FinanceList showEditOptions={false} />
      default:
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div onClick={() => handleCardClick("members")} className="cursor-pointer">
                <KpiCard title="Member" value="106" icon={Users} trend="" colorClass="green" />
              </div>
              <div onClick={() => handleCardClick("collection")} className="cursor-pointer">
                <KpiCard title="Collection" value="13" icon={Wallet} trend="" colorClass="purple" />
              </div>
              <div onClick={() => handleCardClick("expenditure")} className="cursor-pointer">
                <KpiCard title="Expenditure" value="30" icon={TrendingUp} trend="" colorClass="blue" />
              </div>
              <div onClick={() => handleCardClick("cashbook")} className="cursor-pointer">
                <KpiCard title="Cash Book" value="59" icon={BookOpen} trend="" colorClass="orange" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Document Sent Details</h2>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search Sender..."
                      className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    EXPORT
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Document Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Recipient Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Sent Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Last Action Taken</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "Patty O Furniture.doc",
                        recipient: "Carolyn Leblanc",
                        email: "carolynleblanc@lysa.com",
                        status: "Complete",
                        date: "11/14/2019",
                        action: "11/14/2019",
                      },
                      {
                        name: "Ty Knottsion.pdf",
                        recipient: "Margaret Swartz",
                        email: "margaretswartz@telequiet.com",
                        status: "Expired",
                        date: "11/14/2019",
                        action: "11/14/2019",
                      },
                      {
                        name: "Maureen Biologist.doc",
                        recipient: "Amy White",
                        email: "amywhite@journalco.com",
                        status: "Pending",
                        date: "11/14/2019",
                        action: "11/14/2019",
                      },
                      {
                        name: "Ray L. Commisium.pdf",
                        recipient: "Richard Dudley",
                        email: "richarddudley@dayep.com",
                        status: "Viewed",
                        date: "11/14/2019",
                        action: "11/14/2019",
                      },
                      {
                        name: "Bridget Thermostat.doc",
                        recipient: "Brian Williamson",
                        email: "brianwilliamson@dayep.com",
                        status: "Complete",
                        date: "11/14/2019",
                        action: "11/14/2019",
                      },
                    ].map((item, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">{item.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{item.recipient}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{item.email}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              item.status === "Complete"
                                ? "bg-green-100 text-green-800"
                                : item.status === "Expired"
                                  ? "bg-red-100 text-red-800"
                                  : item.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{item.date}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{item.action}</td>
                        <td className="py-3 px-4">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">ACTIONS ▼</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar onNavigate={handleSidebarClick} activeView={activeView} />

      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">{renderMainContent()}</div>
        </div>
      </div>
    </div>
  )
}
