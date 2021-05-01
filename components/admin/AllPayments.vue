<template>
  <div class="all-payments pt-16">
    <group-payments-card
    class="my-8"
      v-for="(value, key) in groupedPayments"
      :key="key"
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
