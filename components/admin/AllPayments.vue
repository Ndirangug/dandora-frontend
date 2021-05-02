<template>
  <div class="all-payments pt-16">
     <h3 class="text-h6 ml-6 mb-4">ALL PAYMENTS</h3>

    <group-payments-card
      v-for="(value, key) in groupedPayments"
      :key="key"
      class="my-8"
      :name="key"
      :payments="value"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import GroupPaymentsCard from '@/components/admin/GroupPaymentsCard.vue'
import { GroupedPayments } from '~/types/types'

export default Vue.extend({
  components: { GroupPaymentsCard },
  props: {
    groupedPayments: {
      type: Object,
      required: true,
      default: null,
    } as PropOptions<GroupedPayments>,
  },
})
</script>
