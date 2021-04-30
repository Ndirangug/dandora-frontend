<template>
  <div class="houses-grid"></div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { housesStore } from '~/store'
import { House } from '~/types/types'
export default Vue.extend({


  computed: {
    filteredHouses(): House[] {
      return housesStore.filteredHouses
    },
  },
})
</script>
