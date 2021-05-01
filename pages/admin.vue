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
  userStore,
  bookingsStore,
  housesStore,
  paymentsStore,
  tenanciesStore,
  tenantsStore,
} from '~/store'
import { Tenant, House, Payment, Tenancy } from '~/types/types'

export default Vue.extend({
  components: { ErrorDialog },
  layout: 'main',
  // middleware({ redirect }) {
  //   if (userStore.adminLoggedIn) {
  //      console.log(userStore.adminLoggedIn + ' hhh')
  //     console.log('You are logged in as admin')
  //   } else {
  //     console.log(userStore.adminLoggedIn + ' hhh')
  //     console.log('You are not logged in as admin')

  //     userStore.setAuthError(true, 'You are not logged in as admin!')
  //     setTimeout(() => {
  //       return redirect('/auth')
  //     }, 2000)
  //   }
  // },

  computed: {
    tenant(): Tenant | undefined {
      return userStore.tenant
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

    allTenancies(): Tenancy[] {
      return tenanciesStore.allTenancies
    },

    groupedPayments() {
      const groupedPayments: { [key: string]: Object[] } = {}

      this.allPayments.forEach((payment: Payment) => {
        const tenancy = this.allTenancies.find(
          (tenancy) => payment.tenancy_id === tenancy.id
        )
        const tenant = this.allTenants.find(
          (tenant) => tenant.id === tenancy?.tenant_id
        )

        const tenantName = `${tenant?.first_name}_${tenant?.last_name}`

        // eslint-disable-next-line no-prototype-builtins
        if (!groupedPayments.hasOwnProperty(tenantName)) {
          groupedPayments[tenantName] = []
        }

        delete payment.id
        delete payment.created_at
        delete payment.updated_at
        delete payment.tenancy_id
        delete payment.booking_id

        groupedPayments[tenantName].push(payment)
      })

      return groupedPayments
    },
  },
})
</script>
