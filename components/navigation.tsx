"use client"


import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"
import { ShoppingCart, ClipboardList, User, Home } from "lucide-react"
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export function Navigation() {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: "Home", path: "/mode" },
    { icon: ShoppingCart, label: "Cart", path: "/cart" },
    { icon: ClipboardList, label: "Orders", path: "/orders" },
    { icon: User, label: "Profile", path: "/profile" },
  ]

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="flex justify-between items-center py-4 px-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <img
            src="/lakshmi-narasimha-logo.png"
            alt="Lakshmi Narasimha Canteen Logo"
            className="w-12 h-12 object-contain"
          />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-primary leading-tight">Lakshmi Narasimha</h1>
            <span className="text-sm text-secondary font-medium -mt-1">CANTEEN</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path
            return (
              <Button
                key={item.path}
                variant="ghost"
                size="lg"
                onClick={() => router.push(item.path)}
                className={`flex flex-col items-center gap-1 px-3 py-3 min-h-[60px] min-w-[60px] transition-colors ${
                  isActive
                    ? "text-primary bg-primary/10 border border-primary/20"
                    : "text-muted-foreground hover:text-primary hover:bg-secondary/10"
                }`}
              >
                <Icon size={22} />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            )
          })}
          {/* Clerk Auth Buttons */}
          <div className="flex items-center gap-2 ml-4">
            <SignedOut>
              <SignInButton>
                <Button variant="outline" size="sm">Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button variant="default" size="sm">Sign Up</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  )
}
