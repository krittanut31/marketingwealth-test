import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ItemCardType } from "../type";
import dummy from "../assets/dummy.svg";

const ProductDetail = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState<ItemCardType>();
  const navigate = useNavigate();

  const getProductData = async () => {
    await axios
      .get(`http://localhost:8000/product/${id}`)
      .then((res) => {
        setProductData(res.data);
      })
      .catch((err) => {
        navigate("/");
      });
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <div className="flex w-full min-h-[calc(100dvh-40px)] bg-slate-500 flex-col items-center">
      <h1 className="text-2xl font-semibold">ProductDetail</h1>
      <div className="flex flex-col mt-4 gap-4">
        <h2 className="text-xl font-semibold">{productData?.name}</h2>
        <img
          src={productData?.imageUrl || dummy}
          alt={productData?.name}
          className="w-[300px] aspect-square object-cover m-auto"
        />
        <p className="text-lg">
          <strong>description :</strong> {productData?.description}
        </p>
        <p className="text-lg">
          <strong>price :</strong> {productData?.price}
        </p>
        <p className="text-lg">
          <strong>category :</strong> {productData?.category}
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
