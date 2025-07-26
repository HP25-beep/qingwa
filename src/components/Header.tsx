import { twMerge } from "tailwind-merge";

// import { useSupabaseClient } from "@supabase/auth-helpers-react";
// import { FaUserAlt } from "react-icons/fa";
// import toast from "react-hot-toast";

// import useAuthModal from "@/hooks/useAuthModal";
// import { useUser } from "@/hooks/useUser";

// import Button from "./Button";
// import usePlayer from "@/hooks/usePlayer";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  children,
  className
}) => {

  return (
    <div
      className={twMerge(`
        h-fit
        bg-gradient-to-b
        p-6
      `,
        className
      )}  
    >
      {children}
    </div>
  )
}

export default Header;