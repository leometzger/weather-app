<template>
  <form-dialog
    title="País"
    :is-opened="isOpened"
    :is-valid="!$v.invalid"
    @close="onClickClose"
    @save="onClickSave"
  >
    <v-text-field
      v-model="country.code"
      label="Código"
      :error-messages="codeErrors"
      @input="$v.country.code.$touch"
    ></v-text-field>
    <v-text-field
      v-model="country.name"
      label="Nome"
      :error-messages="nameErrors"
      @input="$v.country.name.$touch"
    ></v-text-field>
  </form-dialog>
</template>

<script>
import FormDialog from '@/components/common/FormDialog'
import {Country} from '@/api/CountriesApi'
import {buildMessages} from '@/utils/vuelidate'
import {required} from 'vuelidate/lib/validators'
import {isValidCountryCode} from './customValidations'
import {validationMixin} from 'vuelidate'

export default {
  mixins: [validationMixin],
  components: {FormDialog},

  data: () => ({
    isOpened: false,
    country: Country(),
    rules: [],
  }),

  computed: {
    isNew() {
      return this.id !== ''
    },
    codeErrors() {
      return buildMessages(this.$v.country.code, {
        required: 'Campo requerido',
        isValidCountryCode: 'Código do país inexistente',
      })
    },
    nameErrors() {
      return buildMessages(this.$v.country.name, {required: 'Campo requerido'})
    },
  },

  methods: {
    /**
     * @public
     */
    open({id, name, code} = {}) {
      this.$v.$touch()
      this.$v.$reset()
      this.country = Country({
        id: id || '',
        name: name || '',
        code,
      })
      this.isOpened = true
    },
    /**
     * @public
     */
    close() {
      this.isOpened = false
    },
    onClickClose() {
      this.isOpened = false
    },
    onClickSave() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      if (this.isNew) {
        this.$emit('create', this.country)
      } else {
        this.$emit('update', this.country)
      }
    },
  },

  validations: {
    country: {
      code: {required, isValidCountryCode},
      name: {required},
    },
  },
}
</script>
