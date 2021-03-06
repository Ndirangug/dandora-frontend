<template>
  <div class="admin-container">
    <div class="banner d-flex justify-center align-center mt-16 py-16">
      <h1 class="white--text">Dashboard</h1>
    </div>

    <div class="reports d-flex justify-space-around py-6 px-1 px-sm-2 px-md-8">
      <v-btn @click="generareReport('payments')">PAYMENTS REPORT</v-btn>
      <v-btn @click="generareReport('bookings')">BOOKING HISTORY</v-btn>
      <v-btn @click="generareReport('current-bookings')"
        >CURRENTLY BOOKED</v-btn
      >
    </div>

    <div class="contents d-flex flex-column-reverse flex-md-row">
      <div
        class="messages"
        :class="{ 'msg-width': $vuetify.breakpoint.mdAndUp }"
      >
        <messages />
      </div>
      <div
        class="payments"
        :class="{ 'payment-width': $vuetify.breakpoint.mdAndUp }"
      >
        <all-payments :grouped-payments="groupedPayments" />
      </div>
    </div>

    <error-dialog />
    <report-dialog />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import ErrorDialog from '~/components/utils/ErrorDialog.vue'
import ReportDialog from '~/components/utils/ReportDialog.vue'
import AllPayments from '~/components/admin/AllPayments.vue'
import Messages from '~/components/admin/Messages.vue'
import {
  userStore,
  bookingsStore,
  housesStore,
  paymentsStore,
  tenanciesStore,
  tenantsStore,
} from '~/store'
import { Tenant, House, Payment, Tenancy, GroupedPayments } from '~/types/types'
import { EventBus } from '~/utils/event-bus'

export default Vue.extend({
  components: { ErrorDialog, AllPayments, Messages, ReportDialog },
  layout: 'main',
  middleware({ redirect, store }) {
    console.log('admin?')

    if (store.state.user.tenant.email === 'admin@dandora.com') {
      console.log(store.getters['user/adminLoggedIn'])
      console.log('You are logged in as admin')
    } else {
      console.log(store.getters['user/adminLoggedIn'])
      console.log('You are not logged in as admin')

      userStore.setAuthError({
        errorOccurred: true,
        message: 'You are not logged in as admin!',
      })
      setTimeout(() => {
        return redirect('/auth')
      }, 2000)
    }
  },
  computed: {
    ...mapGetters('user', ['adminLoggedIn']),
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

    groupedPayments(): GroupedPayments {
      const groupedPayments: GroupedPayments = {}

      this.allPayments.forEach((payment: Payment) => {
        const tenant = this.allTenants.find(
          (tenant) => tenant.id === payment?.tenant_id
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
  methods: {
    generareReport(resource: string) {
      EventBus.$emit('report', resource)
    },
  },
})
</script>

<style lang="scss" scoped>
.banner {
  background-color: rgb(155, 155, 255);
}

.msg-width {
  width: 35%;
}

.payment-width {
  width: 65%;
}
</style>
