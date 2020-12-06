<template>
  <v-text-field
    append-icon="mdi-magnify"
    label="Buscar"
    single-line
    hide-details
    :value="value"
    @input="$emit('input', $event)"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
}
</script>
