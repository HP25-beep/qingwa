import getFilesBySlug from '@/lib/db/getFilesBySlug'

import { FileNode } from '@/types'

import FileBlock from '@/components/library/FileBlock'
import FileExploreContent from './components/FileExploreContent'

export default async function fileExplore({ params }: { params: { slug: string } }) {
  
  const sslug = parseInt(params.slug)
  if (!sslug) {
    return (
      <div>
        slug is null
      </div>
    )
  }

  const files = await getFilesBySlug(sslug)
  // const res = await fetch(`fileExplore/${sslug}/details`)
  // if (!res.ok) {
  //   return (
  //     <div>
  //       something went wrong
  //     </div>
  //   )
  // } 
  // const files = await res.json()

  if (!files) {
    return (
      <div className='text-white'>
        null!
      </div>
    )
  }


  return (
    <div
      className="
        bg-neutral-900
        rounded-lg
        h-full
        overflow-hidden
        overflow-y-auto
      "
    >    
      <FileExploreContent
        files={files}
      />
    </div>
  )
}
