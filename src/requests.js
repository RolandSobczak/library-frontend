import axios from "axios";

const API = axios.create({
  baseURL: "http://rolandsobczak.ignorelist.com:8000",
});

export default API;

export const setHeader = (token) => {
  API.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Token ${token}`;
      } else {
        delete API.defaults.headers.common.Authorization;
      }
      return config;
    },

    (error) => Promise.reject(error)
  );
};
