import axios from "axios";

axios.defaults.baseURL = "https://caacuk-survey-api.herokuapp.com/";

const config = {
  headers: {
    Authorization: localStorage.usertoken,
  },
};

export const getCommoditiesByStatus = () => {
  return axios
    .get("commodities/status/1")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getCommodities = () => {
  return axios
    .get("commodities/", config)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const postCommodity = (commodity) => {
  const body = {
    name: commodity.name,
    price: commodity.price,
    status: 0,
    date: commodity.date,
  };

  return axios
    .post("commodities/", body, config)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const putCommodity = (commodity) => {
  const body = {
    name: commodity.name,
    price: commodity.price,
    status: commodity.status,
    date: commodity.date,
  };

  return axios
    .put("commodities/" + commodity.id, body, config)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const deleteCommodity = (commodity) => {
  return axios
    .delete("commodities/" + commodity.id, config)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
