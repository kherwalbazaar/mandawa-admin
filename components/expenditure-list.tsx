"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, TrendingDown } from "lucide-react"

interface ExpenditureRecord {
  id: number
  amount: number
  details: string
  date: string
  category: string
}

const dummyExpenditure: ExpenditureRecord[] = [
  { id: 1, amount: 1500, details: "Office rent", date: "2024-12-01", category: "Rent" },
  { id: 2, amount: 800, details: "Electricity bill", date: "2024-12-05", category: "Utilities" },
  { id: 3, amount: 1200, details: "Equipment purchase", date: "2024-12-10", category: "Equipment" },
  { id: 4, amount: 600, details: "Maintenance costs", date: "2024-12-15", category: "Maintenance" },
]

interface ExpenditureListProps {
  showEditOptions: boolean
}

export function ExpenditureList({ showEditOptions }: ExpenditureListProps) {
  const [records, setRecords] = useState<ExpenditureRecord[]>(dummyExpenditure)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<ExpenditureRecord | null>(null)
  const [formData, setFormData] = useState({ amount: "", details: "" })

  const handleAdd = () => {
    const newRecord: ExpenditureRecord = {
      id: Date.now(),
      amount: Number.parseFloat(formData.amount),
      details: formData.details,
      date: new Date().toISOString().split("T")[0],
      category: "General",
    }
    setRecords([...records, newRecord])
    setFormData({ amount: "", details: "" })
    setIsAddDialogOpen(false)
  }

  const handleEdit = (record: ExpenditureRecord) => {
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
        <h1 className="text-3xl font-bold">Expenditure</h1>
        {showEditOptions && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Expenditure
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Expenditure Record</DialogTitle>
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
                  Add Expenditure
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
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <TrendingDown className="h-6 w-6 text-red-600" />
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
                <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">{record.category}</span>
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
            <DialogTitle>Edit Expenditure Record</DialogTitle>
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
              Update Expenditure
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
