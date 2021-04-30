/* eslint-disable no-console */
import { Context } from '@nuxt/types'
import { Store } from 'vuex'
import { housesStore, initialiseStores } from '~/utils/store-accessor'
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
      const housesResponse = await $axios.$get(`${$config.apiUrl}/houses`)
      housesStore.initHouses(housesResponse)
    } catch (error) {
      console.error(error.message)
    }

    // now just import stores from utils..
  },
}
