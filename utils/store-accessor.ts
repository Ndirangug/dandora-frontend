/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import tenancies from '~/store/tenancies'
import tenants from '~/store/tenants'
import payments from '~/store/payments'
import houses from '~/store/houses'
import bookings from '~/store/bookings'
import auth from '~/store/auth'
import ui from '~/store/ui'

let tenanciesStore: tenancies
let tenantsStore: tenants
let paymentsStore: payments
let housesStore: houses
let bookingsStore: bookings
let authStore: auth
let uiStore: ui

function initialiseStores(store: Store<any>): void {
  tenanciesStore = getModule(tenancies, store)
  tenantsStore = getModule(tenants, store)
  paymentsStore = getModule(payments, store)
  housesStore = getModule(houses, store)
  bookingsStore = getModule(bookings, store)
  authStore = getModule(auth, store)
  uiStore = getModule(ui, store)
}

export {
  initialiseStores,
  tenanciesStore,
  tenantsStore,
  paymentsStore,
  housesStore,
  bookingsStore,
  authStore,
  uiStore,
}
