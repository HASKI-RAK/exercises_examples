import { useState } from 'react';

import Checkout from '../components/Checkout/Checkout';

//! Strategy Pattern
type Strategy = {
  pay: () => void;
};

const usePaypal = (): Strategy => {
  const pay = () => {
    console.log('PayPal payment');
  };

  return { pay };
};

const useCreditCard = (): Strategy => {
  const pay = () => {
    console.log('Credit Card payment');
  };

  return { pay };
};

const useBankTransfer = (): Strategy => {
  const pay = () => {
    console.log('Bank Transfer payment');
  };

  return { pay };
};

const CheckoutPage = () => {
  const paypal = usePaypal();
  const creditCard = useCreditCard();
  const bankTransfer = useBankTransfer();

  const [chosenPaymentMethod, setChosenPaymentMethod] = useState<Strategy | null>(); //! Strategy pattern

  const handlePayment = () => {
    if (chosenPaymentMethod) {
      chosenPaymentMethod.pay();
    }
  };

  return (
    <div>
      <h1>Kasse Seite</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Checkout />
        <hr className="solid" />
        <div className="dropdown">
          <button className="dropbtn">Payment method</button>
          <div className="dropdown-content">
            <button
              onClick={() => {
                setChosenPaymentMethod(paypal);
              }}
            >
              PayPal
            </button>
            <button
              onClick={() => {
                setChosenPaymentMethod(creditCard);
              }}
            >
              Credit Card
            </button>
            <button
              onClick={() => {
                setChosenPaymentMethod(bankTransfer);
              }}
            >
              Bank Transfer
            </button>
          </div>
          {chosenPaymentMethod && <button onClick={handlePayment}>Pay</button>}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
