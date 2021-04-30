<template>
  <div class="houses-container pt-16">
    <search-container />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SearchContainer from '@/components/houses/SearchContainer.vue'
export default Vue.extend({
  components: { SearchContainer },
  layout: 'main',
})
</script>
