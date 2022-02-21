<template>
  <h1>A Brilliant Calculator</h1>
  <div id="flashMessage" v-if="this.$store.state.flashMessage"> {{ this.$store.state.flashMessage }}</div>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/feedback">Feedback</router-link>
  </div>
  <router-view />
</template>


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
    background: #9AC2C9;
  }
  to {
    background: transparent;
  }
}

#flashMessage {
  animation-name: yellowfade;
  animation-duration: 1.5s;
  color: whitesmoke
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
