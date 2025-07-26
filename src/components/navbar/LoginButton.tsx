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
      variant="outline"
      className="
        flex 
        items-center 
        space-x-1 
        rounded-full 
        h-8
        max-w-[150px]
        min-w-[0px]
        ml-auto
        overflow-hidden
      "
    >
      <div className="
          flex 
          w-6 
          h-6 
          items-center 
          rounded-full 
          bg-gradient-to-br 
          from-emerald-600
          via-pink-200
          to-white
          duration-75
          justify-center
        "
      >
        <BiSolidUser size={12} />
      </div>
      <span className="text-black">Log in</span>
    </Button>
  )
}

export default LoginButton;