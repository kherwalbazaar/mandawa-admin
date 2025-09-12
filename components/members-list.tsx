"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, User } from "lucide-react"

interface Member {
  id: number
  name: string
  profileImage?: string
  joinDate: string
  status: string
}

const dummyMembers: Member[] = [
  { id: 1, name: "Rajesh Kumar", joinDate: "2024-01-15", status: "Active" },
  { id: 2, name: "Priya Sharma", joinDate: "2024-02-20", status: "Active" },
  { id: 3, name: "Amit Singh", joinDate: "2024-03-10", status: "Inactive" },
  { id: 4, name: "Sunita Devi", joinDate: "2024-01-05", status: "Active" },
  { id: 5, name: "Ravi Patel", joinDate: "2024-04-12", status: "Active" },
]

interface MembersListProps {
  showEditOptions: boolean
}

export function MembersList({ showEditOptions }: MembersListProps) {
  const [members, setMembers] = useState<Member[]>(dummyMembers)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  const [formData, setFormData] = useState({ name: "", profileImage: "" })

  const handleAdd = () => {
    const newMember: Member = {
      id: Date.now(),
      name: formData.name,
      profileImage: formData.profileImage,
      joinDate: new Date().toISOString().split("T")[0],
      status: "Active",
    }
    setMembers([...members, newMember])
    setFormData({ name: "", profileImage: "" })
    setIsAddDialogOpen(false)
  }

  const handleEdit = (member: Member) => {
    setEditingMember(member)
    setFormData({ name: member.name, profileImage: member.profileImage || "" })
  }

  const handleUpdate = () => {
    if (editingMember) {
      setMembers(
        members.map((m) =>
          m.id === editingMember.id ? { ...m, name: formData.name, profileImage: formData.profileImage } : m,
        ),
      )
      setEditingMember(null)
      setFormData({ name: "", profileImage: "" })
    }
  }

  const handleDelete = (id: number) => {
    setMembers(members.filter((m) => m.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Members</h1>
        {showEditOptions && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Member</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter member name"
                  />
                </div>
                <div>
                  <Label htmlFor="profileImage">Profile Image URL</Label>
                  <Input
                    id="profileImage"
                    value={formData.profileImage}
                    onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                    placeholder="Enter image URL (optional)"
                  />
                </div>
                <Button onClick={handleAdd} className="w-full">
                  Add Member
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member) => (
          <Card key={member.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  {member.profileImage ? (
                    <img
                      src={member.profileImage || "/placeholder.svg"}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6 text-primary" />
                  )}
                </div>
                <div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">Joined: {member.joinDate}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    member.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {member.status}
                </span>
                {showEditOptions && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(member)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(member.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingMember} onOpenChange={() => setEditingMember(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="editName">Name</Label>
              <Input
                id="editName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="editProfileImage">Profile Image URL</Label>
              <Input
                id="editProfileImage"
                value={formData.profileImage}
                onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
              />
            </div>
            <Button onClick={handleUpdate} className="w-full">
              Update Member
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
