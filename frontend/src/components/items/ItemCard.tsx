import React from "react";
import { ItemCardType } from "../../type";
import dummy from "../../assets/dummy.svg";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ItemCard = (prop: ItemCardType) => {
  const {
    id,
    name,
    price,
    imageUrl,
    quantity,
    favorite,
    description,
    category,
  } = prop;
  // const dummy = "../assets/dummy.svg";

  const token = Cookies.get("token") || "";

  const addCart = async (id: number) => {
    if (token) {
      await axios
        .post(
          "http://localhost:8000/cart",
          { productId: id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          toast.success("Product has been successfully added to your cart.");
        })
        .catch((err) => console.error(err));
    } else toast.error("Please login.");
  };

  const handleAddCart = (id: number) => {
    if (token) {
      addCart(id);
    } else {
      toast.error("Please login.");
    }
  };

  return (
    <div className="w-[200px] h-[250px] rounded-lg border border-[] group flex flex-col bg-[#eee] overflow-hidden relative">
      <Link
        to={`/product/${id}`}
        className="w-full h-full relative box-border  p-2 flex flex-col z-0"
      >
        <img src={imageUrl || dummy} alt="" className="w-full h-[100px]" />
        <div className="flex flex-col h-full divide-y divide-black">
          <h2 className=" line-clamp-1">{name}</h2>
          <p className=" line-clamp-3 mt-2 grow">{description}</p>
          <div className="flex justify-between ">
            <p>{price.toLocaleString()}฿</p>
          </div>
        </div>
      </Link>
      <button
        type="button"
        className="w-full left-0 absolute bottom-2 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-sm h-10 top-full opacity-0 group-hover:-translate-y-full group-hover:opacity-100 transition-all duration-500 curser-pointer z-20"
        onClick={() => handleAddCart(id)}
      >
        Add Cart
      </button>
    </div>
  );
};

export default ItemCard;
