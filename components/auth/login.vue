<template>
  <div class="login-container d-flex flex-column justify-center align-center">
    <v-text-field
      v-model="form.email"
      dense
      type="email"
      outlined
      label="Email"
    />
    <v-text-field
      v-model="form.password"
      dense
      type="password"
      outlined
      label="Password"
    />

    <v-btn tile color="primary" @click="login">LOG IN</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { userStore } from '~/store'
export default Vue.extend({
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },

  methods: {
    async login() {
      userStore.setAuthLoading(true)
      const url = `${this.$config.apiUrl}/login`
      try {
        const tenant = await this.$axios.post(url, this.form)
        userStore.initTenant(tenant.data)
        this.$router.push('/houses')
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        userStore.setAuthLoading(false)
        userStore.setAuthError({ errorOccurred: true, message: "" })
      }
      userStore.setAuthLoading(false)
    },
  },
})
</script>
