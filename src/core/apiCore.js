import { API } from "../config";
import axios from "axios";

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
