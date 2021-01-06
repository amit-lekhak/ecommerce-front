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
