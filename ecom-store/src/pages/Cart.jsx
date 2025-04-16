import { useEffect, useState } from "react";
import { UseAuth } from "../contexts/Auth/AuthCntext";
import { useCart } from "../contexts/Cart/CartContext";

export default function Cart() {
  const { cartItems } = useCart();

  // if (loader) {
  //   return <h1>Loading...</h1>;
  // }
  return (
    <>
      <div>
        {cartItems && cartItems.length ? (
          cartItems.map((item) => (
            <>
              <div>{item.product.title}</div>
            </>
          ))
        ) : (
          <h1>No Items to show</h1>
        )}
      </div>
    </>
  );
}
