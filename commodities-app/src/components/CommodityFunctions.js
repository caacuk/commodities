import axios from "axios";

export const getCommoditiesByStatus = () => {
  return axios
    .get("commodities/status/1")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCommodities = () => {
  return axios
    .get("commodities/", {
      headers: {
        Authorization: localStorage.usertoken, //the token is a variable which holds the token
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postCommodity = (commodity) => {
  return axios
    .post(
      "commodities/insert",
      {
        name: commodity.name,
        price: commodity.price,
        status: 0,
        date: commodity.date,
      },
      {
        headers: {
          Authorization: localStorage.usertoken,
        },
      }
    )
    .then((response) => {
      // console.log(response);
      return response.data;
    })
    .catch((err) => {
      // console.log(err);
      return "error";
    });
};

export const postCommodityUpdate = (commodity) => {
  return axios
    .post("commodities/update", {
      id: commodity.id,
      name: commodity.name,
      price: commodity.price,
      status: commodity.status,
      date: commodity.date,
    })
    .then((response) => {
      // console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
