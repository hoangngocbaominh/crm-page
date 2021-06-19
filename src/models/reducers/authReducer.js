import {
  GET_TOKEN,
 
} from "../constans";

const initialState = {
    token: "",
};
const authReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case GET_TOKEN:
      return { ...state, data: payload.data };
  
    default:
      return state;
  }
};
export default authReducer;
