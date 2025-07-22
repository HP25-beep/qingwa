"use client"

import { createContext, useContext, useEffect, useState } from "react";

import { FileNode } from "@/types"
import { useUser } from "./useUser";

type UserFSContextType = {
  nodePath: (FileNode | null)[];
  curChildNodes: FileNode[];
  isEmptyPath: () => boolean;
  getCurNode: () => (FileNode | null);
  pushPath: (node: FileNode) => any;
  popPath: () => (FileNode | null);
  isLoading: boolean;
  setIsLoading: (newState: boolean) => any;
  update: () => any;
}

export const UserFSContext = createContext<UserFSContextType | undefined>(undefined)

export const UserFSContextProvider = ({children}: {children: React.ReactNode}) => {

  const user = useUser();

  const [nodePath, setNodePath] = useState<(FileNode | null)[]>([null])
  const [curChildNodes, setCurChildNodes] = useState<FileNode[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [doUpdating, setDoUpdating] = useState(false)
  const isEmptyPath = (): boolean => {
    return nodePath.length === 1
  }
  const getCurNode = (): FileNode | null => {
    return nodePath[nodePath.length - 1]
  }
  const pushPath = (node: FileNode): void => {
    setNodePath((prev) => [...prev, node])
  }
  const popPath = (): FileNode | null => {
    const node = nodePath[nodePath.length - 1]
    setNodePath(prev => prev.slice(0, -1))
    return node
  }
  const update = () => {setDoUpdating(!doUpdating)}

  useEffect(() => {
    async function load() {
      if (!user) {
        setCurChildNodes([])
        setNodePath([null])
        return
      }
      try {
        const curParentNode = getCurNode()
        setIsLoading(true)
        const res = await fetch(`/api/files${curParentNode ? `?parent_id=${curParentNode.id}` : ''}`)
        if (!res.ok) {
          throw new Error(`Fetch failed with status ${res.status}`)
        }
        const data = await res.json()
        setIsLoading(false)
        setCurChildNodes(data)
      } catch {
        setCurChildNodes([])
      } 
    }
    load()
  }, [user, nodePath, doUpdating])

  return (
    <UserFSContext.Provider value = {{
        nodePath,
        curChildNodes,
        isEmptyPath,
        getCurNode,
        pushPath,
        popPath,
        isLoading,
        setIsLoading,
        update
    }}>
      {children}
    </UserFSContext.Provider>
  )
}

export const useUserFS = () => {
  const userFS = useContext(UserFSContext)
  if (!userFS) {
    throw new Error('useUserFS must be used within a UserFSProvider');
  }
  
  return userFS
}