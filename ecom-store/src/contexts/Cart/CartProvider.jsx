import { useState } from "react";
import { CartContext } from "./CartContext";
import { UseAuth } from "../Auth/AuthCntext";

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState();

  const { token } = UseAuth();

  const addItemToCart = async (productId) => {
    console.log(productId);
    const url = "http://localhost:000/cart/items";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: productId,
        quantity: "2",
      }),
    });

    const items = await res.json();

    console.log(res);
    console.log(items);
  };

  //   const logout = () => {
  //     localStorage.removeItem(USERNAME_KEY);
  //     localStorage.removeItem(TOKEN_KEY);
  //     setUsername(null);
  //     setToken(null);
  //   };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
