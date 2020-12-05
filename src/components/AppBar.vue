<template>
  <v-app-bar color="deep-purple accent-4" dense dark>
    <v-toolbar-title>Previsão do tempo</v-toolbar-title>
    <v-spacer></v-spacer>
    <a class="link mx-2" @click="goToRoute('Dashboard')">Dashboard</a>
    <a class="link mx-2" @click="goToRoute('Countries')">Países</a>
    <a class="link mx-2" @click="goToRoute('Cities')">Cidades</a>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    goToRoute(name) {
      if (this.$route.name !== name) {
        this.$router.push({name})
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.link {
  color: white;
}
</style>
