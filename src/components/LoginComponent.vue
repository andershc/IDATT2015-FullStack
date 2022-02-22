<template>
  <div id="loginContainer">
    <div id="loginTitle">
      <label>Please login!</label>
    </div>
    <div id="username">
      <label id="usernameLabel">Username:</label>
      <textarea data-testid="usernameField" v-model="user.username"></textarea>
    </div>
    <div id="password">
      <label id="passwordLabel">Password: </label>
      <textarea data-testid="passwordField" v-model="user.password"></textarea>
      <button data-testid="submit" type="submit" v-on:click="handleSignIn">Sign in</button>
    </div>
    <label data-testid="loginStatusField">
      {{ loginStatus }}</label>
      <router-link  id="link" v-if="loginStatus" to="/register">Register</router-link>

  </div>
</template>

<script>
import router from "@/router";
import store from "@/store";

export default {
  name: "LoginComponent",
  methods: {
    handleSignIn() {
      console.log(this.user.password + " " + this.user.username)
      store.dispatch("fetchUser", this.user.username);
      const fetchedUser = store.state.user;
      if (
        fetchedUser.username === this.user.username &&
        fetchedUser.password === this.user.password
      ) {
        this.loginStatus="Success"
        router.push("/");
      } else if (fetchedUser.username === this.user.username) {
        this.loginStatus = "Failed";
        console.log("Wrong password");
      } else {
        this.loginStatus = "Failed";
        console.log("Not an existing user");
      }
    },
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      loginStatus: "",
    };
  },
  created() {
    store.dispatch("fetchUsers");
    store.commit("SET_LOGINSTATUS", "");
  },
};
</script>

<style scoped>
#loginContainer {
  display: grid;
  justify-content: center;
  margin: 40px;
}

#loginTitle {
  font-size: x-large;
  font-weight: bold;
  margin-bottom: 20px;
}

#username,
#password {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 20px;
  min-width: 40px;
}

#usernameLabel,
#passwordLabel {
  width: 100px;
}
textarea {
  resize: none;
}
#link {
  color: white;
}
</style>
