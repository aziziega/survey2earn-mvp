"use client"

import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"

// Mock wallet context for demo purposes
import { createContext, useContext, useState } from "react"

interface WalletContextType {
  isConnected: boolean
  address: string | null
  connect: () => void
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | null>(null)

export function useAccount() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useAccount must be used within WalletProvider")
  }
  return context
}

function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)

  const connect = () => {
    // Mock wallet connection
    setIsConnected(true)
    setAddress("0x1234567890123456789012345678901234567890")
  }

  const disconnect = () => {
    setIsConnected(false)
    setAddress(null)
  }

  return (
    <WalletContext.Provider value={{ isConnected, address, connect, disconnect }}>{children}</WalletContext.Provider>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </WalletProvider>
  )
}
