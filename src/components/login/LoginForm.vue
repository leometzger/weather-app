<template>
  <v-form>
    <h3 class="mb-10">Autenticação</h3>
    <v-text-field
      autofocus
      outlined
      id="username"
      prepend-icon="person"
      type="text"
      label="Usuário"
      v-model="login.username"
      :error-messages="usernameErrors"
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
      :error-messages="passwordErrors"
      v-model="login.password"
      @keyup.enter="$emit('submit', login)"
    >
    </v-text-field>
    <v-btn
      id="login"
      outlined
      color="secondary"
      :loading="loading"
      :disabled="$v.invalid"
      @click="$emit('submit', login)"
    >
      Login
    </v-btn>
  </v-form>
</template>

<script>
import {buildMessages} from '@/utils/vuelidate'
import {isInvalidState} from './customValidations'
import {required} from 'vuelidate/lib/validators'
import {validationMixin} from 'vuelidate'

export default {
  mixins: [validationMixin],
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
    loginError: false,
  }),

  computed: {
    isInvalid() {
      return this.loginState !== 'LOGIN_ERROR'
        ? () => true
        : () => 'Usuário ou senha inválidos'
    },
    loading() {
      return this.loginState === 'LOGGIN_IN'
    },

    usernameErrors() {
      return buildMessages(this.$v.username, {
        required: 'Campo requerido',
      })
    },
    passwordErrors() {
      return buildMessages(this.$v.password, {
        required: 'Campo requerido',
        isInvalidState: 'Usuário ou senha inválidos',
      })
    },
  },

  watch: {
    login: {
      deep: true,
      handler() {
        this.$emit('change')
      },
    },
  },

  validations: {
    username: {required},
    password: {required, isInvalidState},
  },
}
</script>
