import Header from "@/components/Header";
import ListItem from "@/components/ListItem";

export const revalidate = 0;

export default async function Home() {

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
            欢迎回家
          </h1>
          {/* <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-3
              2xl:grid-cols-4
              gap-3
              mt-4
            "
          >
            <ListItem
              image="/images/liked.png"
              name="Liked Songs"
              href="liked"
            />
          </div> */}
        </div>
      </Header>
      
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">
            聊聊一些话
          </h1>
        </div>

        <div
          className="
            p-2
            bg-neutral-800/10
            rounded-2xl
            hover:bg-neutral-600/10
            backdrop-blur-sm
          "
        >
          <p className="p-4 text-white text-md">
            主页还没有想好放什么. 
          </p>
          <p className="p-4 text-white text-md">
            这里是一个音频播放器 (青蛙牌), 放了很多喜欢的切片在这里!
          </p>
          <p className="p-4 text-white text-md">
            feel free to use it and make this place your home.
          </p>
          <p className="p-4 text-white text-md">
            这里简陋得像要散架了一样, 时不时就会出故障, 但是欢迎所有人来玩.
          </p>
          <p className="p-4 text-white text-md">
            所有功能由 [ 我自己 ] 倾情维护中!
          </p>

        </div>
      </div>
    </div>
  );
}
