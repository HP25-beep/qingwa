import { createClient } from "@/lib/supabase/server"

const getMediasByName = async (
  name: string
) => {
  const supabase = await createClient()
  const {data, error} = await supabase
    .from('fs')
    .select('*')
    .eq('type', 1)
    .eq('name', name)
  
  if (error) {
    throw new Error('fail to get audios')
  } else {
    return data
  }
}

export default getMediasByName