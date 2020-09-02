import axios from "axios";

export const register = (newUser) => {
  return axios
    .post("users/register", {
      name: newUser.name,
      username: newUser.username,
      password: newUser.password,
    })
    .then((response) => {
      console.log("Registered");
    });
};

export const login = (user) => {
  return axios
    .post("users/login", {
      username: user.username,
      password: user.password,
    })
    .then((response) => {
      localStorage.setItem("usertoken", response.data);
      return response.data;
    })
    .catch((err) => {
      // console.log("error");
      return "error";
    });
};
