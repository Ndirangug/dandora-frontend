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
      curr: 'KES',
      cbk: '/',
      cst: 1,
      crl: 2,
    }
    for (const key in params) {
      dataString += params[key]
    }
    // @ts-ignore
    const hsh = this.CryptoJS.HmacSHA1(dataString, hashkey).toString()
    console.log(hsh)

    // const hashParams = {
    //   vendor: 'demo',
    //   data: dataString,
    //   key: hashkey,
    // }

    // this.hashHtml += '<FORM method="POST" action="https://ipayafrica.com/hashid/">'
    // for (const key in hashParams) {
    //   this.hashHtml += `${key} :<input name="${key}" type="text" value="${hashParams[key]}"></br>`
    // }
    // this.hashHtml += '<button type="submit">  Lipa  </button> </FORM>'
    const request = { ...params, hsh }
    console.log(dataString)
    console.log(request)
    let url = 'http://localhost:8000/payment-proxy?'

    for (const key in request) {
      // @ts-ignore
      url += `${key}=${request[key]}&`
    }

    window.open(url)
    // this.html += '<FORM action="https://payments.ipayafrica.com/v3/ke">'
    // for (const key in params) {
    //   this.html += `${key} :<input name="${key}" type="text" value="${params[key]}"></br>`
    // }
    // this.html += `Hash :<input name="hsh" type="text" value="${hsh}"></br>`
    // this.html += '<button type="submit">  Lipa  </button> </FORM>'
  },
})
</script>
