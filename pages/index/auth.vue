<template>
  <div
    class="auth-container d-flex flex-column justify-center align-center py-8 rounded"
  >
    <v-tabs v-model="tab" class="d-flex justify-center mb-4">
      <v-tabs-slider color="blue"></v-tabs-slider>
      <v-tab>Log In</v-tab>
      <v-tab>Sign Up</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item><login /> </v-tab-item>
      <v-tab-item><signup /> </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import login from '@/components/auth/login.vue'
import signup from '@/components/auth/signup.vue'

export default Vue.extend({
  components: { login, signup },
  data() {
    return {
      tab: null,
    }
  },
})
</script>

<style lang="scss" scoped>
.auth-container {
  max-width: 450px;
  min-width: 350px;
  background: white;
}
</style>

<style lang="scss">
.v-input {
  width: 70%;
}
.v-window {
  width: 100%;
}
</style>
