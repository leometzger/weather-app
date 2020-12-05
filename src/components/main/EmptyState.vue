<template>
  <div class="empty-state-container">
    <div v-if="!countries.length || !cities.length" class="welcome-message">
      <h4>
        Bem vindo! Aqui você pode acompanhar a previsão do tempo de cidades do
        seu interesse.
      </h4>
      <h5>Cadastre uma cidade para começar a acompanhar</h5>
    </div>
    <div v-else></div>
    <v-btn
      v-if="!countries.length"
      width="200px"
      color="primary"
      class="mb-10"
      @click="$emit('insert-country')"
      >Criar País</v-btn
    >
    <v-btn
      v-else-if="!cities.length"
      width="200px"
      color="primary"
      class="mb-10"
      @click="$emit('insert-city')"
      >Criar Cidade</v-btn
    >
    <empty-state-illustration class="mb-10 mx-2"></empty-state-illustration>
  </div>
</template>

<script>
import EmptyStateIllustration from './EmptyStateIllustration'

export default {
  components: {EmptyStateIllustration},
  props: {
    countries: {
      type: Array,
      required: false,
      default: () => [],
    },
    cities: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.welcome-message {
  color: rgba(0, 0, 0, 0.6);
  margin: 20px;
  margin-bottom: 30px;
}

.empty-state-container {
  display: grid;

  height: 100%;

  align-content: bottom;
  justify-content: center;
}
</style>
