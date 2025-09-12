"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, DollarSign } from "lucide-react"

interface FinanceRecord {
  id: number
  amount: number
  details: string
  date: string
  type: "income" | "collection"
}

const dummyFinance: FinanceRecord[] = [
  { id: 1, amount: 5000, details: "Monthly membership fees", date: "2024-12-01", type: "collection" },
  { id: 2, amount: 2500, details: "Event registration", date: "2024-12-05", type: "income" },
  { id: 3, amount: 3200, details: "Annual membership", date: "2024-12-10", type: "collection" },
  { id: 4, amount: 1800, details: "Workshop fees", date: "2024-12-15", type: "income" },
]

interface FinanceListProps {
  showEditOptions: boolean
}

export function FinanceList({ showEditOptions }: FinanceListProps) {
  const [records, setRecords] = useState<FinanceRecord[]>(dummyFinance)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<FinanceRecord | null>(null)
  const [formData, setFormData] = useState({ amount: "", details: "" })

  const handleAdd = () => {
    const newRecord: FinanceRecord = {
      id: Date.now(),
      amount: Number.parseFloat(formData.amount),
      details: formData.details,
      date: new Date().toISOString().split("T")[0],
      type: "collection",
    }
    setRecords([...records, newRecord])
    setFormData({ amount: "", details: "" })
    setIsAddDialogOpen(false)
  }

  const handleEdit = (record: FinanceRecord) => {
    setEditingRecord(record)
    setFormData({ amount: record.amount.toString(), details: record.details })
  }

  const handleUpdate = () => {
    if (editingRecord) {
      setRecords(
        records.map((r) =>
          r.id === editingRecord.id
            ? { ...r, amount: Number.parseFloat(formData.amount), details: formData.details }
            : r,
        ),
      )
      setEditingRecord(null)
      setFormData({ amount: "", details: "" })
    }
  }

  const handleDelete = (id: number) => {
    setRecords(records.filter((r) => r.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Finance</h1>
        {showEditOptions && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Record
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Finance Record</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <Label htmlFor="details">Details</Label>
                  <Input
                    id="details"
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Enter details"
                  />
                </div>
                <Button onClick={handleAdd} className="w-full">
                  Add Record
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {records.map((record) => (
          <Card key={record.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">${record.amount}</CardTitle>
                  <p className="text-sm text-muted-foreground">{record.date}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">{record.details}</p>
              <div className="flex justify-between items-center">
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 capitalize">
                  {record.type}
                </span>
                {showEditOptions && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(record)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(record.id)}>
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
      <Dialog open={!!editingRecord} onOpenChange={() => setEditingRecord(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Finance Record</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="editAmount">Amount</Label>
              <Input
                id="editAmount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="editDetails">Details</Label>
              <Input
                id="editDetails"
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              />
            </div>
            <Button onClick={handleUpdate} className="w-full">
              Update Record
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
