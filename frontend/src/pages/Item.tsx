import React from "react";
import product_data from "../assets/product_data.json";
import { ItemCardType } from "../type";
import ItemCard from "../components/items/ItemCard";

const Itme = () => {
  const data: ItemCardType[] = product_data;
  console.log(data);

  return (
    <div className="w-full flex  bg-slate-800 p-4">
      <div className="flex flex-wrap w-full gap-2 justify-center">
        {data.map((data: ItemCardType, index: number) => (
          <ItemCard {...data} key={data.id} />
        ))}
      </div>
    </div>
  );
};

export default Itme;
