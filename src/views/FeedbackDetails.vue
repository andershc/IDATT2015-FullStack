<template>
  <div v-if="submission">
    <h1> Submission successfully sent!</h1>
    <p> Name: {{ submission.name }}</p>
    <p> Email: {{ submission.email }}</p>
    <p> Message: {{ submission.message }}</p>
    <footer>Thank you for contributing!</footer>
    <button @click="done" id="done">Done</button>
  </div>
</template>

<script>
export default {
  props: ['id'],
  created() {
    this.$store.commit('SET_FLASHMESSAGE', "Feedback sent!")
    setTimeout(() => {
      this.$store.commit('SET_FLASHMESSAGE', '')
    }, 3000)
    this.$store.dispatch('fetchSubmission', this.id)
        .catch(error => {
          this.$router.push({
            name: 'ErrorDisplay',
            params: { error: error }
          })
        })
  },
  computed: {
    submission() {
      return this.$store.state.submission
    }
  },
  methods: {
    done() {
      this.$router.push({
        name: 'Home',
      })
    }
  }
}
</script>
<style scoped>
@import "./../styles/FeedbackDetails.css";
</style>