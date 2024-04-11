import {
  CartState,
  CommandState,
  useCartStoreZustand,
  useCommandStoreZustand,
} from './StoreZustand';

// !Adapter to wrap the zustand store in a function (to make the application not depend on zustand)
type StoreAdapter<T> = () => T;

export const useCartStore: StoreAdapter<CartState> = () => useCartStoreZustand();
export const useCommandStore: StoreAdapter<CommandState> = () => useCommandStoreZustand();
