<template>
  <div class="house-card mx-auto my-12">
    <div v-if="isAdmin" class="make-available mb-1">
      <v-btn-toggle v-model="toggle_available" mandatory>
        <v-btn x-small color="success" text> AVAILABLE </v-btn>
        <v-btn x-small color="warning" text> UNAVAILABLE </v-btn>
      </v-btn-toggle>
    </div>
    <v-card
      :loading="loading"
      :disabled="house.booked"
      max-width="374"
      :height="cardHeight"
    >
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

          <p class="mt-1 font-weight-600">
            House Number: {{ house.house_number }}
          </p>
        </div>

        <div class="status">
          <p v-if="house.booked" class="mb-0 mt-2 warning--text text-caption">
            BOOKED
          </p>
          <p v-else class="mb-0 mt-2 success--text text-caption">AVAILABLE</p>
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
import { housesStore } from '~/store'
import { Booking, House } from '~/types/types'
import { EventBus } from '~/utils/event-bus'

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
      toggle_available: this.house.booked ? 1 : 0,
      loading: false,
    }
  },

  computed: {
    isAdmin(): boolean {
      return this.$store.state.user.tenant.email === 'admin@dandora.com'
    },
    cardHeight(): number {
      let height = 550
      // @ts-ignore
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          height = 770
          break
        case 'sm':
          height = 630
          break
        case 'md':
          height = 640
          break
        case 'lg':
          height = 600
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

  watch: {
    async toggle_available(val: number) {
      this.loading = true

      if (val === 0) {
        // TODO: unbook
        // eslint-disable-next-line no-console
        console.log('changing available status')

        try {
          const response = await this.$axios.post(
            `${this.$config.apiUrl}/houses/unbook/${this.house.id}`
          )
          console.log(response)

          housesStore.updateAvailability(this.house.id as number, true)
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error)
        }
      } else {
        // BOOK

        try {
          const response = await this.$axios.post(
            `${this.$config.apiUrl}/houses/makeUnavailable/${this.house.id}`
          )
          housesStore.updateAvailability(this.house.id as number, false)
          console.log(response)
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error)
        }
      }

      this.loading = false
      this.$forceUpdate()
    },
  },

  methods: {
    book() {
      EventBus.$emit(
        'payment:dialog',
        true,
        this.house.rent,
        'booking',
        true,
        this.house.id
      )
    },
    rent() {
      EventBus.$emit(
        'payment:dialog',
        true,
        this.house.rent,
        'rent',
        true,
        this.house.id
      )
    },
  },
})
</script>
