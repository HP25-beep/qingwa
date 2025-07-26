"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { BiMusic, BiSolidDisc } from "react-icons/bi";
import { RiDiscLine } from "react-icons/ri";
import { FileNode, Song } from "@/types"
import Image from "next/image";

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
  
  function isObject(obj: any): obj is Record<string, any> {
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
  }

  function hasAuthor(obj: any): obj is { author: string } {
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
        bg-neutral-400/5
        cursor-pointer
        hover:bg-neutral-400/10
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
        <RiDiscLine 
          className="
            items-center
            justify-center
            text-neutral-400
          "
          size={64}
        />
        {/* <Image
          className="object-cover"
          src={imagePath || '/images/liked.png'}
          fill 
          alt="Image"
        /> */}
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncatee w-full">
          {data.name}
        </p>
        <p
          className="
            text-neutral-400
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