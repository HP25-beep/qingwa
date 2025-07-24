import { db } from "@/db"

import { FileNode } from "@/types"

export const addToplayAudio = async (FileNodeObj: FileNode) => {
  try {
    const result = await db.toplayAudio.add(FileNodeObj)
  } catch(error) {
    console.log(`Failed to add: ${error}`)
  }
}

// ??
export const getToplayAudio = async (id: number | undefined) => {
  try {
    if (!id) { return null }
    const result = await db.toplayAudio
      .where('id')
      .equals(id)
      .toArray()
    return result[0]
  } catch(error) {
    console.log(`Failed to add: ${error}`)
  }
}