import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

export function formatRelativeTime(date: Date) {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return "just now"
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours}h ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `${diffInDays}d ago`
  }

  return formatDate(date)
}

export function getStatusColor(status: string) {
  switch (status) {
    case "OPEN":
      return "bg-red-100 text-red-800"
    case "IN_PROGRESS":
      return "bg-yellow-100 text-yellow-800"
    case "RESOLVED":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function getCategoryIcon(category: string) {
  switch (category) {
    case "INFRASTRUCTURE":
      return "🏗️"
    case "SAFETY":
      return "🛡️"
    case "ENVIRONMENT":
      return "🌱"
    case "TRANSPORTATION":
      return "🚗"
    case "PUBLIC_SERVICES":
      return "🏛️"
    case "COMMUNITY":
      return "👥"
    default:
      return "📝"
  }
}
