<template>
  <div class="report-container">
    <div class="print-button">
      <v-btn color="primary" large elevation="10" icon @click="print">
        <v-icon>{{ icons.print }}</v-icon>
      </v-btn>
    </div>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script lang="ts">
import { mdiPrinter } from '@mdi/js'
import Vue from 'vue'
import { EventBus } from '~/utils/event-bus'
export default Vue.extend({
  data() {
    return {
      icons: { print: mdiPrinter },
      items: [],
      url: '',
      start_date: '',
      end_date: '',
      purpose: '',
      resource: '',
      headers:
        this.$route.query.resource === 'payments'
          ? [
              {
                text: 'Payment Id',
                align: 'start',
                sortable: false,
                value: 'id',
              },
              { text: 'Date', value: 'created_at' },
              { text: 'Amount (Kshs)', value: 'amount' },
              { text: 'Period', value: 'for_month' },
              { text: 'Name', value: 'name' },
              //   { text: 'First Name ', value: 'first_name' },
              //   { text: 'Last Name ', value: 'last_name' },
              { text: 'Phone', value: 'phone' },
            ]
          : [
              {
                text: 'House Number',
                align: 'start',
                sortable: false,
                value: 'house_number',
              },
              { text: 'Expected Occupy Date', value: 'expected_occupy_date' },
              { text: 'Paid', value: 'paid' },
              { text: 'Date Booked', value: 'date_booked' },
              { text: 'Name', value: 'name' },
              //   { text: 'First Name ', value: 'first_name' },
              //   { text: 'Last Name ', value: 'last_name' },
              { text: 'Phone', value: 'phone' },
            ],
    }
  },

  async fetch() {
    const params = { start_date: this.start_date, end_date: this.end_date }
    // eslint-disable-next-line no-unused-expressions
    this.purpose !== '' ? (params.purpose = this.purpose) : null
    try {
      const response = await this.$axios.get(this.url, { params })
      this.items = response.data

      this.items.map((value, key) => {
        if (this.resource === 'payments') {
          value.created_at = new Intl.DateTimeFormat().format(
            Date.parse(value.created_at)
          )
          value.for_month = new Intl.DateTimeFormat().format(
            Date.parse(value.for_month)
          )
        } else {
          value.expected_occupy_date = new Intl.DateTimeFormat().format(
            Date.parse(value.created_at)
          )
          value.date_booked = new Intl.DateTimeFormat().format(
            Date.parse(value.for_month)
          )
        }

        value.name = `${value.first_name} ${value.last_name}`
        delete value.first_name
        delete value.last_name
        console.log(value)

        return value
      })
      // console.log(this.items)
    } catch (error) {
      console.error(error)
    }
  },

  created() {
    this.resource = this.$route.query.resource
    // eslint-disable-next-line camelcase
    this.start_date = this.$route.query.start_date
    // eslint-disable-next-line camelcase
    this.end_date = this.$route.query.end_date
    this.purpose = this.$route.query.purpose

    switch (this.resource) {
      case 'payments':
        this.url = 'http://localhost:8000/api/reports/payments'
        break
      case 'bookings':
        this.url = 'http://localhost:8000/api/reports/booking'
        break
      case 'current-bookings':
        this.url = 'http://localhost:8000/api/reports/booking/current'
        break
      default:
        break
    }
  },

  methods: {
    print() {
      window.print()
    },
  },
})
</script>

<style lang="scss" scoped>
.print-button {
  position: fixed;
  top: 1em;
  right: 1em;

  button {
    background: white !important;
  }
}
</style>
