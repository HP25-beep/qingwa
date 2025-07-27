"use client"

import { IconType } from "react-icons"
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";
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
    <Link href={href} passHref>
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
        <Icon size={22} />
      </Button>
    </Link>
  );
}

export default NavigationButton;