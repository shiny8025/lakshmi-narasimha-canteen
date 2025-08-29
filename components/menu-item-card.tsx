"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus } from "lucide-react"

export interface MenuItem {
  id: number
  category: 'tandoori' | 'breads' | 'sandwiches' | 'shawarma' | 'veg_curry' | 'nonveg_curry' | 'biryani_normal' | 'biryani_special' | 'dosa' | 'idli'
  name: string
  abbrev?: string
  isVeg: boolean
  deliveryEligible: boolean
  pricePaise?: number
  variants?: { name: string; pricePaise: number }[]
  addons?: { name: string; pricePaise: number }[]
  description?: string
  imageUrl?: string
  available?: boolean
}

interface MenuItemCardProps {
  item: MenuItem
  onAddToCart: (item: MenuItem, quantity: number) => void
}


export function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  const [quantity, setQuantity] = useState(0)
  const [selectedAddons, setSelectedAddons] = useState<number[]>([])
  const [selectedVariant, setSelectedVariant] = useState<number>(0)

  const handleAddonChange = (idx: number) => {
    setSelectedAddons((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    )
  }

  const handleVariantChange = (idx: number) => {
    setSelectedVariant(idx)
  }

  const getTotalPricePaise = () => {
    let total = 0
    if (item.variants && item.variants.length > 0) {
      total += item.variants[selectedVariant]?.pricePaise || 0
    } else if (item.pricePaise) {
      total += item.pricePaise
    }
    if (item.addons && selectedAddons.length > 0) {
      total += selectedAddons.reduce((sum, idx) => sum + (item.addons?.[idx]?.pricePaise || 0), 0)
    }
    return total
  }

  const handleAddToCart = () => {
    if (quantity > 0) {
      const itemWithAddons = item.addons && selectedAddons.length > 0
        ? { ...item, selectedAddons: selectedAddons.map(idx => item.addons![idx]) }
        : item
      const itemWithVariant = item.variants && item.variants.length > 0
        ? { ...itemWithAddons, selectedVariant: item.variants[selectedVariant] }
        : itemWithAddons
      onAddToCart(itemWithVariant, quantity)
      setQuantity(0)
      setSelectedAddons([])
      setSelectedVariant(0)
    }
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(0, prev - 1))

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative">
  <img src={item.imageUrl || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 flex gap-2">
          <Badge variant={item.isVeg ? "secondary" : "destructive"} className="text-xs">
            {item.isVeg ? "VEG" : "NON-VEG"}
          </Badge>
          {!item.available && (
            <Badge variant="outline" className="text-xs bg-muted">
              Out of Stock
            </Badge>
          )}
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-serif font-bold">{item.name}</CardTitle>
        <CardDescription className="text-sm line-clamp-2">{item.description}</CardDescription>
        <div className="text-xl font-bold text-primary">
          ₹{(getTotalPricePaise() / 100).toFixed(2)}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {item.variants && item.variants.length > 0 && (
          <div className="mb-2">
            <div className="font-medium text-sm mb-1">Select Variant:</div>
            <div className="flex flex-wrap gap-2">
              {item.variants.map((variant, idx) => (
                <label key={variant.name} className="flex items-center gap-1 cursor-pointer text-xs border rounded px-2 py-1">
                  <input
                    type="radio"
                    name={`variant-${item.id}`}
                    checked={selectedVariant === idx}
                    onChange={() => handleVariantChange(idx)}
                  />
                  {variant.name} (₹{(variant.pricePaise / 100).toFixed(2)})
                </label>
              ))}
            </div>
          </div>
        )}
        {item.addons && item.addons.length > 0 && (
          <div className="mb-2">
            <div className="font-medium text-sm mb-1">Add-ons:</div>
            <div className="flex flex-wrap gap-2">
              {item.addons.map((addon, idx) => (
                <label key={addon.name} className="flex items-center gap-1 cursor-pointer text-xs border rounded px-2 py-1">
                  <input
                    type="checkbox"
                    checked={selectedAddons.includes(idx)}
                    onChange={() => handleAddonChange(idx)}
                  />
                  {addon.name} (+₹{(addon.pricePaise / 100).toFixed(2)})
                </label>
              ))}
            </div>
          </div>
        )}
        {item.available ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={decrementQuantity}
                disabled={quantity === 0}
                className="h-8 w-8 p-0 bg-transparent"
              >
                <Minus size={16} />
              </Button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <Button variant="outline" size="sm" onClick={incrementQuantity} className="h-8 w-8 p-0 bg-transparent">
                <Plus size={16} />
              </Button>
            </div>
            <Button
              onClick={handleAddToCart}
              disabled={quantity === 0}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Add to Cart
              <span className="ml-2 text-xs">₹{(getTotalPricePaise() / 100).toFixed(2)}</span>
            </Button>
          </div>
        ) : (
          <Button disabled className="w-full">
            Out of Stock
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
