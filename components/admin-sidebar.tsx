"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigationItems = [
  { label: "Dashboard", href: "/" },
  { label: "Member", href: "/members" },
  { label: "Collection", href: "/collection" },
  { label: "Expenditure", href: "/expenditure" },
  { label: "Cash Book", href: "/cashbook" },
]

export function AdminSidebar() {
  const pathname = usePathname()
  return (
    <div className="w-64 h-screen bg-green-700 text-white flex flex-col">
      <div className="p-6 border-b border-green-600 text-center">
        <img
          src="https://ik.imagekit.io/kherwalbazaar/Mandawa%20Logo%20small.jpg?updatedAt=1757390794798"
          alt="Mandawa Logo"
          className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-green-500 mb-3"
        />
        <h1 className="text-xl font-bold text-white">MANDAWA</h1>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigationItems.map((item, index) => {
          const isActive = pathname === item.href
          return (
            <Link key={index} href={item.href} className="block">
              <div
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                  isActive ? "bg-green-600 text-white shadow-lg" : "hover:bg-green-600 text-green-100 hover:text-white",
                )}
              >
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

