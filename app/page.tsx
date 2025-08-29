"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to login page on app start
    router.push("/login")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-2 sm:px-4">
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl font-serif font-black text-primary">Lakshmi Narasimha Canteen</h1>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">Redirecting to login...</p>
      </div>
    </div>
  )   
}
