import Dexie, { type EntityTable } from 'dexie'

import { FileNode } from './types'

const db = new Dexie('PlaylistDatabase') as Dexie & {
  toplayAudio: EntityTable<
    FileNode,
    'id'  // primary key
  >
}

db.version(1).stores({
  toplayAudio: 'id, created_at, type, parent_id, target_id, name, owner_id, file_type, path, detail'
})

export {db}

