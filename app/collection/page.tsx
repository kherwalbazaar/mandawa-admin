"use client"

import { useState } from "react"
import { members, getMemberTotalPaid, getTotalCollection, type Member } from "@/lib/data/members"
import { TrendingUp, Calendar, Users, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CollectionPage() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)

  const totalCollection = getTotalCollection()
  const paidMembers = members.filter((m) => getMemberTotalPaid(m) > 0)
  const avgCollection = paidMembers.length > 0 ? totalCollection / paidMembers.length : 0

  // Sort members by total paid (highest first)
  const sortedMembers = [...members].sort((a, b) => getMemberTotalPaid(b) - getMemberTotalPaid(a))

  return (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Collection</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalCollection.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Contributing Members</p>
                <p className="text-2xl font-bold text-gray-900">{paidMembers.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Collection</p>
                <p className="text-2xl font-bold text-gray-900">₹{Math.round(avgCollection).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Collection Details</h2>
            <Button className="bg-green-600 hover:bg-green-700 text-white">Add Collection</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-green-300">
              <thead>
                <tr className="bg-gray-100 border-b border-green-300">
                  <th className="text-left p-3 font-semibold text-gray-900 border-r border-green-300">Rank</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border-r border-green-300">Member Name</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border-r border-green-300">Total Amount</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border-r border-green-300">Payments</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border-r border-green-300">Last Payment Date</th>
                  <th className="text-left p-3 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedMembers.map((member, index) => {
                  const totalPaid = getMemberTotalPaid(member)
                  if (totalPaid === 0) return null

                  return (
                    <tr
                      key={member.id}
                      className={`border-b border-green-300 hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                    >
                      <td className="p-3 border-r border-green-300 font-bold text-gray-900">#{index + 1}</td>
                      <td className="p-3 border-r border-green-300">
                        <button
                          className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                          onClick={() => setSelectedMember(member)}
                        >
                          {member.name}
                        </button>
                      </td>
                      <td className="p-3 border-r border-green-300 font-semibold text-green-600">₹{totalPaid.toLocaleString()}</td>
                      <td className="p-3 border-r border-green-300 text-gray-600">{member.paymentHistory.length} payments</td>
                      <td className="p-3 border-r border-green-300 text-gray-600">{member.paidDate || "No payment"}</td>
                      <td className="p-3">
                        <Button
                          size="sm"
                          onClick={() => setSelectedMember(member)}
                          className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Eye className="h-3 w-3" />
                          Details
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
            <div className="bg-white rounded-lg p-6 max-w-lg w-full">
              <h3 className="text-lg font-semibold mb-4">Payment Details - {selectedMember.name}</h3>

              <div className="space-y-3">
                {selectedMember.paymentHistory.length > 0 ? (
                  <div className="space-y-2">
                    {selectedMember.paymentHistory.map((payment) => (
                      <div key={payment.id} className="flex justify-between items-center p-3 bg-gray-50 rounded border">
                        <div>
                          <p className="font-semibold text-green-600">₹{payment.amount.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">{payment.description}</p>
                        </div>
                        <p className="text-sm text-gray-500">{payment.date}</p>
                      </div>
                    ))}
                    <div className="mt-4 p-3 bg-green-50 rounded border">
                      <p className="font-semibold text-green-700">
                        Total: ₹{getMemberTotalPaid(selectedMember).toLocaleString()}
                      </p>
                    </div>
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
    )
  }
