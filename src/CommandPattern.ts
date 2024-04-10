export type Command = {
  execute: () => void;
  undo: () => void;
};

/**
 * Create a command based on an arbitrary item, onExecute and onUndo functions
 * @param item - The item to be used in the command
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
