import { createStore } from "vuex";
import FeedbackService from "@/services/FeedbackService";
import UserService from "@/services/UserService";

export default createStore({
  state: {
    name: "",
    userEmail: "",
    submissions: [],
    submission: {},
    flashMessage: "",
    loginStatus: "",
    user: {},
    token: "",
    userID: "",
  },
  getters: {
    GET_LOGINSTATUS(state) {
      return state.loginStatus;
    },
    GET_USERID(state) {
      return state.userID;
    },
    GET_TOKEN(state) {
      return state.token;
    },
    GET_USERNAME(state) {
      if(state.user.username === undefined){
        return "Not logged in";
      }
      return state.user.username;
    },
  },
  mutations: {
    ADD_SUBMISSION(state, submission) {
      state.submissions.push(submission);
    },
    SET_SUBMISSION(state, submission) {
      state.submission = submission;
    },
    SET_NAME(state, name) {
      state.name = name;
    },
    SET_USER_EMAIL(state, email) {
      state.userEmail = email;
    },
    SET_SUBMISSIONS(state, submissions) {
      state.submissions = submissions;
    },
    SET_FLASHMESSAGE(state, message) {
      state.flashMessage = message;
    },
    SET_LOGINSTATUS(state, loginStatus) {
      state.registered = loginStatus;
    },
    SET_USER(state, user) {
      state.user = user;
      state.userID = user.id;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    RESET(state) {
      state.users = [];
    },
  },
  actions: {
    submitSubmission({ commit }, submission) {
      console.log("Submission sent! " + submission.id);
      commit("ADD_SUBMISSION", submission);
      commit("SET_NAME", submission.name);
      commit("SET_USER_EMAIL", submission.email);
      FeedbackService.postFeedback(submission)
        .then(() => {
          console.log("Successfully sent feedback to online database");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchSubmissions({ commit, state }) {
      FeedbackService.getSubmissions()
        .then((response) => {
          commit("SET_SUBMISSIONS", response.data);
          console.log(
            "Successfully fetched feedback from server " +
              state.submissions.length
          );
        })
        .catch((error) => {
          console.log("could not get submissions" + error);
        });
    },
    fetchSubmission({ commit, state }, id) {
      const existingSubmission = state.submissions.find(
        (submission) => submission.id === id
      );
      if (existingSubmission) {
        commit("SET_SUBMISSION", existingSubmission);
      } else {
        FeedbackService.getSubmission(id)
          .then((response) => {
            commit("SET_SUBMISSION", response.data);
          })
          .catch((error) => {
            console.log("Submission " + id + " not found" + error);
          });
      }
    },
    submitUser({ commit }, user) {
      console.log("Submission sent! " + user.username + " " + user.password);
      commit("ADD_USER", user);
      UserService.registerUser(user)
        .then(() => {
          console.log("Successfully registered in db");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  modules: {},
});
