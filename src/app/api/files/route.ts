// GET (children) & POST (add child)
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/server'

export async function GET(req: NextRequest) {
  const supabase = await createClient();

  const parentId = req.nextUrl.searchParams.get('parent_id')

  const { data, error } = await supabase
    .from('fs')
    .select('*')
    .eq('parent_id', parentId ?? null)

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
