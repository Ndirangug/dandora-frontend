<template>
  <v-dialog :value="show" persistent width="300">
    <v-card>
      <v-card-title>Make Payment</v-card-title>
      <v-card-text>
        <h6 class="text-h6">
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
            outlined
            readonly
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
                :prepend-icon="icons.calendar"
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
import { Payment, PaymentPurpose, Tenancy } from '~/types/types'
import { EventBus } from '~/utils/event-bus'

export default Vue.extend({
  data() {
    return {
      show: false,
      form: {
        amount: 0,
        purpose: 'booking' as PaymentPurpose,
        for_month: new Date().toISOString().substr(0, 10),
        phone: this.$store.state.user.tenant?.phone,
      },
      datePicker: false,
      icons: {
        calendar: mdiCalendar,
      },
      purposeReadOnly: true,
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
        purposeReadOnly: boolean
      ) => {
        this.show = show
        this.form.amount = amount
        this.form.purpose = purpose
        this.purposeReadOnly = purposeReadOnly
      }
    )
  },
  methods: {
    async makePayment() {
      // const booking_id = undefined

      // if (this.form.purpose === 'booking') {
      //   // TODO: IMPLEMENT THIS
      // }

      const payment: Payment = {
        date: new Date(),
        for_month: new Date(this.form.for_month),
        amount: this.form.amount,
        purpose: this.form.purpose,
        tenant_id: this.$store.state.user.tenant?.id,
      }

      try {
        const response = await this.$axios.$post(
          `${this.$config.apiUrl}/payments`,
          payment
        )
        console.log(response)
        paymentsStore.addPayment(response.data)
      } catch (error) {
        console.error(error)
      }

      this.$router.push(
        `/payment?amount=${this.form.amount}&phone=${this.form.phone}&email=${this.$store.state.user.tenant?.email}`
      )
    },
  },
})
</script>
