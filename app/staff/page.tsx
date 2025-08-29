"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatusPill, type OrderStatus } from "@/components/status-pill"
import { ETASelectModal } from "@/components/eta-select-modal"
import { RefreshCw, Filter, Eye, ChefHat, Package, CheckCircle } from "lucide-react"
import type { Order } from "@/components/order-card"

export default function StaffPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [vegFilter, setVegFilter] = useState<string>("all")
  const [modeFilter, setModeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("active")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isETAModalOpen, setIsETAModalOpen] = useState(false)

  const loadOrders = () => {
    const savedOrders = localStorage.getItem("orders")
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders)
      // Sort by timestamp (newest first)
      parsedOrders.sort((a: Order, b: Order) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      setOrders(parsedOrders)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    loadOrders()

    // Auto-refresh every 15 seconds for staff
    const interval = setInterval(() => {
      loadOrders()
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let filtered = [...orders]

    // Filter by veg/non-veg
    if (vegFilter !== "all") {
      filtered = filtered.filter((order) => {
        const hasVegItems = order.items.some((item) => item.item.isVeg)
        const hasNonVegItems = order.items.some((item) => !item.item.isVeg)

        if (vegFilter === "veg") return hasVegItems
        if (vegFilter === "nonveg") return hasNonVegItems
        return true
      })
    }

    // Filter by mode
    if (modeFilter !== "all") {
      filtered = filtered.filter((order) => order.mode === modeFilter)
    }

    // Filter by status
    if (statusFilter === "active") {
      filtered = filtered.filter((order) => !["completed"].includes(order.status))
    } else if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    setFilteredOrders(filtered)
  }, [orders, vegFilter, modeFilter, statusFilter])

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus, eta?: number) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus, ...(eta && { eta }) } : order,
    )
    setOrders(updatedOrders)
    localStorage.setItem("orders", JSON.stringify(updatedOrders))
  }

  const handleStatusChange = (order: Order, newStatus: OrderStatus) => {
    if (newStatus === "in_process") {
      setSelectedOrder(order)
      setIsETAModalOpen(true)
    } else {
      updateOrderStatus(order.id, newStatus)
    }
  }

  const handleETAConfirm = (eta: number) => {
    if (selectedOrder) {
      updateOrderStatus(selectedOrder.id, "in_process", eta)
      setSelectedOrder(null)
    }
  }

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    const statusFlow: Record<OrderStatus, OrderStatus | null> = {
      pending: "seen",
      seen: "in_process",
      in_process: "ready",
      ready: "completed",
      completed: null,
    }
    return statusFlow[currentStatus]
  }

  const getStatusActions = (order: Order) => {
    const nextStatus = getNextStatus(order.status)
    const actions = []

    // Always allow going back to previous status (except from pending)
    if (order.status !== "pending") {
      const prevStatuses: Record<OrderStatus, OrderStatus[]> = {
        pending: [],
        seen: ["pending"],
        in_process: ["pending", "seen"],
        ready: ["pending", "seen", "in_process"],
        completed: ["pending", "seen", "in_process", "ready"],
      }

      prevStatuses[order.status].forEach((status) => {
        actions.push(
          <Button
            key={status}
            variant="outline"
            size="sm"
            onClick={() => handleStatusChange(order, status)}
            className="text-xs"
          >
            Mark as {status.replace("_", " ")}
          </Button>,
        )
      })
    }

    // Add next status action
    if (nextStatus) {
      const getStatusIcon = (status: OrderStatus) => {
        switch (status) {
          case "seen":
            return <Eye size={14} />
          case "in_process":
            return <ChefHat size={14} />
          case "ready":
            return <Package size={14} />
          case "completed":
            return <CheckCircle size={14} />
          default:
            return null
        }
      }

      actions.push(
        <Button
          key={nextStatus}
          size="sm"
          onClick={() => handleStatusChange(order, nextStatus)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs flex items-center gap-1"
        >
          {getStatusIcon(nextStatus)}
          Mark as {nextStatus.replace("_", " ")}
        </Button>,
      )
    }

    return actions
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      loadOrders()
    }, 500)
  }

  if (isLoading) {
    return (
    <div className="min-h-screen bg-background flex items-center justify-center px-2 sm:px-4">
        <div className="text-center">
          <RefreshCw className="animate-spin h-8 w-8 mx-auto mb-2 text-primary" />
          <p className="text-muted-foreground">Loading orders...</p>
        </div>
      </div>
    )
  }

  return (
  <div className="min-h-screen bg-background px-2 sm:px-4">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-serif font-black text-primary">Staff Dashboard</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="flex items-center gap-2 bg-transparent"
            >
              <RefreshCw size={16} />
              Refresh
            </Button>
          </div>
        </div>
      </div>

  <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-serif font-bold flex items-center gap-2">
              <Filter size={20} />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Food Type</label>
                <Select value={vegFilter} onValueChange={setVegFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Items</SelectItem>
                    <SelectItem value="veg">Vegetarian Only</SelectItem>
                    <SelectItem value="nonveg">Non-Vegetarian Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Order Mode</label>
                <Select value={modeFilter} onValueChange={setModeFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Modes</SelectItem>
                    <SelectItem value="delivery">Delivery</SelectItem>
                    <SelectItem value="dinein">Dine-In</SelectItem>
                    <SelectItem value="takeaway">Takeaway</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active Orders</SelectItem>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="seen">Seen</SelectItem>
                    <SelectItem value="in_process">In Process</SelectItem>
                    <SelectItem value="ready">Ready</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <div className="text-sm">
                  <p className="font-medium">{filteredOrders.length} orders</p>
                  <p className="text-muted-foreground text-xs">Auto-refresh: 15s</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-serif font-bold mb-2">No orders found</h2>
            <p className="text-muted-foreground">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="h-fit">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-serif font-bold">#{order.id}</CardTitle>
                    <StatusPill status={order.status} eta={order.eta} />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{new Date(order.timestamp).toLocaleTimeString("en-IN")}</span>
                    <span>•</span>
                    <Badge variant="outline" className="text-xs">
                      {order.mode === "dinein" ? "Dine-In" : order.mode === "takeaway" ? "Takeaway" : "Delivery"}
                    </Badge>
                    <span>•</span>
                    <span>₹{order.total}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-2">
                    {order.items.map((orderItem) => (
                      <div key={orderItem.item.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Badge variant={orderItem.item.isVeg ? "secondary" : "destructive"} className="text-xs px-1">
                            {orderItem.item.isVeg ? "V" : "N"}
                          </Badge>
                          <span className="font-medium">{orderItem.item.name}</span>
                        </div>
                        <span className="text-muted-foreground">×{orderItem.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Address */}
                  {order.address && (
                    <div className="text-xs bg-muted p-2 rounded">
                      <p className="font-medium">Delivery:</p>
                      <p className="text-muted-foreground">{order.address}</p>
                      <p className="text-muted-foreground">📞 {order.phone}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">{getStatusActions(order)}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* ETA Modal */}
      <ETASelectModal
        isOpen={isETAModalOpen}
        onClose={() => {
          setIsETAModalOpen(false)
          setSelectedOrder(null)
        }}
        onConfirm={handleETAConfirm}
        currentEta={selectedOrder?.eta}
      />
    </div>
  )
}
