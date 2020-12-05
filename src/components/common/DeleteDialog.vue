<template>
  <v-dialog v-model="isOpened">
    <v-card>
      <v-card-title class="headline">{{ message }}</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="onClickClose">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="onClickConfirm"
          >Deletar</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    submessage: {
      type: String,
      required: false,
      default: '',
    },
  },

  data: () => ({
    isOpened: false,
  }),

  methods: {
    /**
     * @public
     */
    open() {
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
      this.$emit('close')
    },
    onClickConfirm() {
      this.$emit('confirm')
    },
  },
}
</script>
