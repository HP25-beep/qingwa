"use client";

import qs from "query-string";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { BiSearch } from "react-icons/bi";

import useDebounce from "@/hooks/useDebounce";

import Input from "../Input";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (debouncedValue === "") return;

    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: '/search',
      query: query
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div
      className="
        relative
        flex 
        items-center 
        bg-white/5 
        hover:bg-white/10 
        transition-colors
        rounded-full 
        px-4 
        py-2
        max-h-[45px]
        min-w-[180px] 
        max-w-[380px]
        w-full
      "
    >
      <BiSearch size={16} className="text-gray-400 mr-3" />
      <Input 
        placeholder="What do you want to listen to ?"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        
        className="
          bg-transparent 
          flex-1 
          outline-none 
          text-white/90 
          placeholder-gray-400 
          text-sm
        "
      />
    </div>
  );
}

export default SearchInput;