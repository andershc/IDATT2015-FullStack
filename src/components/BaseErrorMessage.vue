<template>
  <p aria-live="assertive" class="errorMessage" :id="id">
    <slot />
  </p>
</template>

<script>
export default {
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
};
</script>

<style scoped>
.errorMessage {
  color: red;
  margin-bottom: 1em;
}
</style>
