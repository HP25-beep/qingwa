"use client"

import { usePathname, useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { BiHomeAlt2, BiCompass } from 'react-icons/bi';
import LoginButton from './LoginButton';

import { useUser } from '@/hooks/useUser';
// import useAuthModal from '@/hooks/useAuthModal';

import SearchInput from './SearchInput';
import NavigationButton from './NavigationButton';
import UserMenu from './UserMenu';
import Button from '../Button';
import Logo from './Logo';

const Navbar: React.FC = () => {

  const pathname = usePathname();
  const router = useRouter();
  
  // const AuthModal = useAuthModal();
  const { user } = useUser();

  const routes = useMemo(() => 
      {
        return {
          home: {
            icon: BiHomeAlt2,
            label: 'Explore', 
            active: pathname !== '/', 
            href: '/',
          },
          explore: {
            icon: BiCompass,
            label: 'Search',
            active: pathname !== '/explore', 
            href: '/explore', 
          }
        }
    }, [pathname]);

  return (
    <nav 
      className="
        sticky 
        flex
        bg-black
        backdrop-blur-md 
        text-white 
        px-6 
        pt-2
        items-center 
        justify-center 
        top-0 
        border-gray-800/50
        z-10
      "
    >
      {/* Left Section - Site Icon */}
      <div className='flex-1 w-1/4'>
        <Logo />
      </div>
  
      {/* Middle Section - Navigation Controls and Explores */}
      <div className="flex-1 w-1/2 flex items-center space-x-4">
        
        <div className="
          hidden
          md:flex
          gap-x-2
          items-center
          justify-center
        ">
          <Button
            onClick={() => router.back()}
            className="
              rounded-full
              bg-black
              flex
              items-center
              justify-center
              hover:opacity-75
              transition
            "
          >
            <RxCaretLeft className="text-neutral-400" size={24}/>
          </Button>
          <Button
          onClick={() => router.forward()}
            className="
              rounded-full
              bg-black
              flex
              items-center
              justify-center
              hover:opacity-75
              transition
            "
          >
            <RxCaretRight className="text-neutral-400" size={24}/>
          </Button>
        </div>
        
        <NavigationButton 
          {...routes.home}
        />
        
        <SearchInput />

        <NavigationButton 
          {...routes.explore}
        />
        
      </div>

      {/* Right Section - Account Controls */}
      <div className='flex-1 w-1/4'>
        {user ? (
          <UserMenu />
        ) : (
          <LoginButton />
        )}
      </div>

    </nav>
  );

}

export default Navbar;