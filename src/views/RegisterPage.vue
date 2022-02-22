<template>
  <form @submit.prevent="onRegister">
    <h1>Register yourself</h1>
    <div id="inputs">
      <BaseInput label="Full name" type="text" />
      <BaseInput label="Address" type="text" />
      <BaseInput label="Username" v-model="user.username" type="text" />
      <BaseInput label="Password" type="text" v-model="user.password" />
      <BaseInput label="Email" type="text" />
      <BaseInput label="Phone" type="tel" />
    </div>
    <button type="submit">Register</button>
  </form>
</template>

<script>
import BaseInput from "@/components/BaseInput";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "RegisterPage",
  components: {
    BaseInput,
  },
  data() {
    return {
      user: {
        id: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    onRegister() {
      const user = {
        ...this.user,
        id: uuidv4(),
      };
      this.$store
        .dispatch("submitUser", user)
        .then(() => {
          this.$router.push("/login");
        })
        .catch((error) => {
          this.$router.push({
            name: "ErrorDisplay",
            params: { error: error },
          });
        });
    },
  },
};
</script>

<style scoped>
#inputs {
  display: flex;
  flex-direction: column;
}
</style>
