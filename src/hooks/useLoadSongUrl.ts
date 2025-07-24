import { FileNode } from "@/types";
import { createClient } from "@/lib/supabase/server";

const useLoadSongUrl = async (song: FileNode) => {
  const supabase = await createClient();

  if (!song) {
    return null;
  }

  const { data: songData } = supabase
    .storage
    .from('audio')
    .getPublicUrl(song.path);

  return songData.publicUrl;
}

export default useLoadSongUrl;