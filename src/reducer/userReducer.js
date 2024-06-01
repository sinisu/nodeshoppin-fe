import * as types from "../constants/user.constants";
const initialState = {
  loading:false,
  user:null,
  errpr:"",
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch(type){
    case types.REGISTER_USER_REQUEST:
    case types.LOGIN_REQUEST:
      return{...state,loading:true};
    case types.LOGIN_SUCCESS:
      return{...state,loading:false,user:payload.user};
    case types.LOGIN_FAIL:
    case types.REGISTER_USER_FAIL:
      return{...state,loading:false, error:payload};
    default:
      return state;
  }
  return state;
}

export default userReducer;
