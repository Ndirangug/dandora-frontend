<template>
  <div class="payments">
    <div class="payments-table">
      <payments-table :payments="payments" />
    </div>
    
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
      required: true,
      type: Object as PropType<Array<Payment>>,
      default: null,
    },
  },
})
</script>
