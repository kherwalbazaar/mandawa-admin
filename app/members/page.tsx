"use client"

import { useState } from "react"
import { members, getMemberTotalPaid, getPaymentStatus, type Member } from "@/lib/data/members"
import { Users, Search, Filter, Eye, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [showAddMember, setShowAddMember] = useState(false)
  const [newMember, setNewMember] = useState({
    name: "",
    phone: "",
    image: "",
    initialPayment: "",
    date: "",
    description: "",
  })

  const filteredMembers = members.filter((member) => member.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const totalMembers = members.length
  const paidMembers = members.filter((m) => getMemberTotalPaid(m) >= 3000).length
  const totalCollection = members.reduce((total, member) => total + getMemberTotalPaid(member), 0)

  return (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg shadow-sm bg-blue-600 text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>

        {/* Add Member Dialog */}
        <Dialog open={showAddMember} onOpenChange={setShowAddMember}>
          <DialogContent className="relative max-w-lg bg-white border border-green-700">
            <button
              aria-label="Close"
              onClick={() => setShowAddMember(false)}
              className="absolute top-3 right-3 text-red-600 hover:text-red-700"
            >
              <X className="h-5 w-5" />
            </button>
            <DialogHeader>
              <DialogTitle>Add Member</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-4 py-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <Input
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  placeholder="Member full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <Input
                  value={newMember.phone}
                  onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                  placeholder="Phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                <Input
                  value={newMember.image}
                  onChange={(e) => setNewMember({ ...newMember, image: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Initial Payment (₹)</label>
                  <Input
                    value={newMember.initialPayment}
                    onChange={(e) => setNewMember({ ...newMember, initialPayment: e.target.value })}
                    placeholder="e.g. 3000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <Input
                    type="date"
                    value={newMember.date}
                    onChange={(e) => setNewMember({ ...newMember, date: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <Input
                  value={newMember.description}
                  onChange={(e) => setNewMember({ ...newMember, description: e.target.value })}
                  placeholder="Short note (optional)"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddMember(false)}>Cancel</Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => setShowAddMember(false)}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
              <div>
                <p className="text-sm text-white/90">Total Members</p>
                <p className="text-2xl font-bold">{totalMembers}</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg shadow-sm bg-green-600 text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/90">Paid Members</p>
                <p className="text-2xl font-bold">{paidMembers}</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg shadow-sm bg-purple-600 text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/90">Total Collection</p>
                <p className="text-2xl font-bold">₹{totalCollection.toLocaleString()}</p>
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
                className="pl-10 bg-white border border-gray-400 placeholder:text-gray-600"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent border-gray-400">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white" onClick={() => setShowAddMember(true)}>
              <Plus className="h-4 w-4" />
              Add Member
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-green-700">
              <thead>
                <tr className="bg-gray-100 border-b border-green-700">
                  <th className="text-left p-3 font-semibold text-gray-900 border-r border-green-700">Photo</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border-r border-green-700">Member Name</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border-r border-green-700">Total Paid</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border-r border-green-700">Status</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border-r border-green-700">Last Payment</th>
                  <th className="text-left p-3 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member, index) => {
                  const totalPaid = getMemberTotalPaid(member)
                  const status = getPaymentStatus(member)
                  const amountColor =
                    totalPaid === 0
                      ? "text-red-700"
                      : totalPaid === 3000
                        ? "text-green-700"
                        : totalPaid < 3000
                          ? "text-yellow-700"
                          : "text-blue-700"
                  return (
                    <tr
                      key={member.id}
                      className={`border-b border-green-700 hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                    >
                      <td className="p-3 border-r border-green-700">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      </td>
                      <td className="p-3 border-r border-green-700 font-medium text-gray-900">{member.name}</td>
                      <td className="p-3 border-r border-green-700 font-semibold">
                        <span className={amountColor}>₹{totalPaid.toLocaleString()}</span>
                      </td>
                      <td className="p-3 border-r border-green-700">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold ${status.bgColor} ${status.color}`}
                        >
                          {status.status}
                        </span>
                      </td>
                      <td className="p-3 border-r border-green-700 text-gray-600">{member.paidDate || "No payment"}</td>
                      <td className="p-3">
                        <Button
                          size="sm"
                          onClick={() => setSelectedMember(member)}
                          className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white"
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
            <div className="bg-white rounded-lg p-6 max-w-md w-full border border-green-700">
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
    )
  }
