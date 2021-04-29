<template>
  <div class="signup-container d-flex flex-column justify-center align-center">
    <v-text-field v-model="form.first_name" dense outlined label="First Name" />
    <v-text-field v-model="form.last_name" dense outlined label="Last Name" />
    <v-text-field v-model="form.phone" dense outlined label="Phone" />
    <v-text-field
      v-model="form.email"
      dense
      type="email"
      outlined
      label="Email"
    />
    <v-text-field
      v-model="form.password"
      type="password"
      outlined
      label="Password"
      dense
    />
    <v-select
      v-model="form.status"
      dense
      outlined
      label="Status"
      :items="['prospective', 'current']"
    />

    <v-btn tile color="primary" @click="signup">SIGN UP</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Tenant } from '~/types/types'
export default Vue.extend({
  data() {
    return {
      form: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        status: 'prospective',
      } as Tenant,
    }
  },

  methods: {
    async signup() {
      const url = `${this.$config.apiUrl}/tenants`
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

<style lang="scss" scoped>
.signup-container {
  max-height: 350px;
  overflow-y: scroll;
  padding-top: 6em;
}
</style>
