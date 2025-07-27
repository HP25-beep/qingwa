import Header from "@/components/Header";

import ExploreContent from "./components/ExploreContent";
import ExploreFileContent from "./components/ExploreFileContent";

export const revalidate = 0;

export default function Explore() {

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
            最新的播单
          </h1>
          <ExploreFileContent/>
        </div>
      </Header>
      <div className="mt-2 mb-7 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-neutral-300/80 text-2xl font-semibold">
            最新的音声
          </h1>
        </div>
        <ExploreContent/>
      </div>
    </div>
  );
}
