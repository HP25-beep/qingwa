import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: {id: string}}
) {
  const supabase = await createClient()
  const parentId = parseInt(params.id)
  const {data, error} = await supabase
    .from("fs")
    .select("*")
    .eq("parent_id", parentId)

  if (error) return NextResponse.json({error: error}, {status: 500})
  return NextResponse.json(data)
}