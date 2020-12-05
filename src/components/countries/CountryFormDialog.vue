<template>
  <form-dialog
    title="País"
    :is-opened="isOpened"
    @close="onClickClose"
    @save="onClickSave"
  >
    <v-text-field v-model="country.name" label="Nome"></v-text-field>
    <v-text-field v-model="country.code" label="Código"></v-text-field>
  </form-dialog>
</template>

<script>
import FormDialog from '@/components/common/FormDialog'
import {Country} from '@/api/CountriesApi'

export default {
  components: {FormDialog},

  data: () => ({
    isOpened: false,
    country: Country({id: '', name: ''}),
    rules: [],
  }),

  computed: {
    isNew() {
      return this.id !== ''
    },
  },

  methods: {
    /**
     * @public
     */
    open({id, name, code} = {}) {
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
      if (this.isNew) {
        this.$emit('create', this.country)
      } else {
        this.$emit('update', this.country)
      }
    },
  },
}
</script>
