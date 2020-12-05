<template>
  <v-toolbar flat>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-divider class="mx-4" inset vertical></v-divider>
    <v-spacer></v-spacer>
    <v-btn color="primary" dark class="mb-2" @click="$emit('new-item')">
      {{ newTitle }}
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    newTitle: {
      type: String,
      required: true,
    },
  },
}
</script>
