import Header from "@/components/Header"
import SearchContent from "./components/SearchContent"
import getMediasByName from "@/lib/db/getMediasByName"

interface SearchProps {
  searchParams: Promise<{
    title: string
  }>
};

export const revalidate = 0

const Search = async ({ searchParams }: SearchProps) => {

  const { title } = await searchParams

  const data = await getMediasByName(title)

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
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">
            Search
          </h1>
        </div>
      </Header>
      <SearchContent audios={data} />
    </div>
  )
}

export default Search