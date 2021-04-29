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
      const url = `${this.$config.apiUrl}/login`
      try {
        const tenant = await this.$axios.post(url, this.form)
        console.log(tenant)
        this.$router.push('/houses')
      } catch (error) {
        console.error(error)
      }

      
    },
  },
})
</script>
