import axios from "axios";

const api = async (url, method, data = null, server_url) => {
  const axiosResponse = axios({
    method,
    url: `${server_url ?? process.env.REACT_APP_CANDELA_2_URL}${url}`,
    data,
  });
  return axiosResponse;
};

export default api;
