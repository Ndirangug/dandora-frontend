<template>
  <div>
    <div class="payment-container" v-html="html"></div>
    <div class="gethsh my-8" v-html="hashHtml"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return { html: '', hashHtml: '' }
  },
  mounted() {
    const amount = parseFloat(this.$route.query.amount as string)
    const phone = this.$route.query.phone
    const email = this.$route.query.email
    let url = 'https://payment-proxy-g677pmr5tq-uc.a.run.app/?'
    // const url = `https://ipay-payment-container-p2gh3d44pq-uc.a.run.app?email=${this.form.driver.getEmail()}&phone=${this.form.driver.getPhone()}&amount=${
    //           this.totalFuelCost
    //         }&cilent=soda&customer=${this.form.driver.getFirstname()} ${this.form.driver.getLastname()},{this.form.driver.getPhone()&items=${this.form.vehicle.getBrand()} ${this.form.vehicle.getModel()},${
    //           this.totalFuelConsumption
    //         },${this.fuelCostPerUnit},${this.totalFuelCost};`
    url += `amount=${amount}&phone=${phone}&email=${email}&client=dandora&customer=${this.$store.state.user.tenant.first_name} ${this.$store.state.user.tenant.last_name},${this.$store.state.user.tenant.phone}&items=${this.$route.query.purpose}, ${this.$route.query.house},'','',${this.$route.query.amount};`
    console.log(url)

    window.open(url)
  },
})
</script>
