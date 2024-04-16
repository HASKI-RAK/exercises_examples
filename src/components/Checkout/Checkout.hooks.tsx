import { useCartStore, useCommandStore } from '../../store/Store';

export const useCheckout = () => {
  const cartStore = useCartStore();
  const commandStore = useCommandStore();

  const checkout = () => {
    // post to server
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(cartStore.items),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('Checkout successful', json);
        cartStore.clear();
        commandStore.clear();
        alert('Checkout successful');
      });
  };

  return { checkout };
};
