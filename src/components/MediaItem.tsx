"use client"

import { twMerge } from "tailwind-merge";
import { BiMusic } from "react-icons/bi";

import { FileNode } from "@/types"

import usePlayer from "@/hooks/usePlayer";

interface MediaItemProps {
    data: FileNode;
    onClick?: (data: FileNode) => void;
    className?: string
}

const MediaItem: React.FC<MediaItemProps> = ({
  data,
  onClick, 
  className
}) => {

  const player = usePlayer()

  function isObject(obj: any): obj is Record<string, any> {
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
  }

  function hasAuthor(obj: any): obj is { author: string } {
    return isObject(obj) && !Array.isArray(obj.author) && typeof obj.author === 'string';
  }
  
  const handleClick = () => {
    if (onClick) {
      return onClick(data);
    }
    return player.setId(data.id)
  }

  return (
    <div
      onClick={handleClick}
      className={twMerge(`
        flex
        items-center
        gap-x-3
        cursor-pointer
        w-full
        p-2
        rounded-md
      `, 
        className
      )}
    >
      <div
        className="
          flex
          relative
          rounded-md
          min-h-[48px]
          min-w-[48]
          items-center
          justify-center
          overflow-hidden
          hover:bg-neutral-700/30
        "
      >
        <BiMusic 
          className="
            text-neutral-300/80
          "
          size={26}
        />
      </div>
      <div 
        className="
          flex
          flex-col
          gap-y-1
          overflow-hidden
        "
      >
        <p className="text-white/90 truncate">
          {data.name}
        </p>
        <p className="text-neutral-300/80 text-sm truncate">
          {hasAuthor(data.detail) ? data.detail.author : ""}
        </p>
      </div>  
    </div>
  )
}

export default MediaItem;