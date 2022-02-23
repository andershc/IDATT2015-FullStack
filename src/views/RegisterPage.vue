<template>
    <h1>Register yourself</h1>
    <div id="inputs">
      <BaseInput label="Full name" type="text" />
      <BaseInput label="Address" type="text" />
      <div id="username" class="input">
        <label>Username</label>
        <input
            placeholder="Username"
            data-testid="usernameRegistrationField"
            v-model="user.username"
            type="text"
        />
      </div>
      <div id="password" class="input">
        <label>Password</label>
        <input
            placeholder="password"
            data-testid="passwordRegistrationField"
            type="text"
            v-model="user.password"
        />
      </div>

      <BaseInput label="Email" type="text" />
      <BaseInput label="Phone" type="tel" />
    </div>
    <button data-testid="submit" @click="onRegister" id="register" type="submit">Register</button>
    <label data-testid="registerStatusField" id="status" v-if="registerStatus">{{registerStatus}}</label>
</template>

<script>
import BaseInput from "@/components/BaseInput";
import { v4 as uuidv4 } from "uuid";
import store from '@/store'
import router from "@/router";

export default {
  name: "RegisterPage",
  components: {
    BaseInput,
  },
  data() {
    return {
      user: {
        id: '',
        username: '',
        password: '',
      },
      registerStatus: ''
    };
  },
  methods: {
    onRegister() {
      const user = {
        ...this.user,
        id: uuidv4(),
      };
      if(!(user.username === '' || user.password === '')){
        store
          .dispatch("submitUser", user)
          .then(() => {
            setTimeout(() =>
              router.push("/login").catch((error) => {
                router.push({
                  name: "ErrorDisplay",
                  params: { error: error },
                })
                  }), 100
              )
          });
      } else{
        this.registerStatus = "failed"
      }
    },
  },
};
</script>

<style scoped>
#inputs {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  margin: auto;
}
#register {
  max-width: 8em;
  margin-left: 29%;
  background: #f0be19;
  margin-top: 0.5em;
  border-radius: 10px;
  padding: 0.5em 1em 0.5em 1em
}

#status {
  color: red;
}

.input {
  text-align: left;
  font-size: 1em;
  color: black;
  background: white;
  padding: 0.5em;
  max-width: 50%;
  margin-left: 35%;
}
::placeholder {
  color: darkgray;
}
</style>
