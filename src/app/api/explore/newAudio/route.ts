import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/server"

export async function GET(_req: NextRequest) {
  const supabase = await createClient()
  // const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from("fs")            // 替换为你的表名
    .select("*")                        // 或指定字段
    .eq("type", 1)            // 条件：status 为 active
    .order("created_at", { ascending: false })  // 按 created_at 降序
    .limit(32)
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500})
  return NextResponse.json(data)
}