import { createClient } from "@/lib/supabase/client"

import { FileNode } from "@/types"

const useLoadImage = ( data: FileNode ) => {
  const supabase = createClient()

  if (!data || !(data.type === 0)) {
    return null
  }

  const { data: imageData } = supabase
    .storage
    .from('image')
    .getPublicUrl(data.path)

  return imageData.publicUrl
}

export default useLoadImage