import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { Command } from '../CommandPattern';
import { Item } from '../core/Item';

type CommandState = {
  history: Command[];
  push: (command: Command) => void;
  pop: () => Command | undefined;
};

type CartState = {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (item: Item) => void;
};

export const useCommandStore = create<CommandState>((set, get) => ({
  history: [],
  push: (command) => set((state) => ({ history: [...state.history, command] })),
  // pop the last command from the history
  pop: () => {
    const lastCommand = get().history[get().history.length - 1];
    set((state) => ({ history: state.history.slice(0, -1) }));
    return lastCommand;
  },
}));

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        items: [],
        addItem: (item) => set((state) => ({ items: [...state.items, item] })),
        removeItem: (item) =>
          set((state) => ({ items: state.items.filter((i) => i.id !== item.id) })),
      }),
      { name: 'cart-store', getStorage: () => localStorage },
    ),
  ),
);
