<template>
  <div class="profile-container">
    <h1>Profile</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  authStore,
  bookingsStore,
  housesStore,
  paymentsStore,
  tenanciesStore,
} from '~/store'
import { House, Payment, Tenant } from '~/types/types'
export default Vue.extend({
  computed: {
    tenant(): Tenant | undefined {
      return authStore.tenant
    },
    currentHouse(): House | undefined {
      let house

      if (this.tenant?.status === 'current') {
        const tenancy = tenanciesStore.allTenancies.find(
          (tenancy) => tenancy.tenant_id === this.tenant?.id
        )
        house = housesStore.allHouses.find(
          (house) => house.id === tenancy?.house_id
        )
      }

      return house
    },
    payments(): Payment[] {
      const payments: Payment[] = []

      const tenancies = tenanciesStore.allTenancies
        .slice()
        .filter((tenancy) => tenancy.tenant_id === this.tenant?.id)

      const bookings = bookingsStore.allBookings
        .slice()
        .filter((booking) => booking.tenant_id === this.tenant?.id)

      tenancies.forEach((tenancy) => {
        paymentsStore.allPayments.forEach((payment) => {
          if (payment.tenancy_id === tenancy.tenant_id) {
            payments.push(payment)
          }
        })
      })

      bookings.forEach((booking) => {
        paymentsStore.allPayments.forEach((payment) => {
          if (payment.booking_id === booking.tenant_id) {
            payments.push(payment)
          }
        })
      })

      return payments
    },
  },
})
</script>
