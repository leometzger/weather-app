<template>
  <v-snackbar v-model="isOpened">
    {{ text }}

    <template v-slot:action="{attrs}">
      <v-btn color="primary" text v-bind="attrs" @click="$emit('close')">
        Fechar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    isOpened: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>
