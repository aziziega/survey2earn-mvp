// app/services/Web3Provider.tsx
'use client'

import React from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { XellarKitProvider, defaultConfig, darkTheme } from '@xellar/kit'
import { polygonAmoy, sepolia, liskSepolia } from 'wagmi/chains'

const config = defaultConfig({
    appName: "Xellar",
    walletConnectProjectId: '7738de6ee2c7500f497ecbf4ca56fc43',
    xellarAppId: '4381d679-291c-42f9-9aad-7c0d5b4c9d31',
    xellarEnv: "sandbox",
    chains: [polygonAmoy, sepolia, liskSepolia],
})

const queryClient = new QueryClient()

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <XellarKitProvider theme={darkTheme} >
                    {children}
                </XellarKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
