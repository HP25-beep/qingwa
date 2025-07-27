// /api/fileExplore/[id]/details/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params
  const parentId = parseInt(id)
  const supabase = await createClient()
  const {data, error} = await supabase
    .from("fs")
    .select("*")
    .eq("parent_id", parentId)

  if (error) return NextResponse.json({error: error}, {status: 500})
  return NextResponse.json(data)
}