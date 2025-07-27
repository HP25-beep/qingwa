"use client";

import { FileNode, Song } from "@/types";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import FileBlock from "@/components/library/FileBlock";

interface SearchContentProps {
  audios: FileNode[];
}

const SearchContent: React.FC<SearchContentProps> = ({
  audios
}) => {
  const onPlay = useOnPlay(audios);
  
  if (audios.length === 0) {
    return (
      <div
        className="
          flex
          flex-col
          gap-y-2
          w-full
          px-6
          text-neutral-300/80
        "
      >
        No songs found.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-2 w-full">
      {audios.map((song) => (
        <div
          key={song.id}
          className="flex items-center w-full"  
        >
          <div className="flex-1">
            <FileBlock 
              data={song}
              onEditing={false}
              key={song.id}
              handler={{
                onOpenFolder: () => {}, 
                onOpenFile: (data: FileNode) => onPlay(data.id), 
                onDeleteFolder: () => {},
                onDeleteFile: () => {},
              }}
            />
          </div>
          {/* <LikeButton songId={song.id} /> */}
        </div>
      ))}
    </div>
  );
}

export default SearchContent;