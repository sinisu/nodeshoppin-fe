import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";

const ProductCard = ({product}) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    // 상품 디테일 페이지로 가기
  };
  // productList.map((item)=>(
  //    (
  //     <div className="card" onClick={() => showProduct("hard_code")}>
  //     <img
  //       src="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F3a%2F04%2F3a04ededbfa6a7b535e0ffa30474853fc95d2e81.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]"
  //       alt=""
  //     />
  //     <div>{item.name}</div>
  //     <div>₩ 45,000</div>
  //   </div>
  //   )
  // ));
  return (
    <div className="card" onClick={() => showProduct("hard_code")}>
      <div className="image-size-box">
        <img
        src={product.image}
        alt=""
        className="image-size"
        />
      </div>
      <div>{product.name}</div>
      <div>₩{product.price}</div>
    </div>
  );
};

export default ProductCard;
