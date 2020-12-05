<template>
  <v-app id="app" class="app">
    <vue-page-transition class="transition" name="fade-in-up">
      <router-view />
    </vue-page-transition>
  </v-app>
</template>

<style lang="scss">
html {
  height: 100%;
  width: 100%;
}

body {
  height: 100%;
  width: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: linear-gradient(0deg, #fff, #9fa8da) !important;
}

.app {
  width: 100%;
  height: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.transition {
  height: 100%;
}
</style>
