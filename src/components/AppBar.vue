<template>
  <v-app-bar color="deep-purple accent-4" dense dark>
    <v-toolbar-title>Previsão do tempo</v-toolbar-title>
    <v-spacer></v-spacer>
    <div class="d-none d-md-flex">
      <a class="link mx-2" @click="goToRoute('Dashboard')">Dashboard</a>
      <a class="link mx-2" @click="goToRoute('Countries')">Países</a>
      <a class="link mx-2" @click="goToRoute('Cities')">Cidades</a>
    </div>
    <div class="d-sm-flex d-md-none">
      <v-menu left bottom>
        <template v-slot:activator="{on, attrs}">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="goToRoute('Dashboard')">
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
          <v-list-item @click="goToRoute('Countries')">
            <v-list-item-title>Países</v-list-item-title>
          </v-list-item>
          <v-list-item @click="goToRoute('Cities')">
            <v-list-item-title>Cidades</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
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
