"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2 } from "lucide-react"

export default function MetersPage() {
  const [members] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      profileImage: "/placeholder.svg?height=40&width=40",
      joinDate: "2024-01-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Sharma",
      profileImage: "/placeholder.svg?height=40&width=40",
      joinDate: "2024-02-20",
      status: "Active",
    },
    {
      id: 3,
      name: "Amit Singh",
      profileImage: "/placeholder.svg?height=40&width=40",
      joinDate: "2024-03-10",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Sunita Devi",
      profileImage: "/placeholder.svg?height=40&width=40",
      joinDate: "2024-01-25",
      status: "Active",
    },
    {
      id: 5,
      name: "Vikash Yadav",
      profileImage: "/placeholder.svg?height=40&width=40",
      joinDate: "2024-04-05",
      status: "Active",
    },
  ])

  return (
    <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Members Management</h1>
            <p className="text-gray-600 mt-1">Manage community members and their details</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>

        {/* Members Table */}
        <Card>
          <CardHeader>
            <CardTitle>Members List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300">
                    <th className="text-left p-3 font-semibold border-r border-gray-300">Profile</th>
                    <th className="text-left p-3 font-semibold border-r border-gray-300">Name</th>
                    <th className="text-left p-3 font-semibold border-r border-gray-300">Join Date</th>
                    <th className="text-left p-3 font-semibold border-r border-gray-300">Status</th>
                    <th className="text-left p-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.id} className="border-b border-gray-300 hover:bg-gray-50">
                      <td className="p-3 border-r border-gray-300">
                        <img
                          src={member.profileImage || "/placeholder.svg"}
                          alt={member.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </td>
                      <td className="p-3 border-r border-gray-300 font-medium">{member.name}</td>
                      <td className="p-3 border-r border-gray-300 text-gray-600">{member.joinDate}</td>
                      <td className="p-3 border-r border-gray-300">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            member.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {member.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
