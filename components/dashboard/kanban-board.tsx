"use client"

import { useState } from "react"
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LeadCard } from "./lead-card"
import type { Lead, LeadStatus, KanbanColumn } from "@/lib/types"
import { cn } from "@/lib/utils"

interface KanbanBoardProps {
  leads: Lead[]
  onLeadMove?: (leadId: string, newStatus: LeadStatus) => void
}

const columns: { id: LeadStatus; title: string; color: string }[] = [
  { id: "new", title: "New Leads", color: "bg-blue-500" },
  { id: "contacted", title: "Contacted", color: "bg-purple-500" },
  { id: "qualified", title: "Qualified", color: "bg-cyan-500" },
  { id: "proposal", title: "Proposal Sent", color: "bg-amber-500" },
  { id: "negotiation", title: "Negotiation", color: "bg-orange-500" },
  { id: "won", title: "Won", color: "bg-emerald-500" },
]

export function KanbanBoard({ leads, onLeadMove }: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [localLeads, setLocalLeads] = useState(leads)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      setActiveId(null)
      return
    }

    const leadId = active.id as string
    const overId = over.id as string

    // Check if we dropped on a column
    const targetColumn = columns.find(col => col.id === overId)

    if (targetColumn) {
      setLocalLeads(prevLeads =>
        prevLeads.map(lead =>
          lead.id === leadId ? { ...lead, status: targetColumn.id } : lead
        )
      )
      onLeadMove?.(leadId, targetColumn.id)
    }

    setActiveId(null)
  }

  const activeLead = localLeads.find(lead => lead.id === activeId)

  const getLeadsByStatus = (status: LeadStatus) =>
    localLeads.filter(lead => lead.status === status)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {columns.map((column, index) => {
          const columnLeads = getLeadsByStatus(column.id)

          return (
            <motion.div
              key={column.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex flex-col min-h-[600px]"
            >
              <SortableContext
                id={column.id}
                items={columnLeads.map(lead => lead.id)}
                strategy={verticalListSortingStrategy}
              >
                <Card className="flex flex-col h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={cn("h-2 w-2 rounded-full", column.color)} />
                        <CardTitle className="text-sm font-semibold">
                          {column.title}
                        </CardTitle>
                      </div>
                      <Badge variant="secondary" className="h-5 min-w-[20px] justify-center">
                        {columnLeads.length}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 pt-0 space-y-3 overflow-y-auto">
                    {columnLeads.length === 0 ? (
                      <div className="flex items-center justify-center h-32 border-2 border-dashed rounded-lg text-sm text-muted-foreground">
                        Drop leads here
                      </div>
                    ) : (
                      columnLeads.map(lead => (
                        <LeadCard key={lead.id} lead={lead} />
                      ))
                    )}
                  </CardContent>
                </Card>
              </SortableContext>
            </motion.div>
          )
        })}
      </div>

      <DragOverlay>
        {activeLead ? <LeadCard lead={activeLead} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  )
}
