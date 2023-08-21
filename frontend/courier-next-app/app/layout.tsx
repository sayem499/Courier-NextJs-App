import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Courier NextJS App',
  description: 'Built using NextJS.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-full h-full dark:bg-slate-900
       bg-slate-200 text-black dark:text-slate-300`}>{children}</body>
    </html>
  )
}
