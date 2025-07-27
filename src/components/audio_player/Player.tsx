"use client";

import useGetSongById from "@/hooks/useGetSongById"
import usePlayer from "@/hooks/usePlayer"
import useLoadSongUrl from "@/hooks/useLoadSongUrl"
import PlayerContent from "./PlayerContent"
import Box from "../Box";

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
        w-full
        h-[75px]
        pt-1
      "
    >
      <Box>
        <PlayerContent 
          key={audioUrl}
          audio={audio}
          audioUrl={audioUrl}
        />
      </Box>
    </div>
  )
}

export default Player