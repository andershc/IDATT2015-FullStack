<template>
  <div class="Feedback">
    <h1>Please leave your feedback!</h1>
    <form id="inputs" @submit.prevent="onSubmit">
      <BaseInput
          v-model="submission.name"
          label="Name"
          type="text"
      />
      <BaseInput
          v-model="submission.email"
          label="E-mail"
          type="text"
          resize:="none"
      />
      <BaseInput
          id="message"
          v-model="submission.message"
          label="Message"
          type="text"
      />
      <button :disabled="submission.message === '' || submission.email === ''
      || submission.name === ''" type="submit">Submit</button>
    </form>

  </div>
</template>

<script>
// @ is an alias to /src
import BaseInput from "@/components/BaseInput";
import { v4 as uuidv4 } from 'uuid';

export default {
  name: "Feedback",
  components: {
    BaseInput,
  },
  data() {
    return {
      submission: {
        name: '',
        email: '',
        message: '',
        id: ''
      }
    }
  },
  methods: {
    onSubmit() {
      const submission = {
        ...this.submission,
        id: uuidv4(),
      }
      this.$store.dispatch('submitSubmission', submission)
          .then(() => {
            console.log("Success")
          })
          .catch(error => {
            this.$router.push({
              name: 'ErrorDisplay',
              params: { error: error }
            })
          })
    }
  }
};
</script>

<style>
#inputs {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  margin: auto;
}
#message {
  height:10em;
}
button{
  max-width: 8em;
  margin-left: 70%;
  background: #f0be19;

}
</style>