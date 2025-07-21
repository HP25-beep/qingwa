"use client";

import { BiMinus, BiPlus, BiSolidPlaylist, BiUpArrowAlt } from "react-icons/bi";
import { useEffect, useState } from "react";

import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import useUserFS from "@/hooks/useUserFS";
import useOnPlay from "@/hooks/useOnPlay";

import { FileNode } from "@/types";

import FileBlock from "./FileBlock";
import Box from "../Box";
import getSongsByUserId from "@/actions/getNodesByUserId";
import { createClient } from "@/lib/supabase/client";

interface LibraryProps {
}

const Library: React.FC<LibraryProps> = ({
}) => {
  const uploadModal = useUploadModal()
  const { user } = useUser()
  const supabase = createClient()
  const { parentId: currentParentId, updateParentId } = useUserFS()
  
  // const songs = await getSongsByUserId();
  
  // const onPlay = useOnPlay(songs);
  
  const [stack, setStack] = useState<(number | null)[]>([null]) // 初始为 root (null)
  const [nodes, setNodes] = useState<FileNode[]>([])

  useEffect( () => {
    updateParentId(stack[stack.length - 1]) // 当前查看的目录 ID
  }, [stack])

  // 读取当前目录下的文件和文件夹
  useEffect(() => {
    async function load() {
      if (user) {
        setNodes([])
        return
      }
      // const res = await fetch(`/api/files?parent_id=${currentParentId ?? ''}`)
      const res = await fetch(`/api/files${currentParentId ? `?parent_id=${currentParentId}` : ''}`)
      const data = await res.json()
      setNodes(data)
    }

    load()
  }, [currentParentId])

  // 进入子目录
  const enter = (folderId: number) => {
    setStack(prev => [...prev, folderId])
  }

  // 返回上一级
  const back = () => {
    if (stack.length > 1) {
      setStack(prev => prev.slice(0, -1))
    }
  }

  const [isEditing, setIsEditing] = useState(false)
  
  const onClick = () => {    
    return uploadModal.onOpen()
  };

  return (
    user && 
    (
      <div className="flex flex-col">
        <div
          className="
            flex
            items-center
            justify-between
            px-5
            pt-4
          "
        >
          <div className="
              inline-flex
              items-center
              gap-x-2
            "
          >
            <BiSolidPlaylist className="text-neutral-400" size={26}/>
            <p 
              className="
                text-neutral-400
                font-medium
                text-md
              "
            >
              Your Library
            </p>
          </div>
          <div className="grid grid-cols-3 space-x-1">
          
          <BiUpArrowAlt 
            onClick={currentParentId ? back : (() => {})}
            size={20}
            className="
              text-neutral-400
              cursor-pointer
              hover:text-white
              transition
            "
          />

          <BiMinus
            onClick={() => setIsEditing(!isEditing)}
            size={20}
            className="
              text-neutral-400
              cursor-pointer
              hover:text-white
              transition
            "
          />

          <BiPlus 
            onClick={onClick}
            size={20}
            className="
              text-neutral-400
              cursor-pointer
              hover:text-white
              transition
            "
          />

          </div>
        </div>
        <div className="
            flex
            flex-col
            gap-y-2
            mt-4
            px-3
        ">
          Library
          {/* {songs.map((item) => (
            <FileBlock 
              key={item.id}
              data={item}
              onEditing={isEditing}
              onOpen={onPlay}
            />
          ))} */}
        </div>
      </div>
    )
  );
}

export default Library;