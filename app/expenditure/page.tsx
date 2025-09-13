"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import {
  expenditureData,
  getExpenditureTotalAmount,
  getTotalExpenditure,
  type ExpenditureItem,
} from "@/lib/data/expenditure"
import { TrendingDown, Calendar, Receipt, Eye, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ExpenditurePage() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [selectedItem, setSelectedItem] = useState<ExpenditureItem | null>(null)

  const totalExpenditure = getTotalExpenditure()
  const totalCategories = expenditureData.length
  const totalItems = expenditureData.reduce((sum, cat) => sum + cat.items.length, 0)

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  return (
    <DashboardLayout>
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
          <h2 className="text-xl font-semibold mb-4">Expenditure Details</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left p-3 font-semibold text-gray-900 border-r">Category</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border-r">Item Name</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border-r">Amount</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border-r">Date</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border-r">Member</th>
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
                      <tr key={category.id} className="bg-blue-50 border-b font-semibold">
                        <td className="p-3 border-r">
                          <button
                            onClick={() => toggleCategory(category.id)}
                            className="flex items-center gap-2 text-blue-700 hover:text-blue-900"
                          >
                            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            {category.name}
                          </button>
                        </td>
                        <td className="p-3 border-r text-gray-600">{category.items.length} items</td>
                        <td className="p-3 border-r font-bold text-red-600">₹{categoryTotal.toLocaleString()}</td>
                        <td className="p-3 border-r text-gray-600">-</td>
                        <td className="p-3 border-r text-gray-600">-</td>
                        <td className="p-3">
                          <Button variant="outline" size="sm" onClick={() => toggleCategory(category.id)}>
                            {isExpanded ? "Collapse" : "Expand"}
                          </Button>
                        </td>
                      </tr>

                      {/* Category Items */}
                      {isExpanded &&
                        category.items.map((item, index) => (
                          <tr
                            key={item.id}
                            className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                          >
                            <td className="p-3 border-r pl-8 text-gray-600">└─</td>
                            <td className="p-3 border-r">{item.name}</td>
                            <td className="p-3 border-r font-semibold text-red-600">₹{item.amount.toLocaleString()}</td>
                            <td className="p-3 border-r text-gray-600">{item.date}</td>
                            <td className="p-3 border-r">
                              <Link href="/members" className="text-blue-600 hover:text-blue-800 hover:underline">
                                {item.memberName}
                              </Link>
                            </td>
                            <td className="p-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedItem(item)}
                                className="flex items-center gap-1"
                              >
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

        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Expenditure Details</h3>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Item Name</p>
                    <p className="font-semibold">{selectedItem.name}</p>
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
                    <Link href="/members" className="font-semibold text-blue-600 hover:text-blue-800 hover:underline">
                      {selectedItem.memberName}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setSelectedItem(null)}>
                  Close
                </Button>
                <Link href="/members">
                  <Button>View Member</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
