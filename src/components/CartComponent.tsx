import { Item } from '../core/Item';
import { useCartStore } from '../store/Store';

const CartComponent = ({
  onRemoveItem,
  onUndo,
}: {
  onRemoveItem: (item: Item) => void;
  onUndo: () => void;
}) => {
  const cartStore = useCartStore();
  return (
    <div>
      <h2>Warenkorb</h2>
      <ul>
        {cartStore.items.map((item) => (
          <li key={item.id}>
            {item.name} {item.money.amount} {item.money.currency}
            <button onClick={() => onRemoveItem(item)}>Entfernen</button>
          </li>
        ))}
      </ul>

      <button onClick={() => onUndo()}>Rückgängig</button>
    </div>
  );
};

export default CartComponent;
