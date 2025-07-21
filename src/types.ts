export interface Song {
  id: string;
  user_id: string;
  author: string;
  title: string;
  song_path: string;
  image_path: string;
}

export interface FileNode {
  id: number
  created_at: string
  type: number
  parent_id: number
  target_id: number
  name: string
  owner_id: string
  file_type: string
  path: string
  detail: any
}

export interface UserDetails {
  id: string
  short_id: number
  full_name: string
  created_at: string
  avatar_url: string
  email: string
}