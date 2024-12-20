import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ItemCardType, CartItemListType, CartItem } from "../type";
import CartItemsList from "../components/items/CartItemsList";
import { ToastContainer } from "react-toastify";

const Cart = () => {
  const [cartData, setCartData] = useState<CartItemListType>();
  const token = Cookies.get("token");

  const getCartData = async () => {
    await axios
      .get("http://localhost:8000/cart", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCartData(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getCartData();
  }, [token]);

  return (
    <div className="w-full min-h-[calc(100dvh-40px)] bg-[#ddd] flex p-4 justify-center">
      <div className="max-w-[1440px] w-full min-h-full bg-white flex flex-col p-5">
        <h1>Cart</h1>
        <div className="flex flex-col ">
          {cartData?.cartData?.map((data: CartItem, index: number) => (
            <CartItemsList data={data} key={index} getCartData={getCartData} />
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cart;
