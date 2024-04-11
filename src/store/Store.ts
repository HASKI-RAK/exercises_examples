import {
  CartState,
  CommandState,
  useCartStoreZustand,
  useCommandStoreZustand,
} from './StoreZustand';

// !Adapter to wrap the zustand store in a function (to make the application not depend on zustand)
export const useCartStore = (): CartState => useCartStoreZustand();
export const useCommandStore = (): CommandState => useCommandStoreZustand();
