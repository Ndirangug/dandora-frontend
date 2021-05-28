<template>
  <v-dialog
    :value="model"
    hide-overlay
    width="400"
    @click:outside="closeDialog"
  >
    <v-card class="py-2 px-1">
      <v-card-text>
        <v-menu
          v-model="datePickerStart"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="form.start_date"
              label="Start Date"
              :prepend-inner-icon="icons.calendar"
              readonly
              outlined
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="form.start_date"
            @input="datePickerStart = false"
          ></v-date-picker>
        </v-menu>

        <v-menu
          v-model="datePickerEnd"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="form.end_date"
              label="End Date"
              :prepend-inner-icon="icons.calendar"
              readonly
              outlined
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="form.end_date"
            @input="datePickerEnd = false"
          ></v-date-picker>
        </v-menu>

        <v-select
          v-if="resource == 'payments'"
          v-model="form.purpose"
          outlined
          :readonly="purposeReadOnly"
          label="Purpose"
          :items="['booking', 'contribution', 'rent']"
        />

        <v-btn @click="generareReport">GENERATE REPORT</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { mdiCalendar } from '@mdi/js'
import Vue from 'vue'
import { userStore } from '~/store'
import { EventBus } from '~/utils/event-bus'
export default Vue.extend({
  data() {
    return {
      model: false,
      resource: '',
      form: {
        start_date: '',
        end_date: '',
        purpose: '',
      },
      datePickerEnd: false,
      datePickerStart: false,
      icons: {
        calendar: mdiCalendar,
      },
    }
  },

  created() {
    EventBus.$on('report', (resource: string) => {
      this.model = true
      this.resource = resource
    })
  },

  methods: {
    generareReport() {
      const query = {
        resource: this.resource,
        start_date: this.form.start_date,
        end_date: this.form.end_date,
      }
      // eslint-disable-next-line no-unused-expressions
      this.form.purpose !== '' ? (query.purpose = this.form.purpose) : null

      this.$router.push({
        path: '/report',
        query,
      })
    },
  },
})
</script>
