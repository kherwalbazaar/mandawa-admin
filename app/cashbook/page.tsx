"use client"

import { useState } from "react"
import { members, getTotalCollection } from "@/lib/data/members"
import { expenditureData, getTotalExpenditure } from "@/lib/data/expenditure"
import { TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CashbookPage() {
  const [activeTab, setActiveTab] = useState<"summary" | "transactions">("summary")

  const totalCollection = getTotalCollection()
  const totalExpenditure = getTotalExpenditure()
  const netBalance = totalCollection - totalExpenditure

  // Combine all transactions for chronological view
  const allTransactions = [
    ...members.flatMap((member) =>
      member.paymentHistory.map((payment) => ({
        id: payment.id,
        type: "income" as const,
        description: `${payment.description} - ${member.name}`,
        amount: payment.amount,
        date: payment.date,
        memberName: member.name,
      })),
    ),
    ...expenditureData.flatMap((category) =>
      category.items.map((item) => ({
        id: item.id,
        type: "expense" as const,
        description: `${item.name} (${category.name})`,
        amount: item.amount,
        date: item.date,
        memberName: item.memberName,
      })),
    ),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Income</p>
                <p className="text-2xl font-bold text-green-600">₹{totalCollection.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">₹{totalExpenditure.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${netBalance >= 0 ? "bg-blue-100" : "bg-orange-100"}`}>
                <DollarSign className={`h-5 w-5 ${netBalance >= 0 ? "text-blue-600" : "text-orange-600"}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Net Balance</p>
                <p className={`text-2xl font-bold ${netBalance >= 0 ? "text-blue-600" : "text-orange-600"}`}>
                  ₹{Math.abs(netBalance).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{allTransactions.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab("summary")}
                className={`px-6 py-3 font-medium ${
                  activeTab === "summary"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Summary
              </button>
              <button
                onClick={() => setActiveTab("transactions")}
                className={`px-6 py-3 font-medium ${
                  activeTab === "transactions"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                All Transactions
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === "summary" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Income Summary */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-green-600">Income Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between p-2 bg-green-50 rounded">
                        <span>Member Contributions</span>
                        <span className="font-semibold">₹{totalCollection.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between p-2 bg-green-100 rounded font-semibold">
                        <span>Total Income</span>
                        <span>₹{totalCollection.toLocaleString()}</span>
                      </div>
                    </div>
                    <Button className="mt-3 w-full bg-transparent" variant="outline" onClick={() => setActiveTab("transactions")}>
                      View Collection Details
                    </Button>
                  </div>

                  {/* Expense Summary */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-red-600">Expense Summary</h3>
                    <div className="space-y-2">
                      {expenditureData.map((category) => (
                        <div key={category.id} className="flex justify-between p-2 bg-red-50 rounded">
                          <span>{category.name}</span>
                          <span className="font-semibold">
                            ₹{category.items.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between p-2 bg-red-100 rounded font-semibold">
                        <span>Total Expenses</span>
                        <span>₹{totalExpenditure.toLocaleString()}</span>
                      </div>
                    </div>
                    <Button className="mt-3 w-full bg-transparent" variant="outline" onClick={() => setActiveTab("transactions")}>
                      View Expenditure Details
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "transactions" && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="text-left p-3 font-semibold text-gray-900 border-r">Date</th>
                      <th className="text-left p-3 font-semibold text-gray-900 border-r">Description</th>
                      <th className="text-left p-3 font-semibold text-gray-900 border-r">Member</th>
                      <th className="text-left p-3 font-semibold text-gray-900 border-r">Type</th>
                      <th className="text-left p-3 font-semibold text-gray-900">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTransactions.map((transaction, index) => (
                      <tr
                        key={transaction.id}
                        className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                      >
                        <td className="p-3 border-r text-gray-600">{transaction.date}</td>
                        <td className="p-3 border-r">{transaction.description}</td>
                        <td className="p-3 border-r">
                          <span className="text-blue-600">{transaction.memberName}</span>
                        </td>
                        <td className="p-3 border-r">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              transaction.type === "income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                            }`}
                          >
                            {transaction.type === "income" ? "Income" : "Expense"}
                          </span>
                        </td>
                        <td
                          className={`p-3 font-semibold ${
                            transaction.type === "income" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : "-"}₹{transaction.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
