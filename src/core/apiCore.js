import { API } from "../config";
import axios from "axios";
import queryString from "query-string";

export const getProducts = (sortBy) => {
  return axios
    .get(`${API}/products?sortyBy=${sortBy}&order=desc&limit=6`)
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

export const getCategories = () => {
  return axios
    .get(`${API}/categories`)
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

export const getFilteredProducts = (skip, limit, filters) => {
  const data = {
    skip,
    limit,
    filters,
  };
  // console.log(data);
  return axios
    .post(`${API}/products/by/search/`, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

export const searchList = (params) => {
  const query = queryString.stringify(params);
  return axios
    .get(`${API}/products/search?${query}`)
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

export const getSingleProduct = (productId) => {
  return axios
    .get(`${API}/product/${productId}`)
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

export const getRelatedList = (productId) => {
  return axios
    .get(`${API}/products/related/${productId}`)
    .then((response) => response.data)
    .catch((err) => err.response.data);
};


export const getBraintreeClientToken = (userId,token) => {
  return axios
    .get(`${API}/braintree/getToken/${userId}`,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

export const processPayment = (userId,token,paymentData) => {
  return axios
    .post(`${API}/braintree/payment/${userId}`,paymentData,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

