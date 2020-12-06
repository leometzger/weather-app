<template>
  <v-data-table
    hide-default-footer
    :headers="headers"
    :search="search"
    :items="cities"
    :items-per-page="Infinity"
    @new-item="$emit('new-item')"
  >
    <template v-slot:top>
      <list-header
        title="Cidade"
        new-title="Inserir cidade"
        @new-item="$emit('new-item')"
      ></list-header>
      <search-input class="mx-4" v-model="search" />
    </template>

    <template v-slot:item.name="{item}">
      <strong>{{ item.name }}</strong>
    </template>

    <template v-slot:item.country="{item}">
      <v-chip outlined color="primary" small>{{
        getCountryById(item.country)
      }}</v-chip>
    </template>

    <template v-slot:item.actions="{item}">
      <v-icon small class="mr-2" @click="$emit('edit-item', item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="$emit('delete-item', item)">
        mdi-delete
      </v-icon>
    </template>

    <template v-slot:item.createdAt="{item}">
      <span>{{ formatDatetime(item.createdAt) }}</span>
    </template>

    <template v-slot:item.updatedAt="{item}">
      <span>{{ formatDatetime(item.updatedAt) }}</span>
    </template>
  </v-data-table>
</template>

<script>
import ListHeader from '@/components/common/ListHeader'
import SearchInput from '@/components/common/SearchInput'

export default {
  components: {ListHeader, SearchInput},
  props: {
    cities: {
      type: Array,
      required: true,
    },
    countries: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    dialog: false,
    search: '',
    headers: [
      {text: 'País', value: 'country'},
      {text: 'Nome', value: 'name'},
      {text: 'Latitude', value: 'latitude'},
      {text: 'Longitude', value: 'longitude'},
      {text: 'Data de criação', value: 'createdAt'},
      {text: 'Última atualização', value: 'updatedAt'},
      {text: 'Ações', value: 'actions', align: 'right', sortable: false},
    ],
  }),

  methods: {
    formatDatetime(datetime) {
      if (datetime && typeof datetime.toLocaleString === 'function') {
        return datetime.toLocaleString('pt-br')
      }
      return datetime
    },
    getCountryById(countryId) {
      const country = this.countries.find(country => country.id === countryId)

      return country ? `${country.code} - ${country.name}` : '-'
    },
  },
}
</script>
