<template>
  <div class="house-card">
    <v-card class="mx-auto my-12" max-width="374" :height="cardHeight">
      <v-carousel
        cycle
        :show-arrows="false"
        hide-delimiter-background
        :delimiter-icon="icons.dash"
        height="300"
      >
        <v-carousel-item>
          <v-img height="100%" :src="`/homes/${house.photo1}`" />
        </v-carousel-item>

        <v-carousel-item>
          <v-img height="100%" :src="`/homes/${house.photo2}`" />
        </v-carousel-item>

        <v-carousel-item>
          <v-img height="100%" :src="`/homes/${house.photo3}`" />
        </v-carousel-item>
      </v-carousel>

      <!-- <v-img height="250" :src="house.photo1"></v-img> -->

      <v-card-title class="rent">{{
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'KES',
        }).format(house.rent)
      }}</v-card-title>

      <v-card-subtitle class="title text-subtitle-1 mb-0">{{
        house.title
      }}</v-card-subtitle>

      <v-card-text>
        <div class="phase subtitle-1 font-italic my-1">
          Phase {{ house.phase }}
        </div>

        <div class="description">
          {{ house.description }}
        </div>
      </v-card-text>

      <v-card-actions class="justify-space-around mx-1">
        <v-btn color="primary" text @click="book"> Book </v-btn>
        <v-btn color="primary" text @click="rent"> Rent Now </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { mdiMinus } from '@mdi/js'
import Vue, { PropOptions } from 'vue'
import { House } from '~/types/types'

export default Vue.extend({
  props: {
    house: {
      type: Object,
      required: true,
      default: null,
    } as PropOptions<House>,
  },

  data() {
    return {
      icons: {
        dash: mdiMinus,
      },
    }
  },

  computed: {
    cardHeight(): number {
      let height = 550
      // @ts-ignore
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          height = 770
          break
        case 'sm':
          height = 610
          break
        case 'md':
          height = 600
          break
        case 'lg':
          height = 570
          break
        case 'xl':
          height = 550
          break

        default:
          height = 500
          break
      }

      return height
    },
  },

  methods: {
    book() {},
    rent() {},
  },
})
</script>
