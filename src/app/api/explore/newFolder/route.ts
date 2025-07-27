import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/server"

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  // const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from("fs") 
    .select("*") 
    .eq("type", 0)
    .is("parent_id", null)
    .order("created_at", { ascending: false })  // 按 created_at 降序
    .limit(8)
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500})
  return NextResponse.json(data)
}