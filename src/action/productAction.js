import api from "../utils/api";
import * as types from "../constants/product.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";

const getProductList = (query) => async (dispatch) => {
  try{
    dispatch({type:types.PRODUCT_GET_REQUEST})
    const response = await api.get("/product",{
      params:{...query}
    });
    //status 200 이외에는 모두 에러로 잡히므로 아래 코드는 필요하지 않음
    if(response.status !== 200 ) throw new Error(response.error);
    dispatch({type:types.PRODUCT_GET_SUCCESS,payload:response.data});
    console.log("response",response.data.data);
  }catch(error){
    dispatch({type:types.PRODUCT_GET_FAIL,payload:error.error});
    console.log(error.error);
  };
};

const getProductDetail = (id) => async (dispatch) => {
  try{
    dispatch({type:types.GET_PRODUCT_DETAIL_REQUEST});
    const response = await api.get(`/product/${id}`);
    if(response.status !== 200) throw new Error(response.error);
    dispatch({type:types.GET_PRODUCT_DETAIL_SUCCESS,payload:response.data.data});
  }catch(error){
    dispatch({type:types.GET_PRODUCT_DETAIL_FAIL,payload:error.error});
  }
};

const createProduct = (formData,page) => async (dispatch) => {
  try{
    dispatch({type:types.PRODUCT_CREATE_REQUEST});
    const response = await api.post("/product",formData);
    //status 200 이외에는 모두 에러로 잡히므로 아래 코드는 필요하지 않음
    if(response.status !== 200) throw new Error(response.error);
    dispatch({type:types.PRODUCT_CREATE_SUCCESS});
    dispatch(commonUiActions.showToastMessage("상품 생성 완료","success"));
    dispatch(productActions.getProductList({page:1,name:""}));
  }catch(error){
    dispatch({type:types.PRODUCT_CREATE_FAIL,payload:error.error});
    dispatch(commonUiActions.showToastMessage(error.error,"error"));
  }
};
const deleteProduct = (id,page) => async (dispatch) => {
  try{
    dispatch({type:types.PRODUCT_DELETE_REQUEST});
    const response = await api.delete(`/product/${id}`);
    if(response.status !== 200) throw new Error(response.error);
    dispatch({type:types.PRODUCT_DELETE_SUCCESS});
    dispatch(commonUiActions.showToastMessage("상품 삭제 완료","success"));
    dispatch(getProductList({page,name:""}));
  }catch(error){
    dispatch({type:types.PRODUCT_DELETE_FAIL,payload:error.error});
    dispatch(commonUiActions.showToastMessage(error.error,"error"));
  }
};

const editProduct = (formData, id, page) => async (dispatch) => {
  try{
    dispatch({type:types.PRODUCT_EDIT_REQUEST});
    const response = await api.put(`/product/${id}`,formData);
    if(response.status !== 200) throw new Error(response.error);
    dispatch({type:types.PRODUCT_EDIT_SUCCESS,payload:response.data.data});
    dispatch(commonUiActions.showToastMessage("상품 수정 완료","success"));
    dispatch(getProductList({page,name:""}));
  }catch(error){
    dispatch({type:types.PRODUCT_EDIT_FAIL,payload:error.error});
    dispatch(commonUiActions.showToastMessage(error.error,"error"));
  }
};

export const productActions = {
  getProductList,
  createProduct,
  deleteProduct,
  editProduct,
  getProductDetail,
};
