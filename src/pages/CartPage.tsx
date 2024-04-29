import { useNavigate } from 'react-router-dom';

import { removeItemCommand, undoCommand } from '../CommandPattern';
import CartComponent from '../components/CartComponent';
import { useCartStore } from '../store/Store';

const CartPage = () => {
  const cartStore = useCartStore();
  const navigate = useNavigate();

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
      <button
        onClick={() => {
          navigate('/checkout');
        }}
      >
        Continue to Checkout
      </button>
    </div>
  );
};

export default CartPage;
