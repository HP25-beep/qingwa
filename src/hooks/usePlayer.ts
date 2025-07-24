import { create } from "zustand";

interface PlayerStore {
  ids: number[];
  activeId?: number;
  setId: (id: number) => void;
  setIds: (ids: number[]) => void;
  reset: () => void;
  isDirty: boolean;
  setIsDirty: (newState: boolean) => void;
};

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  setId: (id: number) => set({ activeId: id }),
  setIds: (ids: number[]) => set({ ids: ids }), 
  reset: () => set({ ids: [], activeId: undefined }),
  isDirty: false,
  setIsDirty: (newState: boolean) => set({ isDirty: newState }), 
}));

export default usePlayer;
