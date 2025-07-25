import { FileNode } from "@/types"

import usePlayer from "./usePlayer"
import { useUser } from "./useUser"
import { useRouter } from "next/navigation"
// import useAuthModal from "./useAuthModal";
// import { useUser } from "./useUser";

const useOnPlay = (songs: FileNode[]) => {
    const player = usePlayer()
    const { user } = useUser()
    // const authModal = useAuthModal();
    // const { user } = useUser();
    const router = useRouter()

    const onPlay = (id: number) => {
      if (!user) {
        return router.replace("/auth/login")
      }

      player.setId(id)
      player.setIds(songs.map((song) => song.id))
    }
    return onPlay
}

export default useOnPlay