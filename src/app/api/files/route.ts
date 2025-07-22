// GET (children) & POST (add child)
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const temp = req.nextUrl.searchParams.get('parent_id')
  const parentId: number | null = temp === null ? null : Number(temp)

  const { data, error } = !parentId ? 
    (await supabase
      .from('fs')
      .select('*')
      .eq('owner_id', user!.id)
      .is('parent_id', parentId)
    ) : (await supabase
      .from('fs')
      .select('*')
      .eq('owner_id', user!.id)
      .eq('parent_id', parentId)
    )

  // console.log("MYDATA: ", data)
  // console.log("MYERROR: ", error)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { parent_id, name, type, owner_id, file_type, path } = body

  const supabase = await createClient();
  
  const { data, error } = await supabase.from('fs').insert([
    {
      parent_id,
      name,
      type,
      owner_id,
      file_type,
      path,
    },
  ]).select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data?.[0])
}
