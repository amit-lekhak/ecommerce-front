import { API } from "../config";
import axios from "axios";

export const createCategory = (userId, token, category) => {
  return axios
    .post(
      `${API}/category/create/${userId}`,
      { name: category },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

export const createProduct = (userId, token, product) => {
  return axios
    .post(`${API}/product/create/${userId}`, product, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

export const getCategories = () => {
  return axios
    .get(`${API}/categories`)
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

export const listOrders = (userId, token) => {
  return axios
    .get(`${API}/order/list/${userId}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

export const getStatusValues = (userId, token) => {
  return axios
    .get(`${API}/order/status-values/${userId}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((err) => console.log(err.response.data));
};

export const updateOrderStatus = (userId, token,orderId,status) => {
  return axios
    .put(`${API}/order/${orderId}/status/${userId}`,{orderId,status}, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
};
