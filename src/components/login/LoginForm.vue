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
      :value="login.username"
      :error-messages="usernameErrors"
      :disabled="loading"
      @input="changeUsername"
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
      :value="login.password"
      @input="changePassword"
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
import {required} from 'vuelidate/lib/validators'
import {validationMixin} from 'vuelidate'
import {authStates} from '@/store/authentication'

const isValidState = (value, vm) => {
  return vm.state !== authStates.LOGIN_ERROR
}

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
      state: authStates.UNAUTHENTICATED,
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
      return buildMessages(this.$v.login.username, {
        required: 'Campo requerido',
      })
    },
    passwordErrors() {
      return buildMessages(this.$v.login.password, {
        required: 'Campo requerido',
        isValidState: 'Usuário ou senha inválidos',
      })
    },
  },

  watch: {
    loginState(state) {
      this.login.state = state
      this.$v.login.password.$touch()
    },
  },

  methods: {
    changeUsername(value) {
      this.login.username = value
      this.$v.login.username.$touch()
      this.$emit('change')
    },
    changePassword(value) {
      this.login.password = value
      this.$v.login.password.$touch()
      this.$emit('change')
    },
  },

  validations: {
    login: {
      username: {required},
      password: {required, isValidState},
    },
  },
}
</script>
