"use client";

// import useGetSongById from "@/hooks/useGetSongById";
import usePlayer from "@/hooks/usePlayer";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import PlayerContent from "./PlayerContent";
import { getToplayAudio } from "@/actions/toplayAudioFunc";
import { FileNode } from "@/types";

const Player = async () => {
  const player = usePlayer()

  const audio = await getToplayAudio(player.activeId)

  const songUrl = await useLoadSongUrl(audio!)
  
  // const { song } = useGetSongById(player.activeId);



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
        key={songUrl}
        song={audio!}
        songUrl={songUrl!}
      />
    </div>
  )
}

export default Player;