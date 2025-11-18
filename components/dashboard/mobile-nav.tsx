"use client"

import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  GitBranch,
  CheckSquare,
  BarChart3,
  Settings,
  Building2,
} from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, current: false },
  { name: "Leads", href: "/", icon: Users, current: true },
  { name: "Pipeline", href: "#", icon: GitBranch, current: false },
  { name: "Tasks", href: "#", icon: CheckSquare, current: false },
  { name: "Reports", href: "#", icon: BarChart3, current: false },
  { name: "Settings", href: "#", icon: Settings, current: false },
]

interface MobileNavProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-72 p-0">
        <div className="flex h-full flex-col">
          {/* Logo Section */}
          <SheetHeader className="border-b p-4">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => onOpenChange(false)}
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <SheetTitle className="font-semibold text-lg">LeadFlow</SheetTitle>
            </Link>
          </SheetHeader>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent",
                    item.current
                      ? "bg-primary/10 text-primary hover:bg-primary/15"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="border-t p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">
                  Sales Manager
                </p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
