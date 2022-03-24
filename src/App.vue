<template>
  <h1>A Brilliant Calculator</h1>
  <div id="flashMessage" v-if="this.$store.state.flashMessage">
    {{ this.$store.state.flashMessage }}
  </div>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/feedback">Feedback</router-link>
    <a id="status">{{ this.$store.getters.GET_USERNAME }}</a>
  </div>


  <router-view />
</template>

<script>
// @ is an alias to /src


export default {
  name: "App",
  data() {
    return {
      username: ""
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f0be19;
}

@keyframes yellowfade {
  from {
    background: #9ac2c9;
  }
  to {
    background: transparent;
  }
}

#status {
  margin-left: 5em;
}

#flashMessage {
  animation-name: yellowfade;
  animation-duration: 1.5s;
  color: whitesmoke;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #f0be19;
}

#nav a.router-link-exact-active {
  color: #f0be19;
}
</style>
