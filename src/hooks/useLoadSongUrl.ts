import { FileNode } from "@/types";
import { createClient } from "@/lib/supabase/client";

const useLoadSongUrl = (song: FileNode) => {
  const supabase = createClient();

  if (!song) {
    return '';
  }

  const { data: songData } = supabase
    .storage
    .from('audio')
    .getPublicUrl(song.path);

  return songData.publicUrl;
}

export default useLoadSongUrl;