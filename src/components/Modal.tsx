import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children
}) => {
  return (
    <Dialog.Root
      open={isOpen}
      defaultOpen={isOpen}
      onOpenChange={onChange}
    >
      <Dialog.Portal>
        <Dialog.Overlay 
          className={`
            bg-neutral-700/20
            backdrop-blur-xs
            fixed
            inset-0
            z-100
          `}
        />
        <Dialog.Content
          className={`
            fixed
            drop-shadow-md
            top-[50%]
            left-[50%]
            max-h-full
            h-full
            md:h-auto
            md:max-h-[85vh]
            w-full
            md:w-[90vw]
            md:max-w-[450px]
            translate-x-[-50%]
            translate-y-[-50%]
            rounded-md
            bg-neutral-600/50
            p-[25px]
            focus:outline-none
            z-110
          `}
        > 
          <Dialog.Title
            className="
              text-xl
              text-center
              font-bold
              text-white/90
              mb-4
            "
          >
            {title}
          </Dialog.Title>
          <Dialog.Description
            className="
              mb-5
              text-sm
              text-neutral-300/80
              leading-normal
              text-center
            "
          >
            {description}
          </Dialog.Description>
          <div>
            {children}
          </div>
          <Dialog.Close asChild>
            <button
              className="
                text-neutral-400
                hover:text-white
                absolute
                top-[10px]
                right-[10px]
                inline-flex
                h-[25px]
                w-[25px]
                appearance-none
                items-center
                justify-center
                rounded-full
                focus:outline-none
              "
            >
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Modal;