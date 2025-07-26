import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

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
      <ResizablePanelGroup       
        direction="horizontal"
        className="max-w-md rounded-lg md:min-w-full"
      >
        <ResizablePanel defaultSize={12}>
          <div className="
              flex
              md:flex 
              gap-y-0.5 
              h-full 
              w-full 
              px-0.5
            "
          >
            <Box className="overflow-y-auto h-full">
              <Library/>
            </Box> 
          </div>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={50}>
          <div className="
              flex
              md:flex 
              gap-y-0.5 
              h-full 
              w-full 
              px-0.5
            "
          >
            <Box className="overflow-y-auto h-full">
              <main>
                {children}
              </main> 
            </Box>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </MainWindowWrapper>
  );
}

export default MainWindow;