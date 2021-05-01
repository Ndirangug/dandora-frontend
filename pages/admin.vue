<template>
  <div class="admin-container">
    <h1>Admin</h1>

    <error-dialog />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ErrorDialog from '~/components/utils/ErrorDialog.vue'
import {
  authStore,
  bookingsStore,
  housesStore,
  paymentsStore,
  tenanciesStore,
  tenantsStore,
} from '~/store'
import { Tenant, House, Payment } from '~/types/types'

export default Vue.extend({
  components: { ErrorDialog },
  middleware({ redirect }) {
    // If the user is not authenticated
    if (!authStore.adminLoggedIn) {
      authStore.setAuthError(true, 'You are not logged in as admin!')
      setTimeout(() => {
        return redirect('/auth')
      }, 2000)
    }
  },

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

    allPayments(): Payment[] {
      return paymentsStore.allPayments
    },

    allTenants(): Tenant[] {
      return tenantsStore.allTenants
    },
  },
})
</script>
