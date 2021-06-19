import { requester } from "../../services/axios";

export const authToken = (dispatch) => {
  requester()
    .post("auth/login",dispatch)
    .then((res) => {
      const access_token = res.data.data.accessToken;

      console.log("access", access_token);
    });
  // axios.get(`http://localhost:3000/api/auth/login`).then((res) => {
  //   const response = res.data.data;
  //   console.log("response", response);
  // dispatch({ type: PAGINATION_ACTION, pagination: response });
};
