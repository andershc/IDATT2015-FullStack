<template>
  <div class="Feedback">
    <h1>Please leave your feedback!</h1>
    <form id="inputs" @submit.prevent="onSubmit">
      <BaseInput class="inputFields" id="name"
        label="Name"
        type="text"
        value="getName"
        v-model.lazy="this.$store.state.user"
        v-model="submission.name"
        :error="nameError"
        />
      <BaseInput class="inputFields" id="emailField"
        label="Email"
        type="email"
        v-model.lazy="this.$store.state.userEmail"
        v-model="submission.email"
        :error="emailError"

        />
      <BaseInput class="inputFields"
        id="message"
        label="Message"
        type="text"

        v-model="submission.message"
        :error="messageError"
       />
      <button :disabled="!isComplete" type="submit">Submit</button>
    </form>

  </div>
</template>

<script>
// @ is an alias to /src
import BaseInput from "@/components/BaseInput";
import { v4 as uuidv4 } from 'uuid';
import { useField, useForm } from 'vee-validate';

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
      },
      nameIsValid: false,
      emailIsValid: false,
      messageIsValid: false
    }
  },
  setup() {
    const errorMessage = 'This field is required'
    const validations = {
      name: (value) => {
        if (value === undefined || value == null || !String(value).length){
          return errorMessage
        }
        if (value.type !== String) {
          return 'Name must be a string'
        } else{
          this.nameIsValid = true
          return true
        }
      },
      email: (value) => {
        if (!value) {
          return 'This field is required'
        }
        const regexEmailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!regexEmailCheck.test(String(value).toLowerCase())) {
          return 'Please enter a valid email address'
        }
        this.emailIsValid = true
        return true
      },
      message: (value) => {
        if (value === undefined || value === null || !String(value).length) {
          return errorMessage
        }
        this.messageIsValid = true
        return true
      }
    }
    useForm({
      validationSchema: validations
    });

    const { value: name, errorMessage: nameError } = useField('name')
    const { value: email, errorMessage: emailError, handleChange } = useField('email')
    const { value: message, errorMessage: messageError } = useField('message')
    return {
      email,
      emailError,
      name,
      nameError,
      message,
      messageError,
      handleChange
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
    }
  },
  computed: {
    isComplete () {
      return this.submission.name && this.submission.email && this.submission.message
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