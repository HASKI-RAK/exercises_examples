import { Item } from './core/Item';
import { useCartStore, useCommandStore } from './store/Store';

//! Command Pattern
export type Command = {
  execute: () => void;
  undo: () => void;
};

/**
 * Create a command based on an arbitrary item, onExecute and onUndo functions
 * @param item - The item on which the command will be executed. It can be any type.
 * @param onExecute - The function to be executed when the command is executed
 * @param onUndo - The function to be executed when the command is undone
 * @returns The crafted command object
 */
export const useCreateCommand = <T>(
  item: T,
  onExecute: () => void,
  onUndo: () => void,
): Command & { item: T } => {
  return {
    item,
    execute: () => {
      onExecute();
    },
    undo: () => {
      onUndo();
    },
  };
};

/**
 * Add an item to the cart
 * @param cartStore - The cart store
 * @param commandStore - The command store
 * @returns A function that adds an item to the cart
 */
export const addItemCommand = () => {
  const commandStore = useCommandStore();

  const cartStore = useCartStore();

  return (item: Item) => {
    // Invoker
    const commandAddItem = useCreateCommand(
      item,
      () => {
        cartStore.addItem(item);
      },
      () => {
        cartStore.removeItem(item);
      },
    );
    // Invoke command
    commandAddItem.execute();
    // Store command
    commandStore.push(commandAddItem);
  };
};

/**
 * Remove an item from the cart
 * @param cartStore - The cart store
 * @param commandStore - The command store
 * @returns A function that removes an item from the cart
 */
export const removeItemCommand = () => {
  const commandStore = useCommandStore();

  const cartStore = useCartStore();

  return (item: Item) => {
    const commandRemoveItem = useCreateCommand(
      item,
      () => {
        cartStore.removeItem(item);
      },
      () => {
        cartStore.addItem(item);
      },
    );
    commandRemoveItem.execute();
    commandStore.push(commandRemoveItem);
  };
};

/**
 * Undo the last command
 * @param commandStore - The command store
 * @returns A function that undoes the last command
 */
export const undoCommand = () => {
  const commandStore = useCommandStore();

  return () => {
    const command = commandStore.pop();
    if (command) {
      command.undo();
    }
  };
};
