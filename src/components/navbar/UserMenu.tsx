"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import usePlayer from '@/hooks/usePlayer';
import toast from 'react-hot-toast';

import { useUser } from '@/hooks/useUser';
import Link from 'next/link';

// import Button from '../Button';
import { Button } from '../ui/button';
import { createClient } from '@/lib/supabase/client';
import useLoadAvatar from '@/hooks/useLoadAvatar';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UserMenu = () => {
  const supabase = createClient();
  // const supabaseClient = useSupabaseClient();
  const player = usePlayer();
  const router = useRouter();

  const { userDetails } = useUser()
  const userAvatar = useLoadAvatar(userDetails?.avatar_url ?? null)
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpen2, setIsMenuOpen2] = useState(false);

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
    setIsMenuOpen2(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(true);
    setIsMenuOpen2(true);
    
    setIsMenuOpen(false);
    const timer = setTimeout(() => {
      setIsMenuOpen2(false);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    
    player.reset();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged out!')
    }
  };

  return (
    <div 
      className="relative"
    >
      <Button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        variant={"outline"}
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
        <Avatar className='max-w-[110px] max-h-[110px]'>
          <AvatarImage className='max-w-[110px] max-h-[110px]' src={userAvatar}/>
          <AvatarFallback>
            AT
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium hidden text-black md:block">
          {userDetails?.full_name ?? "Username"}
        </span>
      </Button>
      
      {(isMenuOpen || isMenuOpen2) && (
        <div 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="
            absolute
            right-0 
            mt-2 
            w-48 
            transition-colors
            bg-neutral-300/10
            rounded-lg
            shadow-lg 
            border-0
            py-1
            backdrop-blur-sm
          "
        >
          <Link 
            href="/account" 
            className="
                block px-4 py-2 text-sm 
                text-black/60 
                hover:bg-neutral-300/30 
                hover:text-white 
                transition-colors
              "
            >
            Account
          </Link>
          <hr className="my-1 border-black/60" />
          <a 
            onClick={handleLogout}
            className="
                block px-4 py-2 text-sm 
                text-black/60 
                hover:bg-neutral-300/30 
                hover:text-white 
                transition-colors
              "
          >
            Logout
          </a>
        </div>
      )}
    </div>
  )
}

export default UserMenu;