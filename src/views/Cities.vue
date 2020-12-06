<template>
  <div class="cities-container">
    <delete-dialog
      ref="deleteDialog"
      message="Tem certeza que deseja deletar a cidade?"
      @confirm="deleteCity"
    />
    <cities-list
      :cities="cities"
      :countries="countries"
      @new-item="onClickNew"
      @edit-item="onClickEdit"
      @delete-item="onClickDelete"
    />
    <city-form
      ref="cityForm"
      :countries="countries"
      @create="onCreate"
      @update="onUpdate"
    />
  </div>
</template>

<script>
import CitiesList from '@/components/cities/CitiesList'
import CityForm from '@/components/cities/CityFormDialog.vue'
import DeleteDialog from '@/components/common/DeleteDialog'
import {mapActions, mapState} from 'vuex'

export default {
  components: {CitiesList, CityForm, DeleteDialog},

  computed: {
    ...mapState('cities', ['cities']),
    ...mapState('countries', ['countries']),
  },

  mounted() {
    this.fetchCountries()
    this.fetchCities()
  },

  methods: {
    ...mapActions('cities', [
      'fetchCities',
      'createCity',
      'updateCity',
      'deleteCity',
    ]),
    ...mapActions('countries', ['fetchCountries']),
    onClickEdit(city) {
      this.$refs.cityForm.open(city)
    },
    onClickDelete(city) {
      this.$refs.deleteDialog.open(city)
    },
    onClickNew() {
      this.$refs.cityForm.open()
    },
    async onCreate(city) {
      await this.createCity(city)
      this.$refs.cityForm.close()
    },
    async onUpdate(city) {
      await this.updateCity(city)
      this.$refs.cityForm.close()
    },
  },
}
</script>

<style lang="scss" scoped>
.cities-container {
  margin-top: 30px;
  display: grid;
  width: 100%;
  height: 100%;

  align-content: center;
  justify-content: center;

  grid-template-columns: 80%;
}
</style>
