/* eslint-disable no-console */
import { VuexModule, Module, Mutation } from 'vuex-module-decorators'
import { Payment } from '~/types/types'

@Module({ name: 'payments', stateFactory: true, namespaced: true })
export default class Payments extends VuexModule {
  allPayments: Payment[] = []

  @Mutation
  initPayments(payments: Payment[]) {
    this.allPayments = payments
  }
}
