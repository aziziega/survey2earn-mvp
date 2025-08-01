"use client"

import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { useAccount } from "wagmi"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>

    </>

  )
}

export { useAccount }