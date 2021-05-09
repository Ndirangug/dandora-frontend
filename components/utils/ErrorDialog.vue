<template>
  <v-dialog
    :value="error"
    hide-overlay
    width="300"
    @click:outside="closeDialog"
  >
    <v-card class="py-2 px-1" color="warning" dark>
      <v-card-text>
        <p v-if="message == ''" class="mb-1 text-center">
          Log In Failed. Maybe try Again?
        </p>
        <p v-else class="mb-0 text-center">{{ message }}</p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { userStore } from '~/store'
export default Vue.extend({
  computed: {
    error(): boolean {
      return userStore.authError
    },
    message(): string {
      return userStore.errorMessage
    },
  },

  methods: {
    closeDialog() {
      userStore.setAuthError({ errorOccurred: false, message: '' })
    },
  },
})
</script>
