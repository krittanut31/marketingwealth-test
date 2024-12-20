import { useState, useEffect } from "react";
import { CartItem } from "../../type";
import dummy from "../../assets/dummy.svg";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

type Props = {
  data: CartItem;
  getCartData: () => void;
};

const CartItemsList = ({ data, getCartData }: Props) => {
  const token = Cookies.get("token");

  const updateCart = async (
    cartId: number,
    action: "increment" | "decrement"
  ) => {
    await axios
      .patch(
        `http://localhost:8000/cart/${cartId}`,
        { action: action },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        getCartData();
        if (action === "increment") {
          toast.success("Product has been added to your cart successfully!");
        } else {
          toast.success("Product quantity has been decreased successfully!");
        }
      })
      .catch((err) => toast.error("Please check again."));
  };

  const deleteCart = async (cartId: number) => {
    await axios
      .delete(`http://localhost:8000/cart/${cartId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        getCartData();
        toast.success("Product has been removed from your cart successfully!");
      })
      .catch((err) => {
        toast.error("Please check again.");
      });
  };

  return (
    <div className="flex w-full p-4 gap-4 border-2 relative group">
      {/* image */}
      <div className="size-20 shrink-0">
        <img
          src={data.product.imageUrl || dummy}
          alt={data.product.name}
          className="size-full"
        />
      </div>
      {/* detail */}
      <div className="grow ">
        <p>{data.product.name}</p>
        <p>{data.product.description}</p>
      </div>
      {/* quantity update */}
      <div className=" w-32 flex justify-between items-center shrink-0">
        <button
          className="text-xl  border-2 border-black rounded-md size-10"
          onClick={() => updateCart(data.id, "decrement")}
        >
          -
        </button>
        <p>{data.quantity}</p>
        <button
          className="text-xl  border-2 border-black rounded-md size-10"
          onClick={() => updateCart(data.id, "increment")}
        >
          +
        </button>
      </div>

      <button
        className="text-2xl absolute top-1 right-1 size-6 rounded-sm hidden group-hover:flex justify-center items-center pb-2 "
        onClick={() => deleteCart(data.id)}
      >
        x
      </button>
    </div>
  );
};

export default CartItemsList;
