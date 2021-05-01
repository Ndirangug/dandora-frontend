<template>
  <v-simple-table class="mx-16">
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
      const payments = this.payments.slice()
      payments.forEach((payment: Payment) => {
        delete payment.id
        delete payment.created_at
        delete payment.updated_at
        delete payment.tenancy_id
        delete payment.booking_id
      })

      return payments
    },
  },
})
</script>
