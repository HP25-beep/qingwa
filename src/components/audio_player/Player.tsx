"use client";

import useGetSongById from "@/hooks/useGetSongById"
import usePlayer from "@/hooks/usePlayer"
import useLoadSongUrl from "@/hooks/useLoadSongUrl"
import PlayerContent from "./PlayerContent"
import toast from "react-hot-toast";
import { useEffect } from "react";

const Player = () => {
  const player = usePlayer()
  const { song: audio } = useGetSongById(player.activeId)

  const audioUrl = useLoadSongUrl(audio!)

  if (!audio || !audioUrl || !player.activeId) {
    return null
  }

  return (
    <div
      className="
        fixed
        bottom-0
        bg-black
        w-full
        py-2
        h-[75px]
        px-4
      "
    >
      <PlayerContent 
        key={audioUrl}
        audio={audio}
        audioUrl={audioUrl}
      />
    </div>
  )
}

export default Player