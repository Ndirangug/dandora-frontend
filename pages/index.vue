<template>
  <div class="welcome-container d-flex flex-column justify-center align-center">
    <img src="/logo.png" />
    <h1>Dandora Resident Welfare Association Management System</h1>
    <v-btn tile class="my-3 px-8" to="/login"
      >WELCOME
      <v-icon class="ml-3">{{ icons.arrowRight }}</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { mdiArrowRight } from '@mdi/js'
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      icons: {
        arrowRight: mdiArrowRight,
      },
    }
  },
})
</script>

<style lang="scss" scoped>
.welcome-container {
  height: 100%;
  background: #c2ccd6;
}
</style>
