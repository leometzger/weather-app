<template>
  <v-form>
    <h3 class="mb-10">Autenticação</h3>
    <v-text-field
      autofocus
      outlined
      id="login"
      prepend-icon="person"
      type="text"
      label="Usuário"
      v-model="login.username"
      :disabled="loading"
    ></v-text-field>
    <v-text-field
      outlined
      id="password"
      label="Senha"
      name="password"
      prepend-icon="lock"
      type="password"
      :disabled="loading"
      v-model="login.password"
      @keyup.enter="$emit('submit', login)"
    >
    </v-text-field>
    <v-btn
      outlined
      color="secondary"
      :loading="loading"
      @click="$emit('submit', login)"
    >
      Login
    </v-btn>
  </v-form>
</template>

<script>
export default {
  props: {
    loginState: {
      typy: String,
      required: true,
    },
  },
  data: () => ({
    login: {
      username: '',
      password: '',
    },
    rules: {
      required: value => !!value,
    },
  }),
  computed: {
    loading() {
      return this.loginState === 'LOGGIN_IN'
    },
  },
}
</script>
