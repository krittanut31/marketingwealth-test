import { useEffect, useState } from "react";
import { ItemCardType } from "../type";
import ItemCard from "../components/items/ItemCard";
import axios from "axios";

const Itme = () => {
  // const data: ItemCardType[] = product_data;

  const [data, setData] = useState([]);

  const fetchData = async () => {
    await axios
      .get("http://localhost:8000/product")
      .then((res) => {
        setData(res.data.product);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full flex  bg-slate-800 p-4">
      <div className="flex flex-wrap w-full gap-2 justify-center">
        {data?.map((data: ItemCardType, index: number) => (
          <ItemCard {...data} key={data.id} />
        ))}
      </div>
    </div>
  );
};

export default Itme;
