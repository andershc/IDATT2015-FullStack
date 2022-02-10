<template>
  <h1>A Brilliant Calculator</h1>
  <div id="nav">
    <router-link to="/">Home</router-link> |
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
