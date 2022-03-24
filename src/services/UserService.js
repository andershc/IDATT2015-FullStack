import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8001",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  loginUser(user) {
    return apiClient
      .post("/token", null, {
        params: {
          username: user.username,
          password: user.password,
        },
      })
      .then((response) => {
        return response.data;
      });
  },
  registerUser(user) {
    return apiClient
      .post("/register", null, {
        params: {
          username: user.username,
          password: user.password,
        },
      })
      .then((response) => {
        return response.data;
      });
  },
  getUser(username, password) {
    return apiClient
      .get("/getUser", {
        params: {
          username: username,
          password: password,
        },
      })
      .then((response) => {
        return response.data;
      });
  },
};
