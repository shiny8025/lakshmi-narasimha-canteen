import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, Eye, ChefHat, Package } from "lucide-react"

export type OrderStatus = "pending" | "seen" | "in_process" | "ready" | "completed"

interface StatusPillProps {
  status: OrderStatus
  eta?: number
}

export function StatusPill({ status, eta }: StatusPillProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "pending":
        return {
          label: "Pending",
          variant: "secondary" as const,
          icon: <Clock size={14} />,
          className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
        }
      case "seen":
        return {
          label: "Seen",
          variant: "outline" as const,
          icon: <Eye size={14} />,
          className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
        }
      case "in_process":
        return {
          label: eta ? `In Process (${eta} min)` : "In Process",
          variant: "default" as const,
          icon: <ChefHat size={14} />,
          className: "bg-orange-100 text-orange-800 hover:bg-orange-100",
        }
      case "ready":
        return {
          label: "Ready",
          variant: "default" as const,
          icon: <Package size={14} />,
          className: "bg-green-100 text-green-800 hover:bg-green-100",
        }
      case "completed":
        return {
          label: "Completed",
          variant: "default" as const,
          icon: <CheckCircle size={14} />,
          className: "bg-gray-100 text-gray-800 hover:bg-gray-100",
        }
      default:
        return {
          label: "Unknown",
          variant: "outline" as const,
          icon: null,
          className: "",
        }
    }
  }

  const config = getStatusConfig()

  return (
    <Badge variant={config.variant} className={`flex items-center gap-1 ${config.className}`}>
      {config.icon}
      {config.label}
    </Badge>
  )
}
