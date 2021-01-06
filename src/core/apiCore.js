import { API } from "../config";
import axios from "axios";

export const getProducts = (sortBy) => {
  return axios
    .get(`${API}/products?sortyBy=${sortBy}&order=desc&limit=6`)
    .then((response) => response.data)
    .catch((err) => err.response.data);
};
