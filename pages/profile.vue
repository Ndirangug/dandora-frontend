<template>
  <div class="profile-container">
    <div class="top-banner">
      <v-avatar size="200" class="avatar">
        <img :src="avatarUrl" />
      </v-avatar>
    </div>

    <div
      class="mt-16 pt-16 info-tab d-flex flex-column justify-center align-center"
    >
      <v-tabs
        v-model="tab"
        background-color="white"
        class="d-flex justify-space-around mb-4"
      >
        <v-tab>Personal Information</v-tab>
        <v-tab>Payments</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item><personalnformation :tenant="mergedTenant" /> </v-tab-item>
        <v-tab-item><payments :payments="payments" /></v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Personalnformation from '~/components/profile/Personalnformation.vue'
import Payments from '~/components/profile/Payments.vue'
import {
  bookingsStore,
  housesStore,
  paymentsStore,
  tenanciesStore,
  userStore,
} from '~/store'
import { Booking, House, Payment, Tenancy, Tenant } from '~/types/types'
export default Vue.extend({
  components: { Personalnformation, Payments },
  layout: 'main',
  data() {
    return {
      tab: null,
    }
  },
  computed: {
    avatarUrl(): string {
      return `https://ui-avatars.com/api/?name=${this.tenant?.first_name}+${this.tenant?.last_name}&size=200`
    },
    tenant(): Tenant | undefined {
      return this.$store.state.user.tenant
    },
    currentHouse(): House | undefined {
      let house

      if (this.tenant?.status === 'current') {
        const tenancy = this.$store.state.tenancies.allTenancies.find(
          (tenancy: Tenancy) => tenancy.tenant_id === this.tenant?.id
        )
        house = this.$store.state.houses.allHouses.find(
          (house: House) => house.id === tenancy?.house_id
        )
      }

      return house
    },
    mergedTenant(): Object {
      const tenant = {
        Name: `${this.tenant?.first_name} ${this.tenant?.last_name}`,
        ...this.tenant,
        currentHouse: `${this.currentHouse?.title} Phase ${this.currentHouse?.phase}`,
      }
      delete tenant.id
      delete tenant.created_at
      delete tenant.updated_at
      delete tenant.password
      delete tenant.first_name
      delete tenant.last_name

      return tenant
    },
    payments(): Payment[] {
      const payments: Payment[] = []

      const tenancies = this.$store.state.tenancies.allTenancies
        .slice()
        .filter((tenancy: Tenancy) => tenancy.tenant_id === this.tenant?.id)

      const bookings = this.$store.state.bookings.allBookings
        .slice()
        .filter((booking: Booking) => booking.tenant_id === this.tenant?.id)

      tenancies.forEach((tenancy: Tenancy) => {
        this.$store.state.payments.allPayments.forEach((payment: Payment) => {
          if (payment.tenancy_id === tenancy.id) {
            payments.push(payment)
          }
        })
      })

      bookings.forEach((booking: Booking) => {
        this.$store.state.payments.allPayments.forEach((payment: Payment) => {
          if (payment.booking_id === booking.id) {
            payments.push(payment)
          }
        })
      })

      return payments
    },
  },
})
</script>

<style lang="scss" scoped>
.top-banner {
  position: relative;
  width: 100%;
  height: 20em;
  background: gray;

  .avatar {
    position: absolute;
    bottom: -4em;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
