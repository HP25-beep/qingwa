"use client";

import { RiDiscLine } from "react-icons/ri";
import { FileNode } from "@/types"

import PlayButton from "./PlayButton";

interface SongItemProps {
  onClick: (id: number) => void;
  data: FileNode
}

const SongItem: React.FC<SongItemProps> = ({
  data, 
  onClick
}) => {
  // const imagePath = useLoadImage(data);
  
  function isObject(obj: unknown): obj is Record<string, unknown> {
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
  }

  function hasAuthor(obj: unknown): obj is { author: string } {
    return isObject(obj) && !Array.isArray(obj.author) && typeof obj.author === 'string';
  }
  
  return (
    <div
    onClick={() => onClick(data.id)}
      className="
        relative
        group
        flex
        flex-col
        items-center
        justify-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-white/0
        cursor-pointer
        hover:bg-neutral-400/80
        transition
        p-3
      "
    >
      <div
        className="
        flex
        relative
        aspect-square
        w-full
        h-full
        items-center
        justify-center
        rounded-md
        overflow-hidden
      "
      >
        <div
          className="
            flex
            bg-neutral-600/80
            rounded-2xl
            w-[80%]
            h-[80%]
            items-center
            justify-center
          "
        >          
          <RiDiscLine 
            className="
              items-center
              justify-center
              text-neutral-300/80
            "
            size={64}
          />
        </div>
        {/* <Image
          className="object-cover"
          src={imagePath || '/images/liked.png'}
          fill 
          alt="Image"
        /> */}
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold text-white/90 truncatee w-full">
          {data.name}
        </p>
        <p
          className="
            text-neutral-300/80
            text-sm
            pb-4
            w-full
          "
        >
          {hasAuthor(data.detail) ? data.detail.author : ""}
        </p>
      </div>
      <div className="
          absolute
          bottom-24
          right-5
        "
      >
        <PlayButton />
      </div>
    </div>
  );
}

export default SongItem;