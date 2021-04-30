<template>
  <div class="houses-grid">
    <v-row>
      <v-col
        v-for="(house, i) in filteredHouses"
        :key="i"
        cols="6"
        sm="4"
        md="3"
        lg="3"
      >
        <house-card :house="house" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HouseCard from '@/components/houses/HouseCard.vue'
import { housesStore } from '~/store'
import { House } from '~/types/types'

export default Vue.extend({
  components: { HouseCard },
  computed: {
    filteredHouses(): House[] {
      return housesStore.filteredHouses
    },
  },
})
</script>
