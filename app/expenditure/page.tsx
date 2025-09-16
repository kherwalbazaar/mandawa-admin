"use client"

import { useState } from "react"
import {
  expenditureData,
  getExpenditureTotalAmount,
  getTotalExpenditure,
  type ExpenditureItem,
} from "@/lib/data/expenditure"
import { TrendingDown, Calendar, Receipt, Eye, ChevronDown, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function ExpenditurePage() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [selectedItem, setSelectedItem] = useState<ExpenditureItem | null>(null)
  const [showCategoryDialog, setShowCategoryDialog] = useState(false)
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)

  const totalExpenditure = getTotalExpenditure()
  const totalCategories = expenditureData.length
  const totalItems = expenditureData.reduce((sum, cat) => sum + cat.items.length, 0)

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  return (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Expenditure</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalExpenditure.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Receipt className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{totalCategories}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Expenditure Details</h2>
            <Button className="bg-green-600 hover:bg-green-700 text-white">Add Expenditure</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-green-700">
              <thead>
                <tr className="bg-gray-100 border-b border-green-700">
                  <th className="text-left p-3 font-semibold text-gray-900 border-r border-green-700">Category</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border-r border-green-700">Item Name</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border-r border-green-700">Amount</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border-r border-green-700">Date</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border-r border-green-700">Member</th>
                  <th className="text-left p-3 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenditureData.map((category) => {
                  const isExpanded = expandedCategories.includes(category.id)
                  const categoryTotal = getExpenditureTotalAmount(category)

                  return (
                    <>
                      {/* Category Header Row */}
                      <tr key={category.id} className="bg-blue-50 border-b border-green-700 font-semibold">
                        <td className="p-3 border-r border-green-700">
                          <button
                            onClick={() => {
                              setActiveCategoryId(category.id)
                              setShowCategoryDialog(true)
                            }}
                            className="flex items-center gap-2 text-blue-700 hover:text-blue-900"
                          >
                            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            {category.name}
                          </button>
                        </td>
                        <td className="p-3 border-r border-green-700 text-gray-600">{category.items.length} items</td>
                        <td className="p-3 border-r border-green-700 font-bold text-red-600">₹{categoryTotal.toLocaleString()}</td>
                        <td className="p-3 border-r border-green-700 text-gray-600">-</td>
                        <td className="p-3 border-r border-green-700 text-gray-600">-</td>
                        <td className="p-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-green-700 hover:bg-green-800 text-white border border-green-700"
                            onClick={() => {
                              setActiveCategoryId(category.id)
                              setShowCategoryDialog(true)
                            }}
                          >
                            Expand
                          </Button>
                        </td>
                      </tr>

                      {/* Category Items (inline list remains available when manually expanded) */}
                      {isExpanded &&
                        category.items.map((item, index) => (
                          <tr
                            key={item.id}
                            className={`border-b border-green-700 hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                          >
                            <td className="p-3 border-r border-green-700 pl-8 text-gray-600">└─</td>
                            <td className="p-3 border-r border-green-700">{item.name}</td>
                            <td className="p-3 border-r border-green-700 font-semibold text-red-600">₹{item.amount.toLocaleString()}</td>
                            <td className="p-3 border-r border-green-700 text-gray-600">{item.date}</td>
                            <td className="p-3 border-r border-green-700">
                              <span className="text-blue-600">{item.memberName}</span>
                            </td>
                            <td className="p-3">
                              <Button size="sm" onClick={() => setSelectedItem(item)} className="bg-green-600 hover:bg-green-700 text-white">
                                <Eye className="h-3 w-3" />
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Item View Dialog (uses portal to guarantee centering) */}
        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
          <DialogContent panelClassName="w-[calc(100vw-2rem)] sm:max-w-md max-h-[85vh] overflow-auto bg-white">
            {selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-gray-900">Expenditure Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Item Name</p>
                      <p className="font-semibold text-gray-900">{selectedItem.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Amount</p>
                      <p className="font-semibold text-red-600">₹{selectedItem.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-semibold">{selectedItem.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Member</p>
                      <p className="font-semibold">{selectedItem.memberName}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="outline" onClick={() => setSelectedItem(null)}>
                    Close
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Category Transactions Dialog */}
        <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
          <DialogContent panelClassName="w-[calc(100vw-2rem)] sm:max-w-2xl max-h-[85vh] overflow-auto bg-white border border-green-700">
            <button
              aria-label="Close"
              onClick={() => setShowCategoryDialog(false)}
              className="absolute top-3 right-3 text-red-600 hover:text-red-700"
            >
              <X className="h-5 w-5" />
            </button>
            <DialogHeader>
              <DialogTitle className="text-gray-900">Category Transactions</DialogTitle>
            </DialogHeader>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-green-700">
                <thead>
                  <tr className="bg-gray-100 border-b border-green-700">
                    <th className="text-left p-2 font-bold text-gray-900 border-r border-green-700">Date</th>
                    <th className="text-left p-2 font-bold text-gray-900 border-r border-green-700">Item</th>
                    <th className="text-left p-2 font-bold text-gray-900 border-r border-green-700">Member</th>
                    <th className="text-left p-2 font-bold text-gray-900">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const cat = expenditureData.find((c) => c.id === activeCategoryId)
                    const items = cat ? [...cat.items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) : []
                    return items.map((it) => (
                      <tr key={it.id} className="border-b border-green-700">
                        <td className="p-2 text-gray-600 border-r border-green-700">{it.date}</td>
                        <td className="p-2 border-r border-green-700 text-gray-900 font-semibold">{it.name}</td>
                        <td className="p-2 text-blue-700 border-r border-green-700">{it.memberName}</td>
                        <td className="p-2 font-semibold text-red-600">₹{it.amount.toLocaleString()}</td>
                      </tr>
                    ))
                  })()}
                </tbody>
              </table>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
}
