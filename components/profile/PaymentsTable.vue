<template>
  <v-simple-table height="400" fixed-header class="mx-16">
    <thead>
      <tr>
        <th v-for="entry in header" :key="entry" class="text-capitalize">
          {{ entry }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="payment in mappedPayments" :key="payment.date">
        <td v-for="(entry, key) in payment" :key="key">
          {{ entry }}
        </td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Payment } from '~/types/types'
export default Vue.extend({
  props: {
    payments: {
      required: true,
      type: Object as PropType<Array<Payment>>,
      default: null,
    },
  },
  data() {
    return {
      header: ['date', 'period paid for', 'amount', 'purpose'],
    }
  },

  computed: {
    mappedPayments(): Object[] {
      const payments: Object[] = []
      const dateFormatter = new Intl.DateTimeFormat()
      const numberFormatter = new Intl.NumberFormat()

      this.payments.forEach((payment: Payment) => {
        payments.push({
          date: dateFormatter.format(Date.parse(`${payment.date}`)),
          monthPaid: dateFormatter.format(Date.parse(`${payment.for_month}`)),
          amount: numberFormatter.format(payment.amount),
          purpose: payment.purpose,
        })
      })

      return payments
    },
  },
})
</script>
