'use client'

import { useEffect, useState } from 'react' import { supabase } from '@/lib/supabase'

export default function Leaderboard() { const [users, setUsers] = useState<any[]>([])

useEffect(() => { async function fetchData() { const { data } = await supabase .from('users') .select('email, referred_by')

const counts: any = {}

  data?.forEach((u) => {
    if (u.referred_by) {
      counts[u.referred_by] = (counts[u.referred_by] || 0) + 1
    }
  })

  const sorted = Object.entries(counts).sort((a: any, b: any) => b[1] - a[1])

  setUsers(sorted)
}

fetchData()

}, [])

return ( <div> <h1>Top Referrers</h1> {users.map(([code, count], i) => ( <p key={i}> {code} - {count} referrals </p> ))} </div> ) }