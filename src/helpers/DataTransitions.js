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
  // const response = await axios.put(`${path}`, data, {
  //   headers: {
  //     Authorization: `Token ${token}`,
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  // });
  // return response;

  // var data = JSON.stringify({
  //   id: 1,
  //   status: "a",
  //   so_user: "b",
  //   so_info: "c",
  //   po_vendor: "d",
  //   po_num: "e",
  //   po_cost: null,
  //   pay_method: "",
  //   qty: null,
  //   condition: "",
  //   tracking: "",
  //   serial: "",
  //   po_info: "",
  //   account_owner: "",
  //   item: 4724,
  // });

  var config = {
    method: "put",
    url: path,
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log("then", JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log("ERROR", error);
    });
};
