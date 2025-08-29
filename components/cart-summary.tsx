"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import type { MenuItem } from "@/components/menu-item-card"

interface CartItem {
  item: MenuItem
  quantity: number
}

interface CartSummaryProps {
  items: CartItem[]
  extraCharge: number
  mode: string
}

export function CartSummary({ items, extraCharge, mode }: CartSummaryProps) {
  const subtotal = items.reduce((total, cartItem) => total + cartItem.item.price * cartItem.quantity, 0)
  const total = subtotal + extraCharge

  const isDeliveryBelowMinimum = mode === "delivery" && subtotal < 100
  const remainingAmount = isDeliveryBelowMinimum ? 100 - subtotal : 0

  const getChargeLabel = () => {
    switch (mode) {
      case "delivery":
        return "Delivery Charge"
      case "takeaway":
        return "Service Charge"
      default:
        return "Extra Charge"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-serif font-bold">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isDeliveryBelowMinimum && (
          <Alert className="border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              Minimum order amount for delivery is ₹100. Add ₹{remainingAmount} more to proceed.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          {items.map((cartItem) => (
            <div key={cartItem.item.id} className="flex justify-between items-center">
              <div className="flex-1">
                <p className="font-medium">{cartItem.item.name}</p>
                <p className="text-sm text-muted-foreground">
                  ₹{cartItem.item.price} × {cartItem.quantity}
                </p>
              </div>
              <p className="font-medium">₹{cartItem.item.price * cartItem.quantity}</p>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>₹{subtotal}</p>
          </div>
          {extraCharge > 0 && (
            <div className="flex justify-between">
              <p>{getChargeLabel()}</p>
              <p>₹{extraCharge}</p>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex justify-between items-center text-lg font-bold">
          <p>Total</p>
          <p className="text-primary">₹{total}</p>
        </div>
      </CardContent>
    </Card>
  )
}
