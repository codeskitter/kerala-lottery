"use client"

import type React from "react"

import { TrendingUp, TrendingDown, Minus } from "lucide-react"

type TrendDirection = "up" | "down" | "neutral"

interface EnhancedStatCardProps {
  label: string
  value: string | number
  hint?: string
  icon?: React.ComponentType<{ className?: string }>
  trend?: {
    direction: TrendDirection
    percentage: number
    period: string
  }
  loading?: boolean
  onClick?: () => void
  color?: "green" | "blue" | "purple" | "yellow" | "red"
}

export function EnhancedStatCard({
  label,
  value,
  hint,
  icon: Icon,
  trend,
  loading = false,
  onClick,
  color = "blue",
}: EnhancedStatCardProps) {
  const colorClasses = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    yellow: "bg-yellow-100 text-yellow-600",
    red: "bg-red-100 text-red-600",
  }

  const trendColors = {
    up: "text-green-600 bg-green-50",
    down: "text-red-600 bg-red-50",
    neutral: "text-gray-600 bg-gray-50",
  }

  const TrendIcon = trend?.direction === "up" ? TrendingUp : trend?.direction === "down" ? TrendingDown : Minus

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-sm border transition-all duration-200 ${
        onClick ? "cursor-pointer hover:shadow-md hover:scale-105" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          {hint && <p className="text-sm text-gray-500 mt-1">{hint}</p>}

          {trend && (
            <div
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mt-2 ${trendColors[trend.direction]}`}
            >
              <TrendIcon className="w-3 h-3" />
              <span>{trend.percentage}%</span>
              <span className="text-gray-500">vs {trend.period}</span>
            </div>
          )}
        </div>

        {Icon && (
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  )
}
