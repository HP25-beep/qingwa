import { createClient } from "@/lib/supabase/client";

const useLoadAvatar = ( data: string ) => {
  const supabase = createClient();

  if (!data) {
    return ""
  }

  const { data: imageData } = supabase
    .storage
    .from('useravatar')
    .getPublicUrl(data);

  return imageData.publicUrl;
}

export default useLoadAvatar;