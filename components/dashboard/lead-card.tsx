"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Mail, Phone, Calendar } from "lucide-react"
import { format } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Lead } from "@/lib/types"

interface LeadCardProps {
  lead: Lead
  isDragging?: boolean
}

const priorityVariants = {
  high: "destructive",
  medium: "warning",
  low: "info",
} as const

export function LeadCard({ lead, isDragging }: LeadCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: lead.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const dragging = isDragging || isSortableDragging

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "cursor-grab active:cursor-grabbing transition-shadow",
        dragging && "opacity-50 shadow-lg scale-105"
      )}
    >
      <CardContent className="p-4">
        {/* Drag Handle & Header */}
        <div className="flex items-start gap-3 mb-3">
          <div
            {...attributes}
            {...listeners}
            className="mt-1 cursor-grab active:cursor-grabbing"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h4 className="font-semibold text-sm truncate">{lead.name}</h4>
              <Badge variant={priorityVariants[lead.priority]} className="text-xs shrink-0">
                {lead.priority}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {lead.company}
            </p>
          </div>
        </div>

        {/* Value */}
        <div className="mb-3">
          <p className="text-lg font-bold text-primary">
            ${lead.value.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">Estimated Value</p>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="h-3 w-3" />
            <span className="truncate">{lead.email}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="h-3 w-3" />
            <span>{lead.phone}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-[10px] bg-secondary">
                {lead.assignedToAvatar}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">
              {lead.assignedTo}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{format(lead.lastActivity, "MMM d")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
