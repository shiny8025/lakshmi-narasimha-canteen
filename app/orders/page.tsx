"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { OrderCard, type Order } from "@/components/order-card"
import { ArrowLeft, RefreshCw } from "lucide-react"

export default function OrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

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

    // Simulate live updates every 30 seconds
    const interval = setInterval(() => {
      loadOrders()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

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
          <p className="text-muted-foreground">Loading your orders...</p>
        </div>
      </div>
    )
  }

  return (
  <div className="min-h-screen bg-background px-2 sm:px-4">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/mode")} className="p-2">
                <ArrowLeft size={20} />
              </Button>
              <h1 className="text-2xl font-serif font-black text-primary">My Orders</h1>
            </div>
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

  <div className="max-w-4xl mx-auto px-2 sm:px-4 py-6">
        {orders.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <h2 className="text-lg sm:text-xl font-serif font-bold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-2 sm:mb-4 text-sm sm:text-base">Your order history will appear here</p>
            <Button
              onClick={() => router.push("/mode")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Start Ordering
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                {orders.length} order{orders.length !== 1 ? "s" : ""} found
              </p>
              <p className="text-xs text-muted-foreground">Updates automatically every 30 seconds</p>
            </div>
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
