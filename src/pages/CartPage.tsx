import { useCreateCommand } from '../CommandPattern';
import CartComponent from '../components/CartComponent';
import { Item } from '../core/Item';
import { useCartStore, useCommandStore } from '../store/Store';

const CartPage = () => {
  const commandStore = useCommandStore();
  const cartStore = useCartStore();

  const addItem = (item: Item) => {
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

  const removeItem = (item: Item) => {
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

  const undo = () => {
    const command = commandStore.pop();
    if (command) {
      command.undo();
    }
  };

  return (
    <div>
      <h1>Warenkorb Seite</h1>
      <CartComponent onAddItem={addItem} onUndo={undo} onRemoveItem={removeItem} />
    </div>
  );
};

export default CartPage;
