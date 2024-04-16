import { useCheckout } from './Checkout.hooks';

const Checkout = () => {
  const checkout = useCheckout(); //! Facade Pattern implicit: Checkout is a facade for the Command Pattern and the Store

  return (
    <div>
      <button onClick={checkout.checkout}>Checkout</button>
    </div>
  );
};

export default Checkout;
