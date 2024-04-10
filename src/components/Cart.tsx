import { Item } from '../core/Item';
import { useCartStore } from '../store/Store';

const Cart = ({
  onAddItem,
  onRemoveItem,
  onUndo,
}: {
  onAddItem: (item: Item) => void;
  onRemoveItem: (item: Item) => void;
  onUndo: () => void;
}) => {
  const cartStore = useCartStore();
  return (
    <div>
      <h2>Warenkorb</h2>
      <ul>
        {cartStore.items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button
        onClick={() => {
          const maxId = cartStore.items.reduce((acc, item) => Math.max(acc, item.id), 0);
          onAddItem({ id: maxId + 1, name: `Item ${maxId + 1}` });
        }}
      >
        Item hinzufügen
      </button>

      <button
        onClick={() => {
          const maxId = cartStore.items.reduce((acc, item) => Math.max(acc, item.id), 0);
          onRemoveItem({ id: maxId, name: `Item ${maxId}` });
        }}
      >
        Letztes Item entfernen
      </button>

      <button onClick={() => onUndo()}>Rückgängig</button>
    </div>
  );
};

export default Cart;
