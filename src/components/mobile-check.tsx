"use client"

import { useEffect, useState } from "react"
import { CheckIcon, SmartphoneIcon, TabletIcon, MonitorIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MobileCheck() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    // Set initial width
    if (typeof window !== "undefined") { // Check if window is defined (client-side)
      setWidth(window.innerWidth)

      // Update width on resize
      const handleResize = () => {
        setWidth(window.innerWidth)
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  const getDeviceType = () => {
    if (width < 640) return { type: "Mobile", icon: SmartphoneIcon }
    if (width < 1024) return { type: "Tablet", icon: TabletIcon }
    return { type: "Desktop", icon: MonitorIcon }
  }

  const { type, icon: Icon } = getDeviceType()

  // Don't render on the server or if width is 0 (initial state before client-side effect runs)
  if (typeof window === "undefined" || width === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-full shadow-lg p-3 flex items-center gap-2 border border-pink-200 z-50">
      <Icon className="h-5 w-5 text-rose-500" />
      <span className="text-sm font-medium text-rose-700">{type}</span>
      <CheckIcon className={cn("h-4 w-4 ml-1", type === "Mobile" ? "text-green-500" : "text-gray-400")} />
    </div>
  )
} 