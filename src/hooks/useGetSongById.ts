import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";

import { FileNode } from "@/types";

const useGetSongById = (id?: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<FileNode | undefined>(undefined);
  const supabase = createClient();

  useEffect(() => {
    if (!id) return;

    const fetchSong = async () => {
      setIsLoading(true);

      const { data, error } = await supabase
        .from("fs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast.error(error.message);
      } else {
        setSong(data as FileNode);
      }

      setIsLoading(false);
    };

    fetchSong();
  }, [id]); // supabase instance doesn't need to be in deps

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  );
};

export default useGetSongById;
