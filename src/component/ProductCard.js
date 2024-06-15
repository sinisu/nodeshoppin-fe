import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";

const ProductCard = ({product}) => {
  const navigate = useNavigate();
  console.log(product)
  const showProduct = (id) => {
    // 상품 디테일 페이지로 가기
    navigate(`/product/${id}`);
  };
  const isSoldOut = Object.values(product.stock).every(stock => stock === 0);

  return (
    <div className="card" onClick={() => showProduct(product._id)}>
      <div className="image-size-box" disabled>
        <img
        src={product?.image}
        alt=""
        className={isSoldOut?"sold-out-img":"image-size" }
        
        />
      </div>
      <div>{product?.name}</div>
      <div>₩{product?.price}</div>
      {isSoldOut?<div className="sold-out-box"><p className="sold-out-text">Sold Out</p></div>:''}
    </div>
  );
};

export default ProductCard;
