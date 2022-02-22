import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getSubmissions() {
    return apiClient.get("/submissions");
  },
  postFeedback(submission) {
    return apiClient.post("/submissions", submission);
  },
  getSubmission(id) {
    return apiClient.get("/submissions/" + id);
  },
  getName() {
    return apiClient.get("/profile/name");
  },
  setName(newName) {
    return apiClient.post("/profile", { name: newName });
  },
  getEmail() {
    return apiClient.get("profile/email");
  },
  setEmail(newEmail) {
    return apiClient.post("/profile", { email: newEmail });
  },
  getUsers() {
    return apiClient.get("/users");
  },
  postUser(user) {
    return apiClient.post("/users", user);
  },
};
