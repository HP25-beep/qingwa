import { useState } from "react";

const useUserFS = () => {
  const [parentId, setParentId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const updateParentId = (newValue: number | null) => {
    setIsLoading(true);
    setParentId(newValue);
    setIsLoading(false);
  };

  return { parentId, isLoading, updateParentId }
}

export default useUserFS;