<template>
  <div class="wrapper">
    <div class="form-signin">
      <h2 class="form-signin-heading">Please login!</h2>
      <div class="inputDiv">
        <label class="inputLabel">Username:</label>
        <input
          class="form-control"
          data-testid="usernameField"
          v-model="user.username"
        />
      </div>
      <div class="inputDiv">
        <label class="inputLabel">Password: </label>
        <input
          class="form-control"
          data-testid="passwordField"
          type="password"
          v-model="user.password"
        />
      </div>
      <button
        class="button"
        data-testid="submit"
        type="submit"
        v-on:click="handleSignIn"
      >
        Sign in
      </button>
      <label data-testid="loginStatusField"> {{ loginStatus }}</label>
      <router-link id="link" v-if="loginStatus" to="/register"
        >Register</router-link
      >
    </div>
  </div>
</template>

<script>
import router from "@/router";
import store from "@/store";
import UserService from "@/services/UserService";

export default {
  name: "LoginComponent",
  methods: {
    async handleSignIn() {
      console.log(this.user.password + " " + this.user.username);
      const response = await UserService.loginUser(this.user);
      if (response === "Wrong password") {
        this.loginStatus = "Failed";
        alert(response);
      } else if (response === "Access denied, wrong credentials....") {
        this.loginStatus = "Failed";
        alert(response);
      } else {
        this.loginStatus = "Success";
        store.commit("SET_TOKEN", response);
        const loggedInUser = await UserService.getUser(
          this.user.username,
          this.user.password
        );
        this.id = loggedInUser.id;
        await router.push({
          name: "Home",
        });

        console.log("Logged in as " + this.user.username);
      }
      store.commit("SET_LOGINSTATUS", this.loginStatus);
      store.commit("SET_USER", this.user);
    },
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
        id: "",
      },
      loginStatus: "",
      token: "",
    };
  },
  created() {
    store.commit("SET_LOGINSTATUS", "");
  },
};
</script>

<style scoped>
body {
  background: #424749 !important;
}

.wrapper {
  margin-top: 80px;
  margin-bottom: 80px;
}

.form-signin {
  max-width: 380px;
  padding: 15px 35px 45px;
  margin: 0 auto;
  background-color: #424749;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.form-signin-heading {
  margin-bottom: 30px;
}

.form-control {
  position: relative;
  font-size: 16px;
  height: auto;
  padding: 10px;
  text-align: left;
}

input[type="text"] {
  margin-bottom: -1px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

input[type="password"] {
  margin-bottom: 20px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.inputDiv {
  display: flex;
  flex-direction: column;
}
.inputLabel {
  text-align: left;
}
.button{
  background: #f0be19;
  color: black;
}
.button:hover{
  background: #f6c875;
  color: black;
  cursor: pointer;
}
</style>
