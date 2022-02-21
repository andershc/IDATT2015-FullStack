<template>
  <div class="Feedback">
    <h1>Please leave your feedback!</h1>
    <form id="inputs" @submit.prevent="onSubmit">
      <BaseInput class="inputFields" id="name"
        label="Name"
        type="text"
        v-model="submission.name"
        :error="errors.name"
        @validate="validate('name')"
        />
      <BaseInput class="inputFields" id="emailField"
        label="Email"
        type="email"
        v-model.lazy="submission.email"
        :error="errors.email"
        @validate="validate('email')"
        />
      <BaseInput class="inputFields"
        id="message"
        label="Message"
        type="text"
        v-model="submission.message"
        :error="errors.message"
        @validate="validate('message')"
       />
      <button type="submit" >Submit</button>
    </form>

  </div>
</template>

<script>
// @ is an alias to /src
import BaseInput from "@/components/BaseInput";
import { v4 as uuidv4 } from 'uuid';
import { object, string } from 'yup'

const validationSchema = object({
  name: string().required().matches(/^[A-ÅÆØa-æøå ]*$/, "Please enter valid name"),
  email: string().email("Please enter a valid email").required(),
  message: string().required("Please enter a message")
})

export default {
  name: "Feedback",
  components: {
    BaseInput,
  },
  data() {
    return {
      submission: {
        id: '',
        name: '',
        email: '',
        message: '',
      },
      errors: {
        name: '',
        email: '',
        message: ''
      }
    }
  },
  created() {
    this.$store.dispatch('fetchSubmissions')
    if(this.$store.state.user){
      this.submission.name = this.$store.state.user
    }
    if(this.$store.state.userEmail){
      this.submission.email = this.$store.state.userEmail
    }

  },
  methods: {
    sendFeedback() {
      const submission = {
        ...this.submission,
        id: uuidv4(),
      }
      this.$store.commit('SET_FLASHMESSAGE', "Sending feedback...")
      setTimeout(() => {
        this.$store.dispatch('submitSubmission', submission)
            .then(() => {
              this.$router.push({
                name: 'FeedbackDetails',
                params: { id: submission.id }
              })
            })
            .catch(error => {
              this.$router.push({
                name: 'ErrorDisplay',
                params: { error: error }
              })
            })
      }, 1500)

    },
    onSubmit() {
      validationSchema
          .validate(this.submission, { abortEarly: false})
          .then(() => {
            this.errors = {};
            this.sendFeedback()
          })
          .catch(error => {
            error.inner.forEach(error => {
              this.errors = { ...this.errors, [error.path]: error.message };
            });
          })
    },
    validate(field) {
      validationSchema
          .validateAt(field, this.submission)
          .then(() => {
            this.errors[field] = "";
          })
          .catch(error => {
            this.errors[error.path] = error.message;
          })
    }
  }
}
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
  height:2em;

}
.inputFields {
  margin: 1em;
}
button{
  max-width: 8em;
  margin-left: 80%;
  background: #f0be19;
  margin-top: 0.5em;

}
button:disabled{
  background: #78797e;
}
</style>