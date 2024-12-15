import React from "react";
import { ItemCardType } from "../../type";
import dummy from "../../assets/dummy.svg";

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
  return (
    <div className="w-[200px] h-[250px] rounded-lg border border-[]  flex flex-col bg-[#eee] overflow-hidden">
      <div className="w-full h-full relative box-border group p-2 flex flex-col">
        <img src={imageUrl || dummy} alt="" className="w-full h-[100px]" />
        <div className="flex flex-col h-full divide-y divide-black">
          <h2 className=" line-clamp-1">{name}</h2>
          <p className=" line-clamp-3 mt-2 grow">{description}</p>
          <div className="flex justify-between ">
            <p>{price.toLocaleString()}฿</p>
          </div>
        </div>
        <button
          type="button"
          className="w-full left-0 absolute bottom-2 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-sm h-10 top-full opacity-0 group-hover:-translate-y-full group-hover:opacity-100 transition-all duration-500 curser-pointer"
        >
          Add Cart
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
