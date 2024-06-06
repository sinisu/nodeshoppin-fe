import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container, Alert } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";

const ProductAll = () => {
  const dispatch = useDispatch();
  const [query,setQuery] = useSearchParams();
  const error = useSelector((state) => state.product.error);

  // 처음 로딩하면 상품리스트 불러오기
  const {productList} = useSelector((state) => state.product);

  // useEffect(()=>{
  //   dispatch(productActions.getProductList());
  // },[])

  useEffect(()=>{
    if(query){
      const searchWord = query.get("name");
      dispatch(productActions.getProductList({name:searchWord}));
    }
    dispatch(productActions.getProductList());
  },[query])

  if(error) return <Alert>{error}</Alert>

  return (
    <Container>
      <Row>
        {productList.length>0? productList.map((product)=>(
          <Col md={3} sm={12}>
            <ProductCard product={product} key={product.sku}/>
          </Col>
        )):<div className="text-center">{error}</div>}
      </Row>
    </Container>
  );
};

export default ProductAll;
