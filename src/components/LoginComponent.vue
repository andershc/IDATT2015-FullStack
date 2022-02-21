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

    </div>
    <div v-if="loginStatus">{{loginStatus}}
    <router-link v-if="loginStatus" to="/register">Register</router-link>
    </div>

  </div>
</template>


<script>
import router from "@/router";

export default {
  name: 'LoginComponent',
  methods: {
    handleClickSignin_2 () {
      this.$store.dispatch("fetchUser", this.user.username)
      const fetchedUser = this.$store.state.user
      if(fetchedUser.username === this.user.username && fetchedUser.password === this.user.password){
        router.push('/')
      } else if(fetchedUser.username === this.user.username){
        this.loginStatus = "Wrong password or username. Don't have an account?"
        console.log("Wrong password")
      } else{
        this.loginStatus = "Don't have an account?"
        console.log("Not an existing user")
      }
    },

  },
  data() {
    return {
      user:{
        username: '',
        password: '',
      },
      loginStatus: '',

    }
  },
  created() {
    this.$store.dispatch('fetchUsers')
    this.$store.commit('SET_LOGINSTATUS', "")
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
  min-width: 40px;
}

#usernameLabel, #passwordLabel {
  width: 100px;
}
textarea{
  resize: none;
}

</style>

