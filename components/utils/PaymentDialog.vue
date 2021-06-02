<template>
  <v-dialog :value="show" persistent width="400">
    <v-card>
      <v-card-title>Make Payment</v-card-title>
      <v-card-text>
        <h6 class="text-body-2 mb-8">
          Confirm Payment details then click the proceed button. You will be
          redirected to an external payment service provider from where you'll
          make your payment
        </h6>

        <div class="payment-form">
          <v-text-field
            v-model="fullName"
            outlined
            readonly
            label="Full Name"
          />

          <v-text-field
            v-model="form.amount"
            prefix="Kshs"
            outlined
            :readonly="purposeReadOnly"
            label="Amount"
          />

          <v-select
            v-model="form.purpose"
            outlined
            :readonly="purposeReadOnly"
            label="Purpose"
            :hint="bookingHint"
            :items="['booking', 'contribution', 'rent']"
          />

          <v-menu
            v-model="datePicker"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="form.for_month"
                label="Period Paying For"
                :prepend-inner-icon="icons.calendar"
                readonly
                outlined
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="form.for_month"
              @input="datePicker = false"
            ></v-date-picker>
          </v-menu>
        </div>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn text color="warning" @click="show = false">CANCEL</v-btn>
        <v-btn text color="primary" @click="makePayment">PROCEED</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { mdiCalendar } from '@mdi/js'
import Vue from 'vue'
import { paymentsStore } from '~/store'
import { Booking, Payment, PaymentPurpose, Tenancy, House } from '~/types/types'
import { EventBus } from '~/utils/event-bus'

export default Vue.extend({
  data() {
    return {
      show: false,
      form: {
        amount: '0',
        purpose: 'booking' as PaymentPurpose,
        for_month: new Date().toISOString().substr(0, 10),
        phone: this.$store.state.user.tenant?.phone,
      },
      datePicker: false,
      icons: {
        calendar: mdiCalendar,
      },
      purposeReadOnly: true,
      houseId: 0,
    }
  },

  computed: {
    fullName(): string {
      return `${this.$store.state.user.tenant?.first_name} ${this.$store.state.user.tenant?.last_name}`
    },
    bookingHint(): string {
      return this.form.purpose === 'booking'
        ? 'Booking Amount is 5% of the monthly rent'
        : ''
    },
    tenancy(): Tenancy {
      return this.$store.state.tenancies.allTenancies.find(
        (tenancy: Tenancy) =>
          tenancy.tenant_id === this.$store.state.user.tenant?.id
      )
    },
  },
  created() {
    EventBus.$on(
      'payment:dialog',
      (
        show: boolean,
        amount: number,
        purpose: PaymentPurpose,
        purposeReadOnly: boolean,
        houseId: number
      ) => {
        this.show = show
        this.form.amount = amount.toFixed(2)
        this.form.purpose = purpose
        this.purposeReadOnly = purposeReadOnly
        this.houseId = houseId
      }
    )
  },
  methods: {
    async makePayment() {
      const payment: Payment = {
        date: new Date(),
        for_month: new Date(this.form.for_month),
        amount: parseFloat(this.form.amount),
        purpose: this.form.purpose,
        tenant_id: this.$store.state.user.tenant?.id,
      }

      try {
        const response = await this.$axios.$post(
          `${this.$config.apiUrl}/payments`,
          payment
        )
        console.log(response)
        paymentsStore.addPayment(response)

        this.form.purpose === 'booking'
          ? await this.makeBooking(this.houseId)
          : await this.makeTenancy(this.houseId)
      } catch (error) {
        console.error(error)
      }

      let houseNumber
      this.$store.state.houses.allHouses.forEach((house: House) => {
        if (house.id === this.houseId) {
          houseNumber = house.house_number
        }
      })

      this.$router.push(
        `/payment?amount=${this.form.amount}&phone=${this.form.phone}&email=${this.$store.state.user.tenant?.email}&purpose=${this.form.purpose}&house=${houseNumber}`
      )
    },
    async makeBooking(id: number) {
      console.log('booking')

      const booking: Booking = {
        date_booked: Date.now(),
        expected_occupy_date: Date.parse(this.form.for_month),
        paid: 1,
        house_id: id,
        tenant_id: this.$store.state.user.tenant?.id,
      }

      try {
        const response = await this.$axios.$post(
          `${this.$config.apiUrl}/bookings`,
          booking
        )
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    },

    async makeTenancy(id: number) {
      console.log('tenancing')
      const tenancy: Tenancy = {
        start_date: Date.parse(this.form.for_month),
        house_id: id,
        tenant_id: this.$store.state.user.tenant?.id,
      }

      try {
        const response = await this.$axios.$post(
          `${this.$config.apiUrl}/tenancies`,
          tenancy
        )
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    },
  },
})
</script>

<style lang="scss">
.payment-form {
  width: 100%;

  .v-input {
    width: 100% !important;
  }
}
</style>
