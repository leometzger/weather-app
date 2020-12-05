<template>
  <div>
    <app-bar></app-bar>
    <vue-page-transition name="fade-in-up">
      <router-view></router-view>
    </vue-page-transition>
    <notification
      :is-opened="isActive"
      :text="text"
      @close="close"
    ></notification>
  </div>
</template>

<script>
import AppBar from '@/components/AppBar'
import Notification from '@/components/main/Notification.vue'
import {mapActions, mapState} from 'vuex'

export default {
  components: {AppBar, Notification},

  computed: {
    ...mapState('notifications', ['isActive', 'text']),
  },

  methods: {
    ...mapActions('notifications', ['close']),
  },
}
</script>

Notification
