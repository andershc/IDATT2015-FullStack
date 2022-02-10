<template>
  <h1>A Brilliant Calculator</h1>
  <Calculator></Calculator>
</template>

<script>
// @ is an alias to /src
import Calculator from "@/components/Calculator.vue";

export default {
  name: "Home",
  components: {
    Calculator,
  },
};
</script>

<style scoped>
h1{
  color: #f0be19;
}
</style>
