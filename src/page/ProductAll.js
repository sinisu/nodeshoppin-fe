import React, { useEffect } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container, Alert, Spinner } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";

const ProductAll = () => {
  const dispatch = useDispatch();
  const [query,setQuery] = useSearchParams();
  const error = useSelector((state) => state.product.error);
  const isLoading = useSelector(state => state.product.loading);
  // 처음 로딩하면 상품리스트 불러오기
  const {productList} = useSelector((state) => state.product);

  useEffect(()=>{
    const searchWord = query? query.get("name") : null;
    dispatch(productActions.getProductList({name:searchWord}));
  },[query])

  return (
    <Container>
      {error && (
          <div className="error-message">
            <Alert variant="danger">{error}</Alert>
          </div>
        )}
      {isLoading? <Spinner />:null}
      <Row>
        {productList.length>0? productList.map((product)=>(
          <Col md={3} sm={12}>
            <ProductCard product={product} key={product.sku}/>
          </Col>
        )):<div className="text-center">다른 검색어를 입력해 주세요!ㅇ_0</div>}
      </Row>
    </Container>
  );
};

export default ProductAll;
