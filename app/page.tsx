'use client'

import { useState } from 'react'
import { supabase } from './lib/supabase'
import { generateReferralCode } from './utils/referral'

export default function Home() {
  const [email, setEmail] = useState('')
  const [teach, setTeach] = useState('')
  const [learn, setLearn] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    const referralCode = generateReferralCode()
    const urlParams = new URLSearchParams(window.location.search)
    const referredBy = urlParams.get('ref')

    const { error } = await supabase.from('users').insert([
      { email, teach, learn, referral_code: referralCode, referred_by: referredBy },
    ])

    setIsSubmitting(false)

    if (error) {
      setIsError(true)
      setMessage('Something went wrong. Please try again.')
    } else {
      setIsError(false)
      const shareLink = `${process.env.NEXT_PUBLIC_BASE_URL}?ref=${referralCode}`
      setMessage(`You're in! Share your link: ${shareLink}`)
      setEmail('')
      setTeach('')
      setLearn('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">

          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
              <span className="text-indigo-700 dark:text-indigo-300 font-medium text-sm">🚀 Early Access</span>
            </div>
            <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">SkillMitra</h1>
            <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-3">Teach one. Learn one.</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Exchange real skills with real people. Build connections while growing together.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[
              { title: 'Skill Exchange', icon: '🤝', desc: 'Trade skills with others' },
              { title: 'Community Driven', icon: '👥', desc: 'Join a growing network' },
              { title: 'Learn Fast', icon: '🚀', desc: 'Accelerate your growth' },
            ].map((f, i) => (
              <div key={i} className="bg-white dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                <div className="text-2xl mb-2">{f.icon}</div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{f.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Form Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Join the Waitlist</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="teach" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    What can you teach?
                  </label>
                  <input
                    id="teach"
                    type="text"
                    placeholder="e.g., Python, Guitar, Photography"
                    value={teach}
                    onChange={(e) => setTeach(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="learn" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    What do you want to learn?
                  </label>
                  <input
                    id="learn"
                    type="text"
                    placeholder="e.g., React, Cooking, Video Editing"
                    value={learn}
                    onChange={(e) => setLearn(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3.5 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : 'Join Waitlist'}
                </button>
              </form>

              {message && (
                <div className={`mt-6 p-4 rounded-lg border ${isError ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'}`}>
                  <p className={`text-sm ${isError ? 'text-red-800 dark:text-red-300' : 'text-green-800 dark:text-green-300'}`}>
                    {message}
                  </p>
                </div>
              )}
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 border-t border-slate-200 dark:border-slate-700 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">By joining, you agree to our Terms &amp; Privacy Policy</p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Join others waiting to share and learn skills</p>
            <div className="flex justify-center -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 bg-indigo-500 flex items-center justify-center text-white text-xs font-medium">
                  U{i}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 text-xs font-medium">
                +1k
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
