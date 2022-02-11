<template>
  <div class="Feedback">
      <h1>Please leave feedback!</h1>
    <form>
      <BaseInput
        v-model="submission.name"
        label="Name"
        type="text"
      />
      <BaseInput
          v-model="submission.email"
          label="E-mail"
          type="text"
      />
      <BaseInput
          v-model="submission.message"
          label="Message"
          type="text"
      />
      <button type="submit">Submit</button>
    </form>

  </div>
</template>

<script>
// @ is an alias to /src
import BaseInput from "@/components/BaseInput";

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
        message: ''
      }
    }
  },
};
</script>

