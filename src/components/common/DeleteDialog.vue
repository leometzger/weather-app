<template>
  <v-dialog v-model="isOpened" width="400px">
    <v-card>
      <v-card-title class="headline">{{ message }}</v-card-title>
      <v-card-text v-if="submessage">{{ submessage }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="onClickClose">Cancel</v-btn>
        <v-btn color="primary" @click="onClickConfirm">Deletar</v-btn>
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
    currentDelete: null,
  }),

  methods: {
    /**
     * @public
     */
    open(item) {
      this.isOpened = true
      this.currentDelete = item
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
      this.$emit('confirm', this.currentDelete)
      this.isOpened = false
    },
  },
}
</script>
