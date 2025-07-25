'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { FileNode } from "@/types"
import FolderItem from "@/components/FolderItem"

const ExploreFileContent = () => {

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [newFolders, setNewFolders] = useState<FileNode[]>([])

  useEffect(() => {
    const fetchFolders = async () => {
      const res = await fetch("/api/explore/newFolder")
      if (!res.ok) {
        throw new Error("something went wrong")
      }
      const data = await res.json()

      setNewFolders(data.error? [] : data)
      setIsLoading(false)
    }
    fetchFolders()
  }, [])

  const handleClick = (data: FileNode) => {
    router.replace(`/fileExplore/${data.id}`)
  }


  return (
    <div
      className="
        grid
        grid-rows-2
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-4
        gap-3
        mt-4
      "
    >
      {newFolders.map((item) => { return (
        <FolderItem 
          data={item}
          key={item.id}
          onClick={handleClick}
        />
      )})}
      {/* <ListItem
        image="/images/liked.png"
        name="Liked Songs"
        href="liked"
      /> */}
    </div>

  )
}

export default ExploreFileContent