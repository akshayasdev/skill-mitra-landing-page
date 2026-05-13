import { NextResponse } from 'next/server'
import { supabase } from '../../lib/supabase'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const code = searchParams.get('code')

    if (!code) {
        return NextResponse.json({ error: 'Missing code parameter.' }, { status: 400 })
    }

    const { data, error } = await supabase.from('users').select('*').eq('referral_code', code)

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}