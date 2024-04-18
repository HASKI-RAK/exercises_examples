import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { CommandWithUndo } from '../CommandPattern';
import { Item } from '../core/Item';

export type CommandState = {
  history: CommandWithUndo[];
  push: (command: CommandWithUndo) => void;
  pop: () => CommandWithUndo | undefined;
  clear: () => void;
};

export type CartState = {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (item: Item) => void;
  clear: () => void;
};

export const useCommandStoreZustand = create<CommandState>((set, get) => ({
  history: [],
  push: (command) => set((state) => ({ history: [...state.history, command] })),
  // pop the last command from the history
  pop: () => {
    const lastCommand = get().history[get().history.length - 1];
    set((state) => ({ history: state.history.slice(0, -1) }));
    return lastCommand;
  },
  clear: () => set({ history: [] }),
}));

export const useCartStoreZustand = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        items: [],
        addItem: (item) => set((state) => ({ items: [...state.items, item] })),
        removeItem: (item) =>
          set((state) => ({ items: state.items.filter((i) => i.id !== item.id) })),
        clear: () => set({ items: [] }),
      }),
      { name: 'cart-store', getStorage: () => localStorage },
    ),
  ),
);
