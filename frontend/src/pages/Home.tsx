import { useEffect, useState } from "react";
import { ItemCardType } from "../type";
import ItemCard from "../components/items/ItemCard";
import axios from "axios";
import { ToastContainer } from "react-toastify";

const Home = () => {
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
    <div>
      <div className="w-full flex  bg-slate-800 p-4">
        <div className="flex flex-wrap w-full gap-2 justify-center md:w-[80%] m-auto">
          {data?.map((data: ItemCardType, index: number) => (
            <ItemCard {...data} key={data.id} />
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
