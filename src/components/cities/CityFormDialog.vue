<template>
  <form-dialog
    title="Cidade"
    :is-opened="isOpened"
    @close="onClickClose"
    @save="onClickSave"
  >
    <v-autocomplete
      :items="countriesOptions"
      label="País"
      v-model="city.country"
    ></v-autocomplete>
    <v-text-field v-model="city.name" label="Cidade"></v-text-field>

    <div class="row">
      <div class="col-12 col-md-6">
        <v-text-field
          type="number"
          v-model="city.latitude"
          label="Latitude"
        ></v-text-field>
      </div>
      <div class="col-12 col-md-6">
        <v-text-field
          type="number"
          v-model="city.longitude"
          label="Longitude"
        ></v-text-field>
      </div>
    </div>
  </form-dialog>
</template>

<script>
import FormDialog from '@/components/common/FormDialog'
import {City} from '@/api/CitiesApi'

export default {
  components: {FormDialog},

  props: {
    countries: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    isOpened: false,
    city: City(),
    rules: [],
  }),

  computed: {
    countriesOptions() {
      return this.countries.map(country => ({
        text: `${country.code} - ${country.name}`,
        value: country.id,
      }))
    },
    isNew() {
      return this.id !== ''
    },
  },

  methods: {
    /**
     * @public
     */
    open({id, name, country, latitude, longitude} = {}) {
      this.city = City({
        id: id || '',
        name: name || '',
        country,
        latitude,
        longitude,
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
        this.$emit('create', this.city)
      } else {
        this.$emit('update', this.city)
      }
    },
  },
}
</script>
