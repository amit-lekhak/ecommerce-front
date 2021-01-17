import { API } from "../config";
import axios from "axios";

export const signup = (user) => {
  return axios
    .post(`${API}/signup`, user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

export const signin = (user) => {
  return axios
    .post(`${API}/signin`, user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

export const authenticateStore = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
  }

  axios
    .get(`${API}/signout`)
    .then((response) => response.data)
    .catch((err) => console.log(err.response.data));
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
