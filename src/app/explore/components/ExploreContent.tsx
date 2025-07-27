"use client";

import { useEffect, useState } from "react";

import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { FileNode } from "@/types";

// interface ExploreContentProps {
//   songs: FileNode[];
// }

const ExploreContent = () => {

  const [_isLoading, setIsLoading] = useState(true)
  const [newAudios, setNewAudios] = useState<FileNode[]>([])

  useEffect(() => {
    const fetchAudios = async () => {
      const res = await fetch("/api/explore/newAudio")
      if (!res.ok) {
        throw new Error("something went wrong")
      }
      const data = await res.json()

      setNewAudios(data.error? [] : data)
      setIsLoading(false)
    }
    fetchAudios()
  }, [])

  const onPlay = useOnPlay(newAudios);

  if (newAudios.length === 0) {
    return (
      <div className="mt-4 text-neutral-400">
        No songs available.
      </div>
    )
  }

  return (
    <div
      className="
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-8
        gap-4
        mt-4
      "
    >
      {newAudios.map((item) => (
        <SongItem 
          key={item.id}
          onClick={(id: number) => onPlay(id)}
          data={item}
        />
      ))}
    </div>
  )
}

export default ExploreContent;