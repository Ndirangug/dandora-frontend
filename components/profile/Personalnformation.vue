<template>
  <div class="personal-information mx-auto my-2">
    <v-simple-table>
      <tbody>
        <tr v-for="(value, key) in tenant" :key="key">
          <td class="text-capitalize">{{ key }}</td>
          <td>{{ value }}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    tenant: {
      type: Object,
      required: true,
      default: null,
    },
  },
})
</script>

<style lang="scss" scoped>
.personal-information {
  max-width: 400px;
}
</style>
