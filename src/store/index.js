import { createStore } from "vuex";

export default createStore({
  state: {
    submissions: [],
    submission: {}
  },
  mutations: {},
  actions: {
    submitSubmission(submission) {
      console.log("Submission sent! " + submission.id)

    }
  },
  modules: {},
});
