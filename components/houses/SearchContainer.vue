<template>
  <div class="search-container py-16 px-1 px-sm-2 px-md-16">
    <v-row class="search-form flex-wrap my-8 mx-16 py-10 px-2 px-sm-4 px-md-10">
      <v-col cols="3">
        <v-select
          v-model="form.bedrooms"
          filled
          label="Bedrooms"
          :items="[1, 2, 3, 4]"
        />
      </v-col>

      <v-col cols="3">
        <v-select
          v-model="form.phase"
          filled
          label="Phase"
          :items="['I', 'II', 'III']"
        />
      </v-col>

      <v-col cols="5">
        <p class="mb-o text-caption">Monthly Rent</p>
        <v-range-slider
          v-model="form.rentSlider"
          thumb-label
          color="primary"
          min="1000"
          max="100000"
          persistent-hint
          :hint="sliderHint"
          thumb-size="40"
        >
          <template #thumb-label="props">
            {{ rentFormat.format(props.value) }}
          </template>
        </v-range-slider>
      </v-col>

      <v-col cols="1">
        <v-btn color="primary" @click="search">SEARCH</v-btn>
      </v-col>

      <div></div>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { housesStore } from '~/store'
import { House } from '~/types/types'
export default Vue.extend({
  data() {
    return {
      form: {
        rentSlider: [10000, 80000],
        bedrooms: 1,
        phase: 'I',
      },
      rentFormat: new Intl.NumberFormat(),
    }
  },

  computed: {
    sliderHint(): string {
      return `Kshs ${this.rentFormat.format(
        this.form.rentSlider[0]
      )} - ${this.rentFormat.format(this.form.rentSlider[1])}`
    },
  },

  methods: {
    search() {
      console.log('search')
      const houses: House[] = housesStore.allHouses
        .slice()
        .filter(
          (house) =>
            house.bedrooms === this.form.bedrooms &&
            house.phase === this.form.phase &&
            house.rent >= this.form.rentSlider[0] &&
            house.rent <= this.form.rentSlider[1]
        )
      housesStore.updateFilteredHouses(houses)
    },
  },
})
</script>

<style lang="scss" scoped>
.search-container {
  background: url('/gradient-bg.gif') no-repeat center;
  background-size: cover;

  .search-form {
    background: rgba(255, 120, 244, 0.699);
    border-radius: 1em;
  }
}
</style>
