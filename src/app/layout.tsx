import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AiM - AI Music Creation',
  description: 'Create unique AI-generated music tracks in seconds',
  keywords: ['AI music', 'music generation', 'AI composer', 'music creator'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen grid-bg">
          {children}
        </div>
      </body>
    </html>
  )
}
