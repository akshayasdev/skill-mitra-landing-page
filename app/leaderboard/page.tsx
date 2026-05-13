'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type LeaderboardRow = [string, number]

export default function Leaderboard() {
  const [users, setUsers] = useState<LeaderboardRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from('users').select('email, referred_by')

      const counts: Record<string, number> = {}
      data?.forEach((user) => {
        if (user.referred_by) {
          counts[user.referred_by] = (counts[user.referred_by] || 0) + 1
        }
      })

      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]) as LeaderboardRow[]
      setUsers(sorted)
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">Top Referrers</h1>
            <p className="text-slate-600 dark:text-slate-400">The most influential skill sharers in our community</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : users.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-12 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-lg">No referrals yet. Be the first to invite someone!</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Referral Code</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700 dark:text-slate-300">Referrals</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {users.map(([code, count], index) => (
                    <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            index === 0 ? 'bg-yellow-100 text-yellow-700' :
                            index === 1 ? 'bg-slate-200 text-slate-700' :
                            index === 2 ? 'bg-orange-100 text-orange-700' :
                            'bg-indigo-100 text-indigo-700'
                          }`}>{index + 1}</span>
                          {index === 0 && <span>👑</span>}
                          {index === 1 && <span>🥈</span>}
                          {index === 2 && <span>🥉</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <code className="bg-slate-100 dark:bg-slate-900/50 px-2 py-1 rounded text-sm font-mono text-slate-700 dark:text-slate-300">
                          {code}
                        </code>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-semibold text-slate-900 dark:text-white">{count}</span>
                        <span className="text-slate-500 text-sm ml-1">referrals</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
