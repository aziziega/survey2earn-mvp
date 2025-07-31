"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ConnectButton } from "@/components/connect-button"
import { useAccount } from "@/app/providers"
import { useRouter } from "next/navigation"
import { Coins, Shield, Trophy, BarChart3, Globe, Zap, Star, ArrowRight } from "lucide-react"

export function LandingPage() {
  const { isConnected } = useAccount()
  const router = useRouter()

  const features = [
    {
      icon: Coins,
      title: "Earn Tokens",
      description: "Get rewarded with ERC-20 tokens for completing surveys",
    },
    {
      icon: Shield,
      title: "Anti-Sybil Protection",
      description: "Advanced wallet verification and staking mechanisms",
    },
    {
      icon: Trophy,
      title: "Reputation System",
      description: "Build your reputation and unlock higher rewards",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Comprehensive insights for survey creators",
    },
    {
      icon: Globe,
      title: "Multi-language",
      description: "Support for global communities",
    },
    {
      icon: Star,
      title: "NFT Certificates",
      description: "Mint proof of participation NFTs",
    },
  ]

  const stats = [
    { label: "Active Users", value: "12,450+" },
    { label: "Surveys Completed", value: "89,230+" },
    { label: "Tokens Distributed", value: "2.4M+" },
    { label: "Projects Served", value: "340+" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Survey2Earn</span>
          </div>
          <ConnectButton />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            🚀 Web3 Survey Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Earn While You Share
            <br />
            Your Opinion
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the first Web3 survey platform where your insights are rewarded with tokens. Help projects grow while
            building your reputation on-chain.
          </p>

          {isConnected ? (
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => router.push("/dashboard")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Go to Dashboard <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => router.push("/surveys")}>
                Browse Surveys
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <ConnectButton />
              <p className="text-sm text-gray-500">Connect your wallet to get started</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Survey2Earn?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Built for the Web3 community with advanced features to ensure quality and fairness
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of users already earning tokens through surveys</p>
          {!isConnected && <ConnectButton />}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Survey2Earn</span>
          </div>
          <p className="text-gray-400">© 2024 Survey2Earn. Built on Web3 for the community.</p>
        </div>
      </footer>
    </div>
  )
}
