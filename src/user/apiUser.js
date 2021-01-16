import { API } from "../config";
import axios from "axios";

export const read = (userId, token) => {
  return axios
    .get(`${API}/user/${userId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

export const update = (userId, token, user) => {
  return axios
    .put(`${API}/user/${userId}`, user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

export const updateLocalStorage = (user, next) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("jwt")) {
      let auth = JSON.parse(localStorage.getItem("jwt"));
      auth.user = user;
      localStorage.setItem("jwt", JSON.stringify(auth));
      next();
    }
  }
};


export const getPurchaseHistory = (userId, token) => {
    return axios
      .get(`${API}/orders/by/user/${userId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((err) => err.response.data);
  };
  