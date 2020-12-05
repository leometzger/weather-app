<template>
  <v-dialog
    :value="isOpened"
    width="500px"
    persistent
    @keydown.esc="$emit('close')"
  >
    <v-card>
      <v-card-title>
        <span class="headline">{{ title }}</span>
      </v-card-title>

      <v-card-text>
        <slot></slot>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('close')">
          Cancelar
        </v-btn>
        <v-btn color="primary" @click="$emit('save')">
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isOpened: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
}
</script>
