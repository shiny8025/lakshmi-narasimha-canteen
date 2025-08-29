import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { StatusPill } from "@/components/status-pill"
import type { Order } from "@/components/order-card"

interface OrdersTableProps {
  orders: Order[]
  limit?: number
}

export function OrdersTable({ orders, limit }: OrdersTableProps) {
  const displayOrders = limit ? orders.slice(0, limit) : orders

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getModeLabel = (mode: string) => {
    switch (mode) {
      case "delivery":
        return "Delivery"
      case "dinein":
        return "Dine-In"
      case "takeaway":
        return "Takeaway"
      default:
        return mode
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Mode</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayOrders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                No orders found
              </TableCell>
            </TableRow>
          ) : (
            displayOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id}</TableCell>
                <TableCell className="text-sm">{formatDate(order.timestamp)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {getModeLabel(order.mode)}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">
                  {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                </TableCell>
                <TableCell className="font-medium">₹{order.total}</TableCell>
                <TableCell>
                  <StatusPill status={order.status} eta={order.eta} />
                </TableCell>
                <TableCell className="text-sm capitalize">{order.paymentMethod}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
