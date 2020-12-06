<template>
  <div class="login-container">
    <h1 class="toolbar">Previsão do Tempo</h1>
    <login-illustration class="logo"> </login-illustration>
    <login-form
      class="form"
      :login-state="loginState"
      @change="loginChange"
      @submit="submitLogin"
    ></login-form>
  </div>
</template>

<script>
import LoginForm from '@/components/login/LoginForm'
import LoginIllustration from '@/components/login/LoginIllustration'
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'

export default {
  components: {LoginForm, LoginIllustration},
  computed: {
    ...mapState('authentication', ['loginState']),
    ...mapGetters('authentication', ['isAuthenticated']),
  },
  watch: {
    isAuthenticated(isAuthenticated) {
      if (isAuthenticated) {
        this.$router.push({name: 'Dashboard'})
      }
    },
  },
  methods: {
    ...mapActions('authentication', ['submitLogin']),
    ...mapMutations('authentication', ['loginChange']),
  },
}
</script>

<style lang="scss" scoped>
.login-container {
  display: grid;
  width: 100%;
  height: 100%;

  justify-items: center;
  align-items: center;
}

@media (max-width: 1024px) {
  .login-container {
    grid-template-rows: 25% 25% auto;
    grid-template-columns: 1fr;
    grid-template-areas:
      'toolbar'
      'logo'
      'form';
  }

  .logo {
    width: 200px;
    align-self: center;
  }

  .form {
    width: 80%;
    align-self: center;
  }
}

@media (min-width: 1024px) {
  .login-container {
    grid-template-rows: 25% 50%;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'toolbar toolbar'
      'logo form';
  }

  .form {
    max-width: 600px;
    width: 50%;
    grid-area: form;
    justify-self: start;
    align-self: start;
  }

  .logo {
    grid-area: logo;
    width: 50%;
    align-self: start;
    justify-self: end;
  }

  .toolbar {
    grid-area: toolbar;
  }

  .login-card {
    width: 100%;
  }
}
</style>
