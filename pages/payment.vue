<template>
  <div class="payment-container"></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async mounted() {
    const amount = parseFloat(this.$route.query.amount as string)
    const phone = this.$route.query.phone
    const email = this.$route.query.email
    let dataString = ''
    const hashkey = 'demoCHANGED'

    const params: { [key: string]: string | number } = {
      live: 0,
      bonga: 1,
      debitcard: 1,
      creditcard: 1,
      oid: 'gdju3643',
      inv: 'fhyue4',
      ttl: amount,
      tel: phone as string,
      eml: email as string,
      vid: 'demo',
      crl: 2,
    }

    for (const key in params) {
      dataString += params[key]
    }

    // @ts-ignore
    const hsh = this.CryptoJS.HmacSHA1(dataString, hashkey).toString()
    const request = { ...params, hsh }

    if (process.browser) {
      const response = await this.$axios.post(
        'https://payments.ipayafrica.com/v3/ke',
        request,
        {
          withCredentials: false,
          headers: { 'Access-Control-Allow-Origin': '*' },
        }
      )
      console.log(response)
    }
  },
})
</script>
