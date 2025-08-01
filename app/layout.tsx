// app/layout.tsx
import './globals.css'
import { ClientProviders } from './ClientProviders'


export const metadata = {
  title: 'Survey2Earn',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
