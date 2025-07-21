import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// 递归查询所有子节点
async function getAllDescendantIds(supabase: any, parentId: number): Promise<number[]> {
  const ids: number[] = []
  async function recurse(id: number) {
    const { data } = await supabase
      .from('files')
      .select('id')
      .eq('parent_id', id)

    if (data && data.length > 0) {
      for (const child of data) {
        ids.push(child.id)
        await recurse(child.id)
      }
    }
  }
  await recurse(parentId)
  return ids
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const nodeId = Number(params.id)

  const supabase = await createClient();

  const descendantIds = await getAllDescendantIds(supabase, nodeId)

  // 删除所有子孙节点 + 自己
  const allIds = [nodeId, ...descendantIds]
  const { error } = await supabase.from('files').delete().in('id', allIds)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, deleted: allIds })
}
