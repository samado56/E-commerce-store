import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import { UseAuth } from "../Auth/AuthCntext";

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState();
  const [loader, setLoader] = useState(false);

  const { error, setError } = useState("");

  const { token } = UseAuth();

  const fetchCart = async () => {
    if (!token) {
      return;
    }
    try {
      setLoader(true);
      const url = `http://localhost:5000/cart`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const item = await res.json();
      console.log(item.item);
      if (res.ok) {
        setCartItems([...item.item]);
        setTotalAmount(item.totalAmount);

        setLoader(false);
      }
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  const addItemToCart = async (productId) => {
    console.log(productId);
    try {
      const url = "http://localhost:5000/cart/items";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: 2,
        }),
      });

      const items = await res.json();

      if (res.ok) {
        setCartItems([...items.item]);
        setTotalAmount(items.totalAmount);
      }
      console.log(items);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, totalAmount, error, loader, addItemToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
