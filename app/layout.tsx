import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'SkillMitra - Teach one. Learn one.',
  description: 'Exchange real skills with real people. Build connections while growing together.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white dark:bg-slate-900">
        <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              SkillMitra
            </Link>
            <Link
              href="/leaderboard"
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Leaderboard
            </Link>
          </div>
        </nav>
        <main className="flex-grow">{children}</main>
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} SkillMitra. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors">Terms</a>
              <a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors">Privacy</a>
              <a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
