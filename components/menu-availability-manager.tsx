"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { menuItems } from "@/lib/menu-data"
import { Leaf, Beef, Save, RefreshCw } from "lucide-react"

interface MenuItemAvailability {
  id: string
  name: string
  isVeg: boolean
  price: number
  isAvailable: boolean
}

export function MenuAvailabilityManager() {
  const [items, setItems] = useState<MenuItemAvailability[]>([])
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Load availability from localStorage or default to available
    const savedAvailability = localStorage.getItem("menuAvailability")
    const availabilityMap = savedAvailability ? JSON.parse(savedAvailability) : {}

    const itemsWithAvailability = menuItems.map((item) => ({
      id: item.id,
      name: item.name,
      isVeg: item.isVeg,
      price: item.price,
      isAvailable: availabilityMap[item.id] !== false, // Default to true if not set
    }))

    setItems(itemsWithAvailability)
  }, [])

  const toggleAvailability = (itemId: string) => {
    setItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item)))
    setHasChanges(true)
  }

  const saveChanges = async () => {
    setIsSaving(true)

    // Create availability map
    const availabilityMap: Record<string, boolean> = {}
    items.forEach((item) => {
      availabilityMap[item.id] = item.isAvailable
    })

    // Save to localStorage
    localStorage.setItem("menuAvailability", JSON.stringify(availabilityMap))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setHasChanges(false)
    setIsSaving(false)
  }

  const resetAll = () => {
    setItems((prev) => prev.map((item) => ({ ...item, isAvailable: true })))
    setHasChanges(true)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-serif font-bold">Menu Availability</CardTitle>
            <p className="text-sm text-muted-foreground">Manage which items are available today</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={resetAll} className="flex items-center gap-2 bg-transparent">
              <RefreshCw size={14} />
              Enable All
            </Button>
            {hasChanges && (
              <Button
                size="sm"
                onClick={saveChanges}
                disabled={isSaving}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90"
              >
                <Save size={14} />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`p-4 border rounded-lg transition-all ${
                item.isAvailable ? "border-border" : "border-red-200 bg-red-50/50"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {item.isVeg ? <Leaf className="w-4 h-4 text-green-600" /> : <Beef className="w-4 h-4 text-red-600" />}
                  <Badge variant={item.isVeg ? "secondary" : "destructive"} className="text-xs">
                    {item.isVeg ? "VEG" : "NON-VEG"}
                  </Badge>
                </div>
                <Switch checked={item.isAvailable} onCheckedChange={() => toggleAvailability(item.id)} />
              </div>
              <h3 className="font-medium text-sm mb-1">{item.name}</h3>
              <p className="text-sm text-muted-foreground">₹{item.price}</p>
              {!item.isAvailable && <p className="text-xs text-red-600 mt-1 font-medium">Currently unavailable</p>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
