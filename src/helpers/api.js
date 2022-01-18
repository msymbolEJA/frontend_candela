import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const api = async (url, method, data = null) => {
  const axiosResponse = axios({
    method,
    url: `${BASE_URL}${url}`,
    data,
  });
  return axiosResponse;
};

export default api;
