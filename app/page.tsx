"use client"

import { useState } from "react"
import { KpiCard } from "@/components/kpi-card"
import { Users, Wallet, TrendingUp, BookOpen } from "lucide-react"
import { members, getTotalCollection } from "@/lib/data/members"
import { getTotalExpenditure } from "@/lib/data/expenditure"

export default function AdminDashboard() {
  const [activeView] = useState("dashboard")

  const totalMembers = members.length
  const totalCollection = getTotalCollection()
  const totalExpenditure = getTotalExpenditure()
  const netBalance = totalCollection - totalExpenditure

  const renderMainContent = () => {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="cursor-default">
            <KpiCard title="Member" value={totalMembers.toString()} icon={Users} trend="" colorClass="green" />
          </div>
          <div className="cursor-default">
            <KpiCard
              title="Collection"
              value={`₹${Math.round(totalCollection / 1000)}K`}
              icon={Wallet}
              trend=""
              colorClass="purple"
            />
          </div>
          <div className="cursor-default">
            <KpiCard
              title="Expenditure"
              value={`₹${Math.round(totalExpenditure / 1000)}K`}
              icon={TrendingUp}
              trend=""
              colorClass="blue"
            />
          </div>
          <div className="cursor-default">
            <KpiCard
              title="Cash Book"
              value={`₹${Math.round(Math.abs(netBalance) / 1000)}K`}
              icon={BookOpen}
              trend=""
              colorClass="orange"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Member Activities</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Members..."
                  className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                VIEW ALL
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Member Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Total Paid</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Last Payment</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Payments</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {members.slice(0, 8).map((member, index) => {
                  const totalPaid = member.paymentHistory.reduce((sum, payment) => sum + payment.amount, 0)
                  const status = totalPaid >= 3000 ? "Paid" : totalPaid > 0 ? "Partial" : "Unpaid"
                  const statusColor =
                    totalPaid >= 3000
                      ? "bg-green-100 text-green-800"
                      : totalPaid > 0
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"

                  return (
                    <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900 font-medium">{member.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 font-semibold">₹{totalPaid.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{member.paidDate || "No payment"}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{member.paymentHistory.length} payments</td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          VIEW
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  return renderMainContent()
}

