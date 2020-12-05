<template>
  <v-data-table :headers="headers" :items="countries">
    <template v-slot:top>
      <list-header
        title="País"
        new-title="Inserir país"
        @new-item="$emit('new-item')"
      ></list-header>
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

export default {
  components: {ListHeader},
  props: {
    countries: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
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
