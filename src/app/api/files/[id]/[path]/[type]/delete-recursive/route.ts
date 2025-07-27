import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { SupabaseClient } from '@supabase/supabase-js'

// 递归查询所有子节点
async function getAllDescendantIds(supabase: SupabaseClient, parentId: number): Promise<[number[], string[], number[]]> {
  const ids: number[] = []
  const paths: string[] = []
  const types: number[] = []
  async function recurse(id: number) {
    const { data } = await supabase
      .from('fs')
      .select('id, path, type')
      .eq('parent_id', id)

    if (data && data.length > 0) {
      for (const child of data) {
        ids.push(child.id)
        paths.push(child.path)
        types.push(child.type)
        await recurse(child.id)
      }
    }
  }
  await recurse(parentId)
  
  return [
    ids,
    paths,
    types
  ]
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string, path: string, type: string } }
) {
  const nodeId = parseInt(params.id)
  const nodePath = decodeURIComponent(params.path)
  const nodeType = parseInt(params.type)

  const supabase = await createClient()

  // 查询要删除的数据项、文件实体
  const temp = await getAllDescendantIds(supabase, nodeId)
  const allIds: number[] = [nodeId, ...temp[0]]
  const allFolderPaths: string[] = [...(temp[1].filter((_, idx) => temp[2][idx] === 0))]
  const allFilePaths: string[] = [...(temp[1].filter((_, idx) => temp[2][idx] === 1))]
  if (nodeType === 0) {
    allFolderPaths.push(nodePath)
  } else {
    allFilePaths.push(nodePath)
  }
  
  // 删除所有子孙节点 + 自己
  const { error } = await supabase.from('fs').delete().in('id', allIds)
  if (error) return NextResponse.json({ error: error.message, deleted: null }, { status: 500 })
  
  if (allFolderPaths && allFolderPaths.length > 0) {
    const { error: storageError } = await supabase.storage
      .from('image') 
      .remove(allFolderPaths)
    if (storageError) {
      return NextResponse.json({ error: storageError.message, deleted: null }, { status: 500 })
    }
  }
  if (allFilePaths && allFilePaths.length > 0) {
    const { error: storageError } = await supabase.storage
      .from('audio') 
      .remove(allFilePaths)
    if (storageError) {
      return NextResponse.json({ error: storageError.message, deleted: null }, { status: 500 })
    }
  }

  return NextResponse.json({ error: null, deleted: allIds })
}
