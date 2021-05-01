/* eslint-disable no-console */
import { Context } from '@nuxt/types'
import { Store } from 'vuex'
import { bookingsStore, housesStore, initialiseStores, paymentsStore, tenanciesStore, tenantsStore } from '~/utils/store-accessor'
const initializer = (store: Store<any>) => initialiseStores(store)
export const plugins = [initializer]
export * from '~/utils/store-accessor'

export const actions = {
  // eslint-disable-next-line require-await
  // eslint-disable-next-line no-empty-pattern
  async nuxtServerInit({}, { $axios, store, $config }: Context) {
    // do it once more like so..
    initialiseStores(store)

    try {
      const houses = await $axios.$get(`${$config.apiUrl}/houses`)
      const payments = await $axios.$get(`${$config.apiUrl}/payments`)
      const tenants = await $axios.$get(`${$config.apiUrl}/tenants`)
      const bookings = await $axios.$get(`${$config.apiUrl}/bookings`)
      const tenancies = await $axios.$get(`${$config.apiUrl}/tenancies`)
      housesStore.initHouses(houses)
      paymentsStore.initPayments(payments)
      tenantsStore.initTenants(tenants)
      bookingsStore.initBookings(bookings)
      tenanciesStore.initTenancies(tenancies)
    } catch (error) {
      console.error(error.message)
    }

    // now just import stores from utils..
  },
}
