import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: Request)
    { const { searchParams } = new URL(req.url) const code = searchParams.get('code')

    const { data } = await supabase .from('users') .select('*') .eq('referral_code', code)

return NextResponse.json(data) }