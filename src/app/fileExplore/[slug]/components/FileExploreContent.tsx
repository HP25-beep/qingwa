"use client"

import { useRouter } from "next/navigation"

import { FileNode } from "@/types"

import useOnPlay from '@/hooks/useOnPlay'
import FileBlock from "@/components/library/FileBlock"

interface FileExploreContentProps {
  files: FileNode[]
}

const FileExploreContent: React.FC<FileExploreContentProps> = ({
  files
}) => {
  const router = useRouter()

  const getAudiosInNodes = (curChildNodes: FileNode[]) => {
    const temp: FileNode[] = []
    curChildNodes.forEach((v) => {
      if (v.type === 1) {
        temp.push(v)
    }})
    return temp
  }

  const audios = getAudiosInNodes(files)
  const onPlay = useOnPlay(audios)
  
  const enterFolder = (data: FileNode) => {
    router.push(`/fileExplore/${data.id}`)
  }

  const enterFile = (data: FileNode) => {
    onPlay(data.id)
  }

  return (
    <div className="flex flex-col gap-y-2 w-full">   
      {files.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-x-4 w-full"  
        >
          <FileBlock 
            key={item.id}
            data={item}
            onEditing={false}
            handler={{
              onOpenFolder: enterFolder, 
              onOpenFile: enterFile, 
              onDeleteFolder: () => {},
              onDeleteFile: () => {},
            }}
          />
        </div>
      ))}
    </div>
  )
} 

export default FileExploreContent