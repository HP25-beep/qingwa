"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

import usePlayer from "@/hooks/usePlayer";

const MainWindowWrapper = ({ children }: { children: React.ReactNode }) => {
  const player = usePlayer();
  // const isPlayerActive = player.activeId !== null;

  return (
    <div className={twMerge(`
      relative
      flex
      h-[calc(100%-50px)]
    `, 
      player.activeId && "h-[calc(100%-50px-75px)]"
    )}>
      {children}
    </div>
  );
};

export default MainWindowWrapper;
