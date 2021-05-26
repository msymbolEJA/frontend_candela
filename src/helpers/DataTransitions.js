import axios from "axios";

export const getData = async (url) => {
  const token = localStorage.getItem("x-auth-token");

  const response = await axios.get(url, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const postAuthData = async (path, data = {}) => {
  const response = await axios.post(`${path}`, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const putData = async (path, data) => {
  const token = localStorage.getItem("x-auth-token");
  const response = await axios.put(`${path}`, data, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
};
