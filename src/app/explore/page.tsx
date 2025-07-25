import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";

import ExploreFileContent from "./components/ExploreFileContent";
// import { createClient } from "@/lib/supabase/client";

export const revalidate = 0;

export default function Explore() {

  return (
    <div className="
        bg-neutral-900
        rounded-lg
        h-full
        w-full
        overflow-hidden
        overflow-y-auto
      "
    >
      <Header>
        <div className="mb-2">
          <h1
            className="
              text-white
              text-3xl
              font-semibold
            "
          >
            最新的播单
          </h1>
          <ExploreFileContent/>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">
            最新的音声
          </h1>
        </div>
        {/* <ExploreContent songs={songs} /> */}
      </div>
    </div>
  );
}
