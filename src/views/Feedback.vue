<template>
  <div class="Feedback">
    <h1>Please leave your feedback!</h1>
    <form id="inputs" @submit.prevent="onSubmit">
      <BaseInput class="inputFields" id="name"
        label="Name"
        type="text"
        value="getName"
        v-model="name"
        :error="errors.name"
        />
      <BaseInput class="inputFields" id="emailField"
        label="Email"
        type="email"
        v-model.lazy="email"
        :error="errors.email"

        />
      <BaseInput class="inputFields"
        id="message"
        label="Message"
        type="text"

        v-model="message"
        :error="errors.message"
       />
      <button type="submit" >Submit</button>
    </form>

  </div>
</template>

<script>
// @ is an alias to /src
import BaseInput from "@/components/BaseInput";
import { v4 as uuidv4 } from 'uuid';
import { useField, useForm } from 'vee-validate';
import { object, string } from 'yup'

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
      }
    }
  },
  setup() {
    const validationSchema = object({
      name: string().required().matches(/^[A-ÅÆØa-æøå ]*$/, "Please enter valid name"),
      email: string().email("Please enter a valid email").required(),
      message: string().required()
    })

    const { handleSubmit, errors} = useForm({
      validationSchema
    })

    const { value: name} = useField('name')
    const { value: email} = useField('email')
    const { value: message} = useField('message')

    const submit = handleSubmit((values) => {
      console.log(values)
    })

    return {
      email,
      name,
      message,
      submit,
      errors
    }
  },
  created() {
    this.$store.dispatch('fetchSubmissions')
  },
  methods: {
    onSubmit() {
      const submission = {
        ...this.submission,
        id: uuidv4(),
        name: this.name,
        email: this.email,
        message: this.message,

      }
      console.log(submission.name)
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
    },
  },
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