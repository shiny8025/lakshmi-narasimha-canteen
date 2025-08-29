"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface ModeCardProps {
  title: string
  description: string
  icon: React.ReactNode
  route: string
  extraCharge?: number
  timing?: string
}

export function ModeCard({ title, description, icon, route, extraCharge, timing }: ModeCardProps) {
  const router = useRouter()

  const handleSelect = () => {
    router.push(route)
  }

  return (
    <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-primary">
      <CardHeader className="text-center pb-2">
        <div className="flex justify-center mb-2 text-primary">{icon}</div>
        <CardTitle className="text-xl font-serif font-bold">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
        {timing && (
          <div className="text-sm font-medium text-muted-foreground">
            <span className="font-semibold">Timing:</span> {timing}
          </div>
        )}
        {extraCharge && <div className="text-sm font-medium text-primary">Extra charge: ₹{extraCharge}</div>}
      </CardHeader>
      <CardContent className="pt-2">
        <Button onClick={handleSelect} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          Select {title}
        </Button>
      </CardContent>
    </Card>
  )
}
