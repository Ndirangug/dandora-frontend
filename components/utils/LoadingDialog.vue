<template>
  <v-dialog :value="loading" hide-overlay persistent width="300">
    <v-card class="py-2 px-1" color="primary" dark>
      <v-card-text >
        <v-progress-linear indeterminate color="white"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { authStore } from '~/store'
export default Vue.extend({
  computed: {
    loading(): boolean {
      return authStore.authLoading
    },
  },
})
</script>
