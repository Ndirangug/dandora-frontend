/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import tenancies from '~/store/tenancies'
import tenants from '~/store/tenants'
import payments from '~/store/payments'
import houses from '~/store/houses'
import bookings from '~/store/bookings'

let tenanciesStore: tenancies
let tenantsStore: tenants
let paymentsStore: payments
let housesStore: houses
let bookingsStore: bookings

function initialiseStores(store: Store<any>): void {
  tenanciesStore = getModule(tenancies, store)
  tenantsStore = getModule(tenants, store)
  paymentsStore = getModule(payments, store)
  housesStore = getModule(houses, store)
  bookingsStore = getModule(bookings, store)
}

export {
  initialiseStores,
  tenanciesStore,
  tenantsStore,
  paymentsStore,
  housesStore,
  bookingsStore,
}
