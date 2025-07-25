import { createClient } from "../supabase/server"
import { FileNode } from "@/types"

const getFilesBySlug = async (id: number): Promise<FileNode[]> => {
  const supabase = await createClient()
  const {data, error} = await supabase
    .from("fs")
    .select("*")
    .eq("parent_id", id)

  if (error) return []
  return data
}

export default getFilesBySlug