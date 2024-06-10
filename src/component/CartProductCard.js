import React, { useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { cartActions } from "../action/cartAction";
import { currencyFormat } from "../utils/number";
import { useNavigate } from "react-router";

const CartProductCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalShow,setModalShow] = useState(false);
  console.log("item",item)
  const size = item.size;
  const itemQty = item.productId.stock[size];

  const handleQtyChange = (id,event) => {
    //아이템 수량을 수정한다
    const qty = event.target.value;
    dispatch(cartActions.updateQty(id,qty));
  };

  const deleteCart = (id) => {
    //아이템을 지운다
    dispatch(cartActions.deleteCartItem(id));
    setModalShow(false);
  };

  // const option = Array.from({length:itemQty},(_, i) => i + 1);

  return (
    <div className="product-card-cart">
      <Row>
        <Col md={2} xs={12}>
          <img
            src={item.productId.image}
            width={112}
          />
        </Col>
        <Col md={10} xs={12}>
          <div className="display-flex space-between">
            <h3>{item.productId.name}</h3>
            <button className="trash-button">
              <FontAwesomeIcon
                icon={faTrash}
                width={24}
                // onClick={() => deleteCart(item._id)}
                onClick={()=>setModalShow(true)}
              />
            </button>
            <Modal 
              show={modalShow} 
              onHide={()=>setModalShow(false)}
              centered  
            >
              <Modal.Header closeButton>
                <Modal.Title>Oops!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <strong>{item.productId.name}</strong>를 정말로 삭제하시겠어요?
                </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={()=>setModalShow(false)}>
                  닫기
                </Button>
                <Button variant="danger" onClick={() => deleteCart(item._id)}>
                  삭제하기
                </Button>
              </Modal.Footer>
            </Modal>

          </div>

          <div>
            <strong>₩ {currencyFormat(item.productId.price)}</strong>
          </div>
          <div>Size: {item.size.toUpperCase()}</div>
          <div>Total: ₩ {currencyFormat(item.productId.price*item.qty)}</div>
          <div>
            Quantity:
            <div className="d-flex">
              <Form.Select
                onChange={(event) => handleQtyChange(item._id,event)}
                required
                defaultValue={item.qty}
                className="qty-dropdown"
              >
                {/* {option.map((value)=>(
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))} */}
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </Form.Select>
              {itemQty<=5?(
                <div className="item-qty">*재고가 {itemQty}개 남았습니다!</div>
              ):null}
              
            </div>
            
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartProductCard;
