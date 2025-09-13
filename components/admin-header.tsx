import { LogOut } from "lucide-react"

export function AdminHeader() {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Team Member Dashboard</h1>
      </div>

      <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
        <span className="text-sm font-medium">LOGOUT</span>
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  )
}
