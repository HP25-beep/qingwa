"use client"

import { BiMinus } from "react-icons/bi";
import React, { useEffect, useState } from "react";

import { FileNode } from "@/types";

// import { useDeleteSong } from "@/hooks/useDeleteSong";
import MediaItem from "../MediaItem";
import FolderItem from "../FolderItem";
import { useUserFS } from "@/hooks/useUserFS";

interface FileBlockProps {
  data: FileNode;
  onEditing: boolean;
  handler: {
    onOpenFolder: (data: FileNode) => any; 
    onOpenFile: (data: FileNode) => any; 
    onDeleteFolder: (id: number, path: string, type: number) => any;
    onDeleteFile: (id: number, path: string, type: number) => any;
  }
}

const FileBlock: React.FC<FileBlockProps> = ({
  data,
  onEditing,
  handler
}) => {
  const { 
    onOpenFolder, 
    onOpenFile,
    onDeleteFolder,
    onDeleteFile,
  } = handler;
  const { isLoading } = useUserFS();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // const handleDelete = async (data: FileNode) => {
  //   setIsDeleting(true)
  //   await fetch(`/api/files/${data.id}/${data.path}/${data.type}/delete-recursive`, {
  //     method: 'DELETE',
  //   })
  //   setIsDeleting(false)
  // }

  useEffect(() => {
    setIsEditing(onEditing);
  }, [onEditing]);

  // Handle File
  if (data.type === 1) {
    return (
      <div className="
        flex
        items-center
        gap-x-3
        cursor-pointer
        hover:bg-neutral-600/80
        w-full
        p-2
        rounded-md
      ">
        <MediaItem 
          onClick={(data: FileNode) => {onOpenFile(data)}}
          key={data.id}
          data={data}
          className="bg-transparent hover:bg-transparent p-0"
        />
        {isEditing && <button
          disabled={isDeleting}
          onClick={() => {
            setIsDeleting(true)
            onDeleteFile(data.id, data.path, data.type)
            setIsDeleting(false)
          }}
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

  // Handle Folder
  else if (data.type === 0) {
    return (
      <div className="
        flex
        items-center
        gap-x-3
        cursor-pointer
        hover:bg-neutral-600/80
        w-full
        p-2
        rounded-md
      ">
        <FolderItem 
          onClick={isLoading ? () => {} : 
            (data: FileNode) => {onOpenFolder(data)}
          }
          key={data.id}
          data={data}
          className="bg-transparent hover:bg-transparent p-0"
        />
        {isEditing && <button
          disabled={isDeleting}
          onClick={() => {
            setIsDeleting(true)
            onDeleteFolder(data.id, data.path, data.type)
            setIsDeleting(false)
          }}
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
}

export default FileBlock;