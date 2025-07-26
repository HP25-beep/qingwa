import { useRouter } from "next/navigation";
import { BiSolidUser } from "react-icons/bi";

// import Button from "../Button";
import { Button } from "../ui/button";

const LoginButton = () => {
  
  const router = useRouter();

  const onClick = () => {
    router.push('/auth/login');
  }

  return (
    <Button
      onClick={onClick}
      className="
        flex 
        items-center 
        space-x-2 
        bg-white/5 
        hover:bg-white/10 
        transition-colors
        rounded-full 
        max-w-[150px]
        min-w-[0px]
        px-2 
        py-1 
        ml-auto  <!-- 关键：靠右对齐 -->
        overflow-hidden
        hover:border-white/10
        backdrop-blur-sm
      "
    >
      <div className="
          flex 
          w-8 
          h-8 
          items-center 
          rounded-full 
          bg-gradient-to-br 
          from-emerald-800  
          to-pink-300
          justify-center
        "
      >
        <BiSolidUser size={16} />
      </div>
      <span className="text-white">Log in</span>
    </Button>
  )
}

export default LoginButton;