import { create } from 'zustand';
import { FileNode } from '@/types';

interface UserFSState {
  nodePath: (FileNode | null)[];
  curChildNodes: FileNode[];
  isLoading: boolean;
  doUpdating: boolean;

  isEmptyPath: () => boolean;
  getCurNode: () => FileNode | null;
  pushPath: (node: FileNode) => void;
  popPath: () => FileNode | null;
  setIsLoading: (state: boolean) => void;
  setCurChildNodes: (nodes: FileNode[]) => void;
  update: () => void;
  reset: () => void;
}

export const useUserFS = create<UserFSState>((set, get) => ({
  nodePath: [null],
  curChildNodes: [],
  isLoading: true,
  doUpdating: false,

  isEmptyPath: () => get().nodePath.length === 1,

  getCurNode: () => {
    const path = get().nodePath;
    return path[path.length - 1] ?? null;
  },

  pushPath: (node) => {
    set((state) => ({
      nodePath: [...state.nodePath, node],
    }));
  },

  popPath: () => {
    const path = get().nodePath;
    const node = path[path.length - 1] ?? null;
    set((state) => ({
      nodePath: state.nodePath.slice(0, -1),
    }));
    return node;
  },

  setIsLoading: (state) => {
    set(() => ({ isLoading: state }));
  },

  setCurChildNodes: (nodes) => {
    set(() => ({ curChildNodes: nodes }));
  },

  update: () => {
    set((state) => ({ doUpdating: !state.doUpdating }));
  },

  reset: () => {
    set(() => ({
      nodePath: [null],
      curChildNodes: [],
    }));
  },
}));
