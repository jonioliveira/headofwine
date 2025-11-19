"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DemoPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to demo restaurant menu
    router.push("/menu/demo-restaurant")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        <p className="mt-4 text-gray-600">Loading demo...</p>
      </div>
    </div>
  )
}
