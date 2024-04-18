import { removeItemCommand, undoCommand } from '../CommandPattern';
import CartComponent from '../components/CartComponent';
import Checkout from '../components/Checkout/Checkout';
import { useCartStore } from '../store/Store';

const CartPage = () => {
  const cartStore = useCartStore();

  const removeItem = removeItemCommand();

  const undo = undoCommand();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <h1>Warenkorb Seite</h1>
      <CartComponent onUndo={undo} onRemoveItem={removeItem} />
      <hr className="solid" />
      {/** Calculate total amount */}
      {cartStore.items.length > 0 && (
        <div>
          <h2>Gesamtsumme</h2>
          {
            cartStore.items
              .map((item) => item.money)
              .reduce((acc, curr) => curr.addition(acc)).amount
          }
        </div>
      )}
      <Checkout />
    </div>
  );
};

export default CartPage;
