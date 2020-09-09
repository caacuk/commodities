import axios from "axios";

axios.defaults.baseURL = "https://caacuk-survey-api.herokuapp.com/";

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
    .post(
      "commodities/update",
      {
        id: commodity.id,
        name: commodity.name,
        price: commodity.price,
        status: commodity.status,
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
      console.log(err);
    });
};

export const deleteCommodity = (commodity) => {
  const commodityId = commodity.id;
  return axios
    .post(
      "commodities/delete/" + commodityId,
      {},
      {
        headers: {
          Authorization: localStorage.usertoken,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return "error";
    });
};
