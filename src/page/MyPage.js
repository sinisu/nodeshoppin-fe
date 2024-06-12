import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../action/orderAction";
import OrderStatusCard from "../component/OrderStatusCard";
import "../style/orderStatus.style.css";

const MyPage = () => {
  const dispatch = useDispatch();
  const {orderList} = useSelector((state)=>state.order);
  console.log(orderList)

  //오더리스트 들고오기
  useEffect(()=>{
    dispatch(orderActions.getOrder());
  },[])

  // if(orderList?.length === 0) {
  //   return (
  //     <Container className="no-order-box">
  //       <div>진행중인 주문이 없어요!</div>
  //     </Container>
  //   );
  // }

  // 오더리스트가 없다면? 주문한 상품이 없습니다 메세지 보여주기
  return (
    <Container >
      {orderList?.map((item)=>(
        <OrderStatusCard 
          orderItem={item}
          // className="status-card-container"
          key={item._id}
        />
      ))}
    </Container>
  );
};

export default MyPage;
