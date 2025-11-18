"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Filter, Calendar, Download, LayoutGrid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MetricsCard } from "@/components/dashboard/metrics-card"
import { KanbanBoard } from "@/components/dashboard/kanban-board"
import { mockLeads, mockMetrics } from "@/lib/mock-data"
import type { Lead, LeadStatus } from "@/lib/types"

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads)
  const [view, setView] = useState<"kanban" | "list">("kanban")

  const handleLeadMove = (leadId: string, newStatus: LeadStatus) => {
    setLeads(prevLeads =>
      prevLeads.map(lead =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      )
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-2"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Lead Management</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage your sales pipeline
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Date Range</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>

            {/* View Toggle */}
            <div className="flex items-center gap-1 ml-2 border rounded-lg p-1">
              <Button
                variant={view === "kanban" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-3"
                onClick={() => setView("kanban")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "list" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-3"
                onClick={() => setView("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-foreground">Leads</span>
        </div>
      </motion.div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockMetrics.map((metric, index) => (
          <MetricsCard key={metric.id} metric={metric} index={index} />
        ))}
      </div>

      {/* Main Content Area - Kanban Board */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        {view === "kanban" ? (
          <KanbanBoard leads={leads} onLeadMove={handleLeadMove} />
        ) : (
          <div className="bg-card rounded-xl border p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">List View</h3>
            <p className="text-muted-foreground">
              List view coming soon. Switch to Kanban view to see your leads.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
