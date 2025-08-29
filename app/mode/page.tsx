import { ModeCard } from "@/components/mode-card"
import { Truck, UtensilsCrossed, ShoppingBag } from "lucide-react"

export default function ModePage() {
  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-black text-primary mb-2">Choose Your Order Mode</h1>
          <p className="text-muted-foreground">
            Select how you'd like to receive your order from Lakshmi Narasimha Canteen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ModeCard
            title="Delivery"
            description="Get your food delivered to your location"
            icon={<Truck size={48} />}
            route="/menu/delivery"
            extraCharge={40}
            timing="12:30pm - 12am"
          />
          <ModeCard
            title="Dine-In"
            description="Enjoy your meal at the canteen"
            icon={<UtensilsCrossed size={48} />}
            route="/menu/dinein"
            timing="10am - 12am"
          />
          <ModeCard
            title="Takeaway"
            description="Pick up your order from the counter"
            icon={<ShoppingBag size={48} />}
            route="/menu/takeaway"
            extraCharge={20}
            timing="10am - 12am"
          />
        </div>
      </div>
    </div>
  )
}
