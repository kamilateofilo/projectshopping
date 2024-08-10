import { useState } from 'react';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const addToCart = (item: any) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
  };
};
