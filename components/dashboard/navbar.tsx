"use client"

import { useState } from "react"
import { Search, Bell, Plus, Sun, Moon, Users, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { mockLeads } from "@/lib/mock-data"
import { MobileNav } from "./mobile-nav"

interface NavbarProps {
  onAddLead?: () => void
}

export function Navbar({ onAddLead }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Global Search */}
          <button
            onClick={() => setOpen(true)}
            className="flex h-10 w-full max-w-md items-center gap-2 rounded-lg border border-input bg-background px-3 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Search leads, contacts, or companies...</span>
            <span className="sm:hidden">Search...</span>
            <kbd className="ml-auto pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>

          <div className="ml-auto flex items-center gap-2">
            {/* Add Lead Button */}
            <Button onClick={onAddLead} className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Lead</span>
            </Button>

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <div className="flex w-full items-center justify-between">
                    <p className="text-sm font-medium">New lead assigned</p>
                    <span className="text-xs text-muted-foreground">2m ago</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Sarah Johnson from Tesla Inc. has been assigned to you
                  </p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <div className="flex w-full items-center justify-between">
                    <p className="text-sm font-medium">Follow-up reminder</p>
                    <span className="text-xs text-muted-foreground">1h ago</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Follow up with Michael Chen regarding the proposal
                  </p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-sm text-primary">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Command Palette */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Leads">
            {mockLeads.slice(0, 5).map((lead) => (
              <CommandItem key={lead.id} onSelect={() => setOpen(false)}>
                <Users className="mr-2 h-4 w-4" />
                <div className="flex flex-col">
                  <span>{lead.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {lead.company}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Quick Actions">
            <CommandItem onSelect={() => { setOpen(false); onAddLead?.(); }}>
              <Plus className="mr-2 h-4 w-4" />
              <span>Add New Lead</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {/* Mobile Navigation */}
      <MobileNav open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
    </>
  )
}
