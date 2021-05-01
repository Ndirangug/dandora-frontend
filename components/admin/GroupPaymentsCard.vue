<template>
  <div class="payments-group">
    <h6 class="text-h6 ml-16">{{ name.replace('_', ' ') }}</h6>

    <payments-table :payments="payments" />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import PaymentsTable from '@/components/profile/PaymentsTable.vue'
import { Payment } from '~/types/types'

export default Vue.extend({
  components: { PaymentsTable },
  props: {
    payments: {
      type: Object as PropType<Array<Payment>>,
      required: true,
      default: null,
    },
    name: {
      type: String,
      required: true,
      default: null,
    },
  },
})
</script>
