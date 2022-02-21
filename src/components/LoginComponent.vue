<template>
  <div id="loginContainer">
    <div id="loginTitle">
      <label>Please login!</label>
    </div>
    <div id="username">
      <label id="usernameLabel">Username:</label>
      <textarea v-model="user.username"></textarea>
    </div>
    <div id="password">
      <label id="passwordLabel">Password: </label>
      <textarea v-model="user.password"></textarea>
      <button v-on:click="handleClickSignin_2">Sign in</button>
      <label id="loginstatusLabel">{{loginStatus}}</label>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'LoginComponent',
  methods: {
    async handleClickSignin (){
      //alert("You entered, username: " + this.username);
      const loginRequest = { username:this.username, password: this.password };
      const loginResponse = await axios.post("http://localhost:8085/demo/login", loginRequest);
      console.log(loginResponse);
      alert("Login: " + loginResponse.data.loginStatus);
    },
    handleClickSignin_2 () {
      if(this.$store.dispatch("fetchUser", this.user.username)){
        this.user.loginStatus = "logged in"
        console.log("Logged in")
      } else {
        this.user.loginStatus = "Don't have an account? Register here"
        console.log("Not an existing user")
      }
    },

  },
  data() {
    return {
      user:{
        username: '',
        password: '',
        loginStatus: '',
      }
    }
  },
  created() {
    this.$store.dispatch('fetchUsers')
  }

}
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

#username, #password {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 20px;
}

#usernameLabel, #passwordLabel {
  width: 100px;
}
textarea{
  resize: none;
}

</style>

