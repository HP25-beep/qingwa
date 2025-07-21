"use client"

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface AccountWrapperProps {
  children: React.ReactNode
}

const AccountWrapper: React.FC<AccountWrapperProps> = ({
  children
}) => {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (!user) {
      router.replace('/');
      toast.error("You have not logged in.");
    }
  }, [user, router]);

  return (
    <>
      {children}
    </>
  );
}

export default AccountWrapper;