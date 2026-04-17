'use client'

import { useState } from 'react'
import { supabase } from './lib/supabase'
import { generateReferralCode } from './utils/referral'

export default function Home() { const [email, setEmail] = useState('')
const [teach, setTeach] = useState('')
const [learn, setLearn] = useState('')
const [message, setMessage] = useState('')

async function handleSubmit(e: any) { e.preventDefault()

const referralCode = generateReferralCode()

const urlParams = new URLSearchParams(window.location.search)
const referredBy = urlParams.get('ref')

const { error } = await supabase.from('users').insert([
  {
    email,
    teach,
    learn,
    referral_code: referralCode,
    referred_by: referredBy,
  },
])

if (error) {
  setMessage('Something went wrong')
} else {
  const shareLink = `${process.env.NEXT_PUBLIC_BASE_URL}?ref=${referralCode}`
  setMessage(`You're in! Share: ${shareLink}`)
}

}

return ( <main style={{ maxWidth: 600, margin: 'auto', padding: 20 }}> <h1>Skill^Mitra</h1> <h2>Teach one. Learn one.</h2>

<p>Exchange real skills with real people.</p>

  <form onSubmit={handleSubmit}>
    <input
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />

    <input
      placeholder="What can you teach?"
      value={teach}
      onChange={(e) => setTeach(e.target.value)}
    />

    <input
      placeholder="What do you want to learn?"
      value={learn}
      onChange={(e) => setLearn(e.target.value)}
    />

    <button type="submit">Join Waitlist</button>
  </form>

  <p>{message}</p>
</main>

) }