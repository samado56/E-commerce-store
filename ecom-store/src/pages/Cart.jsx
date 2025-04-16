import { useEffect, useState } from "react";
import { UseAuth } from "../contexts/Auth/AuthCntext";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loader, setLoader] = useState(false);
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
      if (res.ok) {
        setCart(item);
        setLoader(false);
      }
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loader) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <div>
        {cart && cart.length ? (
          cart.item.map((item) => (
            <>
              <div>{item.title}</div>
            </>
          ))
        ) : (
          <h1>No Items to show</h1>
        )}
      </div>
    </>
  );
}
