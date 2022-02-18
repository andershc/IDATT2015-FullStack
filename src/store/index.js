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
    },
    SET_SUBMISSIONS(state, submissions){
      state.submissions = submissions
    }
  },
  actions: {
    submitSubmission({commit}, submission) {
      console.log("Submission sent! " + submission.id)
      commit('ADD_SUBMISSION', submission)
      commit('SET_USER', submission.name)
      commit('SET_USER_EMAIL', submission.email)
      FeedbackService.postFeedback(submission)
          .then(() => {
              console.log("Successfully sent feedback to online database")
          })
          .catch(error => {
            console.log(error)
          })

    },
    fetchSubmissions({ commit, state }) {
      FeedbackService.getSubmissions()
          .then(response => {
            commit('SET_SUBMISSIONS', response.data)
            console.log("Successfully fetched feedback from server " + state.submissions.length)
          })
          .catch(error => {
            console.log("could not get submissions" + error)
          })
    },
    fetchSubmission({ commit, state }, id) {
      const existingSubmission = state.submissions.find(submission => submission.id === id)
      if (existingSubmission) {
        commit('SET_SUBMISSION', existingSubmission)
      } else {
        FeedbackService.getSubmission(id)
            .then(response => {
              commit('SET_SUBMISSION', response.data)
            })
            .catch(error => {
              console.log("Submission " + id + " not found" + error)
            })
      }
    }
  },
  modules: {},
});
