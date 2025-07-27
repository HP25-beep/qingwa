import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"


export async function GET(
  _req: NextRequest, 
  { params }: { params: Promise<{name: string}> }
) {
  const { name } = await params

  const supabase = await createClient()
  const {data, error} = await supabase
    .from('fs')
    .select('*')
    .eq('type', 1)
    .eq('name', name)
  
  if (error) return NextResponse.json({data: null, error: error}, {status: 500})
  return NextResponse.json({data: data, error: null})
}