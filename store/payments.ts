/* eslint-disable no-console */
import { VuexModule, Module, Mutation } from 'vuex-module-decorators'
import { Booking } from '~/types/types'

@Module({ name: 'bookings', stateFactory: true, namespaced: true })
export default class Bookings extends VuexModule {
  allBookings: Booking[] = []

  @Mutation
  initTenants(bookings: Booking[]) {
    this.allBookings = bookings
  }
}
