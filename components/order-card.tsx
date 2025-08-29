import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusPill, type OrderStatus } from "@/components/status-pill"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { MenuItem } from "@/components/menu-item-card"

interface OrderItem {
  item: MenuItem
  quantity: number
}

export interface Order {
  id: string
  items: OrderItem[]
  mode: string
  subtotal: number
  extraCharge: number
  total: number
  paymentMethod: string
  address?: string
  phone?: string
  status: OrderStatus
  eta?: number
  timestamp: string
}

interface OrderCardProps {
  order: Order
}

export function OrderCard({ order }: OrderCardProps) {
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getModeLabel = () => {
    switch (order.mode) {
      case "delivery":
        return "Delivery"
      case "dinein":
        return "Dine-In"
      case "takeaway":
        return "Takeaway"
      default:
        return order.mode
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-serif font-bold">Order #{order.id}</CardTitle>
          <StatusPill status={order.status} eta={order.eta} />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{formatDate(order.timestamp)}</span>
          <span>•</span>
          <Badge variant="outline" className="text-xs">
            {getModeLabel()}
          </Badge>
          <span>•</span>
          <span className="capitalize">{order.paymentMethod}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-2">
          {order.items.map((orderItem) => (
            <div key={orderItem.item.id} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src={orderItem.item.image || "/placeholder.svg"}
                  alt={orderItem.item.name}
                  className="w-10 h-10 object-cover rounded"
                />
                <div>
                  <p className="font-medium text-sm">{orderItem.item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    ₹{orderItem.item.price} × {orderItem.quantity}
                  </p>
                </div>
              </div>
              <p className="font-medium text-sm">₹{orderItem.item.price * orderItem.quantity}</p>
            </div>
          ))}
        </div>

        <Separator />

        {/* Order Summary */}
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{order.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>{order.mode === "delivery" ? "Delivery Charge" : "Service Charge"}</span>
            <span>₹{order.extraCharge}</span>
          </div>
          <div className="flex justify-between font-bold text-base">
            <span>Total</span>
            <span className="text-primary">₹{order.total}</span>
          </div>
        </div>

        {/* Delivery Address */}
        {order.address && (
          <>
            <Separator />
            <div className="text-sm">
              <p className="font-medium mb-1">Delivery Address:</p>
              <p className="text-muted-foreground">{order.address}</p>
              <p className="text-muted-foreground">Phone: {order.phone}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
