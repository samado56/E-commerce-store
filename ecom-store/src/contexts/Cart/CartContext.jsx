import { createContext, useContext } from "react";

const intial = {
  cartItems: [],
  totalAmount: 0,
  addItemToCart: () => {},
};
export const CartContext = createContext(intial);

export const useCart = () => useContext(CartContext);
