<template>
  <div class="search-container py-16 px-16">
    <v-row class="search-form my-8 mx-16 py-10 px-10">
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
          v-model="form.slider"
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
export default Vue.extend({
  data() {
    return {
      form: {
        slider: [10000, 80000],
        bedrooms: 1,
        phase: 'I',
      },
      rentFormat: new Intl.NumberFormat(),
    }
  },

  computed: {
    sliderHint(): string {
      return `Kshs ${this.rentFormat.format(
        this.form.slider[0]
      )} - ${this.rentFormat.format(this.form.slider[1])}`
    },
  },

  methods: {
    search() {
      console.log('search')
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
