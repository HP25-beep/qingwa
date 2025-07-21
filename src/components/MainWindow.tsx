// import { Song } from "@/types";

import Box from "./Box";
import Library from "./library/Library";
import MainWindowWrapper from "./MainWindowWrapper";

interface MainWindowProps {
  children: React.ReactNode;
};

const MainWindow: React.FC<MainWindowProps> = ({
  children, 
}) => {

  return (
    <MainWindowWrapper>
      {/* <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[280px] p-2">
        <Box 
          className="overflow-y-auto h-full">
          <Library/>
        </Box>  
      </div> */}

      <main className="h-full flex-1 overflow-y-auto py-2">
        {children}
      </main>
    </MainWindowWrapper>
  );
}

export default MainWindow;