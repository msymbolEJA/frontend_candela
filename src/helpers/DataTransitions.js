import axios from "axios";

export const getData = async (url) => {
  const response = await axios.get(url, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });
  return response;
};
