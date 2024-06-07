import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";

const ProductCard = ({product}) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    // 상품 디테일 페이지로 가기
    navigate(`/product/${id}`);
  };

  return (
    <div className="card" onClick={() => showProduct(product._id)}>
      <div className="image-size-box">
        <img
        src={product?.image}
        alt=""
        className="image-size"
        />
      </div>
      <div>{product?.name}</div>
      <div>₩{product?.price}</div>
    </div>
  );
};

export default ProductCard;
