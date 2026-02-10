"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  FileText,
  Radio,
  UserPlus,
  Briefcase,
  FileCheck,
  Send,
  Gavel,
  Wallet,
  Target,
  LogOut,
} from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Resume", href: "/resume", icon: FileText },
]

const positionItems = [
  { label: "Remote Positions", href: "/remote", icon: Radio },
  { label: "Refriend Positions", href: "/refriend", icon: UserPlus, isNew: true },
]

const mainNavItems = [
  { label: "BYO (Bring Your Own)", href: "/byo", icon: Briefcase },
  { label: "Contracts", href: "/", icon: FileCheck, count: 2 },
  { label: "Offers", href: "/offers", icon: Send },
  { label: "My Proposals", href: "/proposals", icon: FileText },
  { label: "BIDs", href: "/bids", icon: Gavel },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 flex-col border-r border-border bg-neutral-900 text-neutral-100 lg:flex">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="px-6 py-6">
          <svg
            viewBox="0 0 80 32"
            className="h-8 w-20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 24C6 24 4 20 8 16C12 12 16 8 20 12C24 16 20 20 16 24C12 28 4 28 4 24"
              stroke="#2dd4bf"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M28 8V24M36 8V24M44 8V24"
              stroke="#2dd4bf"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-1 px-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-800",
                pathname === item.href
                  ? "bg-neutral-800 text-neutral-50"
                  : "text-neutral-400"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}

          <div className="my-2 rounded-lg border border-neutral-700 p-1">
            {positionItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-800",
                  pathname === item.href
                    ? "bg-neutral-800 text-neutral-50"
                    : "text-neutral-300"
                )}
              >
                <span>{item.label}</span>
                {item.isNew && (
                  <Badge className="border-0 bg-rose-500 text-[10px] text-neutral-50 hover:bg-rose-500">
                    New
                  </Badge>
                )}
              </Link>
            ))}
          </div>

          {mainNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-800",
                  isActive
                    ? "border-l-2 border-teal-500 bg-neutral-800 text-teal-400"
                    : "text-neutral-400"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </div>
                {item.count && (
                  <Badge className="h-5 w-5 justify-center rounded-full border-0 bg-neutral-600 p-0 text-[10px] text-neutral-200 hover:bg-neutral-600">
                    {item.count}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="mt-auto px-3 pb-4">
          <div className="flex flex-col gap-2 rounded-lg bg-neutral-800 p-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-neutral-400">
                <Wallet className="h-4 w-4" />
                <span>Balance:</span>
              </div>
              <span className="font-semibold text-neutral-100">{"€"}1730</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-neutral-400">
                <Target className="h-4 w-4" />
                <span>BIDs</span>
              </div>
              <span className="font-semibold text-neutral-100">
                120 <span className="text-xs text-neutral-400">BID</span>
              </span>
            </div>
          </div>

          <Separator className="my-3 bg-neutral-700" />

          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-neutral-700 text-xs text-neutral-300">
                MM
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-200">
                Mehdi Mirzaie
              </p>
              <button
                type="button"
                className="flex items-center gap-1 text-xs text-neutral-500 transition-colors hover:text-neutral-300"
              >
                <LogOut className="h-3 w-3" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
