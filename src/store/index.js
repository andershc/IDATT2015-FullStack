import { createStore } from "vuex";
import FeedbackService from "@/services/FeedbackService";

export default createStore({
  state: {
    user: '',
    userEmail: '',
    submissions: [],
    submission: {}
  },
  mutations: {
    ADD_SUBMISSION(state, submission) {
      state.submissions.push(submission)
    },
    SET_SUBMISSION(state, submission) {
      state.submission = submission;
    },
    SET_USER(state, name) {
      state.user = name
    },
    SET_USER_EMAIL(state, email) {
      state.userEmail = email
    }
  },
  actions: {
    submitSubmission({commit}, submission) {
      console.log("Submission sent! " + submission.id)
      FeedbackService.submit(submission)
          .then(() => {
            commit('ADD_SUBMISSION', submission)
            commit('SET_USER', submission.name)
            commit('SET_USER_EMAIL', submission.email)
          })
          .catch(error => {
            console.log(error)
          })
      


    },
    fetchSubmission({ commit, state }, id) {
      const existingSubmission = state.submissions.find(submission => submission.id === id)
      if (existingSubmission) {
        commit('SET_SUBMISSION', existingSubmission)
      } else {
        console.log("Submission not found")
      }
    }
  },
  modules: {},
});
