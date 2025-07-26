import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"


export default async function GET(
  req: NextRequest, 
  { params }: { params: {name: string} }
) {
  const supabase = await createClient()
  const {data, error} = await supabase
    .from('fs')
    .select('*')
    .eq('type', 1)
    .eq('name', params.name)
  
  if (error) return NextResponse.json({data: null, error: error}, {status: 500})
  return NextResponse.json({data: data, error: null})
}