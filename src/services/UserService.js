import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8001/api",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  postUser(user) {
    return apiClient.post("/users", user);
  },
};
