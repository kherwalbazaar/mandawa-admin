"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { members, getMemberTotalPaid, getPaymentStatus, type Member } from "@/lib/data/members"
import { Users, Search, Filter, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)

  const filteredMembers = members.filter((member) => member.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const totalMembers = members.length
  const paidMembers = members.filter((m) => getMemberTotalPaid(m) >= 3000).length
  const totalCollection = members.reduce((total, member) => total + getMemberTotalPaid(member), 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="text-2xl font-bold text-gray-900">{totalMembers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Paid Members</p>
                <p className="text-2xl font-bold text-gray-900">{paidMembers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Collection</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalCollection.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left p-3 font-semibold text-gray-900 border-r">Photo</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border-r">Member Name</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border-r">Total Paid</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border-r">Status</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border-r">Last Payment</th>
                  <th className="text-left p-3 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member, index) => {
                  const totalPaid = getMemberTotalPaid(member)
                  const status = getPaymentStatus(member)
                  return (
                    <tr
                      key={member.id}
                      className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                    >
                      <td className="p-3 border-r">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      </td>
                      <td className="p-3 border-r font-medium text-gray-900">{member.name}</td>
                      <td className="p-3 border-r font-semibold">₹{totalPaid.toLocaleString()}</td>
                      <td className="p-3 border-r">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.color}`}
                        >
                          {status.status}
                        </span>
                      </td>
                      <td className="p-3 border-r text-gray-600">{member.paidDate || "No payment"}</td>
                      <td className="p-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedMember(member)}
                          className="flex items-center gap-1"
                        >
                          <Eye className="h-3 w-3" />
                          View
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {selectedMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={selectedMember.image || "/placeholder.svg"}
                  alt={selectedMember.name}
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{selectedMember.name}</h3>
                  <p className="text-gray-600">Member ID: {selectedMember.id}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Payment History</h4>
                {selectedMember.paymentHistory.length > 0 ? (
                  <div className="space-y-2">
                    {selectedMember.paymentHistory.map((payment) => (
                      <div key={payment.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium">₹{payment.amount.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">{payment.description}</p>
                        </div>
                        <p className="text-sm text-gray-500">{payment.date}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No payment history</p>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setSelectedMember(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
