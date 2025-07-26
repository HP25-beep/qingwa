import Header from "@/components/Header";

export const revalidate = 0;

export default async function Home() {

  return (
    <div className="
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
              text-neutral-300/80
              text-3xl
              font-semibold
            "
          >
            Welcome Back
          </h1>
        </div>
      </Header>
      
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-neutral-300/80 text-2xl font-semibold">
            首页
          </h1>
        </div>

        <div
          className="
            p-2
            rounded-2xl
            text-white/90
          "
        >
          <p className="p-4 text-md">
            首页还没有想好放什么. 
          </p>
          <p className="p-4 text-md">
            这里是一个音频播放器 (青蛙牌), 放了很多喜欢的切片在这里!
          </p>
          <p className="p-4 text-md">
            feel free to use it and make this place your home.
          </p>
          <p className="p-4 text-md">
            这里简陋得像要散架了一样, 时不时就会出故障, 但是欢迎所有人来玩.
          </p>
          <p className="p-4 text-md">
            所有功能由 [ 我自己 ] 倾情维护中!
          </p>

        </div>
      </div>
    </div>
  );
}
