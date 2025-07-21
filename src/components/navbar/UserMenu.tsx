"use client";

import { useState } from 'react';

import { BiSolidUser } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
// import { useSupabaseClient } from '@supabase/auth-helpers-react';
import toast from 'react-hot-toast';

import usePlayer from '@/hooks/usePlayer';
import { useUser } from '@/hooks/useUser';

import Button from '../Button';
import { createClient } from '@/lib/supabase/client';

const UserMenu = () => {
  const supabase = createClient();
  // const supabaseClient = useSupabaseClient();
  const player = usePlayer();
  const router = useRouter();

  const user = useUser();
  
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
        className="
          flex 
          items-center 
          space-x-2 
          bg-white/5 
          hover:bg-neutral-800/90
          transition-colors
          rounded-full 
          max-w-[150px]
          min-w-[80px]
          px-2 
          py-1 
          ml-auto  <!-- 关键：靠右对齐 -->
          overflow-hidden
          backdrop-blur-sm <!-- 可选：轻微毛玻璃效果 -->
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
        <span className="text-sm font-medium hidden text-white md:block">
          {user.userDetails?.full_name || "Username"}
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
            bg-neutral-800/90
            rounded-lg
            shadow-lg 
            border-0
            py-1
            backdrop-blur-sm
          "
        >
          <a 
            href="/account" 
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-neutral-700/90 hover:text-white transition-colors">
            Account
          </a>
          <hr className="my-1 border-neutral-600/50" />
          <a 
            onClick={handleLogout}
            className="
              block 
              px-4 
              py-2 
              text-sm 
              text-gray-300 
              hover:bg-neutral-700/90 
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