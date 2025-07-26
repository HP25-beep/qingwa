"use client"

import { IconType } from "react-icons"
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";

interface NavigationButtonProps {
  icon: IconType;
  href: string;
  active?: boolean;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  icon: Icon, 
  href, 
  active
}) => {

  return (
    <Button
      variant="outline" 
      size="icon"
      className={twMerge(`
        size-8
        rounded-full
      `,
        !active && "bg-secondary/80 text-neutral-400"
      )}
    >
      <a href={href}>
        <Icon size={22} />
      </a>
    </Button>
    // <Link
    //   href={href}
    //   className={twMerge(`
    //     flex
    //     items-center
    //     rounded-full
    //     gap-x-2
    //     text-sm
    //     font-medium
    //     cursor-medium
    //     cursor-pointer
    //     hover:text-white
    //     text-neutral-400
    //     bg-neutral-100/15
    //     transition
    //     p-1.5
    //   `,
    //     !active && "text-white"
    //   )}
    // >
    //   <Icon size={22} />
    // </Link>
  );
}

export default NavigationButton;