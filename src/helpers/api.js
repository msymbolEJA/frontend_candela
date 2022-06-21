import axios from "axios";

const api = async (url, method, data = null, BASE_URL = process.env.REACT_APP_BASE_URL ) => {
  const axiosResponse = axios({
    method,
    url: `${BASE_URL}${url}`,
    data,
  });
  return axiosResponse;
};

export default api;
