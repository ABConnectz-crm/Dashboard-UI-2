"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Users, Target, DollarSign, TrendingUp as TrendingUpIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { MetricCard as MetricCardType } from "@/lib/types"

const iconMap = {
  users: Users,
  target: Target,
  dollarSign: DollarSign,
  trendingUp: TrendingUpIcon,
}

interface MetricsCardProps {
  metric: MetricCardType
  index: number
}

export function MetricsCard({ metric, index }: MetricsCardProps) {
  const Icon = iconMap[metric.icon as keyof typeof iconMap] || Users
  const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="card-hover overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {metric.title}
              </p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold tracking-tight">
                  {metric.value}
                </h3>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <TrendIcon
                  className={cn(
                    "h-3 w-3",
                    metric.trend === "up"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                  )}
                />
                <span
                  className={cn(
                    "text-xs font-medium",
                    metric.trend === "up"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                  )}
                >
                  {metric.change > 0 ? "+" : ""}
                  {metric.change}%
                </span>
                <span className="text-xs text-muted-foreground">
                  {metric.changeLabel}
                </span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
