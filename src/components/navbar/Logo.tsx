import React from "react";

const Logo: React.FC = () => {
  return(
    <a className="group flex items-center">
      <div 
        className="
          w-6 
          h-px 
          bg-pink-200
          mr-2 
          group-hover:w-8 
          transition-all 
          duration-300
        "
      />
      <span 
        className="
          text-lg 
          font-medium 
          uppercase 
          tracking-widest">
            LOVE Li
      </span>
    </a>
  )
}

export default Logo;