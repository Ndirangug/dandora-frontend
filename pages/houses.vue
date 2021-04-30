<template>
  <div class="houses-container pt-16">
    <search-container />

    <div class="the-houses pt-16 mx-10 mx-sm-12 mx-md-16 px-1 px-sm-4 px-md-16">
      <h1>
        Available Houses <span class="text-h6">({{ numberOfHouses }})</span>
      </h1>

      <houses-grid v-if="numberOfHouses > 0" />
      <div
        v-else
        class="no-houses d-flex flex-column justify-center align-center"
      >
        <v-icon size="100" class="mb-8">{{ icons.sad }}</v-icon>
        <p>No houses. Try another search</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SearchContainer from '@/components/houses/SearchContainer.vue'
import HousesGrid from '@/components/houses/HousesGrid.vue'
import { mdiEmoticonSad } from '@mdi/js'
import { housesStore } from '~/store'

export default Vue.extend({
  components: { SearchContainer, HousesGrid },
  layout: 'main',
  data() {
    return {
      icons: {
        sad: mdiEmoticonSad,
      },
    }
  },

  computed: {
    numberOfHouses(): number {
      return housesStore.filteredHouses.length
    },
  },
})
</script>

<style lang="scss" scoped>
.no-houses {
  height: 25em;
}
</style>
