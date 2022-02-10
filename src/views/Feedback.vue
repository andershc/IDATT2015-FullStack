<template>
  <div class="Feedback">
    <h1>Please leave feedback</h1>
  </div>
  <base-input></base-input>
</template>

<script>
// @ is an alias to /src
import BaseInput from "@/components/BaseInput";

export default {
  name: "Feedback",
  components: {
    BaseInput,
  },
};
</script>

