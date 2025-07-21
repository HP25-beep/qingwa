import { useSupabaseClient } from "@supabase/auth-helpers-react";

export const useDeleteSong = () => {
  const supabase = useSupabaseClient();

  const deleteSong = async (data: { id: number }) => {
    // 获取 song_path 和 image_path 以便后续删除文件
    const { data: songData, error: fetchError } = await supabase
      .from("songs")
      .select("song_path, image_path")
      .eq("id", data.id)
      .single();

    if (fetchError) {
      console.error("Fetch error:", fetchError);
      return { success: false, error: fetchError };
    }

    const songPath = songData.song_path;
    const imagePath = songData.image_path;

    // 调用 RPC 函数执行数据库层面的删除
    const { error: rpcError } = await supabase.rpc("delete_song_and_likes", {
      song_id_input: data.id,
    });

    if (rpcError) {
      console.error("RPC Error:", rpcError);
      return { success: false, error: rpcError };
    }

    // 删除 Supabase Storage 文件
    const { error: songDeleteError } = await supabase.storage
      .from("songs")
      .remove([songPath]);

    const { error: imageDeleteError } = await supabase.storage
      .from("images")
      .remove([imagePath]);

    if (songDeleteError || imageDeleteError) {
      console.warn("Some storage files failed to delete", {
        songDeleteError,
        imageDeleteError,
      });
      // 即使文件删除失败，数据库数据已删除，标记部分成功
      return {
        success: true,
        warning: "Some files failed to delete",
        songDeleteError,
        imageDeleteError,
      };
    }

    return { success: true };
  };

  return { deleteSong };
};
