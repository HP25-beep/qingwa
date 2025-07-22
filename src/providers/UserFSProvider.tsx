"use client"

import { UserFSContextProvider } from "@/hooks/useUserFS"

interface UserFSProviderProps {
  children: React.ReactNode
}

const UserFSProvider: React.FC<UserFSProviderProps> = ({
  children
}) => {
  return (
    <UserFSContextProvider>
      {children}
    </UserFSContextProvider>
  ) 
}

export default UserFSProvider;