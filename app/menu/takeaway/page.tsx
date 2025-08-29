"use client"
import { useState } from "react"
import Fuse from "fuse.js"
import { MenuItemCard, type MenuItem } from "@/components/menu-item-card"
import { getMenuByMode, getExtraCharge } from "@/lib/menu-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"

export default function TakeawayMenuPage() {
  const router = useRouter()
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [vegFilter, setVegFilter] = useState<string>("All")
  const [search, setSearch] = useState("")
  const menuItems = getMenuByMode("takeaway")
  const extraCharge = getExtraCharge("takeaway")

  const categories = ["All", ...Array.from(new Set(menuItems.map((item) => item.category)))]

  // Always show search bar first, then filter by veg/non-veg, then by category
  let filteredItems = menuItems
  if (search.trim() !== "") {
    const fuse = new Fuse(menuItems, {
      keys: ["name", "category", "description"],
      threshold: 0.4,
      ignoreLocation: true,
    });
    filteredItems = fuse.search(search.trim()).map(result => result.item);
  }
  if (vegFilter !== "All") {
    filteredItems = filteredItems.filter((item) => (vegFilter === "Veg" ? item.isVeg : !item.isVeg))
  }
  if (selectedCategory !== "All") {
    filteredItems = filteredItems.filter((item) => item.category === selectedCategory)
  }

  const handleAddToCart = (item: MenuItem, quantity: number) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.item.id === item.id)
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.item.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem,
        )
      }
      return [...prev, { item, quantity }]
    })
  }

  const getTotalItems = () => {
    return cart.reduce((total, cartItem) => total + cartItem.quantity, 0)
  }

  const goToCart = () => {
    localStorage.setItem("cart", JSON.stringify({ items: cart, mode: "takeaway", extraCharge }))
    router.push("/cart")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()} className="p-2">
                <ArrowLeft size={20} />
              </Button>
              <div>
                <h1 className="text-2xl font-serif font-black text-primary">Takeaway Menu</h1>
                <p className="text-sm text-muted-foreground">Service charge: ₹{extraCharge}</p>
              </div>
            </div>
            {getTotalItems() > 0 && (
              <Button onClick={goToCart} className="bg-primary hover:bg-primary/90 text-primary-foreground relative">
                <ShoppingCart size={20} className="mr-2" />
                Cart
                <Badge className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground">
                  {getTotalItems()}
                </Badge>
              </Button>
            )}
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <input
              type="text"
              placeholder="Search food..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border rounded px-2 py-1 text-sm w-full sm:w-64"
              style={{ minWidth: 0 }}
            />
            <div className="flex gap-2">
              <Button size="sm" variant={vegFilter === "All" ? "default" : "outline"} onClick={() => setVegFilter("All")}>All</Button>
              <Button size="sm" variant={vegFilter === "Veg" ? "default" : "outline"} onClick={() => setVegFilter("Veg")}>Veg</Button>
              <Button size="sm" variant={vegFilter === "Non-Veg" ? "default" : "outline"} onClick={() => setVegFilter("Non-Veg")}>Non-Veg</Button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap ${
                    selectedCategory === category ? "bg-primary text-primary-foreground" : "bg-background hover:bg-accent"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items available in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
