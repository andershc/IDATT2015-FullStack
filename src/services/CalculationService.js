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
  getPrev(config) {
    return apiClient.get("/calc", config).then((response) => {
      return response.data;
    });
  },
  postCalc(object, config) {
    return apiClient
      .post("/calc", object, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Failed to send with error: " + error);
      });
  },
};
