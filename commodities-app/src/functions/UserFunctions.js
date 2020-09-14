import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

export const register = (newUser) => {
  const body = {
    role_id: newUser.role_id,
    name: newUser.name,
    username: newUser.username,
    password: newUser.password,
  };

  return axios
    .post("users/register", body)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const login = (user) => {
  const body = {
    username: user.username,
    password: user.password,
  };

  return axios
    .post("users/login", body)
    .then((response) => {
      localStorage.setItem("usertoken", response.data.data);
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
