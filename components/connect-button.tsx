"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAccount } from "@/app/providers"
import { Wallet, Copy, ExternalLink, LogOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ConnectButton() {
  const { isConnected, address, connect, disconnect } = useAccount()
  const { toast } = useToast()

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (!isConnected) {
    return (
      <Button onClick={connect} className="flex items-center gap-2">
        <Wallet className="w-4 h-4" />
        <span className="hidden sm:inline">Connect Wallet</span>
        <span className="sm:hidden">Connect</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          {address && formatAddress(address)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-sm text-muted-foreground">Connected</span>
          </div>
          <div className="font-mono text-xs sm:text-sm mt-1">{address && formatAddress(address)}</div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={copyAddress} className="flex items-center gap-2">
          <Copy className="w-4 h-4" />
          <span className="text-sm">Copy Address</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <ExternalLink className="w-4 h-4" />
          <span className="text-sm">View on Explorer</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={disconnect} className="flex items-center gap-2 text-red-600">
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
