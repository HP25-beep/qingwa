'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import type { UserDetails } from '@/types';

type UserContextType = {
  user: User | null;
  accessToken: string | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({ children }: { children: React.ReactNode }) {

  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      setIsLoading(true);
      
      const { data: { session }, error } = await supabase.auth.getSession();
      if (session?.user) {

        setUser(session.user);
        setAccessToken(session.access_token);
        const res = await fetch('/api/user'); 
        const json = await res.json();
        setUserDetails(json.userDetails);

      } else {

        setUser(null);
        setAccessToken(null);
        setUserDetails(null);

      }

      setIsLoading(false);
    };

    getSession();

    // optional: subscribe to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      getSession();
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, accessToken, userDetails, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}