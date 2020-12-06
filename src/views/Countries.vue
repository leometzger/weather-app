<template>
  <div class="countries-container">
    <delete-dialog
      ref="deleteDialog"
      message="Tem certeza que deseja deletar o país?"
      submessage="Essa operação excluirá as cidades associadas também"
      @confirm="deleteCountry"
    />
    <countries-list
      :countries="countries"
      @new-item="onClickNew"
      @edit-item="onClickEdit"
      @delete-item="onClickDelete"
    />
    <country-form ref="countryForm" @create="onCreate" @update="onUpdate" />
  </div>
</template>

<script>
import CountriesList from '@/components/countries/CountriesList'
import CountryForm from '@/components/countries/CountryFormDialog.vue'
import DeleteDialog from '@/components/common/DeleteDialog'
import {mapActions, mapState} from 'vuex'

export default {
  components: {CountriesList, CountryForm, DeleteDialog},

  computed: {
    ...mapState('countries', ['countries']),
  },

  mounted() {
    this.fetchCountries()
  },

  methods: {
    ...mapActions('countries', [
      'fetchCountries',
      'createCountry',
      'updateCountry',
      'deleteCountry',
    ]),
    onClickEdit(country) {
      this.$refs.countryForm.open(country)
    },
    onClickDelete(country) {
      this.$refs.deleteDialog.open(country)
    },
    onClickNew() {
      this.$refs.countryForm.open()
    },
    async onCreate(country) {
      await this.createCountry(country)
      this.$refs.countryForm.close()
    },
    async onUpdate(country) {
      await this.updateCountry(country)
      this.$refs.countryForm.close()
    },
  },
}
</script>

<style lang="scss" scoped>
.countries-container {
  margin-top: 30px;
  display: grid;
  width: 100%;
  height: 100%;

  align-content: center;
  justify-content: center;

  grid-template-columns: 80%;
}
</style>
