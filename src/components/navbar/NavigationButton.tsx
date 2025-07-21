"use client"

import { IconType } from "react-icons"
import { twMerge } from "tailwind-merge";
import Link from "next/link";

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
    <Link
      href={href}
      className={twMerge(`
        flex
        items-center
        rounded-full
        gap-x-2
        text-sm
        font-medium
        cursor-medium
        cursor-pointer
        hover:text-white
        text-neutral-400
        bg-neutral-100/15
        transition
        p-1.5
      `,
        !active && "text-white"
      )}
    >
      <Icon size={22} />
    </Link>
  );
}

export default NavigationButton;