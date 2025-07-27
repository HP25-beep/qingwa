import getFilesBySlug from '@/lib/db/getFilesBySlug'

import FileExploreContent from './components/FileExploreContent'
import Header from '@/components/Header'

export default async function fileExplore({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const sslug = parseInt(slug)
  if (!sslug) {
    return (
      <div>
        slug is null
      </div>
    )
  }

  const files = await getFilesBySlug(sslug)

  if (!files) {
    return (
      <div className='text-neutral-300/80'>
        null!
      </div>
    )
  }


  return (
    <div> 
      <Header>
        <div className="mb-2">
          <h1
            className="
              text-neutral-300/80
              text-3xl
              font-semibold
            "
          >
            查看播单
          </h1>
        </div>
      </Header>
      <FileExploreContent
        files={files}
      />
    </div>
  )
}
