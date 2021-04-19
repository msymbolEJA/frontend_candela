import axios from "axios";

export const getData = async (url) => {
  const response = await axios.get(url, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });
  return response;
};

export const postAuthData = async (path, data) => {
  const response = await axios.post(`${path}`, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response;
};
