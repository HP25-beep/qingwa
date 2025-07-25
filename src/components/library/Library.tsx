"use client";

import { BiMinus, BiPlus, BiSolidPlaylist, BiUpArrowAlt } from "react-icons/bi";
import { useState } from "react";
import toast from "react-hot-toast";

import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { useUserFS } from "@/hooks/useUserFS";
import usePlayer from "@/hooks/usePlayer";
// import useOnPlay from "@/hooks/useOnPlay";

import { FileNode } from "@/types";

import FileBlock from "./FileBlock";
import Box from "../Box";
// import getSongsByUserId from "@/actions/getNodesByUserId";
import { createClient } from "@/lib/supabase/client";
import { addToplayAudio } from "@/actions/toplayAudioFunc";

const Library = () => {
  const { user } = useUser()
  const uploadModal = useUploadModal()
  const player = usePlayer()
  const { 
    curChildNodes,
    isEmptyPath,
    pushPath,
    popPath,
    update
  } = useUserFS()
  
  // const songs = await getSongsByUserId();
  // const onPlay = useOnPlay(songs);

  const [isEditing, setIsEditing] = useState(false)

  // 返回上一级
  const back = () => {
    if (!isEmptyPath()) {
      popPath()
    }
  }

  // 进入子目录
  const enterFoler = (data: FileNode) => {
    pushPath(data)
  }

  // 进入文件
  const enterFile = (data: FileNode) => {
    const curId = player.ids.findIndex((id) => id === data.id)
    if (curId) {
      player.setId(curId)
    } else {
      let curAudio: FileNode[] = []
      curChildNodes.forEach((node) => {if (node.type === 1) {
        curAudio.push(node)
      }})

      curAudio.forEach((node) => addToplayAudio(node))
      player.setId(curId)
      player.setIds(Array.from({length: curAudio.length}, (_, i) => curAudio[i].id))
    }
  }

  // 删除子目录
  const deleteFolder = async (id: number, path: string, type: number) => {
    try {
      const res = await fetch(
        `api/files/${id}/${path}/${type}/delete-recursive`, {
        method: 'DELETE',
      })
      const result = await res.json()
      if (!res.ok) {
        throw new Error('fail to analyse response')
      }
      const error = result.error
      if (error) {
        toast.error("Fail to delete file")
      }
      toast.success("Delete successfully")
    } catch {
      toast.error("fail to delete file")
    } finally {
      update()
    }
  }

  // 删除文件
  const deleteFile = async (id: number, path: string, type: number) => {
    try {
      const res = await fetch(
        `api/files/${id}/${path}/${type}/delete-recursive`, {
        method: 'DELETE',
      })
      const result = await res.json()
      if (!res.ok) {
        throw new Error('fail to analyse response')
      }
      const error = result.error
      if (error) {
        toast.error("Fail to delete file")
      }
      toast.success("Delete successfully")
    } catch {
      toast.error("fail to delete file")
    } finally {
      update()
    }
  }

  // 打开上传文件模块
  const onUpload = () => {
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
            onClick={!isEmptyPath() ? back : (() => {})}
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
            onClick={onUpload}
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
          {curChildNodes.map((item) => { return (
              <FileBlock 
                key={item.id}
                data={item}
                onEditing={isEditing}
                handler={{
                  onOpenFolder: enterFoler, 
                  onOpenFile: enterFile, 
                  onDeleteFolder: deleteFolder,
                  onDeleteFile: deleteFile,
                }}
              />
            )}
          )}
        </div>
      </div>
    )
  );
}

export default Library;