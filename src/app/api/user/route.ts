import { createClient } from "@/lib/server"
import { NextResponse } from "next/server"

export async function GET(req: Request) {

  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    return NextResponse.json({ userDetails: null, subscription: null }, { status: 401 })
  }

  const {data: userDetails } = await supabase
    .from('users')
    .select('*')
    .eq('id', data.user.id)
    .single()

  return NextResponse.json({userDetails})
}