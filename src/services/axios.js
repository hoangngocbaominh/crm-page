import axios from 'axios';
// import { notification } from 'antd';
const baseURL = 'http://localhost:3000/api/';
// http://esier-json-server-demo.herokuapp.com
export const requester = () => {
    function get(uri, params) {
      return axios.get(baseURL + uri, { params, headers:{
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }}).catch((err) => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          console.log('err.response: ', err.response);
          // notification.error({ message: err.response.data.message });
          return err.response;
        } else if (err.request) {
          // client never received a response, or request never left
          return err.request;
        } else {
          // anything else
          return err;
        }
      });
    }
    function post(uri, params) {
      return axios.post(baseURL + uri,params, {
        headers:{
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }).catch((err) => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          console.log('err.response: ', err.response);
          return err.response;
        } else if (err.request) {
          // client never received a response, or request never left
          return err.request;
        } else {
          // anything else
          return err;
        }
      });
    }
    function destroy(uri, params) {
      return axios.delete(baseURL + uri, { params, headers:{
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      } }).catch((err) => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          console.log('err.response: ', err.response);
          return err.response;
        } else if (err.request) {
          // client never received a response, or request never left
          return err.request;
        } else {
          // anything else
          return err;
        }
      });
    }
    function update(uri, params) {
      return axios.patch(baseURL + uri, params, {
        headers:{
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }).catch((err) => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          console.log('err.response: ', err.response);
          return err.response;
        } else if (err.request) {
          // client never received a response, or request never left
          return err.request;
        } else {
          // anything else
          return err;
        }
      });
    }
  
    return {
      get,
      post,
      update,
      destroy,
    };
  };