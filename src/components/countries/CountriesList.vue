<template>
  <v-data-table
    hide-default-footer
    :search="search"
    :headers="headers"
    :items="countries"
    :items-per-page="Infinity"
  >
    <template v-slot:top>
      <list-header
        title="País"
        new-title="Inserir país"
        @new-item="$emit('new-item')"
      ></list-header>
      <search-input class="mx-4" v-model="search" />
    </template>

    <template v-slot:item.name="{item}">
      <strong>{{ item.name }}</strong>
    </template>

    <template v-slot:item.code="{item}">
      <v-chip outlined color="primary" small>{{ item.code }}</v-chip>
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
import SearchInput from '../common/SearchInput.vue'

export default {
  components: {ListHeader, SearchInput},
  props: {
    countries: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    search: '',
    dialog: false,
    headers: [
      {text: 'Nome', value: 'name'},
      {text: 'Código', value: 'code'},
      {text: 'Data de criação', value: 'createdAt'},
      {text: 'Última atualização', value: 'updatedAt'},
      {text: 'Ações', value: 'actions', align: 'right', sortable: false},
    ],
  }),

  methods: {
    formatDatetime(datetime) {
      return datetime.toLocaleString('pt-br')
    },
  },
}
</script>
