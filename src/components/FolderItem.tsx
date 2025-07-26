import Image from "next/image"
import { BiFolder } from "react-icons/bi";

import { FileNode } from "@/types";

import useLoadImage from "@/hooks/useLoadImage";
import { twMerge } from "tailwind-merge";

interface FolderItemProps {
  data: FileNode;
  onClick: (data: FileNode) => any;
  className?: string
}

const FolderItem: React.FC<FolderItemProps> = ({
  data, 
  onClick,
  className
}) => {
  const imageUrl = useLoadImage(data)

  return (
    <div
      onClick={() => {onClick(data)}}
      className={twMerge(`
        flex
        items-center
        gap-x-3
        cursor-pointer
        hover:bg-neutral-800/50
        w-full
        p-2
        rounded-md
        overflow-ellipsis
      `, 
        className
      )}
    >
      <div
        className="
          relative
          rounded-md
          min-h-[48px]
          min-w-[48px]
          overflow-hidden
        "
      >
        { !imageUrl ? <BiFolder /> : 
        <Image
          fill
          src={imageUrl}
          alt="Folder Item"
          className="object-cover"
          sizes="26"
        /> }
      </div>
      <div 
        className="
          flex
          flex-col
          gap-y-1
          max-w-[120]
          overflow-hidden
        "
      >
        <p className="text-white truncate">
          {data.name}
        </p>
        <p className="text-neutral-400 text-sm truncate">
          created by: in developing...
        </p>
      </div>  
    </div>
  )
}

export default FolderItem;