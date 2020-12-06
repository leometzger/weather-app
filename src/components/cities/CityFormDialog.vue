<template>
  <form-dialog
    title="Cidade"
    :is-opened="isOpened"
    :is-valid="!$v.invalid"
    @close="onClickClose"
    @save="onClickSave"
  >
    <v-autocomplete
      :items="countriesOptions"
      :disabled="!isNew"
      label="País"
      v-model="city.country"
      :error-messages="countryErrors"
      @change="$v.city.country.$touch"
    ></v-autocomplete>
    <v-text-field
      v-model="city.name"
      label="Cidade"
      :error-messages="nameErrors"
      @input="$v.city.name.$touch"
    ></v-text-field>

    <div class="row">
      <div class="col-12 col-md-6">
        <v-text-field
          autofocus
          type="number"
          v-model="city.latitude"
          label="Latitude"
          :error-messages="latitudeErrors"
          @input="$v.city.latitude.$touch"
        ></v-text-field>
      </div>
      <div class="col-12 col-md-6">
        <v-text-field
          type="number"
          v-model="city.longitude"
          :error-messages="longitudeErrors"
          label="Longitude"
          @input="$v.city.longitude.$touch"
        ></v-text-field>
      </div>
    </div>
  </form-dialog>
</template>

<script>
import FormDialog from '@/components/common/FormDialog'
import {City} from '@/api/CitiesApi'
import {required, minValue, maxValue} from 'vuelidate/lib/validators'
import {validationMixin} from 'vuelidate'
import {buildMessages} from '@/utils/vuelidate'

export default {
  mixins: [validationMixin],
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
    isNew() {
      return !this.city.id
    },
    countryErrors() {
      return buildMessages(this.$v.city.country, {required: 'Campo requerido'})
    },
    nameErrors() {
      return buildMessages(this.$v.city.name, {required: 'Campo requerido'})
    },
    latitudeErrors() {
      return buildMessages(this.$v.city.latitude, {
        required: 'Campo requerido',
        minValue: 'Valor mínimo para latitude é -90',
        maxValue: 'Valor máximo para latitude é 90',
      })
    },
    longitudeErrors() {
      return buildMessages(this.$v.city.longitude, {
        required: 'Campo requerido',
        minValue: 'Valor mínimo para longitude é -180',
        maxValue: 'Valor máximo para longitude é 180',
      })
    },
    countriesOptions() {
      return this.countries.map(country => ({
        text: `${country.code} - ${country.name}`,
        value: country.id,
      }))
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
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      if (this.isNew) {
        this.$emit('create', this.city)
      } else {
        this.$emit('update', this.city)
      }
    },
  },

  validations: {
    city: {
      country: {required},
      name: {required},
      latitude: {required, minValue: minValue(-90), maxValue: maxValue(90)},
      longitude: {required, minValue: minValue(-180), maxValue: maxValue(180)},
    },
  },
}
</script>
