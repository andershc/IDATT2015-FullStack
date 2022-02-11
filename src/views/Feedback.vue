<template>
  <div class="Feedback">
    <h1>Please leave your feedback!</h1>
    <form id="inputs" @submit.prevent="onSubmit">
      <BaseInput class="inputFields"
          v-model="submission.name"
          label="Name"
          type="text" required
          model-value="name"/>
      <BaseInput class="inputFields"
          v-model="submission.email"
          label="E-mail"
          type="text"
          resize:="none" required
          model-value="email"/>
      <BaseInput class="inputFields"
          id="message"
          v-model="submission.message"
          label="Message"
          type="text" required
          model-value="message"/>
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
.inputFields:invalid{
  border-color: red;
  border-width: 0.1em;
}
#message {
  height:20em;

}
button{
  max-width: 8em;
  margin-left: 80%;
  background: #f0be19;

}
button:disabled{
  background: #78797e;
}
</style>