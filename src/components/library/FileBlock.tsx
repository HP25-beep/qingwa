"use client"

import { BiMinus } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useDeleteSong } from "@/hooks/useDeleteSong";
import { Song } from "@/types";
import MediaItem from "../MediaItem";

interface FileBlockProps {
  data: Song;
  onEditing: boolean;
  onOpen: (id: string) => any;
}

const FileBlock: React.FC<FileBlockProps> = ({
  data,
  onEditing,
  onOpen
}) => {
  const router = useRouter();

  const { deleteSong } = useDeleteSong();

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (data: Song) => {
    setIsDeleting(true);
    const idToDelete = Number(data.id);
    const result = await deleteSong({ id: idToDelete });
    if (result.success) {
      console.log("Delete Successfully");
      toast.success("Delete Successfully");
    } else {
      console.error("删除失败:", result.error || result.warning);
      toast.error("Fail to delete");
    }
    
    router.refresh();
    setIsDeleting(false);
  };

  useEffect(() => {
    if (onEditing) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [onEditing]);


  return (
    <div className="
      flex
      items-center
      gap-x-3
      cursor-pointer
      hover:bg-neutral-800/50
      w-full
      p-2
      rounded-md
    ">
      <MediaItem 
        onClick={(id: string) => {onOpen(id)}}
        key={data.id}
        data={data}
        className="bg-transparent hover:bg-transparent p-0"
      />
      {isEditing && <button
        disabled={isDeleting}
        onClick={() => handleDelete(data)}
        className="
          flex
          h-10
          w-6.5
          rounded-md
          text-neutral-400
          hover:bg-amber-200/20
          hover:text-white
          transition-colors
          items-center
          justify-center
          cursor-pointer
        "
      >
        <BiMinus
          className="
            transition
          "
        />
      </button>}
    </div>
  )
}

export default FileBlock;